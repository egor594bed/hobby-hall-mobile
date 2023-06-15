import React, {useEffect, useState} from 'react'
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'
import { useHttp } from '../../hooks/http.hook'
import { IProduct } from '../../types/ICatalog'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CatalogParamList } from '../../screens/CatalogScreenNav';
import { CatalogCategoryItem } from './CatalogCategoryItem';

type CatalogScreenNavigationProp = NativeStackNavigationProp<
  CatalogParamList,
  'Products'
>;

type Props = {
  navigation: CatalogScreenNavigationProp
  route: {
    params?:{
        subCategoryId?: string
    }
  }
}

export const CatalogProductScreen = ({navigation, route}: Props) => {
    const {request, loading} = useHttp()
    const [productList, setProducList] = useState<IProduct[]>()

  useEffect(() => {
    if(route.params?.subCategoryId) {
        request(`https://hobby-hall.onrender.com/api/catalog/getGoodsFromId?id=${route.params.subCategoryId}`, 'GET')
        .then((data => setProducList(data.goodsArr)))
    }
  }, [route.params?.subCategoryId])
  return (
    <FlatList
    columnWrapperStyle ={styles.columnWrapperStyle}
    numColumns={2}
    data={productList}
    renderItem={(({item}) => {
      return (
        <TouchableOpacity
        onPress={() => navigation.navigate('DetailProduct', {productData: item})}
        >
            {/* ДРУГОЙ ЭЛЕМЕНТ */}
          <CatalogCategoryItem data={item}></CatalogCategoryItem>
        </TouchableOpacity>
      )
    })}/>
  )
}

const styles = StyleSheet.create({
    columnWrapperStyle: {
      flex: 1,
      justifyContent:"space-around",
    },
  });