import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import BackButton from './BackButton';
import {
  SafeAreaView,
  useColorScheme,
  StyleSheet,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { NativeBaseProvider, Box, Text, Input, Hidden } from "native-base";


import HouseTable from '../components/HouseTable';
import firestore from '@react-native-firebase/firestore';
import { DataTable } from 'react-native-paper';
import { Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

function HouseSearch({ navigation }) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  const [address, setAddress] = useState([]);
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [price, setPrice]=useState("")

  
  

  const events = firestore().collection('Houses')
  events.get().then((querySnapshot) => {
      const user = []
      querySnapshot.forEach((doc) => {
         user.push({ id: doc.id, ...doc.data() })
      })
      setUsers(user)
   })



   function clearFilters(){
    setBeds("");
    setBaths("");
    setPrice("");
   }
 //TODO: DP Just check if the text values are nonzero and if they are then query based on non-ZeroInputs
 //TODO: Rewrite this function by using the above code to query the Houses Collection. Reference
 // The code in checkLogin() on LoginScreen.tsx. Might need to make this an async function

   function FilterQuery(){
    console.log("BEDS: "+beds)
    console.log("BATHS: "+baths)
    console.log("{Price} "+price)
   }
    

  return (
    <NativeBaseProvider>


      <View>
      <Box alignItems="center" marginTop="5" marginBottom="5" >
        <Text fontSize="4xl" bold>House Search</Text>
      </Box>
            
     
          <Box flexDirection={'row'} w='99%'>
            <Input placeholder='Beds' w='33%' onChangeText={(val) => setBeds((val))} value={String(beds)}></Input>
            <Input placeholder='Baths' w='33%' onChangeText={(val) => setBaths((val))} value={String(baths)}></Input>
            <Input placeholder='Price' w='33%' onChangeText={(val) => setPrice((val))} value={String(price)}></Input>
          </Box>
          <Box flexDirection='row' alignItems="center" alignSelf='center'>
            <Button title='filter' bgColor="#001F58" size="sm" w="100" alignSelf={'center'} borderRadius="50" _text={{ color: '#FFFFFF' }} onPress={() => FilterQuery()} >Filter</Button>
            <Button title='clear' bgColor="#001F58" size="sm" w="100" alignSelf={'center'} borderRadius="50" _text={{ color: '#FFFFFF' }} onPress={() => clearFilters()} >Clear</Button>
          </Box>
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
        keyExtractor={(item) => item.id}
      />
      </View>
    </NativeBaseProvider >
  );
}



const styles = StyleSheet.create({
  filterButton: {
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    color: 'grey',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70, // Adjust the width and height as needed
    height: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
});

export default HouseSearch;

