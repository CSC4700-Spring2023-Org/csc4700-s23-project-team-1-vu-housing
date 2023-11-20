type SectionProps = PropsWithChildren<{
  title: string;
}>;

import React, {useEffect, useState} from 'react';
import BackButton from './BackButton';

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

import {
  NativeBaseProvider,
  Box,
  Text,
  Input,
  Button,
  useToast,
} from 'native-base';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//import database from '@react-native-firebase/database';

export default function WelcomeScreen({route, navigation}) {
  var logo = '';
  function setWord() {
    logo =
      'https://firebasestorage.googleapis.com/v0/b/vu-housing.appspot.com/o/cityBackgroundAI.jpg?' +
      'alt=media&token=04e625ef-9a7b-4af5-b214-d976d085889c&_gl=1*1nhr3e4*_ga*NjExOTkyNTQ1LjE2ODE3Nzc5MzY.' +
      '*_ga_CW55HF8NVT*MTY5NjE5OTAzNy4xMC4xLjE2OTYxOTk1MjEuNTUuMC4w';
    console.log(logo);
  }

  setWord();
  {
    /*
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const imagePath = 'gs://vu-housing.appspot.com/cityBackgroundAI.jpg';

    // Reference to the image in Firebase Realtime Database
    const imageRef = database().ref(imagePath);

    // Fetch the image URL
    const getImageUrl = async () => {
      try {
        const snapshot = await imageRef.once('value');
        const imageURL = snapshot.val();
        setImageUrl(imageURL);
      } catch (error) {
        console.error('Error fetching image URL', error);
      } finally {
        setLoading(false);
      }
    };

    getImageUrl();

    // Cleanup function
    return () => {
      // Remove any listeners or subscriptions here if needed
    };
  }, []);


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }*/
  }

  return (
    <NativeBaseProvider>
      <Box style={styles.container}>
        <View style={styles.content}>
          <Text fontSize="4xl" bold>
            Nova House
          </Text>

          <View
            id="LogoBand"
            style={{
              backgroundColor: 'whitesmoke',
              width: Dimensions.get('screen').width,
              alignItems: 'center',

              marginTop: 0,
            }}
          >


            <Image style={styles.image} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/vu-housing.appspot.com/o/banner.png?alt=media&token=8f6c97bf-abd6-47b6-a9a9-b601ae85d276&_gl=1*xikd8u*_ga*NjExOTkyNTQ1LjE2ODE3Nzc5MzY.*_ga_CW55HF8NVT*MTY5NjI1OTQwNy4xMS4xLjE2OTYyNjA3ODUuNDguMC4w'}}/>
           
          </View>

          <Button
            onPress={() => navigation.navigate('LoginScreen')}
            bgColor="#001F58"
            margin="5"
            size="lg"
            w="200"
            h="75"
            borderRadius="5">
            Login
          </Button>
          <Box marginTop="1" width="75%" alignItems="center">
            <Text fontSize="lg" color="#C0C0C0" italic>
              Don't have an account yet?
            </Text>
          </Box>
          <Button
            onPress={() => navigation.navigate('Signup')}
            bgColor="#001F58"
            margin="5"
            size="lg"
            w="200"
            h="75"
            borderRadius="5">
            Sign Up
          </Button>
        </View>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  content: {
    marginTop: 20,
    width: '75%',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});
