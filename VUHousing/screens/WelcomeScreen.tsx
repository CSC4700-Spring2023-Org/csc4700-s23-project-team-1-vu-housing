/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
    Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

export default function Welcome({navigation}) {
  return ( 
    //TODO: CHange Navigation
    <View id="main">
        <View id="LogoBand" style={{backgroundColor:'#0085FF',width:Dimensions.get('screen').width,alignItems:'center',marginTop:150}}>
         <Image
         style={{height:125,width:125}}
         source = {require('VUHousing/images/Logo.png')}
         />
        </View>

        <View id="NovaHouse Title" style={{alignItems:'center'}}>
          <Text style={{fontFamily:"AlNile-Bold",fontSize:50,color:"#001F58"}}>Nova House</Text>
        </View>

        <View id="Login/SignUp Buttons"style={{paddingVertical:50,paddingHorizontal:50}}>
          <TouchableOpacity onPress={()=>navigation.navigate('AddListing')} style={{alignItems:'center',padding:20}}>
            <View>
              <Text style={{fontFamily:'AlNile-Bold',fontSize:25}}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')} style={{alignItems:'center',padding:20, marginVertical:5}}>
            <View >
              <Text style={{fontFamily:'AlNile-Bold',fontSize:25}}>Login</Text>
            </View>
          </TouchableOpacity>
          
          
          
        </View>
    </View>

       
       
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


