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

  const FilterQuery = () => {
    console.log('BEDS' + beds);
    console.log('BATHS' + baths);
    console.log('Price' + price);

    // Implement your filtering logic here using beds, baths, and price state variables
  };

  const events = firestore().collection('Houses');
  events.get().then((querySnapshot) => {
    const user = [];
    querySnapshot.forEach((doc) => {
      user.push({ id: doc.id, ...doc.data() });
    });
    setUsers(user);
  });

  const clearFilters = () => {
    setBeds('');
    setBaths('');
    setPrice('');
  };

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

        <View style={styles.houseTable}>
          <HouseTable></HouseTable>
        </View>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <DataTable.Row style={{ marginRight: 60 }} onPress={() => navigation.navigate("HomeInfo", { docID: item.id })}>
              <View style={{ minWidth: 70, maxWidth: 200, marginRight: 10}}>
                <DataTable.Cell>{item.Address}</DataTable.Cell>
              </View>
              
              <View style={{ marginRight: 15, }}>
                <DataTable.Cell>{item.Beds}</DataTable.Cell>    
              </View>
              <View style={{ marginLeft: 35, }}>
                <DataTable.Cell>{item.Baths}</DataTable.Cell>
              </View>

              <View style={{ marginLeft: 50, }}>
                <DataTable.Cell>{item.Price}</DataTable.Cell>
              </View>
            </DataTable.Row>
          )}
          keyExtractor={(item) => item.id}
        />

        <View>
          <BackButton text="Go Back" />
        </View>

      </View>
    </NativeBaseProvider >
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

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'AlNile-Bold',
    fontSize: 40,
  },
  houseTable: {
    justifyContent: "space-evenly",
    minWidth: 350,
    marginLeft: 80,
    marginRight: 80,
  },
  filterButton: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 3,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  banner: {
    flexDirection: 'row',
    marginTop: 20,
    color: 'grey',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 50, // Adjust the width and height as needed
    height: 50,
  },
});

export default HouseSearch;
