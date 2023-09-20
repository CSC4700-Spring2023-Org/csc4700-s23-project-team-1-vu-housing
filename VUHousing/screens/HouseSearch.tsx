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

import HouseTable from '../components/HouseTable';
import firestore from '@react-native-firebase/firestore';
import { DataTable } from 'react-native-paper';
import { SectionList } from 'native-base';


function HouseSearch({navigation}) {

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  const [address, setAddress] = useState([]);
  const [beds, setBeds] = useState([]);
  const [baths, setBaths] = useState([]);

  

  const events = firestore().collection('Houses')
  events.get().then((querySnapshot) => {
      const user = []
      const addresses=[]
      querySnapshot.forEach((doc) => {
         user.push({ id: doc.id, ...doc.data() })
         
      })
     
      setUsers(user)

   })
    


    return (
    <View>
      
          <Text style={{textAlign: 'center', marginVertical: 20, fontFamily: 'AlNile-Bold', fontSize: 40}}>House Search</Text>
          
        <Button title='Filter' 
         style={{alignItems: 'left', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 3, borderRadius: 4, elevation: 3, backgroundColor: 'black',}}></Button>

         
         <HouseTable></HouseTable>

       
        <FlatList
          style={{height:'65%'}}
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

      
    );
  }


export default HouseSearch;