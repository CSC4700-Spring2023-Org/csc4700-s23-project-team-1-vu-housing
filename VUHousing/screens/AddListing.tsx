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
    <View style={styles.container}>
        <Text style={styles.header}>Create a listing</Text>

        <Text style={styles.titles}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="800 E Lancaster Ave, Villanova, PA 19085"
          keyboardType="email-address" />
          
          <View style={styles.row}>
            <Text style={styles.rowTitles}>Bedrooms</Text>
            <Text style={styles.rowTitles}>Bathrooms</Text>  
          </View>

          <View style={styles.row}>
            <TextInput
            style={styles.BBRInput}
            placeholder="3"
            keyboardType="numeric"/>
            <TextInput
            style={styles.BBRInput}
            placeholder="2.5"
            keyboardType="numeric"/>
          </View>  
        
        <Text style={styles.titles}>Type of house</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: apartment, house, town-home"
          keyboardType="email-address" />
        <Text style={styles.titles}>Monthly Price</Text>
        <TextInput
          style={styles.input}
          placeholder="$1,700"
          keyboardType="default"/>
          <Button title='Submit'
            color='#001E58'
          onPress={()=>navigation.navigate("HomeScreen")}></Button>
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
          alignItems: 'center',
          marginTop:60,
        },
          row: {
            flexDirection: 'row', 
            alignSelf: 'center',
          },
          header: {
            fontSize: 40,
            margin: 10,
            alignSelf: "center",
            fontFamily: "Tahoma",
            color: "#292828",
          },
          titles: {
            fontSize: 25,
            margin: 10,
            alignSelf: "center",
            fontFamily: "Georgia",
          },
          rowTitles: {
            fontSize: 25,
            margin: 10,
            marginRight:20,
            marginLeft:20,
            alignSelf: "center",
            fontFamily: "Georgia",
          },
          BBRInput: {
            borderWidth: 1,
            borderRadius: 15,
            borderColor: 'black',
            padding: 8,
            marginLeft: 30,
            marginRight: 30,
            width: 100,
            backgroundColor: "#D9D9D9",
          },
          input: {
            alignSelf: "center",
            borderRadius: 15,
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: "#D9D9D9",
            padding: 8,
            margin: 10,
            width: 300,
          },
  });
