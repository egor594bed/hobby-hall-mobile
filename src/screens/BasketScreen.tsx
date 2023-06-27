import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text, Button, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootState } from '../redux/store';
import { BasketParamList } from '../navigation/BasketScreenNav';
import { IProduct } from '../types/ICatalog';
import { BasketItem } from '../components/Basket/BasketItem';
import { defaultScreenStyle } from '../assets/style/_defaultScreen';
import { colors } from '../assets/style/_colors';
import Loader from '../components/UI/Loader/Loader';

type BasketScreenNavigationProp = NativeStackNavigationProp<
  BasketParamList,
  'BasketOrder'
>;

type Props = {
  navigation: BasketScreenNavigationProp;
};

export const BasketScreen = ({ navigation }: Props) => {
  const productsInBasket = useSelector(
    (state: RootState) => state.basketSlice.basketItemsObjs,
  );
  const loading = useSelector((state: RootState) => state.basketSlice.loading);
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  // @ts-ignore
  // ts(2349)
  const totalPrice = productsInBasket.reduce(
    (acc: number, elem: IProduct): number => acc + elem.price * elem.total!,
    0,
  );

  if (loading) {
    return <Loader />;
  }

  if (!productsInBasket[0]) {
    return (
      <View style={styles.basketScreen}>
        <Text style={styles.emptyBasketText}>Корзина пуста!</Text>
        <Image source={require('../assets/imgs/empty_basket.png')}></Image>
      </View>
    );
  }

  return (
    <View
      style={styles.basketScreen}
      onLayout={event => setLayout(event.nativeEvent.layout)}>
      <FlatList
        data={productsInBasket}
        renderItem={({ item }) => (
          <BasketItem
            productData={item}
            layout={layout}
            navigation={navigation}
          />
        )}></FlatList>
      {layout.width > 1 && (
        <View
          style={{
            ...styles.bottomWrapper,
            width: layout.width - defaultScreenStyle.padding * 2,
          }}>
          <Text style={styles.bottomTotalPrice}>
            {'Итог: ' + totalPrice + 'р.'}
          </Text>
          <Button
            title="Оформить заказ"
            color={colors.secondColor}
            onPress={() => navigation.navigate('BasketOrder')}></Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyBasketText: {
    marginBottom: 20,
    color: colors.secondColor,
    fontSize: 24,
  },
  basketScreen: {
    ...defaultScreenStyle,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomWrapper: {
    borderTopWidth: 2,
    borderTopColor: colors.secondColor,
  },
  bottomTotalPrice: {
    marginBottom: 5,
    color: colors.secondColor,
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'flex-end',
  },
});
