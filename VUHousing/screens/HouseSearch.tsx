import React from 'react';
import type {PropsWithChildren} from 'react';
import { useState } from "react";
import SortableTable from '../components/SortableTable';
import data from '../data.json';
import {
    Button,
  SafeAreaView,
  ScrollView,
  VirtualizedList,
  StatusBar,
  StyleSheet,
  Text,
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


function HouseSearch({navigation}) {

    return (
    <View>
          
          <Text style={{textAlign: 'center', marginVertical: 20, fontFamily: 'AlNile-Bold', fontSize: 40}}>House Search</Text>
          
        <Button title='Filter' 
         style={{alignItems: 'left', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 3, borderRadius: 4, elevation: 3, backgroundColor: 'black',}}></Button>
        <SortableTable data={data} />
      </View>   
    );
  }


export default HouseSearch;