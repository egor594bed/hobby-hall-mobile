import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { IProduct } from '../../types/ICatalog';
import { colors } from '../../assets/style/_colors';
import textCutter from '../../utils/textCutter';

interface IProductItem {
  data: IProduct;
}

export const CatalogProductItem: FC<IProductItem> = ({ data }) => {
  return (
    <View style={styles.productItem}>
      <Image
        source={{
          uri: `https://hobby-hall.onrender.com/${data.imgSrc}`,
          height: 150,
          width: 150,
        }}></Image>
      <Text style={styles.text}>{textCutter(data.name, 55)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    width: 150,
    height: 230,
    marginVertical: 10,
    borderColor: colors.secondColor,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  text: {
    flex: 1,
    color: colors.secondColor,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
