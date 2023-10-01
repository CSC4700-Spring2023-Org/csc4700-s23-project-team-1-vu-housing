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
  Alert,
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


  // const events = firestore().collection('Houses');
  // events.get().then((querySnapshot) => {
  //  const user = [];
  //  querySnapshot.forEach((doc) => {
  //    user.push({ id: doc.id, ...doc.data() });
  //  });
  //  setUsers(user);
  // });



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

    let bedInt = parseInt(beds); 
    let bathInt = parseInt(baths);  
    
    // Check if filter inputs are non-zero, alert if any are zero (might change later on)
    if(bedInt == 0 || bathInt == 0 || price == "")
    {
      Alert.alert("Invalid Filter Input", "Please enter a value > 0 for each filter.");
    }

    // Query database for entries according to filter values
    // Note: can only use inequality on one field, must use == on others. 
    // Alternate approach could be to generate three different queries then combine the results at the end then display....
    const events = firestore().collection('Houses').where("Beds","==",bedInt).where("Bath","==",bathInt).where("Price","==",price)
    events.get().then((querySnapshot) => {
      const user = []
      querySnapshot.forEach((doc) => {
        console.log("did filter thing"); 
        user.push({ id: doc.id, ...doc.data() });
      })
      setUsers(user)
   })
   }
    

  return (
    <NativeBaseProvider>
      <View>
        <Box alignItems="center" marginTop="2" marginBottom="2">
          <Text color="#001F58" fontSize="3xl" bold>
            House Search
          </Text>

          <Text color="#3eb7e5" fontSize="md" bold>
            Filter Houses
          </Text>
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
        <Box>
          <CoolButton onPress={FilterQuery} clearFilters={clearFilters} isLoading={loading} />
        </Box>

        {/* Render your HouseTable and other components here */}
        <HouseTable></HouseTable>

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

  const buttonColorFilter = isLoadingFilter ? '#001F58' : '#007aff'; // Light blue when loading, dark blue when not
  const buttonColorClear = isLoadingClear ? '#001F58' : '#007aff';

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
            style={{ backgroundColor: buttonColorFilter, marginRight: 20, marginTop: 10, marginBottom: 10 }}
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
            style={{backgroundColor: buttonColorFilter, marginTop: 10, marginBottom: 10 }}
            mode="contained"
            onPress={handlePressClear}
            disabled={isLoadingClear}
          >
            {isLoadingClear ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: 'white' }}>Clear</Text>
            )}
          </Button>
        </Animatable.View>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'AlNile-Bold',
    fontSize: 40,
  },
  filterButton: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingRight: 15,
    paddingHorizontal: 3,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50, // Adjust the width and height as needed
    height: 50,
  },
});

export default HouseSearch;
