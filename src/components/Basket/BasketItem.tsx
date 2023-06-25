import React, { FC, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { IProduct } from '../../types/ICatalog';
import { defaultScreenStyle } from '../../assets/style/_defaultScreen';
import { colors } from '../../assets/style/_colors';
import { useDispatch } from 'react-redux';
import {
  changeBasketItemTotal,
  removeBasketItem,
} from '../../redux/slices/basket';
import { BasketParamList } from '../../navigation/BasketScreenNav';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BasketCounter } from './BasketCounter';

type BasketScreenNavigationProp = NativeStackNavigationProp<
  BasketParamList,
  'BasketOrder'
>;

interface IBasketItem {
  productData: IProduct;
  layout: { width: number; height: number };
  navigation: BasketScreenNavigationProp;
}

export const BasketItem: FC<IBasketItem> = ({
  productData,
  layout,
  navigation,
}) => {
  const dispatch = useDispatch();
  const deleteItemFromBasket = () => {
    dispatch(removeBasketItem(productData._id));
  };

  const changeTotal = (value: string) => {
    dispatch(
      changeBasketItemTotal({ id: productData._id, total: Number(value) }),
    );
  };

  useEffect(() => {
    console.log(productData);
  }, [productData.total]);

  if (layout.width < 1) {
    return <></>;
  }

  return (
    <View
      style={{
        width: layout.width - defaultScreenStyle.padding * 2 - 4,
        ...styles.basketItem,
      }}>
      <View style={styles.basketItemWrapper}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetail', {
              name: productData.name,
              productData: productData,
            })
          }>
          <Image
            style={styles.image}
            source={{
              uri: `https://hobby-hall.onrender.com/${productData.imgSrc}`,
            }}
          />
        </TouchableOpacity>

        <View style={styles.contentWrapper}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>{productData.name}</Text>
            <TouchableOpacity onPress={deleteItemFromBasket}>
              <Image
                style={styles.close}
                source={require('../../assets/imgs/close.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomWrapper}>
            <BasketCounter
              changeTotal={changeTotal}
              value={productData.total}
            />
            <Text style={styles.price}>{productData.price + 'p.'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  basketItem: {
    marginHorizontal: 2,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  basketItemWrapper: {
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    color: colors.secondColor,
    fontWeight: '700',
  },
  price: {
    color: colors.secondColor,
    fontSize: 20,
    fontWeight: '700',
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  close: {
    width: 20,
    height: 20,
  },
});
