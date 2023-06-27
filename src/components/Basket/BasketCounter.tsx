import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../assets/style/_colors';

interface IBasketCounter {
  changeTotal(value: string): void;
  value: number | undefined;
}

export const BasketCounter: FC<IBasketCounter> = ({ changeTotal, value }) => {
  const inputChangeHandler = (value: string) => {
    if (Number(value) < 1) return;
    if (/^-?\d+\.?\d*$/.test(value)) {
      changeTotal(value);
    } else if (value === '') {
      changeTotal('0');
    }
  };

  return (
    <View style={styles.basketCounter}>
      <TouchableOpacity
        style={{ ...styles.buttons, ...styles.buttonDec }}
        onPress={() => inputChangeHandler(String(Number(value) - 1))}>
        <Text style={{ ...styles.insideButtons, fontSize: 20 }}>-</Text>
      </TouchableOpacity>
      <TextInput
        value={String(value)}
        onChangeText={text => inputChangeHandler(text)}
        keyboardType="numeric"
        style={styles.input}></TextInput>
      <TouchableOpacity
        style={{ ...styles.buttons, ...styles.buttonInc }}
        onPress={() => inputChangeHandler(String(Number(value) + 1))}>
        <Text style={styles.insideButtons}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  basketCounter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  buttons: {
    width: 30,
    height: 30,
    backgroundColor: colors.firstColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDec: {
    borderWidth: 1,
    borderRightWidth: 0,
    borderRadius: 10,
    borderTopEndRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonInc: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRadius: 10,
    borderTopStartRadius: 0,
    borderBottomLeftRadius: 0,
  },
  insideButtons: {
    color: colors.secondColor,
    fontSize: 16,
  },
  input: {
    padding: 0,
    paddingHorizontal: 10,
    height: 30,
    alignSelf: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.secondColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondColor,
    color: colors.secondColor,
    textAlign: 'center',
  },
});
