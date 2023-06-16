import React from 'react';
import { StatusBar } from 'react-native';
import { colors } from './src/assets/style/_colors';
import { Navigation } from './src/screens/Navigation';

function App(): JSX.Element {
  return (
    <>
      <StatusBar backgroundColor={colors.secondColor} />
      <Navigation />
    </>
  );
}

export default App;
