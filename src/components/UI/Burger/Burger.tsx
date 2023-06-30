import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../assets/style/_colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { toggleBurger } from '../../../redux/slices/catalog';

export const Burger = () => {
  const isOpen = useSelector(
    (state: RootState) => state.catalogSlice.burgerState,
  );
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
