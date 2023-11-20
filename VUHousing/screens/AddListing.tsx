import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import BackButton from './BackButton';
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
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { NativeBaseProvider, Box, Text, Input, Button } from "native-base";

import firestore from '@react-native-firebase/firestore';
import { DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

//image upload
import ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import { readFileAssets } from 'react-native-fs';
import HomeButton from './HomeButton';


export default function AddListing({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);

  const [submissionStatus, setSubmissionStatus] = useState('');
  const [address, setAddress] = useState('');
  const [houseType, setHouseType] = useState('');
  const [landlordContact, setLandlordContact] = useState('');
  var [price, setPrice] = useState('0');

  var fieldsFilled = false;


  //image upload vars
  const [image, setImage] = useState('');
  //const [selectedImage, setSelectedImage] = useState("");
  let imageName = '';
  let selectedImage = '';
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [review, setReview] = useState(0.0);

  var houseItems = [address, houseType, landlordContact, price];
  const onHouseEnterPress = async () => {
    for (var counter: number = 0; counter < 6; counter++) {
      if (ifFieldsEmpty(String(houseItems[counter]))) {
        fieldsFilled = false;
        break;
      }
      fieldsFilled = true;
    }
    if (fieldsFilled) {
      if (parseInt(houseItems[3]) <= 0) {
        Alert.alert("Price Error", "Price field is invalid. Please re-fill field out, then resubmit")
      }
      else {
        try {
          setLoading(true);
          // Set isValidAddress based on validation result
          setIsValidAddress(fieldsFilled);
        }
        catch (error) {
          // Handle any validation error
          console.error('Validation Error: ', error);
        }
        finally {
          onLoadingAddress()
          await delay();
          writeHouseToDB()
        }
      }
    }
    else {
      Alert.alert(
        'Field Error',
        'One or more fields is incorrectly filled. Please re-fill all fields out, then resubmit',
      );
    }
  };

  var apiItems = []
  const onLoadingAddress = async () => {
    try {
      setLoading(true);
      var houseInfo = {
        method: 'GET',
        url: 'https://zillow-working-api.p.rapidapi.com/pro/byaddress',
        params: {
          propertyaddress: address,
        },
        headers: {
          'X-RapidAPI-Key': 'f64b95a4d3mshf7b654d87fe7687p105ad4jsn5d6b3c0c0c0f',
          'X-RapidAPI-Host': 'zillow-working-api.p.rapidapi.com'
        },
      };

      axios
        .request(houseInfo)
        .then(function (response) {
          var houseAddress = response.data.propertyDetails.abbreviatedAddress;
          var city = response.data.propertyDetails.city;
          var state = response.data.propertyDetails.state;
          var zipcode = response.data.propertyDetails.address.zipcode;
          var houseBathrooms = response.data.propertyDetails.bathrooms;
          var houseBedrooms = response.data.propertyDetails.bedrooms;
          var apiPrice = response.data.propertyDetails.price;
          var houseStreetView = response.data.propertyDetails.originalPhotos[0].mixedSources.jpeg[0].url;

          var addy = houseAddress + ' ' + city + ' ' + state + ' ' + zipcode
          var bath = houseBathrooms
          var bed = houseBedrooms
          var fullPrice = apiPrice
          var sV = houseStreetView

          apiItems = setAPIItems(addy, bath, bed, fullPrice, sV)
          console.log(apiItems)
          setLoading(false)
        })
        .catch(function (error) {
          if (error.response) {
            console.log('Error Code: ' + error.response.status);
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });
    }
    catch (error) {
      console.error('Error:', error);
      // Handle any errors that may occur during the delayed process
      setLoading(false)
    }
  }


  const writeHouseToDB = async () => {
    console.log("Phone len: " + landlordContact.length)
    var phoneFormat = phoneCheck(landlordContact.substring(0, 10)) && landlordContact.length == 10
    console.log("Phone true? " + phoneFormat)

    if (phoneFormat || emailCheck(landlordContact)) {
      console.log("before: " + loading)
      if (apiCheck(apiItems) && !loading) {
        console.log("After: " + loading)
        const floatingReview = eval(review)
        const houseAddress = apiItems[0]

        // Check if the house with the given address already exists in the database
        firestore()
          .collection('Houses')
          .where('Address', '==', houseAddress)
          .get()
          .then((querySnapshot: any) => { // Update 'any' with the correct type for querySnapshot
            if (querySnapshot.size > 0) {
              // If a house with the same address exists, alert the user
              Alert.alert(
                'Duplicate House',
                'A house with this address already exists in the database.'
              );
            } else {
              // If no existing house found with the same address, add the new house
              firestore()
                .collection('Houses')
                .add({
                  Address: houseAddress,
                  Beds: apiItems[2],
                  Baths: apiItems[1],
                  Price: houseItems[3],
                  Type: houseType,
                  Landlord: landlordContact,
                  StreetView: apiItems[4],
                  Images: [apiItems[4]],
                  Review: floatingReview,
                  ReviewCount: 1,
                })
                .then(() => {
                  console.log('House added!');
                });
              navigation.navigate('ListingCreated');
            }
          })
          .catch((error: any) => { // Update 'any' with the correct error type
            console.error('Error checking house existence:', error);
          });
      } else {
        Alert.alert(
          'Invalid address',
          'Please input a valid address and click "Enter House Info" again.'
        );
      }
    }
    else {
      Alert.alert('Please input a cell as ##########', 'or a valid email then click then the verify button again',);
      Alert.alert('Landlord contact information is formatted incorrectly.');
    }
  }

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        console.log(source);
        selectedImage = source.uri;
        uploadImage();
      }
    });
  };

  const uploadImage = async () => {
    const uri = selectedImage;
    const filenameselectedImage = uri.substring(uri.lastIndexOf('/') + 1);
    console.log('FILENAME SELECTED IMAGE');
    console.log(filenameselectedImage);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    console.log('UPLOAD URI');
    console.log(uploadUri);
    setUploading(true);
    setTransferred(0);
    const task = storage().ref(filenameselectedImage).putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });
    try {
      await task;
    }
    catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert('Photo uploaded!', 'Your photo has been uploaded to Firebase Cloud Storage!');
    setImage(null);
  };


  return (
    <NativeBaseProvider>
      <View>
        <BackButton text="Go Back" />
      </View>
     
      <HomeButton text="Home Screen" />

      <Box flex={1} bg="#ffffff" alignItems="center">
        <View style={styles.container}>
          <ScrollView>
            <Text color="#001F58" fontSize="4xl" bold>
              Create a Listing
            </Text>

            <Box flexDirection="column">
              <Text color="#001F58" fontSize="2xl" bold>
                Address
              </Text>
              <Input
                borderColor="#001F58"
                borderRadius="10"
                marginBottom={6}
                borderWidth="2"
                placeholder="12345 NE Wildcat Avenue, Villanova, PA 19010"
                w="100%"
                autoCapitalize="none"
                h="50"
                fontSize="sm"
                onChangeText={val => setAddress(val)}
              />
            </Box>

            <Box flexDirection="column">
              <Text color="#001F58" fontSize="2xl" bold>
                House Type
              </Text>
              <Input
                borderColor="#001F58"
                borderRadius="10"
                marginBottom={6}
                borderWidth="2"
                placeholder="ex: apartment, house, town-home"
                w="100%"
                autoCapitalize="none"
                h="50"
                fontSize="lg"
                onChangeText={val => setHouseType(val)}
              />
            </Box>

            <Box flexDirection="column">
              <Text color="#001F58" fontSize="2xl" bold>
                Landlord Contact Information
              </Text>
              <Input
                borderColor="#001F58"
                borderRadius="10"
                marginBottom={6}
                borderWidth="2"
                placeholder="email or cell"
                w="100%"
                autoCapitalize="none"
                h="50"
                fontSize="lg"
                onChangeText={val => setLandlordContact(val)}
              />
            </Box>

            <Box flexDirection="column">
              <Text color="#001F58" fontSize="2xl" bold>
                Monthly Price
              </Text>
              <Input
                borderColor="#001F58"
                borderRadius="10"
                marginBottom={6}
                borderWidth="2"
                placeholder="$1,750"
                w="100%"
                autoCapitalize="none"
                h="50"
                onChangeText={val => setPrice(val)}
              />
            </Box>

            <Box flexDirection="column">
              <Text color="#001F58" fontSize="2xl" bold>
                Review
              </Text>
              <Input
                borderColor="#001F58"
                borderRadius="10"
                marginBottom={2}
                borderWidth="2"
                placeholder="(0-5) V's up"
                w="100%"
                autoCapitalize="none"
                h="50"
                onChangeText={val => setReview(val)}
              />
            </Box>

            <Box marginTop="9">
              <Button
                alignSelf="center"
                bgColor="#0085FF"
                size="lg"
                w="200"
                borderRadius="50"
                marginBottom={5}
                _text={{ color: '#001F58' }}
                onPress={() => {
                  onHouseEnterPress();
                }}>
                Verify House Info
              </Button>


            </Box>

            {loading && (
              <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}

            

            <Text alignSelf="center">©VUHousing 2023</Text>
          </ScrollView>
        </View>
      </Box>
    </NativeBaseProvider>
  );
}

function apiCheck(arr: string[]) {
  for (var counter: number = 0; counter < arr.length; counter++) {
    if (arr[counter].includes('undefined') || arr[counter].length == 0) {
      return false;
    } else {
      return true;
    }
  }
}

function ifFieldsEmpty(str: string) {
  if (str.length == 0) {
    return true;
  } else {
    return false;
  }
}

function isNumeric(str: string) {
  if (str == '1' || str == '2' || str == '3' || str == '4' || str == '5' || str == '6' ||
    str == '7' || str == '8' || str == '9' || str == '0') {
    return true;
  }
  else {
    return false;
  }
}

function phoneCheck(str: string) {
  for (var counter: number = 0; counter < str.length; counter++) {
    if (isNumeric(str.substring(counter, counter + 1)) == false) {
      return false;
    }
  }
  return true;
}

function setAPIItems(str: string, str1: string, str2: string, str3: string, str4: string) {
  var apiItems = ["", "", "", "", ""]
  apiItems[0] = str
  apiItems[1] = str1
  apiItems[2] = str2
  apiItems[3] = str3
  apiItems[4] = str4
  return apiItems
}

function emailCheck(str: string) {
  var hasAt = false;
  for (var counter: number = 0; counter < str.length; counter++) {
    if (str.substring(counter, counter + 1) == '@') {
      hasAt = true;
    }
  }
  return hasAt;
}

const delay = async () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2500); // 2.5 seconds in milliseconds
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
  },
  header: {
    fontSize: 40,
    marginTop: 15,
    alignSelf: 'center',
    fontFamily: 'AlNile-Bold',
    color: '#292828',
  },
  titles: {
    fontSize: 25,
    margin: 10,
    alignSelf: 'center',
    fontFamily: 'AlNile-Bold',
  },
  input: {
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#D9D9D9',
    padding: 4,
    margin: 10,
    width: 300,
  },
});
