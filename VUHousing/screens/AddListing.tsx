import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { Joke } from '../interfaces';
import axios, { AxiosResponse } from 'axios';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default function AddListing({navigation}) {

  return (
    <View>
        <Text>Create a listing</Text>
        <Text>Address</Text>
        <TextInput
          style={styles.addressInput}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="800 E Lancaster Ave, Villanova, PA 19085"
          keyboardType="email-address" />
        <Text>Bedrooms</Text>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="3"
          keyboardType="numeric"/>
        <Text>Bathrooms</Text>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="2.5"
          keyboardType="numeric"/>
        <Text>Type of house</Text>
        <Text>Monthly Price</Text>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="$1,700"
          keyboardType="default"/>
          <Button title='Submit' 
          onPress={()=>navigation.navigate("AddListing")}></Button>
    </View>
  );
}
// export default function AddListing({ navigation }) {
//   // const [jokeData, setJokeData] = useState<Joke[]>([]);
//   // useEffect(() => {
//   //   axios
//   //     .get('https://v2.jokeapi.dev/joke/pun')
//   //     .then((response: AxiosResponse) => {
//   //       console.clear();
//   //       console.log('Response: ', response.data);
//   //     });
//   // }, []);
//   return (
//     <View style={styles.container}>
//       <Text>Enter the Address of the house you would like to list</Text>
//       <TextInput
//         placeholder='800 E Lancaster Ave, Villanova, PA 19085'
//         style={styles.input}
//         onChangeText={(value) => setName(value)} />
//       );
    
//   }

      const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      addressInput: {
        borderWidth: 1,
        minWidth: 20,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
    },
        input: {
          borderWidth: 1,
          borderColor: '#777',
          padding: 8,
          margin: 10,
          width: 200,
    }
  });
