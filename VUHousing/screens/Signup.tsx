import React, { useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import BackButton from './BackButton';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
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
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Box, Button, Text, Input, Hidden } from 'native-base';

export default function Signup({ navigation }) {

  const [name, setName] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [passwordRE, setPasswordRE] = useState('');

  

  
  var passwordValid = true
  var validEmail = true
  var validName = true

  async function checkValidityAndSubmit(){
    const userCollection = firestore().collection('Users')
    const user = await userCollection.where('Email', "==", email).get()
      //if not user exists, throw and alert... Otherwise navigate to homeScreen.
      if (!user.empty) {
        Alert.alert("Email In Use", "There is already a user with this email. Please try logging in")
      }
      else {
       onSubmitPress()
      }
  }

  const onSubmitPress = () => {
    
    

    if (name.length === 0) {
      validName = false
      Alert.alert("Name Error", "User's name field cannot be empty. Please fill this out")
    }
    if (password !== passwordRE) {
      passwordValid = false
      Alert.alert("Password Error", "Passwords don't match. Please try again")
    }
    else if (password.length === 0) {
      passwordValid = false
      Alert.alert("Password Error", "Passwords field cannot be blank. Please fill this out")

    }
    var slicedEmail = email.slice(email.indexOf('@'))
    var invalidEmail = "This is not a valid email address. Please use a villanova.edu email to register."
    if (slicedEmail !== '@villanova.edu') {
      validEmail = false
      Alert.alert('Invalid Email', invalidEmail);
    } 
  

    var phoneFormat = phoneCheck(phone.substring(0, 10)) && phone.length == 10

    if (phoneFormat == false) {
      Alert.alert("Phone Number Error", "Invalid Phone Number Please input it using this format '###-###-####'")
    }

    if (phoneFormat && passwordValid && validEmail && validName) {
      //New Writing to data base Section
      firestore()
        .collection('Users')
        .add({
          Name: name,
          Email: email,
          PhoneNumber: phone,
          Password: password
        })
        .then(() => {
          console.log('User added!');
          navigation.navigate("HomeScreen")
        });
    }
    else {
      Alert.alert("Invalid input", "Please try to fill out this form again")
    }
  }


  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#ffffff" alignItems="center"  >
        <View>
          <ScrollView>
            <Text color="#001F58" fontSize="2xl" bold>Create an Account</Text>

            <Box flexDirection="column" >
              <Text color="#001F58" fontSize="2xl" bold>Full Name</Text>
              <Input borderColor="#001F58" borderRadius="10" marginBottom={6} borderWidth="2" placeholder="Jay Wright"
                w="100%" autoCapitalize="none" h="50" fontSize="sm"
                onChangeText={(val) => setName(val)} />
            </Box>

            <Box flexDirection="column" >
              <Text color="#001F58" fontSize="2xl" bold>Phone Number</Text>
              <Input borderColor="#001F58" borderRadius="10" marginBottom={6} borderWidth="2" placeholder="##########"
                w="100%" autoCapitalize="none" h="50" fontSize="sm"
                onChangeText={(val) => setPhoneNumber(val)} />
            </Box>

            <Box flexDirection="column" >
              <Text color="#001F58" fontSize="2xl" bold>Enter Villanova Email</Text>
              <Input borderColor="#001F58" borderRadius="10" marginBottom={6} borderWidth="2" placeholder="jwright@villanova.edu"
                w="100%" autoCapitalize="none" h="50" fontSize="sm"
                onChangeText={(val) => setEmail(val)} />
            </Box>

            <Box flexDirection="column" >
              <Text color="#001F58" fontSize="2xl" bold>Enter Password</Text>
              <Input borderColor="#001F58" borderRadius="10" marginBottom={6} borderWidth="2" placeholder="Go Cats!"
                w="100%" autoCapitalize="none" h="50" fontSize="sm"
                onChangeText={(val) => setPassword(val)} />
            </Box>

            <Box flexDirection="column" >
              <Text color="#001F58" fontSize="2xl" bold>Re-Enter Password</Text>
              <Input borderColor="#001F58" borderRadius="10" marginBottom={6} borderWidth="2" placeholder="Go Cats!"
                w="100%" autoCapitalize="none" h="50" fontSize="sm"
                onChangeText={(val) => setPasswordRE(val)} />
            </Box>

            <Box marginTop="9" >
              <Button alignSelf="center"
                bgColor="#0085FF" size="lg" w="200" borderRadius="50" _text={{ color: '#001F58' }}
                onPress={() => { checkValidityAndSubmit() }}>
                Submit
              </Button>
            </Box>

            <View>
              <BackButton text="Go Back" />
            </View>

          </ScrollView>
        </View>
      </Box>
    </NativeBaseProvider>

  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
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
