import React, {useState, useEffect} from 'react';
import BackButton from './BackButton';

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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//import {FieldValue} from 'firebase-admin/firestore'
import firestore from '@react-native-firebase/firestore';

//image upload
import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';

import {
  NativeBaseProvider,
  Box,
  Text,
  Input,
  Button,
  useToast,
} from 'native-base';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export default function HomeInfo({route, navigation}) {
  const obj = route.params;

  const [address, setAddress] = useState('');
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [price, setPrice] = useState(0);

  const [landlord, setLandlord] = useState('');
  const [streetView, setStreetView] = useState('');
  const [images, setImages] = useState();
  let imageArray = [];
  const [enterButtonStyle, setEnterButtonStyle] = useState('flex');
  const [reviewData, setReviewData] = useState(0.0);
  const [reviewCount, setReviewCount] = useState(0);
  const [userReview, setUserReview] = useState(0.0);
  var [reviewString, setReviewString] = useState('');

  //image upload vars
  const [image, setImage] = useState('');
  //const [selectedImage, setSelectedImage] = useState("");
  let imageName = '';
  let selectedImage = '';
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [review, setReview] = useState(0.0);

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
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    //Write to firestore Textual Database
    const downloadURL = await storage()
      .ref('/' + filenameselectedImage)
      .getDownloadURL();
    const houseReference = await firestore()
      .collection('Houses')
      .doc(obj.docID);

    images?.push(downloadURL);

    const res = houseReference.update({Images: images});

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
          setLandlord(data.Landlord);
          setImages(data.Images);
          setStreetView(data.StreetView);
          setReviewData(data.Review);
          setReviewCount(data.ReviewCount);
          setReviewString('(' + String(reviewCount) + ')');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [obj.docID]);

  const onReviewPress = () => {
    if (ifFieldsEmpty(String(userReview))) {
      Alert.alert('Review Error:', 'Please fill out the field and try again');
      return;
    } else if (userReview < 0 || userReview > 5) {
      Alert.alert('Review Error:', 'Review score must be between 0.0 and 5.0.');
      return;
    } else {
      var floatingReview = eval(userReview);
      var floatingReviewData = eval(reviewData);
      var floatingReviewCount = eval(reviewCount);

      newReview = floatingReviewData * floatingReviewCount + floatingReview;
      var newReviewCount = reviewCount + 1;

      var newReview = (newReview / newReviewCount).toFixed(2);

      firestore()
        .collection('Houses')
        .doc(obj.docID)
        .update({
          Review: newReview,
          ReviewCount: newReviewCount,
        })
        .then(() => {
          console.log('Review added!');
          console.log('Reviews: ' + newReviewCount + ' Score: ' + newReview);
          navigation.navigate('HouseSearch');
        })
        .catch(error => {
          console.error('Error updating review:', error);
        });
    }
  };

  return (
    <ScrollView>
      <NativeBaseProvider>
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
              <Text color="#001F58" fontSize="4xl" bold>
                Address:
              </Text>
              <Text fontSize="md">{address}</Text>

              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={2}>
                <Box flex={1}>
                  <Text color="#001F58" fontSize="4xl" bold>
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

              <Text color="#001F58" fontSize="4xl" bold>
                Price:
              </Text>
              <Text fontSize="md">{price}</Text>

              <Text color="#001F58" fontSize="4xl" bold>
                Landlord Contact:
              </Text>
              <Text fontSize="md">{landlord}</Text>

              <Text color="#001F58" fontSize="4xl" bold>
                Reviews:
              </Text>
              <Text fontSize="md">
                {reviewString} {reviewData}
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

              <Box marginTop="2" marginBottom="2">
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

            <Text color="#001F58" fontSize="4xl" bold>
              Price:
            </Text>
            <Text fontSize="md">{price}</Text>

            <Text color="#001F58" fontSize="4xl" bold>
              Landlord Contact:
            </Text>
            <Text fontSize="md">{landlord}</Text>

            <Text color="#001F58" fontSize="4xl" bold>
              Reviews:
            </Text>
            <Text fontSize="md">
              {reviewString} {reviewData}
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

            <Box marginTop="9">
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
              <Button
                onPress={() =>
                  navigation.navigate('HousePictures', {docID: obj.docID})
                }>
                Picture Button
              </Button>
            </Box>

            <View>
              <Button
                alignSelf="center"
                bgColor="#0085FF"
                size="lg"
                w="200"
                borderRadius="50"
                display={enterButtonStyle}
                _text={{color: '#001F58'}}
                onPress={() => {
                  selectImage();
                }}>
                Upload Images
              </Button>
              <BackButton text="Go Back" />
            </View>

            <View>
              <Button
                onPress={() =>
                  navigation.navigate('HousePictures', {docID: obj.docID})
                }>
                Picture Button
              </Button>
              <BackButton text="Go Back" />
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
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 18,
    lineHeight: 10,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headers: {
    fontFamily: 'AlNile-Bold',
    fontSize: 35,
  },
  information: {
    fontFamily: 'AlNile',
    fontSize: 20,
  },
});

function ifFieldsEmpty(str: string) {
  if (str.length == 0) {
    return true;
  } else {
    return false;
  }
}
