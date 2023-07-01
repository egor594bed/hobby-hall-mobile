import React, { FC } from 'react';
import {
  FilterTypeObj,
  FilterTypes,
} from '../../../assets/const/filterMethodList';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../../assets/style/_colors';

interface IFilterItem {
  item: FilterTypeObj;
  filterHandler: (method: FilterTypes) => void;
}

export const FilterItem: FC<IFilterItem> = ({ item, filterHandler }) => {
  return (
    <TouchableOpacity onPress={() => filterHandler(item.method)}>
      <Text style={styles.filterItem}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterItem: {
    paddingVertical: 10,
    textAlign: 'center',
    color: colors.firstColor,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.firstColor,
  },
});
