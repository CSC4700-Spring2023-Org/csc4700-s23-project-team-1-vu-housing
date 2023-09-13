import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  Alert
} from 'react-native';

import { NativeBaseProvider, Text, Box, Input,Button,useToast } from "native-base";
import firestore from '@react-native-firebase/firestore';




export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState(""); // Email that is inputted
  const [password, setPassword] = useState(""); // Password that is inputted

  

  async function checkLogin() {
    const userCollection = firestore().collection('Users')
    //Create an alert if the password field or email field is Empty
    if(password.length==0){
      Alert.alert("Password Field Empty", "Please Enter a non-empty password to login")
    }
    if(email.length == 0){
      Alert.alert("Email Field Empty", "Please Enter a non-empty email to login")
    }
    //Otherwise Query the database on email and password
    else{
    const user =  await userCollection.where('Email',"==",email).where("Password","==",password).get()
      //if not user exists, throw and alert... Otherwise navigate to homeScreen.
    if(user.empty){
      Alert.alert("No User Found","Unable to find user with specified credential. Please Retry")
    }
    else{
     navigation.navigate("HomeScreen")
    }
  }
    
  }
  

  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#ffffff" alignItems="center"  >
        <Box marginTop="75"  width="75%" alignItems="center">
          <Text fontSize="4xl" bold>Welcome Back!</Text>
          <Text fontSize="lg" marginTop="5">Enter Login Information Below</Text>
        </Box>

        <Box width='75%' marginTop="50">
        <Box flexDirection="column" >
          <Text color="#001F58"fontSize="2xl" bold >Enter Email</Text>
          <Input borderColor="#001F58" borderRadius="10" borderWidth="2" mx="2" placeholder="JWright@villanova.edu" w="100%" autoCapitalize="none" h="50" fontSize="lg" onChangeText={(val) => setEmail(val)}/>
        </Box>

        <Box marginTop="25">
          <Text color="#001F58"fontSize="2xl" bold>Enter Password</Text>
          <Input  borderColor="#001F58" borderRadius="10" borderWidth="2" mx="2" placeholder="Password" fontSize="lg" w="100%" type="password" h="50" onChangeText={(val) => setPassword(val)}/>
        </Box>
        </Box>

      <Box marginTop="9" >
        <Button bgColor="#0085FF" size="lg" w="200" borderRadius="50" _text={{ color: '#001F58' }} onPress={() => checkLogin()} >Submit</Button>
      </Box>

      </Box>

      <Text alignSelf="center">©VUHousing 2023</Text>

      

    </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    marginTop:60,
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