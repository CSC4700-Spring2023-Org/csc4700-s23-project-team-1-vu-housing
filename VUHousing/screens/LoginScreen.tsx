import React from 'react';
import type {PropsWithChildren} from 'react';
import {
    Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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




export default function LoginScreen({navigation}) {

  return (
    <View>
      <Text style={styles.header}>Login</Text>

      <Text style={styles.titles}>Enter Villanova Email</Text>
      <TextInput
      style={styles.input}
      placeholder="jwright@villanova.edu"
      keyboardType="default" />

      <Text style={styles.titles}>Enter Password</Text>
        <TextInput
        style={styles.input}
        placeholder="Go Cats!"
        secureTextEntry={true}
        keyboardType="default" />
      </View>
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