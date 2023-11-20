import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface BackButtonProps {
  text?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ text = 'Go Back' }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goBack}>
      <Text style={styles.icon}>{'🔙'}</Text>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginLeft: 5,
    borderRadius: 15, // Border radius for rounded corners
    borderWidth: 1.5,  // Border width for the border
    borderColor: 'black',  // Border color
    top: 0,
    right: 0,
    marginTop: 4,
  },
  icon: {
    fontSize: 20,
    marginRight: 5,
  },
  text: {
    fontSize: 20,
    color: 'black', // Customize the color as needed
  },
});

export default BackButton;
