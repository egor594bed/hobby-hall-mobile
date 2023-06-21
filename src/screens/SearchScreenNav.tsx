import React from 'react';
import { IProduct } from '../types/ICatalog';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductDetail } from '../components/Catalog/ProductDetail';
import { headerDefaultStyle } from '../assets/const/headerDefaultStyle';
import { SearchScreen } from '../components/Search/SearchScreen';

export type SearchParamList = {
  Search: undefined;
  ProductDetail: { name: string; productData: IProduct };
};

export const SearchScreenNav = () => {
  const Search = createNativeStackNavigator<SearchParamList>();

  return (
    <NavigationContainer independent>
      <Search.Navigator>
        <Search.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false,
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
    </NavigationContainer>
  );
};
