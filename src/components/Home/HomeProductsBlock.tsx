import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IProduct } from '../../types/ICatalog';
import { CatalogProductItem } from '../Catalog/CatalogProductItem';
import { colors } from '../../assets/style/_colors';

interface IHomeProductsBlock {
  products: IProduct[];
  title: string;
  direction: string;
}

export const HomeProductsBlock: FC<IHomeProductsBlock> = ({
  products,
  title,
  direction,
}) => {
  return (
    <View
      style={
        direction === 'rigth'
          ? [styles.block]
          : [styles.block, leftDirection.block]
      }>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.wrapper}>
        {products.map(productData => {
          return <CatalogProductItem data={productData} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    marginLeft: 20,
    marginTop: 10,
    padding: 20,
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 10,
    borderColor: colors.secondColor,
    elevation: 5,
    backgroundColor: colors.firstColor,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: colors.secondColor,
  },
});

const leftDirection = StyleSheet.create({
  block: {
    marginLeft: 0,
    marginRight: 20,
    padding: 20,
    borderRightWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
