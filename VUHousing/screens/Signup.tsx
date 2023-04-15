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

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRE, setPasswordRE] = useState('');

  var slicedEmail = email.slice(email.indexOf('@'))
  var invalidEmail = "This is not a valid email address. Please use a villanova.edu email to register."

  return (
    
    <View>
      <Text style={styles.header}>Create An Account</Text>

      <Text style={styles.titles}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Jay"
        keyboardType="default"
        onChangeText={(val) => setFirst(val)} />

      <Text style={styles.titles}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Wright"
        keyboardType="default"
        onChangeText={(val) => setLast(val)} />

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
      <TouchableOpacity onPress={() => { slicedEmail !== '@villanova.edu' ? Alert.alert(invalidEmail): null }} style={{
        alignSelf: 'center', alignItems:"center", padding: 20, marginVertical: 10, width: 150,
        borderWidth: 2, borderRadius: 20, borderColor: 'black', backgroundColor: '#001E58'
      }}>
        <View >
          <Text style={{ fontFamily: 'AlNile-Bold', fontSize: 25, color: "#fff" }}>Submit</Text>
        </View>
      </TouchableOpacity>

      
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