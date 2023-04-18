import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
    Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




export default function AddListing({navigation}) {

  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [houseType, setHouseType] = useState('');
  const [landlordContact, setLandlordContact] = useState('');
  const [price, setPrice] = useState(0);

  const [houseAddress, setHouseAddress] = useState('');
  const [houseBedrooms, setHouseBedrooms] = useState('');
  const [houseBathrooms, setHouseBathrooms] = useState('');
    const houseInfo = {
      method: 'GET',
      url: 'https://zillow56.p.rapidapi.com/search',
      params: {
        location: address
      },
      headers: {
        'X-RapidAPI-Key': 'd5fb5a5337msh26bd1b9bc6d6ce2p195aaejsn54c2c9427c9d',
        'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
      }
    };
    const onSubmitPress = () => {   
        var streetAddress = ""
        var city = ""
        var state = ""
        var zipcode = ""
        axios
        .request(houseInfo)
        .then(function (response) {
          streetAddress = response.data.abbreviatedAddress
          city = response.data.city
          state = response.data.state
          zipcode = response.data.zipcode
          setHouseAddress(streetAddress + " " + city + " " + state + " " + zipcode)
          setHouseBathrooms(response.data.bathrooms)
          setHouseBedrooms(response.data.bedrooms)
      })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        
      }); 

      var correctAddy = true
      var correctBath = true;
      var correctBed = true;
      if (houseAddress == undefined) {
        correctAddy = false
        Alert.alert("Address Error", "This is not a valid address. Please try again")
      }
      if (parseInt(bathrooms) !== parseInt(houseBathrooms)) {
        correctBath = false
        Alert.alert("Bathroom Error", "This is not the number zillow lists. (" + houseBathrooms + ") Please adjust value and re-submit")
      }
      if (parseInt(bedrooms) !== parseInt(houseBedrooms)) {
        correctBed = false
        Alert.alert("Bedroom Error", "This is not the number zillow lists. (" + houseBedrooms + ") Please adjust value and re-submit")
      }

      if (correctAddy && correctBath && correctBed) {
        Alert.alert("All good", "Insert database method call here")
      }
    }
    
    
    

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Create a listing</Text>

        <Text style={styles.titles}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="800 E Lancaster Ave, Villanova, PA 19085"
          keyboardType="email-address"
          onChangeText={(val) => setAddress(val)} />
          
          <View style={styles.row}>
            <Text style={styles.rowTitles}>Bedrooms</Text>
            <Text style={styles.rowTitles}>Bathrooms</Text>  
          </View>

          <View style={styles.row}>
            <TextInput
            style={styles.BBRInput}
            placeholder="3"
            keyboardType="numeric"
            onChangeText={(val) => setBedrooms(val)}/>
            <TextInput
            style={styles.BBRInput}
            placeholder="2.5"
            keyboardType="numeric"
            onChangeText={(val) => setBathrooms(val)}/>
          </View>  
        
        <Text style={styles.titles}>Type of house</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: apartment, house, town-home"
          keyboardType="email-address"
          onChangeText={(val) => setHouseType(val)} />

        <Text style={styles.titles}>Landlord Contact Information</Text>
        <TextInput
          style={styles.input}
          placeholder="email or cell number"
          keyboardType="email-address"
          onChangeText={(val) => setLandlordContact(val)} />

        <Text style={styles.titles}>Monthly Price</Text>
        <TextInput
          style={styles.input}
          placeholder="$1,700"
          keyboardType="numeric"
          onChangeText={(val) => setPrice(val)}/>
          <TouchableOpacity onPress={() => onSubmitPress()} style={{
            alignItems:'center',padding:20, marginVertical:10, 
            borderWidth: 2, borderRadius: 20, borderColor:'black', backgroundColor:'#001E58'
            }}>
            <View >
              <Text style={{fontFamily:'AlNile-Bold',fontSize:25, color: "#fff"}}>Submit</Text>
            </View>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
      const styles = StyleSheet.create({
        container: {
          flex: 1, 
          alignItems: 'center',
          marginTop:10,
        },
          row: {
            flexDirection: 'row', 
            alignSelf: 'center',
          },
          header: {
            fontSize: 40,
            margin: 10,
            alignSelf: "center",
            fontFamily: 'Roboto',
            color: "#292828",
          },
          titles: {
            fontSize: 25,
            margin: 10,
            alignSelf: "center",
            fontFamily:'AlNile-Bold',
          },
          rowTitles: {
            fontSize: 25,
            margin: 10,
            marginRight:20,
            marginLeft:20,
            alignSelf: "center",
            fontFamily:'AlNile-Bold',
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
