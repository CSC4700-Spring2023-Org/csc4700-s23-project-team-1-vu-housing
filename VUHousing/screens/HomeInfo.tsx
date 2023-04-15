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

export default function HomeInfo({navigation}) {
  return (
    //TODO: CHange Navigation
    <View id="main">
         <View id="LogoBand" style={{backgroundColor:'#0085FF',width:Dimensions.get('screen').width,alignItems:'center',marginTop:100}}>
         <Image
         style={{height:125,width:125}}
         source = {require('VUHousing/images/Logo.png')}
         />
        </View>

        <View id="TextInformation">
            <View id="Address information" style={{margin:20}}>
                <Text style={styles.headers}>Address:</Text>
                <Text style={styles.information}>FillerAddress</Text>
            </View>   
            <View id ="BedAndBath" style={{flexDirection:'row', margin:10}}>
                <View id="bed"style={{marginLeft:10,marginRight:45}}>
                    <Text style={styles.headers}>Beds</Text>
                    <Text style={styles.information}>FillerBeds</Text>
                </View>
                <View id="Bath" style={{marginLeft:45}}>
                    <Text style={styles.headers}>Bath</Text>
                    <Text style={styles.information}>Filler Baths</Text>
                </View>
            </View>
            <View id="price" style={{margin:20}}>
                <Text style={styles.headers}>Price</Text>
                <Text style={styles.information}>Filler Price</Text>
            </View>      
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
  headers:{
    fontFamily:"AlNile-Bold",
    fontSize:35
  },
  information:{
    fontFamily:"AlNile",
    fontSize:20
  }
});


