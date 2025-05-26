import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from '../Screens/Home/home';
import Settings from '../Screens/Settings/settings';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default Navigation;
