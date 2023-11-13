import React from 'react';
import type { PropsWithChildren } from 'react';
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

import BackButton from './BackButton';



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
import { NativeBaseProvider, Text, Box, Input, Button, useToast } from "native-base";


function HouseSearch({ navigation }) {

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users



  const events = firestore().collection('Users')
  events.get().then((querySnapshot) => {
    const user = []
    querySnapshot.forEach((doc) => {
      user.push({ id: doc.id, ...doc.data() })
    })
    setUsers(user)
  })

  //TODO: ADD Query that just gets everyone who has the needsRoomate attribute

  return (
    <NativeBaseProvider>
      <Box alignItems="center" marginTop="10" marginBottom="5" >
        <Text fontSize="4xl" bold>Roommate Search</Text>
      </Box>



      <UserTable></UserTable>

      <FlatList
        data={users}
        renderItem={({ item }) => (
          <DataTable.Row>
            <DataTable.Cell>{item.Name}</DataTable.Cell>
            <DataTable.Cell>{item.Email}</DataTable.Cell>
            <DataTable.Cell>{item.PhoneNumber}</DataTable.Cell>
          </DataTable.Row>
        )}
      />

      <View>
        <BackButton text="Go Back" />
      </View>
    </NativeBaseProvider>


  );
}


export default HouseSearch;