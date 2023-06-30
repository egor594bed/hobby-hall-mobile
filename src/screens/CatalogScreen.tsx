import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { CatalogCategoryItem } from '../components/Catalog/CatalogCategoryItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CatalogParamList } from '../navigation/CatalogScreenNav';
import { useHttp } from '../hooks/http.hook';
import { ICategory, ISubCategory } from '../types/ICatalog';
import Loader from '../components/UI/Loader/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../assets/style/_colors';
import { CatalogBurgerItem } from '../components/Catalog/CatalogBurgerItem';

type CatalogScreenNavigationProp = NativeStackNavigationProp<
  CatalogParamList,
  'SubCategories'
>;

type Props = {
  navigation: CatalogScreenNavigationProp;
  route: {
    params?: {
      subCategories?: ISubCategory[];
    };
  };
};

export const CatalogScreen = ({ navigation, route }: Props) => {
  const { request, loading } = useHttp();
  const [catalogList, setCatalogList] = useState<
    ICategory[] | ISubCategory[]
  >();
  const burgerIsOpen = useSelector(
    (state: RootState) => state.catalogSlice.burgerState,
  );
  const offset = useSharedValue(-100);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      left: withTiming(`${offset.value}%`),
    };
  });

  useEffect(() => {
    if (!burgerIsOpen) offset.value = 0;
    else offset.value = -100;
  }, [burgerIsOpen]);

  if (route.params?.subCategories) {
    useEffect(() => {
      setCatalogList(route.params?.subCategories);
    }, [route.params?.subCategories]);
  } else {
    useEffect(() => {
      try {
        request(
          'https://hobby-hall.onrender.com/api/catalog/getCatalog',
          'GET',
        ).then(data => setCatalogList(data.catalog));
      } catch (error) {}
    }, []);
  }

  if (loading) {
    return <Loader></Loader>;
  }

  if (catalogList === undefined) {
    return <Text>Каталог пустой</Text>;
  }

  return (
    <>
      <Animated.View style={[styles.burger, animatedStyles]}>
        <FlatList
          data={catalogList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={item._id}
                onPress={() =>
                  item.subCategories
                    ? navigation.navigate('SubCategories', {
                        parentName: item.name,
                        subCategories: item.subCategories,
                      })
                    : navigation.navigate('Products', {
                        parentName: item.name,
                        subCategoryId: item._id,
                      })
                }>
                <CatalogBurgerItem text={item.name} />
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>

      <FlatList
        columnWrapperStyle={styles.columnWrapperStyle}
        numColumns={2}
        data={catalogList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              key={`catalogItem${item._id}`}
              onPress={() =>
                item.subCategories
                  ? navigation.navigate('SubCategories', {
                      parentName: item.name,
                      subCategories: item.subCategories,
                    })
                  : navigation.navigate('Products', {
                      parentName: item.name,
                      subCategoryId: item._id,
                    })
              }>
              <CatalogCategoryItem data={item}></CatalogCategoryItem>
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
  burger: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.secondColor,
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
});
