import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  useColorScheme,
  StyleSheet,
  View,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';


import { NativeBaseProvider, Box, Button, Text, Input, Hidden } from "native-base";


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
        <Text color="#001F58" marginLeft="3.5rem" fontSize="3xl" bold>House Search</Text>

        <Button
          title="Filter"
          style={styles.filterButton}
          onPress={() => {
            // Implement filter logic here
          }}
        />

        <Box flexDirection="row" >
            <Text color="grey" marginLeft="0.7rem" paddingRight="1rem" fontSize="md" bold>Address</Text>
            <Text color="grey" paddingRight="1.3rem" fontSize="md" bold>Beds</Text>
            <Text color="grey" paddingRight="2.5rem" fontSize="md" bold>Baths</Text>
            <Text color="grey" paddingRight="2.3rem" fontSize="md" bold>Price</Text>
            <Text color="grey" paddingRight="1.3rem" fontSize="md" bold>StreetView</Text>
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
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 3,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
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