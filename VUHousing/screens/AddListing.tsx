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
import { NativeBaseProvider, Box, Input } from 'native-base';




export default function AddListing({ navigation }) {

  const [address, setAddress] = useState('');
  const [houseType, setHouseType] = useState('');
  const [landlordContact, setLandlordContact] = useState('');
  const [price, setPrice] = useState(0);

  const [houseAddress, setHouseAddress] = useState('');
  const [houseBedrooms, setHouseBedrooms] = useState('');
  const [houseBathrooms, setHouseBathrooms] = useState('');

  const [submitText, setSubmitText] = useState('')
  const [enterHouseText, setEnterHouseText] = useState('Enter House Info')

  var houseItems = [address, houseType, landlordContact, price]
  var fieldsFilled: boolean
  for (var counter: number = 0; counter < 6; counter++) {
    if (ifFieldsEmpty(String(houseItems[counter]))) {
      fieldsFilled = false
      break
    }
    fieldsFilled = true
  }

  const onHouseEnterPress = () => {
    if (fieldsFilled) {
      var houseInfo = {
        method: 'GET',
        url: 'https://zillow56.p.rapidapi.com/search',
        params: {
          location: address
        },
        headers: {
          'X-RapidAPI-Key': '7f09fbb57amsha4e11a8558271ccp17ff92jsn86612c501041',
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
          var resBath = response.data.bathrooms
          var resBed = response.data.bedrooms

          setHouseAddress(streetAddress + " " + city + " " + state + " " + zipcode)
          setHouseBathrooms(resBath)
          setHouseBedrooms(resBed)
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
      Alert.alert("Field Error", "One or more fields is blank. Please fill all fields out, then resubmit")
    }

  }

  var apiItems = [houseAddress, houseBedrooms, houseBathrooms]
  const onSubmitPress = () => {
    if (phoneCheck(landlordContact) || emailCheck(landlordContact)) {

      if (apiCheck(apiItems)) {
        //New Writing to data base Section
        firestore()
          .collection('Houses')
          .add({
            Address: houseAddress,
            Beds: houseBedrooms,
            Baths: houseBathrooms,
            Price: price,
            Type: houseType,
            Landlord: landlordContact
          })
          .then(() => {
            console.log('House added!');
          });
        navigation.navigate("ListingCreated")
      }
      else {
        setSubmitText("")
        setEnterHouseText("Enter House Info")
        Alert.alert("Invalid address", "Please input a valid address and click \"Enter House Info\" again, then the submit button")
      }

    }
    else {
      Alert.alert("Please input a cell as ###-####-#### or an valid email then click \"Enter House Info\" again, then the submit button")
      Alert.alert("Landlord contact information is formatted incorrectly.")
    }
  }


  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#ffffff" alignItems="center"  >
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.header}>Create a listing</Text>

            <Box flexDirection="column" >
              <Text style={styles.titles}>Address</Text>
              <Text color="#001F58" fontSize="2xl" bold >Enter Address</Text>
              <Input borderColor="#001F58" borderRadius="10" borderWidth="2" mx="2" placeholder="JWright@villanova.edu" w="100%" autoCapitalize="none" h="50" fontSize="lg" onChangeText={(val) => setEmail(val)} />
            </Box>

            <Box flexDirection="column" >
              <Text style={styles.titles}>Type of house</Text>
              <Text color="#001F58" fontSize="2xl" bold >Type of House</Text>
              <Input borderColor="#001F58" borderRadius="10" borderWidth="2" mx="2" placeholder="JWright@villanova.edu" 
                      w="100%" autoCapitalize="none" h="50" fontSize="lg" 
                        onChangeText={(val) => setHouseType(val)} />
            </Box>

            <Text style={styles.titles}>Landlord Contact Information</Text>
            <Box flexDirection="column" >
              <Text color="#001F58" fontSize="2xl" bold >email or cell number</Text>
              <Input borderColor="#001F58" borderRadius="10" borderWidth="2" mx="2" placeholder="JWright@villanova.edu" 
                      w="100%" autoCapitalize="none" h="50" fontSize="lg" 
                        onChangeText={(val) => setLandlordContact(val)} />
            </Box>

            
           
            <TextInput
              style={styles.input}
              placeholder="ex: apartment, house, town-home"
              keyboardType="email-address"
              onChangeText={(val) => setHouseType(val)} />

            
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

            

            <Box marginTop="9" >
              <Button bgColor="#0085FF" size="lg" w="200" borderRadius="50" _text={{ color: '#001F58' }}
                onPress={() => onHouseEnterPress()} >{enterHouseText}
              </Button>
            </Box>

            <Box marginTop="9" >
              <Button bgColor="#0085FF" size="lg" w="200" borderRadius="50" _text={{ color: '#001F58' }}
                onPress={() => onSubmitPress()} >{submitText}
              </Button>
            </Box>

            <Text alignSelf="center">©VUHousing 2023</Text>

          </ScrollView>
        </View>
      </Box>

    </NativeBaseProvider>
  );


}

function apiCheck(arr: string[]) {
  for (var counter: number = 0; counter < arr.length; counter++) {
    // console.log("GUHHHH")
    // console.log(arr[counter])
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

function isNumeric(str: string) {
  if (str == "1" || str == "2" || str == "3" || str == "4"
    || str == "5" || str == "6" || str == "7" || str == "8" || str == "9" || str == "0") {
    return true
  }
  else {
    return false
  }
}
function phoneCheck(str: string) {
  for (var counter: number = 0; counter < str.length; counter++) {
    if (isNumeric(str.substring(counter, counter + 1)) == false) {
      return false
    }
  }
  return true
}

function emailCheck(str: string) {
  var hasAt = false
  for (var counter: number = 0; counter < str.length; counter++) {
    if (str.substring(counter, counter + 1) == "@") {
      hasAt = true
    }
  }
  return hasAt
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 0,
  },
  header: {
    fontSize: 40,
    margin: 3,
    alignSelf: "center",
    fontFamily: 'AlNile-Bold',
    color: "#292828",
  },
  titles: {
    fontSize: 25,
    margin: 3,
    alignSelf: "center",
    fontFamily: 'AlNile-Bold',
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