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

const windowWidth = Dimensions.get('window').width;

function renderItem({item}){
  return <Image source={{uri:item}} style={{height:windowWidth/2, width:windowWidth/2, marginBottom:10}}></Image>
}

export default function HousePictures({ route, navigation }) {
  const house=route.params;
  const [address, setAddress] = useState("")
  const [images, setImages]=useState()

 

    useEffect(() => {
      if(address===""){
        const events = firestore()
        .collection('Houses')
        .doc(house.docID)
        .get()
        .then(documentSnapshot => {
          setAddress(documentSnapshot.data().Address)
          setImages(documentSnapshot.data().Images)
        });
      }
    });


  return (
    <NativeBaseProvider>
      <Box marginTop='10' width='100%'  >
        <Text color="#001F58" fontSize="xl" bold alignSelf="center">{address}</Text>
      </Box>
      <Box>
        <FlatList data={images} renderItem={renderItem} numColumns={2} key={2}></FlatList>
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


