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
} from 'react-native';

import BackButton from './BackButton';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NativeBaseProvider, Text, Box, Input,Button,useToast } from "native-base";




export default function HomeScreen({navigation}) {

  const [enterHouseText, setEnterHouseText] = useState('Enter House Info')

    return (
      <NativeBaseProvider>
        <View>
          <BackButton text="Go Back" />
        </View>

         <Box flex={1} bg="#ffffff" alignItems="center">
          <Text fontSize="3xl" marginTop="20" bold color="#0085FF">Welcome to Nova House!</Text>
          <Text fontSize="lg" textAlign="center" margin="4">Click "Search Houses” to start looking for a house or apartment</Text>
          <Text fontSize="lg" textAlign="center" margin="4">Click “Create Listing” to enter information about the place you live in</Text>
        <Button 
        onPress={()=>navigation.navigate("HouseSearch")} bgColor="#001F58" margin="5" size="lg" w="200" h="75" borderRadius="5">Search for a House</Button>
        <Button 
        onPress={()=>navigation.navigate("AddListing")} bgColor="#001F58" margin="5" size="lg" w="200" h="75" borderRadius="5">Create a Listing</Button>
        <Button  
        onPress={()=>navigation.navigate("UserSearch")} bgColor="#001F58" margin="5" size="lg" w="200" h="75" borderRadius="5">Search for Roommates</Button>
      </Box>

      </NativeBaseProvider>
     
    );
  }