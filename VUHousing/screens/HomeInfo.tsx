/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import BackButton from './BackButton';

import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  Alert,
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

  const [reviewButtonStyle, setReviewButtonStyle] = useState("flex");

  const [address, setAddress] = useState("")
  const [beds, setBeds] = useState(0)
  const [baths, setBaths] = useState(0)
  const [price, setPrice] = useState(0)
  const [landlord, setLandlord] = useState("")
  const [streetView, setStreetView] = useState("")

  const [review, setReview] = useState(0.0)
  var [reviewCount, setReviewCount] = useState(0)
  const [reviewData, setReviewData] = useState(0.0)




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
      setReviewData(documentSnapshot.data().Review)
      setReviewCount(documentSnapshot.data().ReviewCount)
    });

  var reviewArray = [reviewData, reviewCount]
  function onReviewPress() {
    for (var i = 0; i < reviewArray.length; i++) {
      if (ifFieldsEmpty(String(reviewArray[i]))) {
        Alert.alert("Review Error:", "You have not properlly filled the input for a review. Please try again.")
      }
      else {
        reviewCount = reviewCount + 1
        firestore()
          .collection('Houses')
          .add({
            Review: review,
            ReviewCount: reviewCount
          })
          .then(() => {
            console.log('Review added!');
          });
        navigation.navigate("HouseSearch")
      }
    }
  }

  return (
    <NativeBaseProvider>
      <View id="LogoBand" style={{
        backgroundColor: 'white smoke', width: Dimensions.get('screen').width,
        alignItems: 'center', marginTop: 30
      }}>
        <Image source={{ uri: streetView }} style={styles.image} />
      </View>

      <Box flex={1} bg="#ffffff" alignItems="center" marginRight='10' marginLeft='2' >
        <View style={styles.container}>
          <Text color="#001F58" fontSize="4xl" bold>Address:</Text>
          <Text fontSize="md">{address}</Text>
          
          <Box flexDirection="row" marginRight='10'>
            <Text color="#001F58" fontSize="4xl" bold>Beds:</Text>
            <Text fontSize="md" marginTop='5' marginLeft='5' marginRight='10' alignItems='center'>{beds}</Text>

            <Text color="#001F58" fontSize="4xl" bold>Bath:</Text>
            <Text fontSize="md" marginLeft='5' marginTop='5' alignItems='center'>{baths}</Text>
          </Box>

          <Text color="#001F58" fontSize="4xl" bold>Price:</Text>
          <Text fontSize="md">{price}</Text>

          <Text color="#001F58" fontSize="4xl" bold>Landlord Contact:</Text>
          <Text fontSize="md">{landlord}</Text>

          <Text color="#001F58" fontSize="4xl" bold>Reviews:</Text>
          <Text style="#001F58" fontSize="md">{review}</Text>

          <Box flexDirection="column" >
            <Text color="#001F58" fontSize="2xl" bold>Leave a review!</Text>
            <Input borderColor="#001F58" borderRadius="10" borderWidth="2" placeholder="(0-5 V's up)"
              w="100%" autoCapitalize="none" h="50" fontSize="lg"
              onChangeText={(val) => setReview(val)} />
          </Box>

          <Box marginTop="9" >
            <Button alignSelf="center"
              bgColor="#0085FF" size="lg" w="200" borderRadius="50" _text={{ color: '#001F58' }}
              onPress={() => { onReviewPress(); }}>
              Submit Review
            </Button>
          </Box>
      
          <View>
            <BackButton text="Go Back" />
          </View>


          <Text alignSelf="center">©VUHousing 2023</Text>
        </View>
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

function ifFieldsEmpty(str: string) {
  if (str.length == 0) {
    return true
  }
  else {
    return false
  }
}


