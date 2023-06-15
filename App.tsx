import React from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import { colors } from './src/assets/style/_colors';
import { Navigation } from './src/screens/Navigation';


function App(): JSX.Element {

  return (
    <>
      <StatusBar backgroundColor={colors.secondColor}/>
      <Navigation/>
    </>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: colors.secondColor,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
