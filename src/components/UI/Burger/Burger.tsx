import React, { useEffect } from 'react';
import { colors } from '../../../assets/style/_colors';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { toggleBurger } from '../../../redux/slices/catalog';
import { RootState } from '../../../redux/store';

export const Burger = () => {
  const dispatch = useDispatch();
  const burgerIsOpen = useSelector(
    (state: RootState) => state.catalogSlice.burgerState,
  );
  const rotate = useSharedValue('0deg');
  const translate = useSharedValue(0);
  const opacity = useSharedValue(1);

  const topSliceAnimatedStyles = useAnimatedStyle<any>(() => {
    return {
      transform: [
        { rotate: withSpring(rotate.value) },
        { translateY: withSpring(translate.value) },
      ],
    };
  });
  const centerSliceAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withSpring(opacity.value),
    };
  });
  const bottomSliceAnimatedStyles = useAnimatedStyle<any>(() => {
    return {
      transform: [
        { rotate: withSpring('-' + rotate.value) },
        { translateY: withSpring(Number('-' + translate.value)) },
      ],
    };
  });

  useEffect(() => {
    if (burgerIsOpen) {
      rotate.value = '45deg';
      opacity.value = 0;
      translate.value = 11;
    } else {
      rotate.value = '0deg';
      opacity.value = 1;
      translate.value = 0;
    }
  }, [burgerIsOpen]);

  return (
    <TouchableWithoutFeedback onPress={() => dispatch(toggleBurger())}>
      <View style={styles.burder}>
        <Animated.View style={[styles.burderSlice, topSliceAnimatedStyles]} />
        <Animated.View
          style={[styles.burderSlice, centerSliceAnimatedStyles]}
        />
        <Animated.View
          style={[styles.burderSlice, bottomSliceAnimatedStyles]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  burder: {
    flexDirection: 'column',
    gap: 5,
  },
  burderSlice: {
    width: 40,
    height: 3,
    backgroundColor: colors.firstColor,
  },
});
