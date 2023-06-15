import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../../assets/style/_colors';

const Loader = () => {
  return (
    <View style={styles.loader}>
      <Text>Загрузка...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    color: colors.secondColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  }
});

export default Loader
