import React, { FC } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { colors } from '../../assets/style/_colors';
import { ICategory, ISubCategory } from '../../types/ICatalog';

interface CatalogCategoryItem {
  data: ISubCategory | ICategory;
}

export const CatalogCategoryItem: FC<CatalogCategoryItem> = ({ data }) => {
  return (
    <View style={styles.catalogItem}>
      <Image
        source={{
          uri: `https://hobby-hall.onrender.com/${data.imgSrc}`,
          height: 140,
          width: 140,
        }}
      />
      {/* <Text style={styles.text}>{data.name}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  catalogItem: {
    width: 150,
    // height: 230,
    paddingHorizontal: 2,
    paddingBottom: 5,
    marginVertical: 10,
    borderColor: colors.secondColor,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    color: colors.secondColor,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
