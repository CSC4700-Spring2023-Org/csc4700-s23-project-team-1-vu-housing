import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
  
const UserTable = () => {
  return (
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Email</DataTable.Title>
        <DataTable.Title>Phone #</DataTable.Title>
      </DataTable.Header>
    </DataTable>
  );
};


  
export default UserTable;

  
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
}); 