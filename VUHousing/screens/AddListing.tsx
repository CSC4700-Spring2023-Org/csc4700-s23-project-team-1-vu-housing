import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
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
import { NativeBaseProvider, Box, Button, Text, Input, Hidden } from 'native-base';

export default function AddListing({ navigation }) {
  const [address, setAddress] = useState('');
  const [houseType, setHouseType] = useState('');
  const [landlordContact, setLandlordContact] = useState('');
  var [price, setPrice] = useState('0');
  // price = priceToNum(price)

  const [enterButtonStyle, setEnterButtonStyle] = useState("flex");
  const [submitButtonStyle, setSubmitButtonStyle] = useState("none");

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

  var onHouseEnterPress = () => {
    if (fieldsFilled) {
      // var houseInfo = {
      //   method: 'GET',
      //   url: 'https://zillow56.p.rapidapi.com/search',
      //   params: {
      //     location: address
      //   },
      //   headers: {
      //     'X-RapidAPI-Key': '7f09fbb57amsha4e11a8558271ccp17ff92jsn86612c501041',
      //     'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
      //   }
      // };

      // axios
      //   .request(houseInfo)
      //   .then(function (response) {
      //     var streetAddress = response.data.abbreviatedAddress
      //     var city = response.data.city
      //     var state = response.data.state
      //     var zipcode = response.data.zipcode
      //     var resBath = response.data.bathrooms
      //     var resBed = response.data.bedrooms

      //     setHouseAddress(streetAddress + " " + city + " " + state + " " + zipcode)
      //     setHouseBathrooms(resBath)
      //     setHouseBedrooms(resBed)
      //   })
      //   .catch(function (error) {
      //     if (error.response) {
      //       console.log("Error Code: " + error.response.status);
      //       console.log(error.response.data);
      //     } else if (error.request) {
      //       console.log(error.request);
      //     } else {
      //       console.log('Error', error.message);
      //     }
      //   });
      setSubmitText("Submit House")
      setEnterHouseText("")
    }
    else {
      Alert.alert("Field Error", "One or more fields is blank. Please fill all fields out, then resubmit")
    }

  }

  var apiItems = [houseAddress, houseBedrooms, houseBathrooms]
  var onSubmitPress = () => {
    var phoneFormat = phoneCheck(landlordContact.substring(0, 3)) && landlordContact.substring(3, 4).includes('-')
      && phoneCheck(landlordContact.substring(4, 7)) && landlordContact.substring(7, 8).includes('-')
      && phoneCheck(landlordContact.substring(8, 12)) && landlordContact.length == 12
    if (phoneFormat || emailCheck(landlordContact)) {

      // if (apiCheck(apiItems)) {
      //   //New Writing to data base Section
      //   firestore()
      //     .collection('Houses')
      //     .add({
      //       Address: houseAddress,
      //       Beds: houseBedrooms,
      //       Baths: houseBathrooms,
      //       Price: price,
      //       Type: houseType,
      //       Landlord: landlordContact
      //     })
      //     .then(() => {
      //       console.log('House added!');
      //     });
      //   navigation.navigate("ListingCreated")
      // }
      // else {
      //   setSubmitText("")
      //   setEnterHouseText("Enter House Info")
      //   Alert.alert("Invalid address", "Please input a valid address and click \"Enter House Info\" again, then the verify button")
      // }
      navigation.navigate("ListingCreated")
    }
    else {
      Alert.alert("Please input a cell as ###-###-#### or a valid email then click \"Enter House Info\" again, then the verify button")
      Alert.alert("Landlord contact information is formatted incorrectly.")
    }
  }


  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#ffffff" alignItems="center"  >
        <View style={styles.container}>
          <ScrollView>
            <Text color="#001F58"fontSize="4xl" bold>Create a Listing</Text>

            <Box flexDirection="column" >
              <Text color="#001F58"fontSize="2xl" bold>Address</Text>
              <Input borderColor="#001F58" borderRadius="10" marginBottom={6} borderWidth="2" placeholder="12345 NE Wildcat Avenue, Villanova, PA 19010" 
                w="100%" autoCapitalize="none" h="50" fontSize="sm" 
                  onChangeText={(val) => setAddress(val)} />
            </Box>

            <Box flexDirection="column" >
              <Text color="#001F58"fontSize="2xl" bold>House Type</Text>
              <Input borderColor="#001F58" borderRadius="10" marginBottom={6} borderWidth="2" placeholder="ex: apartment, house, town-home"
                w="100%" autoCapitalize="none" h="50" fontSize="lg"
                onChangeText={(val) => setHouseType(val)} />
            </Box>

            <Box flexDirection="column" >
              <Text color="#001F58"fontSize="2xl" bold>Landlord Contact Information</Text>
              <Input borderColor="#001F58" borderRadius="10" marginBottom={6} borderWidth="2" placeholder="email or cell"
                w="100%" autoCapitalize="none" h="50" fontSize="lg"
                onChangeText={(val) => setLandlordContact(val)} />
            </Box>

            <Box flexDirection="column" >
              <Text color="#001F58"fontSize="2xl" bold>Monthly Price</Text>
              <Input borderColor="#001F58" borderRadius="10" marginBottom={6} borderWidth="2" placeholder="$1,750"
                w="100%" autoCapitalize="none" h="50"
                onChangeText={(val) => setPrice(val)} />
            </Box>

            <Box marginTop="9" >
              <Button alignSelf="center"
                bgColor="#0085FF" size="lg" w="200" borderRadius="50" display={enterButtonStyle} _text={{ color: '#001F58' }}
                onPress={() => { onHouseEnterPress(); setEnterButtonStyle("none"); setSubmitButtonStyle("flex"); } }>
                  Enter House Info
              </Button>
            </Box>

            <Box marginTop="9" >
              <Button alignSelf="center"
                bgColor="#0085FF" size="lg" w="200" borderRadius="50" display={submitButtonStyle} _text={{ color: '#001F58' }}
                onPress={() => { onSubmitPress(); setEnterButtonStyle("flex"); setSubmitButtonStyle("none"); } }>
                  Verify House Info
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

function priceToNum(str: string) {
  var numPrice = parseInt(str)
  return numPrice
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
    marginTop: 5,
  },
  header: {
    fontSize: 40,
    marginTop: 15,
    alignSelf: "center",
    fontFamily: 'AlNile-Bold',
    color: "#292828",
  },
  titles: {
    fontSize: 25,
    margin: 10,
    alignSelf: "center",
    fontFamily: 'AlNile-Bold',
  },
  input: {
    alignSelf: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: "#D9D9D9",
    padding: 4,
    margin: 10,
    width: 300,
  },
});