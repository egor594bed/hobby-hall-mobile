import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, FlatList, View } from 'react-native';
import { useHttp } from '../../hooks/http.hook';
import { IProduct } from '../../types/ICatalog';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CatalogParamList } from '../../navigation/CatalogScreenNav';
import { CatalogProductItem } from './CatalogProductItem';
import Loader from '../UI/Loader/Loader';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  FilterTypes,
  filterMethodList,
} from '../../assets/const/filterMethodList';
import { FilterItem } from '../UI/Filter/FilterItem';
import catalogSortService from '../../services/sort/catalog-sort-service';
import { colors } from '../../assets/style/_colors';

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
  const filterIsOpen = useSelector(
    (state: RootState) => state.catalogSlice.filterState,
  );

  const offset = useSharedValue(-100);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: withTiming(`${offset.value}%`),
    };
  });

  const filterHandler = useCallback((method: FilterTypes) => {
    //ДОДЕЛАТЬ ФИЛЬТР
    console.log(method);
  }, []);

  useEffect(() => {
    if (!filterIsOpen) offset.value = -100;
    else offset.value = 0;
  }, [filterIsOpen]);

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
    <>
      <Animated.View style={[styles.filterWrapper, animatedStyles]}>
        <FlatList
          data={filterMethodList}
          renderItem={({ item }) => (
            <FilterItem item={item} filterHandler={filterHandler} />
          )}></FlatList>
      </Animated.View>
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
    </>
  );
};

const styles = StyleSheet.create({
  columnWrapperStyle: {
    flex: 1,
    justifyContent: 'space-around',
  },
  filterWrapper: {
    backgroundColor: colors.secondColor,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
  },
});
