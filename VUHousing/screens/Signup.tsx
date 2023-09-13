import React, { useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




export default function Signup({ navigation }) {

  const [name, setName] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRE, setPasswordRE] = useState('');

  var passwordValid = true
  var validEmail = true
  var validName = true
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
    
    var phoneFormat = phoneCheck(phone.substring(0,3)) && phone.substring(3,4).includes('-')
      && phoneCheck(phone.substring(4,7)) && phone.substring(7,8).includes('-') 
      && phoneCheck(phone.substring(8,12)) && phone.length == 12

    if (phoneFormat == false) {
      Alert.alert("Phone Number Error", "Invalid Phone Number Please input it using this format '###-###-####'")
    }

    if (phoneFormat && passwordValid && validEmail && validName) {
      navigation.navigate("HomeScreen")
    }

  }
  

  return (
    
    <View>
      <ScrollView>
        <Text style={styles.header}>Create An Account</Text>

        <Text style={styles.titles}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Jay Wright"
          keyboardType="default"
          onChangeText={(val) => setName(val)} />

        <Text style={styles.titles}>Enter Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="425-391-1665"
          keyboardType="numeric"
          onChangeText={(val) => setPhoneNumber(val)} />

        <Text style={styles.titles}>Enter Villanova Email</Text>
        <TextInput
          style={styles.input}
          placeholder="jwright@villanova.edu"
          keyboardType="default"
          onChangeText={(val) => setEmail(val)} />

        <Text style={styles.titles}>Enter Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Go Cats!"
          secureTextEntry={true}
          keyboardType="default"
          onChangeText={(val) => setPassword(val)} />

        <Text style={styles.titles}>Re-enter Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder='Go Cats!'
          keyboardType="default"
          onChangeText={(val) => setPasswordRE(val)} />
        <TouchableOpacity onPress={() => onSubmitPress()} style={{
          alignSelf: 'center', alignItems:"center", padding: 20, marginVertical: 10, width: 150,
          borderWidth: 2, borderRadius: 20, borderColor: 'black', backgroundColor: '#001E58'
        }}>
          <View >
            <Text style={{ fontFamily: 'AlNile-Bold', fontSize: 25, color: "#fff" }}>Submit</Text>
          </View>
        </TouchableOpacity>

      </ScrollView> 
    </View>
    
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  header: {
    fontSize: 40,
    margin: 10,
    alignSelf: "center",
    fontFamily: 'Georgia',
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

function isNumeric(str: string) {
  if (str == "1" || str == "2" || str == "3" || str ==  "4" 
  || str ==  "5" || str ==  "6" || str ==  "7" || str ==  "8" || str ==  "9" || str ==  "0") {
    return true
  }
  else {
    return false
  }
}
  function phoneCheck(str: string) {
    for(var counter:number = 0; counter<str.length; counter++) {
      if (isNumeric(str.substring(counter, counter+1)) == false) {
        return false
      }
    }
    return true
  }
