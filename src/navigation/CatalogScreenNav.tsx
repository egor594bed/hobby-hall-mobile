import React from 'react';
import { IProduct, ISubCategory } from '../types/ICatalog';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CatalogScreen } from '../screens/CatalogScreen';
import { CatalogProductListScreen } from '../components/Catalog/CatalogProductListScreen';
import { ProductDetail } from '../components/Catalog/ProductDetail';
import { headerDefaultStyle } from '../assets/const/headerDefaultStyle';

export type CatalogParamList = {
  CatalogScreen: undefined;
  SubCategories: { parentName: string; subCategories: ISubCategory[] };
  Products: { parentName: string; subCategoryId: string };
  ProductDetail: { name: string; productData: IProduct };
};

export const CatalogScreenNav = () => {
  const Catalog = createNativeStackNavigator<CatalogParamList>();

  return (
    <Catalog.Navigator>
      <Catalog.Screen
        name="CatalogScreen"
        component={CatalogScreen}
        options={{
          ...headerDefaultStyle,
          headerTitle: 'Каталог',
        }}
      />
      <Catalog.Screen
        name="SubCategories"
        component={CatalogScreen}
        options={({ route }) => ({
          ...headerDefaultStyle,
          title: route.params.parentName,
        })}
      />
      <Catalog.Screen
        name="Products"
        component={CatalogProductListScreen}
        options={({ route }) => ({
          ...headerDefaultStyle,
          title: route.params.parentName,
        })}
      />
      <Catalog.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({ route }) => ({
          ...headerDefaultStyle,
          title: route.params.name,
        })}
      />
    </Catalog.Navigator>
  );
};
