import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface BackButtonProps {
  text?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ text = 'Back' }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goBack}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    color: 'blue', // Customize the color as needed
  },
});

export default BackButton;
