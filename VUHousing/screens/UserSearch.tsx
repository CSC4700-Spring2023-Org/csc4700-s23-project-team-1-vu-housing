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

import UserTable from '../components/UserTable';
import firestore from '@react-native-firebase/firestore';
import { DataTable } from 'react-native-paper';


function HouseSearch({navigation}) {

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users

  

  const events = firestore().collection('Houses')
  events.get().then((querySnapshot) => {
      const user = []
      querySnapshot.forEach((doc) => {
         user.push({ id: doc.id, ...doc.data() })
      })
      setUsers(user)
   })
    


    return (
    <View>
          <Text style={{textAlign: 'center', marginVertical: 20, fontFamily: 'AlNile-Bold', fontSize: 40}}>Roommate Search</Text>
          
       
         <UserTable></UserTable>

         <FlatList
          data={users}
          renderItem={({ item }) => (
         <DataTable.Row>
          <DataTable.Cell>{item.Address}</DataTable.Cell>
          <DataTable.Cell>{item.Beds}</DataTable.Cell>
          <DataTable.Cell>{item.Baths}</DataTable.Cell>
          <DataTable.Cell>{item.Price}</DataTable.Cell>
         </DataTable.Row>
      )}
    />
      </View>   

      
    );
  }


export default HouseSearch;