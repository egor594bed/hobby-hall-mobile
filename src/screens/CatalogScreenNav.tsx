import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import { useHttp } from '../hooks/http.hook'
import { ICategory, IProduct, ISubCategory } from '../types/ICatalog'
import Loader from '../components/UI/Loader/Loader'
import { CatalogCategoryItem } from '../components/Catalog/CatalogCategoryItem'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Test } from '../components/Test'
import { CatalogScreen } from '../components/Catalog/CatalogScreen'
import { colors } from '../assets/style/_colors'
import { CatalogProductScreen } from '../components/Catalog/CatalogProductScreen'

export type CatalogParamList = {
  Catalog: undefined,
  SubCategories: { subCategories: ISubCategory[] },
  Products: {subCategoryId: string}
  DetailProduct: { productData: IProduct }
}

export const CatalogScreenNav = () => {
  const Catalog = createNativeStackNavigator<CatalogParamList>()

  return (
  <NavigationContainer independent={true}>
    <Catalog.Navigator>
      <Catalog.Screen name="Catalog" component={CatalogScreen} options={{        
        headerStyle: {
          backgroundColor: colors.secondColor,
        },
        headerTintColor: colors.firstColor,
        headerTitleAlign: 'center',
        headerTitle: 'Каталог'
      }}/>
      <Catalog.Screen name="SubCategories" component={CatalogScreen} options={{
        headerStyle: {
          backgroundColor: colors.secondColor,
        },
        headerTintColor: colors.firstColor,
        headerTitleAlign: 'center',
        headerTitle: 'Подкатегория'
      }}/>
      <Catalog.Screen name="Products" component={CatalogProductScreen} options={{
        headerStyle: {
          backgroundColor: colors.secondColor,
        },
        headerTintColor: colors.firstColor,
        headerTitleAlign: 'center',
        headerTitle: 'Товары'
      }}/>
      <Catalog.Screen name="DetailProduct" component={Test} />
    </Catalog.Navigator>
  </NavigationContainer>
  )
}
