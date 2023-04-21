import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
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
import { DataTable } from 'react-native-paper';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




export default function AddListing({ navigation }) {

  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('0');
  const [bathrooms, setBathrooms] = useState('0');
  const [houseType, setHouseType] = useState('');
  const [landlordContact, setLandlordContact] = useState('');
  const [price, setPrice] = useState('0');

  const [houseAddress, setHouseAddress] = useState('');
  const [houseBedrooms, setHouseBedrooms] = useState('');
  const [houseBathrooms, setHouseBathrooms] = useState('');

  const [submitText, setSubmitText] = useState('')
  const [enterHouseText, setEnterHouseText] = useState('')

  var houseItems = [address, bedrooms, bathrooms, houseType, landlordContact, price]
  var fieldsFilled: boolean
  for (var counter: number = 0; counter < 6; counter++) {
    if (ifFieldsEmpty(String(houseItems[counter]))) {
      fieldsFilled = false
      break
    }
    fieldsFilled = true
  }
  
  setEnterHouseText("Enter House Info")
  const onHouseEnterPress = () => {
    if (fieldsFilled) {
      var houseInfo = {
        method: 'GET',
        url: 'https://zillow56.p.rapidapi.com/search',
        params: {
          location: address
        },
        headers: {
          'X-RapidAPI-Key': '7064d0047amshfb448f45be1bc9ap151bdajsn57d95c7f971b',
          'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
        }
      };

      axios
      .request(houseInfo)
      .then(function (response) {
        var streetAddress = response.data.abbreviatedAddress
        var city = response.data.city
        var state = response.data.state
        var zipcode = response.data.zipcode
        var bath = response.data.bathrooms
        var bed = response.data.bedrooms

        setHouseAddress(streetAddress + " " + city + " " + state + " " + zipcode)
        setHouseBathrooms(bath)
        setHouseBedrooms(bed)
      })
      .catch(function (error) {
        if (error.response) {
          console.log("Error Code: " + error.response.status);
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
      setSubmitText("Submit House")
      setEnterHouseText("")
    } 
    else {
      Alert.alert("Field Error", "One or more fields is blank. Please fill all fields out, then click 'Enter House Info' button again")
    }

  }

  var apiItems = [houseAddress, houseBedrooms, houseBathrooms]
  const onSubmitPress = () => {
    if (apiCheck(apiItems)) {
      //New Writing to data base Section
      firestore()
        .collection('Houses')
        .add({
          Address: houseAddress,
          Beds: houseBedrooms,
          Baths: houseBathrooms,
          price:price,
          Type:houseType,
          Landlord:landlordContact
      })
      .then(() => {
        console.log('House added!');
      });
    }
    else {
      setSubmitText("")
      setEnterHouseText("Enter House Info")
      Alert.alert("Invalid address","Please input a valid address and click the 'Enter House Info' button again")
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
            onChangeText={(val) => setBedrooms(val)} />
          <TextInput
            style={styles.BBRInput}
            placeholder="2.5"
            keyboardType="numeric"
            onChangeText={(val) => setBathrooms(val)} />
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
          onChangeText={(val) => setPrice(val)} />
        <TouchableOpacity onPress={() => onHouseEnterPress()} style={{
          alignItems: 'center', padding: 20, marginVertical: 10,
          borderWidth: 2, borderRadius: 20, borderColor: 'black', backgroundColor: '#001E58'
        }}>
          <View >
            <Text style={{ fontFamily: 'AlNile-Bold', fontSize: 25, color: "#fff" }}>{enterHouseText}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onSubmitPress()} style={{
          alignItems: 'center', padding: 20, marginVertical: 10,
          borderWidth: 2, borderRadius: 20, borderColor: 'black', backgroundColor: '#001E58'
        }}>
          <View >
            <Text style={{ fontFamily: 'AlNile-Bold', fontSize: 25, color: "#fff" }}>{submitText}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.titles}>{houseAddress + " " + houseBathrooms + " " + houseBedrooms}</Text>
      </ScrollView>
    </View>
  );
}

function apiCheck(arr: string[]) {
  for (var counter: number = 0; counter < arr.length; counter++) {
    if (arr[counter].includes("undefined") || arr[counter].length == 0) {
      return false
    }
    else {
      return true
    }
  }
}

function ifFieldsEmpty(str: string) {
  if (str.length == 0) {
    return true
  }
  else {
    return false
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 0,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  header: {
    fontSize: 40,
    margin: 3,
    alignSelf: "center",
    fontFamily: 'Roboto',
    color: "#292828",
  },
  titles: {
    fontSize: 25,
    margin: 3,
    alignSelf: "center",
    fontFamily: 'AlNile-Bold',
  },
  rowTitles: {
    fontSize: 25,
    margin: 3,
    marginRight: 20,
    marginLeft: 20,
    alignSelf: "center",
    fontFamily: 'AlNile-Bold',
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
