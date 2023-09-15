import React from 'react';
import type {PropsWithChildren} from 'react';
import { useState } from "react";
import { 
  SafeAreaView,
  ScrollView,
  VirtualizedList,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import {NativeBaseProvider, Text, Box, Input, useToast, Button} from "native-base";


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import TableExample from '../components/DataTable';
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
    <NativeBaseProvider>
      <View>
        <Text style={{textAlign: 'center', marginVertical: 20, fontFamily: 'AlNile-Bold', fontSize: 40}}>House Search</Text>
            
        <Button title='Filter' 
          style={{alignItems: 'center', paddingVertical: 12, paddingHorizontal: 3, borderRadius: 4, elevation: 3, backgroundColor: 'black',}}>Filter Button</Button>
          <TableExample></TableExample>

          <FlatList
          data={users}
          renderItem={({ item }) => (
          <DataTable.Row onPress={()=>navigation.navigate("HomeInfo",{docID:item.id})}>
          <DataTable.Cell>{item.Address}</DataTable.Cell>
          <DataTable.Cell>{item.Beds}</DataTable.Cell>
          <DataTable.Cell>{item.Baths}</DataTable.Cell>
          <DataTable.Cell>{item.Price}</DataTable.Cell>
          </DataTable.Row>
        )}
      />
      </View>
    </NativeBaseProvider>         
    );
  }


export default HouseSearch;