import React from 'react';
import { IProduct } from '../types/ICatalog';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductDetail } from '../components/Catalog/ProductDetail';
import { headerDefaultStyle } from '../assets/const/headerDefaultStyle';
import { SearchScreen } from '../screens/SearchScreen';

export type SearchParamList = {
  SearchScreen: undefined;
  ProductDetail: { name: string; productData: IProduct };
};

export const SearchScreenNav = () => {
  const Search = createNativeStackNavigator<SearchParamList>();

  return (
    <Search.Navigator>
      <Search.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          ...headerDefaultStyle,
          headerTitle: 'Поиск',
        }}
      />
      <Search.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({ route }) => ({
          ...headerDefaultStyle,
          title: route.params.name,
        })}
      />
    </Search.Navigator>
  );
};
