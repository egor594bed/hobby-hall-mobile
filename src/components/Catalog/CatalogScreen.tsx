import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'
import { CatalogCategoryItem } from './CatalogCategoryItem'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CatalogParamList } from '../../screens/CatalogScreenNav';
import { useHttp } from '../../hooks/http.hook';
import { ICategory, ISubCategory } from '../../types/ICatalog';
import Loader from '../UI/Loader/Loader';
import { colors } from '../../assets/style/_colors';
import { CatalogProductItem } from './CatalogProductItem';

type CatalogScreenNavigationProp = NativeStackNavigationProp<
  CatalogParamList,
  'SubCategories'
>;

type Props = {
  navigation: CatalogScreenNavigationProp
  route: {
    params?:{
      subCategories?: ISubCategory[]
    }
  }
}

export const CatalogScreen = ({navigation, route}: Props) => {
  const {request, loading} = useHttp()
  const [catalogList, setCatalogList] = useState<ICategory[] | ISubCategory[]>()


  if(route.params?.subCategories) {
    useEffect(() => {
      setCatalogList(route.params?.subCategories)
    }, [route.params?.subCategories])
  }else {
    useEffect(() => {
      try {
        request('https://hobby-hall.onrender.com/api/catalog/getCatalog', 'GET')
        .then((data => setCatalogList(data.catalog)))
    } catch (error) {}
    }, [])
  }
  console.log(catalogList)
  if(loading) {
    return (
      <Loader></Loader>
    )
  }

  if(catalogList === undefined || catalogList === null) {
    return <Text>Каталог пустой</Text>
  }

  return (
    <FlatList
    columnWrapperStyle ={styles.columnWrapperStyle}
    numColumns={2}

    data={catalogList}
    renderItem={(({item}) => {
      return (
        <TouchableOpacity
        onPress={() => (item.subCategories) 
          ? navigation.navigate('SubCategories', {subCategories: item.subCategories})
          : navigation.navigate('Products', {subCategoryId: item._id})}
        >
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

