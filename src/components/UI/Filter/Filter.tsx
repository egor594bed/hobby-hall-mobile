import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../assets/style/_colors';
import { useDispatch } from 'react-redux';
import { toggleFilter } from '../../../redux/slices/catalog';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Ionicons
        name="filter-outline"
        color={colors.firstColor}
        size={30}
        onPress={() => dispatch(toggleFilter())}
      />
    </>
  );
};
