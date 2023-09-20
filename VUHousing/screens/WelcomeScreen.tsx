import React, { useEffect, useRef, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  View,
  Dimensions,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
  Center
} from 'react-native/Libraries/NewAppScreen';
import { NativeBaseProvider, Text, Box, Input,Button,useToast } from "native-base";
import LoginScreen from './LoginScreen';




export default function WelcomeScreen({navigation}) {


    return (

      <NativeBaseProvider>
        
         <Box flex={1} bg="#ffffff" alignItems="center">
          <Box marginTop="20"  width="75%" alignItems="center">
          <Text fontSize="4xl" bold>Nova House</Text>
        </Box>
          <View id="LogoBand" style={{backgroundColor:'#0085FF',width:Dimensions.get('screen').width,alignItems:'center',marginTop:50}}>
         <Image
         style={{height:125,width:125}}
         source = {require('VUHousing/images/Logo.png')}
         />
        </View>
        
        <Button onPress={()=>navigation.navigate("LoginScreen")} bgColor="#001F58" margin="5" size="lg" w="200" h="75" borderRadius="5">Login</Button>
        <Box marginTop="1"  width="75%" alignItems="center">
          <Text fontSize="lg" color="#C0C0C0" italic>Don't have an account yet?</Text>
        </Box>
        <Button onPress={()=>navigation.navigate("Signup")} bgColor="#001F58" margin="5" size="lg" w="200" h="75" borderRadius="5">Sign Up</Button>
      </Box>
      </NativeBaseProvider>
     
    );
  }