import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
  
const TableExample = () => {
  return (
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Address</DataTable.Title>
        <DataTable.Title>Beds</DataTable.Title>
        <DataTable.Title>Bath</DataTable.Title>
        <DataTable.Title>Price</DataTable.Title>
        <DataTable.Title>Link</DataTable.Title>
        
      </DataTable.Header>
    </DataTable>
  );
};
  
export default TableExample;
  
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
}); 