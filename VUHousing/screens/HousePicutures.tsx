import React, { useEffect, useState } from 'react';
import BackButton from './BackButton';

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
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'
import GridImageView from 'react-native-grid-image-viewer';



import { NativeBaseProvider, Box, Text, Input, Button, useToast, FlatList } from "native-base";

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

function renderItem({item}){
  return <Image source={{uri:item}} style={{height:200, width:200}}></Image>
}

export default function HousePictures({ route, navigation }) {
  const house=route.params;
  const [address, setAddress] = useState("")
  const [images, setImages]=useState()

  const events = firestore()
    .collection('Houses')
    .doc(house.docID)
    .get()
    .then(documentSnapshot => {
      setAddress(documentSnapshot.data().Address)
      setImages(documentSnapshot.data().Images)
    });


  return (
    <NativeBaseProvider>
      <Box padding='100' >
        <Text>Hellow WOrkd</Text>
        <Text>{address}</Text>
      </Box>
      <Box>
        <Text>Flatlist</Text>
        <FlatList data={images} renderItem={renderItem} numColumns={3} key={3}></FlatList>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 400,
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


