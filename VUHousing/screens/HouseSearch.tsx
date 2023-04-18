import React from 'react';
import type {PropsWithChildren} from 'react';
import { useState } from "react";
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
  FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import TableExample from '../components/DataTable';
import firestore from '@react-native-firebase/firestore';


function HouseSearch({navigation}) {

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users

  const subscriber = firestore()
    .collection('Houses')
    .onSnapshot(querySnapshot => {
      const users = [];

      querySnapshot.forEach(documentSnapshot => {
        users.push({
          key: documentSnapshot.id,
          address:documentSnapshot.data().Address,
          beds:documentSnapshot.data().beds
        });
      });

      setUsers(users);
      setLoading(false);
    });


    return (
    <View>
          <Text style={{textAlign: 'center', marginVertical: 20, fontFamily: 'AlNile-Bold', fontSize: 40}}>House Search</Text>
          
        <Button title='Filter' 
         style={{alignItems: 'left', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 3, borderRadius: 4, elevation: 3, backgroundColor: 'black',}}></Button>
         

         <FlatList
          data={users}
          renderItem={({ item }) => (
          <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>User ID: {item.id}</Text>
          <Text>User Name: {item.address}</Text>
        </View>
      )}
    />
      </View>   

      
    );
  }


export default HouseSearch;