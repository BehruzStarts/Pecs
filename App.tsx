import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import HomeScreen from './src/screens/HomeScreen';
import StackNavigator from './src/navigation/StackNavigator';
import {StatusBar} from 'react-native';
import colors from './src/config/colors';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primary} />
      <StackNavigator />
      {/* <HomeScreen /> */}
    </NavigationContainer>
  );
}
