import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { colors } from '../../assets/style/_colors';

//ПЕРЕДЕЛАТЬ

export const HomeSlider = () => {
  return (
    <Swiper
      style={styles.wrapper}
      autoplay={true}
      autoplayTimeout={5}
      paginationStyle={{ bottom: 5 }}
      dotColor={colors.firstColor}
      activeDotColor={colors.secondColor}>
      <View style={styles.slide}>
        <Image
          source={require('../../assets/imgs/_swiper-test1.jpg')}
          style={styles.Image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.slide}>
        <Image
          source={require('../../assets/imgs/_swiper-test2.jpg')}
          style={styles.Image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.slide}>
        <Image
          source={require('../../assets/imgs/_swiper-test3.jpg')}
          style={styles.Image}
          resizeMode="contain"
        />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 98,
  },
  slide: {
    flex: 1,
    backgroundColor: colors.firstColor,
  },
  Image: {
    width: undefined,
    flex: 1,
  },
});
