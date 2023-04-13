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
          <Text style={{textAlign: 'center', marginVertical: 20, fontFamily: 'AlNile-Bold', fontSize: 40}}>VUHousing</Text>
        <Button title='Login' 
        onPress={()=>navigation.navigate("LoginScreen")}></Button>
        <Button title='Sign Up' 
        onPress={()=>navigation.navigate("Signup")}></Button>
      </View>
    );
  }