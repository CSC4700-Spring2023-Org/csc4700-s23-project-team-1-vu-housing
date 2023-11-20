import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface HomeButtonProps {
  text?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ text = 'Go Home' }) => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('HomeScreen'); // Replace 'Home' with the name of your home screen
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToHome}>
      <Text style={styles.icon}>{'🏠'}</Text>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      marginRight: 3, // Adjust as needed
      marginTop: 3, // Adjust as needed
      borderColor: 'black',
      position: 'absolute',
      top: 0,
      right: 0,
    },
    icon: {
      fontSize: 20,
      marginRight: 5,
    },
    text: {
      fontSize: 20,
      color: 'black',
    },
  });
  
  export default HomeButton;
