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
      }
    };

    fetchData();
  }, []);

  return (
    <NativeBaseProvider>
      <View style={styles.header}>
        <Text color="#001F58" fontSize="3xl" bold>House Search</Text>
        <CoolButton onPress={() => console.log('Filter Button Pressed!')} />
      </View>

      <Box flexDirection="row" >
        <Text color="grey" marginLeft="0.7rem" paddingRight="1rem" fontSize="md" bold>Address</Text>
        <Text color="grey" paddingRight="1.3rem" fontSize="md" bold>Beds</Text>
        <Text color="grey" paddingRight="2.5rem" fontSize="md" bold>Baths</Text>
        <Text color="grey" paddingRight="2.3rem" fontSize="md" bold>Price</Text>
        <Text color="grey" paddingRight="0.5rem" fontSize="md" bold>StreetView</Text>
      </Box>

      <FlatList
        data={users}
        renderItem={({ item }) => (
          <DataTable.Row
            onPress={() => navigation.navigate('HomeInfo', { docID: item.id })}
          >
            <DataTable.Cell>{item.Address}</DataTable.Cell>
            <DataTable.Cell>{item.Beds}</DataTable.Cell>
            <DataTable.Cell>{item.Baths}</DataTable.Cell>
            <DataTable.Cell>{item.Price}</DataTable.Cell>
            <DataTable.Cell>
              <View style={styles.container}>
                <Image source={{ uri: item.StreetView }} style={styles.image} />
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        )}
        keyExtractor={(item) => item.id}
      />

      <View>
        <BackButton text="Go Back" />
      </View>
    </NativeBaseProvider >
  );
}

const CoolButton: React.FC<CoolButtonProps> = ({ onPress }) => {
  const [isLoading, setIsLoading] = useState(false);

  interface CoolButtonProps {
    onPress?: () => void;
  }

  const buttonColor = isLoading ? '#b2d7e6' : '#007aff'; // Light blue when loading, dark blue when not


  const handlePress = () => {
    if (isLoading) {
      return; // Prevent pressing the button again while it's loading
    }

    setIsLoading(true);

    // Simulating an API call or any other async operation
    setTimeout(() => {
      setIsLoading(false);
      if (onPress) {
        onPress();
      } else {
        console.log('Clicked!');
      }
    }, 1000); // Replace with your actual async call
  };
  return (
    <Animatable.View animation={isLoading ? 'swing' : undefined}>
      <Button style={{ backgroundColor: buttonColor }}
        mode="contained"
        onPress={handlePress}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={{ color: 'white' }}>Filter</Text>
        )}
      </Button>
    </Animatable.View>


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

