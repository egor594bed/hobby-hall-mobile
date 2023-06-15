import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../assets/style/_colors';
import { HomeHeader } from '../components/Header/HomeHeader';
import { HomeScreen } from './HomeScreen';
import { BasketSkreen } from './BasketScreen';
import { CatalogScreenNav } from './CatalogScreenNav';

export const Navigation = () => {
    const Tab = createBottomTabNavigator();
  return (
  <NavigationContainer>
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName = 'null'
        color = colors.firstColor
        if(route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline'
        }
        else if (route.name === 'Basket') {
          iconName = focused ? 'basket' : 'basket-outline'
        }
        else if (route.name === 'CatalogNav') {
          iconName = focused ? 'list' : 'list-outline'
        }
      return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.firstColor,
      tabBarInactiveTintColor: colors.firstColor,
      tabBarStyle: {
        backgroundColor: colors.secondColor,
        borderTopStartRadius: 10,
        borderTopRightRadius: 10,

      }
    })}>
      <Tab.Screen name="CatalogNav" component={CatalogScreenNav} options={{
        headerShown: false,
        tabBarLabel: 'Каталог'
      }}/>
      <Tab.Screen name="Home" component={HomeScreen} options={{ 
        headerTitle: () => <HomeHeader/>,
        headerStyle: {
          backgroundColor: colors.secondColor,
        },
        headerTitleAlign: 'center',
        tabBarLabel: 'Главная'
        }}/>
      <Tab.Screen name="Basket" component={BasketSkreen} options={{
        headerStyle: {
          backgroundColor: colors.secondColor,
        },
        headerTintColor: colors.firstColor,
        headerTitleAlign: 'center',
        tabBarLabel: 'Корзина',
        headerTitle: 'Корзина'
      }}/>
    </Tab.Navigator>
  </NavigationContainer>
  )
}