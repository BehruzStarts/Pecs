import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import routes from './routes';
import HomeScreen from '../screens/HomeScreen';
import EditScreen from '../screens/EditScreen';
import SettingsScreen from '../screens/SettingsScreen';

const {Navigator, Screen} = createStackNavigator();

export default function StackNavigator() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={routes.HOME_SCREEN} component={HomeScreen} />
      <Screen name={routes.EDIT_SCREEN} component={EditScreen} />
      <Screen name={routes.SETTINGS_SCREEN} component={SettingsScreen} />
    </Navigator>
  );
}
