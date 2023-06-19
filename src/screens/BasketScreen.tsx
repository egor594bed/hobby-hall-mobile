import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

export const BasketScreen = () => {
  const test = useSelector((state: RootState) => state.basketSlice.basketItems);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Basket!</Text>
    </View>
  );
};
