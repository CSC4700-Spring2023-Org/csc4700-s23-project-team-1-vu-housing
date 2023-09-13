import React from 'react';
import type {PropsWithChildren} from 'react';
import {
    Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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

export default function ListingCreated({navigation}) {

    return (
      <View id="main" style={{alignItems:'center'}}>

          <View id="confirm_text" style={{paddingVertical:150}}>
          <Text style={{fontFamily:"AlNile-Bold",fontSize:50,color:'black'}}>Thank you!</Text>
          </View>

          <View id="listing_buttons" style={{paddingVertical:30,paddingHorizontal:50}}>
          <TouchableOpacity onPress={()=>navigation.navigate('HouseSearch')} style={{alignItems:'center',padding:10}}>
            <View>
              <Text style={{fontFamily:'AlNile-Bold', fontSize:25, borderWidth: 1, borderRadius: 20, borderColor:'blue', backgroundColor: "#001558", color:'white'}}>Search Other Listings</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('AddListing')} style={{alignItems:'center',padding:20, marginVertical:50}}>
            <View >
              <Text style={{fontFamily:'AlNile-Bold',fontSize:25, borderWidth: 1, borderRadius: 20, borderColor:'blue', backgroundColor: "#001558", color:'white'}}>Create Another Listing</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>

    );
  }