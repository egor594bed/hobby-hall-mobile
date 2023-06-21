import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../assets/style/_colors';
import { HomeHeader } from '../components/Header/HomeHeader';
import { HomeScreen } from './HomeScreen';
import { BasketScreen } from './BasketScreen';
import { CatalogScreenNav } from './CatalogScreenNav';
import { headerDefaultStyle } from '../assets/const/headerDefaultStyle';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getBasketItems } from '../redux/slices/basket';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BasketService from '../services/basket-service';
import { SearchScreenNav } from './SearchScreenNav';

export const Navigation = () => {
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const basketItemsCounter = useSelector(
    (state: RootState) => state.basketSlice.basketItems.length,
  );
  const basketItems = useSelector(
    (state: RootState) => state.basketSlice.basketItems,
  );
  const updatedFromLocalStorage = useSelector(
    (state: RootState) => state.basketSlice.updatedFromLocalStorage,
  );

  useEffect(() => {
    dispatch(getBasketItems());
  }, []);

  //ПРОВЕРИТЬ БУДЕТ ЛИ РАБОТАТЬ ПРИ СМНЕНЕ ТОТАЛА
  useEffect(() => {
    if (updatedFromLocalStorage) BasketService.saveToAsyncStorage(basketItems);
  }, [updatedFromLocalStorage, basketItems]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'null';
            color = colors.firstColor;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Basket') {
              iconName = focused ? 'basket' : 'basket-outline';
            } else if (route.name === 'CatalogNav') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.firstColor,
          tabBarInactiveTintColor: colors.firstColor,
          tabBarStyle: {
            paddingBottom: 5,
            backgroundColor: colors.secondColor,
            borderTopStartRadius: 10,
            borderTopRightRadius: 10,
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <HomeHeader />,
            headerStyle: {
              backgroundColor: colors.secondColor,
            },
            headerTitleAlign: 'center',
            tabBarLabel: 'Главная',
          }}
        />
        <Tab.Screen
          name="CatalogNav"
          component={CatalogScreenNav}
          options={{
            headerShown: false,
            tabBarLabel: 'Каталог',
          }}
        />
        <Tab.Screen
          name="Basket"
          component={BasketScreen}
          options={{
            ...headerDefaultStyle,
            tabBarBadge:
              basketItemsCounter > 0 ? basketItemsCounter : undefined,
            tabBarBadgeStyle: {
              backgroundColor: colors.firstColor,
              color: colors.secondColor,
            },
            tabBarLabel: 'Корзина',
            headerTitle: 'Корзина',
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreenNav}
          options={{
            ...headerDefaultStyle,
            tabBarBadgeStyle: {
              backgroundColor: colors.firstColor,
              color: colors.secondColor,
            },
            tabBarLabel: 'Поиск',
            headerTitle: 'Поиск',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
