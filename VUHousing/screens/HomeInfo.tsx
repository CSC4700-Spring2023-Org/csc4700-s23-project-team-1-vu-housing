import React, {useState, useEffect} from 'react';
import BackButton from './BackButton';
import HomeButton from './HomeButton';

import type {PropsWithChildren} from 'react';
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
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import {FieldValue} from 'firebase-admin/firestore'
import firestore from '@react-native-firebase/firestore';

//image upload
import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';

import { NativeBaseProvider, Box, Text, Input, Button, useToast } from "native-base";


type SectionProps = PropsWithChildren<{
  title: string;
}>;

export default function HomeInfo({route, navigation}) {
  const obj = route.params;

  const [address, setAddress] = useState('');
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [price, setPrice] = useState(0);
  
  var [landlord, setLandlord] = useState("");
  const [streetView, setStreetView] = useState("");
  const [images, setImages]=useState()
  let imageArray=[]
  const [enterButtonStyle, setEnterButtonStyle] = useState('flex');
  var [reviewData, setReviewData] = useState(0.0);
  var [userReview, setUserReview] = useState(0.0);
  var [reviewString, setReviewString] = useState('');

  //image upload vars
  const [image, setImage] = useState("");
  //const [selectedImage, setSelectedImage] = useState("");
  let imageName=""
  let selectedImage=""
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [review, setReview] = useState(0.0)

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
        const source = {uri: response.assets[0].uri};
        console.log(source);
        selectedImage=source.uri;
        uploadImage();
      }
    });
  };

  const uploadImage = async () => {
    const uri = selectedImage;
    const filenameselectedImage= uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
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
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    //Write to firestore Textual Database
    const downloadURL = await storage().ref("/"+filenameselectedImage).getDownloadURL()
    const houseReference = await firestore().collection('Houses').doc(obj.docID)

    images?.push(downloadURL)
   

    const res =  houseReference.update({Images: images});
    
    setImage(null);

  };


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

        var formattedLandlord = data.Landlord
        if (phoneCheck(data.Landlord.substring(0, 10))) {
          formattedLandlord = formattedLandlord.substring(0, 3) + "-" + formattedLandlord.substring(3, 6) 
          + "-" + formattedLandlord.substring(6, 10)
        }

        setLandlord(formattedLandlord);
        setImages(data.Images);
        setStreetView(data.StreetView);
        var reviewNum = parseFloat(data.Review);
        var reviewCountNum = parseFloat(data.ReviewCount); // Parse as a number
        console.log("review " + reviewNum);
        console.log("count" + reviewCountNum);
        setReviewData(reviewNum);
        setReviewString('(' + String(reviewCountNum) + ')');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [obj.docID]);


const onReviewPress = () => {
  if (userReview === 0 || userReview < 0 || userReview > 5) {
    Alert.alert('Review Error:', 'Review score must be between 0.0 and 5.0.');
    return;
  }

  var newReview = parseFloat(userReview);
  var currentReviewCount = reviewCountNum;
  var currentReviewData = reviewData;

  var updatedReviewCount = currentReviewCount + 1;
  var updatedReviewData = ((currentReviewData * currentReviewCount) + newReview) / updatedReviewCount;

  // Check for NaN to avoid incorrect updates in case of parsing issues
  if (!isNaN(updatedReviewData) && !isNaN(updatedReviewCount)) {
    firestore()
      .collection('Houses')
      .doc(obj.docID)
      .update({
        Review: updatedReviewData.toFixed(2),
        ReviewCount: updatedReviewCount,
      })
      .then(() => {
        console.log('Review added!');
        console.log('Reviews: ' + updatedReviewCount + ' Score: ' + updatedReviewData.toFixed(2));
        navigation.navigate('HouseSearch');
      })
      .catch(error => {
        console.error('Error updating review:', error);
      });
  } else {
    console.log('Error: Updated review data or count is not a number.');
    // Handle the error as needed
  }
};
  

  return (
    <ScrollView>
      <NativeBaseProvider>
      <View>
        <BackButton text="Go Back" />
      </View>
     
      <HomeButton text="Home Screen" />
        <View
          id="LogoBand"
          style={{
            backgroundColor: 'white smoke',
            width: Dimensions.get('screen').width,
            alignItems: 'center',
          }}>
          <Image source={{uri: streetView}} style={styles.image} />
        </View>
        <ScrollView>
          <Box
            flex={1}
            bg="#ffffff"
            alignItems="center"
            marginRight="2"
            marginLeft="2">
            <View style={styles.sectionContainer}>
              <Text color="#001F58" fontSize="3xl" bold>
                Address:
              </Text>
              <Text fontSize="md">{address}</Text>

              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={0.5}>
                  <Box flex={1}>
                    <Text color="#001F58" fontSize="3xl" bold>
                      Beds:
                    </Text>
                    <Text fontSize="md" alignItems="center">
                      {beds}
                    </Text>
                  </Box>

                  <Box flex={1}>
                    <Text color="#001F58" fontSize="4xl" bold>
                      Bath:
                    </Text>
                    <Text fontSize="md" alignItems="center">
                      {baths}
                    </Text>
                  </Box>
              </Box>

              <Text color="#001F58" fontSize="3xl" bold>
                Price:
              </Text>
              <Text fontSize="md">{price}</Text>

              <Text color="#001F58" fontSize="3xl" bold>
                Landlord Contact:
              </Text>
              <Text fontSize="md">{landlord}</Text>

              <Text color="#001F58" fontSize="4xl" bold>
                Reviews:
              </Text>
              <Text fontSize="md">
                {reviewString} {reviewData} ✌️'s
              </Text>

              <Box flexDirection="column">
                <Text color="#001F58" fontSize="2xl" bold>
                  Leave a review!
                </Text>
                <Input
                  borderColor="#001F58"
                  borderRadius="10"
                  borderWidth="2"
                  placeholder="(0.0-5.0 V's up)"
                  w="100%"
                  autoCapitalize="none"
                  h="50"
                  fontSize="lg"
                  onChangeText={val => setUserReview(val)}
                />
              </Box>

              <Box marginTop="0.5" marginBottom="0.5">
                <Button
                  alignSelf="center"
                  bgColor="#0085FF"
                  size="lg"
                  w="200"
                  borderRadius="50"
                  _text={{color: '#001F58'}}
                  onPress={() => {
                    onReviewPress();
                  }}>
                  Submit Review
                </Button>
              </Box>
            </View>
            

            <View>
            <Button
                alignSelf="center"
                bgColor="#0085FF"
                size="lg"
                w="200"
                borderRadius="50"
                _text={{ color: '#001F58' }}
                onPress={() => {
                  selectImage();
                }}>
                Upload Images
              </Button>
              <Button
                onPress={() =>
                  navigation.navigate('HousePictures', {docID: obj.docID})
                }>
                View Pictures
              </Button>

            </View>

            <Text alignSelf="center">©VUHousing 2023</Text>
          </Box>
        </ScrollView>
      </NativeBaseProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 200,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headers: {
    fontFamily: 'AlNile-Bold',
    fontSize: 25,
  },
  information: {
    fontFamily: 'AlNile',
    fontSize: 10,
  },
});

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
      return false
    }
  }
  return true
}
