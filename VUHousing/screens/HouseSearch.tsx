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
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

function HouseSearch() {
  const navigation = useNavigation(); // Initialize navigation

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [houses, setHouses] = useState([]);
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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function clearFilters() {
    setBeds("");
    setBaths("");
    setPrice("");

    const events = firestore().collection('Houses');
    events.get().then((querySnapshot) => {
      const user = [];
      querySnapshot.forEach((doc) => {
        user.push({ id: doc.id, ...doc.data() });
      });
      setUsers(user);
    });
  }

  const FilterQuery = async() => {
    let bedInt = parseInt(beds);
    let bathInt = parseInt(baths);
    let priceInt = parseInt(price)
    let newUser=[]

    // Alert users if filter values are not populated
    if (isNaN(bedInt) && isNaN(bathInt) && isNaN(priceInt)) {
      Alert.alert("Invalid Filter Input", "Please enter a value > 0 for each filter.");
    }

    // Declare minimum bounds for bed and baths, max bound for price
    if(isNaN(priceInt)){
      priceInt=1000000000
    }

    if(isNaN(bedInt)){
      bedInt=0
    }

    if(isNaN(bathInt)){
      bathInt=0
    }
    
    for(let i=0; i<users.length; i++)
    {
      if(users[i].Beds>=bedInt && users[i].Baths>=bathInt && parseInt(users[i].Price)<=priceInt)
      {
        newUser.push(users[i])
      }
    }

    setUsers(newUser)
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
            placeholder="Min Beds"
            w="33%"
            onChangeText={(val) => setBeds(val)}
            value={beds}
          />
          <Input
            placeholder="Min Baths"
            w="33%"
            onChangeText={(val) => setBaths(val)}
            value={baths}
          />
          <Input
            placeholder="Max Price"
            w="33%"
            onChangeText={(val) => setPrice(val)}
            value={price}
          />
        </Box>
        <Box>
          <CoolButton onPress={FilterQuery} clearFilters={clearFilters} isLoading={loading} />
        </Box>

        <View style={styles.table}>
          <View style={[styles.row, styles.headerRow]}>
            <View style={[styles.cell, styles.addressCell]}>
              <Text style={styles.headerText}>Address</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.headerText}>Beds</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.headerText}>Baths</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.headerText}>Price</Text>
            </View>
          </View>
        </View>

        <FlatList
          style={{height:'65%'}}
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomeInfo', { docID: item.id }); // Navigate to the "HomeInfo" screen with docID
              }}
            >
              <View style={styles.row}>
                <View style={[styles.cell, styles.addressCell]}>
                  <Text>{item.Address}</Text>
                </View>
                <View style={styles.cell}>
                  <Text>{item.Beds}</Text>
                </View>
                <View style={styles.cell}>
                  <Text>{item.Baths}</Text>
                </View>
                <View style={styles.cell}>
                  <Text>{item.Price}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);
  const [isLoadingClear, setIsLoadingClear] = useState(false);

  const buttonColorFilter = isLoadingFilter ? '#001F58' : '#007aff';
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
    }, 1000);
  };

  const handlePressClear = () => {
    if (isLoadingClear) {
      return;
    }
    setIsLoadingClear(true);

    setTimeout(() => {
      setIsLoadingClear(false);
      clearFilters();
    }, 1000);
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
            style={{ backgroundColor: buttonColorClear, marginTop: 10, marginBottom: 10 }}
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
  houseTable: {
    justifyContent: "space-evenly",
    minWidth: 350,
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
    marginTop: 20,
    color: 'grey',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  table: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
  },
  cell: {
    flex: 1,
    padding: 5,
  },
  addressCell: {
    flex: 2,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default HouseSearch;
