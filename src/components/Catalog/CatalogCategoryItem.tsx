import React, {FC, useEffect} from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import { colors } from '../../assets/style/_colors';
import { ICategory, ISubCategory } from '../../types/ICatalog';

interface CatalogCategoryItem {
  data: ISubCategory | ICategory
}

export const CatalogCategoryItem: FC<CatalogCategoryItem> = ({data}) => {

  return (
    <View style={styles.catalogItem}>
        <Image source={{uri: `https://hobby-hall.onrender.com/${data.imgSrc}`, height: 150, width: 150}}/>
        <Text style={styles.text}>{data.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  catalogItem: {
    width: 150,
    height: 200,
    marginVertical: 10,
    borderColor: colors.secondColor,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    // alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    color: colors.secondColor,
    textAlign: 'center'
  }
});
