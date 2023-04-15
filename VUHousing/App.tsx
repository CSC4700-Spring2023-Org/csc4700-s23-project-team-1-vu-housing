/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Welcome from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Signup from './screens/Signup';
import HomeInfo from './screens/HomeInfo';
import AddListing from './screens/AddListing';
import FindListing from './screens/FindListing';
import ListingCreated from './screens/ListingCreated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator()

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name="ListingCreated" component={ListingCreated} options={{headerShown: false}}/>
        <Stack.Screen name="HomeInfo" component={HomeInfo} options={{headerShown: false}}/>
        <Stack.Screen name="AddListing" component={AddListing} options={{headerShown: false}}/>
        <Stack.Screen name="FindListing" component={FindListing} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}




