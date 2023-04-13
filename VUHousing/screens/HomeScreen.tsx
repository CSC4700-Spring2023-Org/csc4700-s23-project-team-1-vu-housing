import React from 'react';
import type {PropsWithChildren} from 'react';
import {
    Button,
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




export default function HomeScreen({navigation}) {

    return (
      <View>
          
          <Text style={{textAlign: 'center', marginVertical: 20, fontFamily: 'AlNile-Bold', fontSize: 40}}>Welcome to Nova House!</Text>
          <Text style={{textAlign: 'center', marginVertical: 20, fontFamily: 'AlNile', fontSize: 20}}>Click ‘Search Houses” to start looking for a house or apartment</Text>
          <Text style={{textAlign: 'center', marginVertical: 20, fontFamily: 'AlNile', fontSize: 20}}>Click “Create Listing” to enter information about the place you live in</Text>
        <Button title='Search Houses' 
        onPress={()=>navigation.navigate("FindListing")}></Button>
        <Button title='Create Listing' 
        onPress={()=>navigation.navigate("AddListing")}></Button>
      </View>
    );
  }