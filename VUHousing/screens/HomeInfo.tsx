import React, { useState, useEffect } from 'react';
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

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export default function HomeInfo({ route, navigation }) {
  const obj = route.params;

  const [address, setAddress] = useState("");
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [price, setPrice] = useState(0);
  const [landlord, setLandlord] = useState("");
  const [streetView, setStreetView] = useState("");

  const [reviewData, setReviewData] = useState(0.0);
  const [reviewCount, setReviewCount] = useState(0);
  const [userReview, setUserReview] = useState(0.0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('Houses')
          .doc(obj.docID)
          .get();

        const data = documentSnapshot.data();

        if (data) {
          setAddress(data.Address);
          setBeds(data.Beds);
          setBaths(data.Baths);
          setPrice(data.Price);
          setLandlord(data.Landlord);
          setStreetView(data.StreetView);
          setReviewData(data.Review);
          setReviewCount(data.ReviewCount);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [obj.docID]);

  const onReviewPress = () => {
    if (ifFieldsEmpty(String(userReview))) {
      Alert.alert("Review Error:", "Please fill out the field and try again")
      return;
    }
    else if (userReview < 0 || userReview > 5) {
      Alert.alert("Review Error:", "Review score must be between 0.0 and 5.0.");
      return;
    }
    else {
      var newReviewCount = reviewCount + 1;

      var floatingReview = parseFloat(userReview.toPrecision(2))
      var floatingReviewData = parseFloat(reviewData.toPrecision(2))
      var floatingReviewCount = parseFloat(newReviewCount.toPrecision(2))

     
      var newReview = (floatingReviewData * floatingReviewCount + floatingReview) / floatingReviewCount;

      firestore()
        .collection('Houses')
        .doc(obj.docID)
        .update({
          Review: newReview,
          ReviewCount: newReviewCount,
        })
        .then(() => {
          console.log('Review added!');
          console.log('Reviews: ' + newReviewCount + " Score: " + newReview);
          navigation.navigate("HouseSearch");
        })
        .catch((error) => {
          console.error("Error updating review:", error);
        });
    };
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
        <View style={styles.sectionContainer}>
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
          <Text fontSize="md">{reviewData}</Text>

          <Box flexDirection="column" >
            <Text color="#001F58" fontSize="2xl" bold>Leave a review!</Text>
            <Input borderColor="#001F58" borderRadius="10" borderWidth="2" placeholder="(0.0-5.0 V's up)"
              w="100%" autoCapitalize="none" h="50" fontSize="lg"
              onChangeText={(val) => setUserReview(val)} />
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


