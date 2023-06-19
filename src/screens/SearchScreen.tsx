import React, { useState, useRef, useCallback } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text } from 'react-native';
import { colors } from '../assets/style/_colors';
import { useHttp } from '../hooks/http.hook';
import { IProduct } from '../types/ICatalog';
import { CatalogProductItem } from '../components/Catalog/CatalogProductItem';
import Loader from '../components/UI/Loader/Loader';

export const SearchScreen = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchedProductsList, setSearchedProductsList] = useState<
    IProduct[] | []
  >([]);
  const { request, loading } = useHttp();
  const searchDelay = useRef<number | null>(null);

  const searchHandler = (value: string) => {
    setSearchValue(value);
    getSearchedProducts(value);
  };

  const getSearchedProducts = useCallback(
    (value: string) => {
      if (value.length == 0) {
        setSearchedProductsList([]);
        if (searchDelay.current) clearTimeout(searchDelay.current);
      } else {
        if (value.length < 3) return;
        if (searchDelay.current) clearTimeout(searchDelay.current);
        searchDelay.current = setTimeout(() => {
          request(
            `https://hobby-hall.onrender.com/api/catalog/getGoodsFromSearch?search=${value}`,
          ).then(res => {
            setSearchedProductsList([...res.goodsArr]);
          });
        }, 1000);
      }
    },
    [searchDelay],
  );

  return (
    <View style={styles.searchScreen}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={searchValue}
          onChangeText={value => searchHandler(value)}
          placeholder="Поиск"
          placeholderTextColor={colors.secondColor}
        />
      </View>

      <View>
        {!searchedProductsList[0] ? (
          loading ? (
            <Loader></Loader>
          ) : (
            <Text>Начните поиск</Text>
          )
        ) : (
          <FlatList
            data={searchedProductsList}
            columnWrapperStyle={styles.searchedItemsList}
            numColumns={2}
            renderItem={productData => (
              <CatalogProductItem data={productData.item} />
            )}></FlatList>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchScreen: {
    padding: 10,
  },
  inputWrapper: {
    paddingBottom: 10,
  },
  input: {
    paddingHorizontal: 20,
    color: colors.secondColor,
    borderColor: colors.secondColor,
    borderWidth: 1,
    borderRadius: 10,
  },
  searchedItemsList: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
