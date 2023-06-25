import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useHttp } from '../../hooks/http.hook';
import { IProduct } from '../../types/ICatalog';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CatalogParamList } from '../../navigation/CatalogScreenNav';
import { CatalogProductItem } from './CatalogProductItem';
import Loader from '../UI/Loader/Loader';

type CatalogScreenNavigationProp = NativeStackNavigationProp<
  CatalogParamList,
  'Products'
>;

type Props = {
  navigation: CatalogScreenNavigationProp;
  route: {
    params?: {
      subCategoryId?: string;
    };
  };
};

export const CatalogProductListScreen = ({ navigation, route }: Props) => {
  const { request, loading } = useHttp();
  const [productList, setProducList] = useState<IProduct[]>();

  useEffect(() => {
    if (route.params?.subCategoryId) {
      request(
        `https://hobby-hall.onrender.com/api/catalog/getGoodsFromId?id=${route.params.subCategoryId}`,
        'GET',
      ).then(data => setProducList(data.goodsArr));
    }
  }, [route.params?.subCategoryId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <FlatList
      columnWrapperStyle={styles.columnWrapperStyle}
      numColumns={2}
      data={productList}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetail', {
                name: item.name,
                productData: item,
              })
            }>
            <CatalogProductItem data={item}></CatalogProductItem>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  columnWrapperStyle: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
