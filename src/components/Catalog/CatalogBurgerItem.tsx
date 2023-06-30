import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../../assets/style/_colors';

interface ICatalogBurgerItem {
  text: string;
}

export const CatalogBurgerItem: FC<ICatalogBurgerItem> = ({ text }) => {
  return <Text style={styles.burgerItem}>{text}</Text>;
};

const styles = StyleSheet.create({
  burgerItem: {
    paddingVertical: 10,
    textAlign: 'center',
    color: colors.firstColor,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.firstColor,
  },
});
