/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';

import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { NativeBaseProvider, Box, Text, Input, Button, useToast } from "native-base";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



export default function HomeInfo({ route, navigation }) {
  const obj = route.params
  //console.log(obj.docID)
  
  const [address, setAddress] = useState("")
  const [beds, setBeds] = useState(0)
  const [baths, setBaths] = useState(0)
  const [price, setPrice] = useState(0)
  const [landlord, setLandlord] = useState("")
  const [streetView, setStreetView] = useState("")


  const events = firestore()
    .collection('Houses')
    .doc(obj.docID)
    .get()
    .then(documentSnapshot => {
      setAddress(documentSnapshot.data().Address)
      setBeds(documentSnapshot.data().Beds)
      setBaths(documentSnapshot.data().Baths)
      setPrice(documentSnapshot.data().Price)
      setLandlord(documentSnapshot.data().Landlord)
      setStreetView(documentSnapshot.data().StreetView)
    });




  return (
    <NativeBaseProvider>
      <View id="LogoBand" style={{
        backgroundColor: '#0085FF', width: Dimensions.get('screen').width,
        alignItems: 'center', marginTop: 30
      }}>
        <Image source={{ uri: streetView }} style={styles.image} />
      </View>

      <Box flex={1} bg="#ffffff" alignItems="center"  >
        <View style={styles.container}>
          <Text color="#001F58" fontSize="4xl" bold>Address:</Text>
          <Text style="#001F58" fontSize="md">{address}</Text>

          <Text color="#001F58" fontSize="4xl" bold>Beds:</Text>
          <Text style="#001F58" fontSize="md">{beds}</Text>

          <Text color="#001F58" fontSize="4xl" bold>Bath:</Text>
          <Text style="#001F58" fontSize="md">{baths}</Text>

          <Text color="#001F58" fontSize="4xl" bold>Price:</Text>
          <Text style="#001F58" fontSize="md">{price}</Text>

          <Text color="#001F58" fontSize="4xl" bold>Landlord Contact:</Text>
          <Text style="#001F58" fontSize="md">{landlord}</Text>


          <Text alignSelf="center">©VUHousing 2023</Text>
        </View>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 4,
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headers: {
    fontFamily: "AlNile-Bold",
    fontSize: 35
  },
  information: {
    fontFamily: "AlNile",
    fontSize: 20

  }
});


