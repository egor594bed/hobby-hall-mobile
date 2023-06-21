import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../assets/style/_colors';
import { useHttp } from '../../hooks/http.hook';
import { IProduct } from '../../types/ICatalog';
import { CatalogProductItem } from '../Catalog/CatalogProductItem';
import Loader from '../UI/Loader/Loader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchParamList } from '../../screens/SearchScreenNav';

type SearchScreenNavigationProp = NativeStackNavigationProp<
  SearchParamList,
  'ProductDetail'
>;

type Props = {
  navigation: SearchScreenNavigationProp;
};

export const SearchScreen = ({ navigation }: Props) => {
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

      <View style={{ flex: 1 }}>
        {!searchedProductsList[0] ? (
          <View style={styles.contentWrapper}>
            {loading ? (
              <Loader></Loader>
            ) : (
              <Image
                source={require('../../assets/imgs/search_holder.png')}
                style={styles.image}
              />
            )}
          </View>
        ) : (
          <FlatList
            data={searchedProductsList}
            columnWrapperStyle={styles.searchedItemsList}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    name: item.name,
                    productData: item,
                  })
                }>
                <CatalogProductItem data={item} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchScreen: {
    flex: 1,
    padding: 10,
    paddingBottom: 0,
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
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
  },
});
