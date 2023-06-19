import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppDispatch, RootState } from '../../redux/store';
import { CatalogParamList } from '../../screens/CatalogScreenNav';
import Loader from '../UI/Loader/Loader';
import BasketService from '../../services/basket-service';
import { toggleBasketItem } from '../../redux/slices/basket';
import { colors } from '../../assets/style/_colors';
import { IProduct } from '../../types/ICatalog';

type CatalogScreenNavigationProp = NativeStackNavigationProp<
  CatalogParamList,
  'ProductDetail'
>;

type Props = {
  navigation: CatalogScreenNavigationProp;
  route: {
    params?: {
      productData: IProduct;
    };
  };
};
export const ProductDetail = ({ route, navigation }: Props) => {
  const [productData, setProductData] = useState<IProduct>();
  const inBasket = useSelector((state: RootState) => {
    if (!productData?._id) return false;
    return BasketService.inBasket(
      state.basketSlice.basketItems,
      productData?._id,
    );
  });
  const dispatch = useDispatch<AppDispatch>();

  const toggleBasketHendler = useCallback(async () => {
    if (productData?._id) {
      dispatch(toggleBasketItem(productData._id));
    }
  }, [productData]);

  useEffect(() => {
    if (route.params?.productData) setProductData(route.params.productData);
  }, [route.params?.productData]);

  if (!productData) {
    return <Loader />;
  }

  return (
    <ScrollView>
      <View style={styles.product}>
        <Image
          source={{
            uri: `https://hobby-hall.onrender.com/${productData.imgSrc}`,
          }}
          style={styles.image}></Image>
        <Text style={styles.title}>{productData.name}</Text>
        <View style={styles.productMiddleWrapper}>
          <Text style={styles.price}>{productData.price + 'р.'}</Text>
          <Button
            title={inBasket ? 'Удалить из корзины' : 'Добавить в корзину'}
            color={colors.secondColor}
            onPress={() => toggleBasketHendler()}
          />
        </View>
        <Text style={styles.description}>
          {productData.description || 'Нет описания'}
        </Text>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title="Назад"
          color={colors.secondColor}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  product: {
    padding: 10,
  },
  title: {
    marginBottom: 20,
    color: colors.secondColor,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  image: {
    width: undefined,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productMiddleWrapper: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    color: colors.secondColor,
    fontSize: 32,
    fontWeight: '700',
  },
  description: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    color: colors.secondColor,
    borderColor: colors.secondColor,
  },
});
