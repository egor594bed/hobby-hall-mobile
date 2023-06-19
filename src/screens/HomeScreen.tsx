import React from 'react';
import { View, ScrollView } from 'react-native';
import { HomeSlider } from '../components/Home/HomeSlider';

export const HomeScreen = () => {
  return (
    <ScrollView>
      <HomeSlider />
      <View></View>
    </ScrollView>
  );
};
