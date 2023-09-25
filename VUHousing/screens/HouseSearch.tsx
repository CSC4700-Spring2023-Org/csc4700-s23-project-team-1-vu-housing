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
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore().collection('Houses').get();
        const userData = [];

        querySnapshot.forEach((doc) => {
          userData.push({ id: doc.id, ...doc.data() });
        });

        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Handle the error gracefully
      }
    };

    fetchData();
  }, []);


  const events = firestore().collection('Houses');
  events.get().then((querySnapshot) => {
    const user = [];
    querySnapshot.forEach((doc) => {
      user.push({ id: doc.id, ...doc.data() });
    });
    setUsers(user);
  });



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
        <Box alignItems="center" marginTop="5" marginBottom="5">
          <Text color="#001F58" fontSize="3xl" bold>
            House Search
          </Text>
          <CoolButton onPress={FilterQuery} clearFilters={clearFilters} isLoading={loading} />
        </Box>

        <Box flexDirection={'row'} w="99%">
          <Input
            placeholder="Beds"
            w="33%"
            onChangeText={(val) => setBeds(val)}
            value={beds}
          />
          <Input
            placeholder="Baths"
            w="33%"
            onChangeText={(val) => setBaths(val)}
            value={baths}
          />
          <Input
            placeholder="Price"
            w="33%"
            onChangeText={(val) => setPrice(val)}
            value={price}
          />
        </Box>

        {/* Render your HouseTable and other components here */}

        <FlatList
          style={{ height: '65%' }}
          data={users}
          renderItem={({ item }) => (
            <DataTable.Row onPress={() => navigation.navigate('HomeInfo', { docID: item.id })}>
              <DataTable.Cell>{item.Address}</DataTable.Cell>
              <DataTable.Cell>{item.Beds}</DataTable.Cell>
              <DataTable.Cell>{item.Baths}</DataTable.Cell>
              <DataTable.Cell>{item.Price}</DataTable.Cell>
            </DataTable.Row>
          )}
          keyExtractor={(item) => item.id}
        />

        <View>
          <BackButton text="Go Back" />
        </View>

      </View>
    </NativeBaseProvider>
  );
}

const CoolButton = ({ onPress, clearFilters, isLoading }) => {
  const [isLoadingFilter, setIsLoadingFilter] = useState(false); // State for the Filter button
  const [isLoadingClear, setIsLoadingClear] = useState(false);   // State for the Clear Filters button

  const buttonColorFilter = isLoadingFilter ? '#b2d7e6' : '#007aff'; // Light blue when loading, dark blue when not
  const buttonColorClear = isLoadingClear ? '#b2d7e6' : '#007aff';

  const handlePressFilter = () => {
    if (isLoadingFilter) {
      return;
    }
    setIsLoadingFilter(true);

    setTimeout(() => {
      setIsLoadingFilter(false);
      if (onPress) {
        onPress();
      } else {
        console.log('Filter Clicked!');
      }
    }, 1000); // Replace with your actual async call
  };

  const handlePressClear = () => {
    if (isLoadingClear) {
      return;
    }
    setIsLoadingClear(true);

    setTimeout(() => {
      setIsLoadingClear(false);
      clearFilters(); // Call clearFilters function when Clear Filters button is pressed
      console.log('Clear Filters Clicked!');
    }, 1000); // Replace with your actual async call
  };

  return (
    <View>
      <Box flexDirection='row' alignItems="center" alignSelf='center'>
        <Animatable.View animation={isLoadingFilter ? 'swing' : undefined}>
          <Button
            style={{ backgroundColor: buttonColorFilter }}
            mode="contained"
            onPress={handlePressFilter}
            disabled={isLoadingFilter}
          >
            {isLoadingFilter ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: 'white' }}>Filter</Text>
            )}
          </Button>
        </Animatable.View>
        <Animatable.View animation={isLoadingClear ? 'swing' : undefined}>
          <Button
            style={{ backgroundColor: buttonColorClear }}
            mode="contained"
            onPress={handlePressClear}
            disabled={isLoadingClear}
          >
            {isLoadingClear ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: 'white' }}>Clear Filters</Text>
            )}
          </Button>
        </Animatable.View>
      </Box>
    </View>
  );
};

export default HouseSearch;
