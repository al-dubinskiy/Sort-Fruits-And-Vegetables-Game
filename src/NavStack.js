import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen/SplashScreen';
import GameScreen from './screens/GameScreen/GameScreen';

const Stack = createNativeStackNavigator();

export function NavStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="GameScreen" component={GameScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}