import React from 'react';
import { StatusBar } from 'react-native';
import { colors } from './src/assets/style/_colors';
import { Navigation } from './src/navigation/Navigation';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.secondColor} />
      <Navigation />
    </Provider>
  );
}

export default App;
