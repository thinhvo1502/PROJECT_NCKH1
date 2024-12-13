/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import MainScreen from './src/screen/MainScreen';
import VisionCameraScreen from './src/screen/CameraScreen';
function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='MainScreen' component={MainScreen} />
        <Stack.Screen name='CameraScreen' component={VisionCameraScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App


