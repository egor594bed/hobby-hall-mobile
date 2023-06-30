import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../assets/style/_colors';
import { useDispatch } from 'react-redux';
import { toggleBurger } from '../../../redux/slices/catalog';

export const Burger = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Ionicons
        name="reorder-three-outline"
        color={colors.firstColor}
        size={50}
        onPress={() => dispatch(toggleBurger())}
      />
    </>
  );
};
