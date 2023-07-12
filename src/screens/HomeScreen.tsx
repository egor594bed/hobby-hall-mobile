import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { HomeSlider } from '../components/Home/HomeSlider';
import { useHttp } from '../hooks/http.hook';
import { IProduct } from '../types/ICatalog';
import Loader from '../components/UI/Loader/Loader';
import { HomeProductsBlock } from '../components/Home/HomeProductsBlock';

export const HomeScreen = () => {
  const { request, loading } = useHttp();
  const [recommendedProductList, setRecommendedProductList] =
    useState<IProduct[]>();

  // useEffect(() => {
  //   request(
  //     'https://hobby-hall.onrender.com/api/catalog/getRecommendedItems',
  //   ).then(products => setRecommendedProductList(products.goodsArr));
  // }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView>
      <HomeSlider />
      {!recommendedProductList ? (
        <></>
      ) : (
        <>
          <HomeProductsBlock
            products={recommendedProductList}
            title={'Рекомендуемые товары'}
            direction="rigth"></HomeProductsBlock>
          <HomeProductsBlock
            products={recommendedProductList}
            title={'Скидки'}
            direction="left"></HomeProductsBlock>
        </>
      )}
    </ScrollView>
  );
};
