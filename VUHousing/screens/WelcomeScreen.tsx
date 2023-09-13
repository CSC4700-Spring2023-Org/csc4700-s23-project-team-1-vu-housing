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
          <View id="LogoBand" style={{backgroundColor:'#0085FF',width:Dimensions.get('screen').width,alignItems:'center',marginTop:150}}>
         <Image
         style={{height:125,width:125}}
         source = {require('VUHousing/images/Logo.png')}
         />
        </View>
        <Text style={{fontFamily:"AlNile-Bold",fontSize:50,color:"#001F58"}}>Nova House</Text>
        <Button onPress={()=>navigation.navigate("LoginScreen")} bgColor="#001F58" margin="5" size="lg" w="200" h="75" borderRadius="5">Login</Button>
        <Button onPress={()=>navigation.navigate("Signup")} bgColor="#001F58" margin="5" size="lg" w="200" h="75" borderRadius="5">Sign Up</Button>
      </Box>
      </NativeBaseProvider>
     
    );
  }