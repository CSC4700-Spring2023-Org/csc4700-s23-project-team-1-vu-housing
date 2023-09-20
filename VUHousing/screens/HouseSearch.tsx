import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { useState } from "react";
import { 
  SafeAreaView,
  Text,
  useColorScheme,
  View,
  Image,
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
    <ScrollView>
      <Text style={styles.title}>House Search</Text>

      <Button
        title="Filter"
        style={styles.filterButton}
        onPress={() => {
          // Implement filter logic here
        }}
      />
      
      <View style={styles.banner}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.label}>Beds</Text>
        <Text style={styles.label}>Baths</Text>
        <Text style={styles.label}>Price</Text>
        <Text style={styles.label}>StreetView</Text>
      </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'AlNile-Bold',
    fontSize: 40,
  },
  filterButton: {
    alignItems: 'left',
    justifyContent: 'center',
    paddingVertical: 12,
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