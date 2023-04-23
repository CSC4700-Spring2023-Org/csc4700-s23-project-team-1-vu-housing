/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
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
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

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



export default function HomeInfo({route,navigation}) {
  const obj=route.params
  //console.log(obj.docID)
  const [address,setAddress]= useState("")
  const [beds,setBeds]= useState(0)
  const [baths,setBaths]= useState(0)
  const [price,setPrice]= useState(0)
  const [landlord,setLandlord]=useState("")

  const events=firestore()
  .collection('Houses')
  .doc(obj.docID)
  .get()
  .then(documentSnapshot => {
   setAddress(documentSnapshot.data().Address)
   setBeds(documentSnapshot.data().Beds)
   setBaths(documentSnapshot.data().Baths)
   setPrice(documentSnapshot.data().Price)
   setLandlord(documentSnapshot.data().Landlord)
  });
  
  

  return (
    //TODO: CHange Navigation
    <View id="main">
         <View id="LogoBand" style={{backgroundColor:'#0085FF',width:Dimensions.get('screen').width,alignItems:'center',marginTop:100}}>
         <Image
         style={{height:125,width:125}}
         source = {require('VUHousing/images/Logo.png')}
         />
        </View>

        <View id="TextInformation">
            <View id="Address information" style={{margin:20}}>
                <Text style={styles.headers}>Address:</Text>
                <Text style={styles.information}>{address}</Text>
            </View>   
            <View id ="BedAndBath" style={{flexDirection:'row', margin:10}}>
                <View id="bed"style={{marginLeft:10,marginRight:45}}>
                    <Text style={styles.headers}>Beds</Text>
                    <Text style={styles.information}>{beds}</Text>
                </View>
                <View id="Bath" style={{marginLeft:45}}>
                    <Text style={styles.headers}>Bath</Text>
                    <Text style={styles.information}>{baths}</Text>
                </View>
            </View>
            <View id="price" style={{margin:10}}>
                <Text style={styles.headers}>Price</Text>
                <Text style={styles.information}>{price}</Text>
            </View>  
            <View id="landlord" style={{margin:10}}>
                <Text style={styles.headers}>Landlord Contact</Text>
                <Text style={styles.information}>{landlord}</Text>
            </View>      
        </View>

    </View>

       
       
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headers:{
    fontFamily:"AlNile-Bold",
    fontSize:35
  },
  information:{
    fontFamily:"AlNile",
    fontSize:20
  }
});


