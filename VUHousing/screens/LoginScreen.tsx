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
        <Box margin="100">
          <Text >Welcome Back!</Text>
        </Box>

        <Box bg="#ff0000">
          <Text>Enter Email</Text>
          <Input mx="3" placeholder="Input" w="50%" autoCapitalize="none" onChangeText={(val) => setEmail(val)}/>
        </Box>

        <Box bg="#0000ff">
          <Text>Enter Password</Text>
          <Input mx="3" placeholder="Input" w="75%" type="password" onChangeText={(val) => setPassword(val)}/>
        </Box>
      </Box>

      <Box>
        <Button onPress={() => checkLogin()}>Submit</Button>
      </Box>

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