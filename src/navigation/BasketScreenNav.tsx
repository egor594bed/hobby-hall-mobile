import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BasketScreen } from '../screens/BasketScreen';
import { Test } from '../components/Test';
import { headerDefaultStyle } from '../assets/const/headerDefaultStyle';
import { IProduct } from '../types/ICatalog';
import { ProductDetail } from '../components/Catalog/ProductDetail';

export type BasketParamList = {
  BasketScreen: undefined;
  BasketOrder: undefined;
  ProductDetail: { name: string; productData: IProduct };
};

export const BasketScreenNav = () => {
  const Basket = createNativeStackNavigator<BasketParamList>();

  return (
    <Basket.Navigator>
      <Basket.Screen
        name="BasketScreen"
        component={BasketScreen}
        options={{
          ...headerDefaultStyle,
          title: 'Корзина',
        }}
      />
      <Basket.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({ route }) => ({
          ...headerDefaultStyle,
          title: route.params.name,
        })}
      />
      <Basket.Screen
        name="BasketOrder"
        component={Test}
        options={{
          ...headerDefaultStyle,
          title: 'Оформление заказа',
        }}
      />
    </Basket.Navigator>
  );
};
