import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootState } from '../redux/store';
import { BasketParamList } from '../navigation/BasketScreenNav';
import { useHttp } from '../hooks/http.hook';
import { IProduct } from '../types/ICatalog';
import Loader from '../components/UI/Loader/Loader';
import { BasketItem } from '../components/Basket/BasketItem';
import { defaultScreenStyle } from '../assets/style/_defaultScreen';

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

  console.log('slice: ' + productsInBasket);
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

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
      {/* <Text>{totalValue}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  basketScreen: {
    ...defaultScreenStyle,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
