import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NativeBaseProvider, Text, Box, Input,Button,useToast } from "native-base";

export default function ListingCreated({navigation}) {

    return (
      <NativeBaseProvider>
        
         <Box flex={1} bg="#ffffff" alignItems="center">
          <Box marginTop="20"  width="75%" alignItems="center">
          <Text fontSize="4xl" bold>Thank You!</Text>
        </Box>
        <Box marginTop="150" width="75%" alignItems="center">
        
        <Button onPress={()=>navigation.navigate("AddListing")} bgColor="#001F58" margin="5" size="lg" w="200" h="75" borderRadius="5">Add another listing</Button> 
        <Button onPress={()=>navigation.navigate("HouseSearch")} bgColor="#001F58" margin="5" size="lg" w="200" h="75" borderRadius="5">Browse other listings</Button>
        </Box>
      </Box>
      </NativeBaseProvider>

    );
  }