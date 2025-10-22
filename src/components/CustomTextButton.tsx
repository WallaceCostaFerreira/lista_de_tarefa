import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface CustomTextButtonProps {
  text: string;
  onPress: () => void;
}

const CustomTextButton: React.FC<CustomTextButtonProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.containerButton}>
        <Text style={styles.textButton}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerButton:{
    backgroundColor: '#1e7038ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  textButton:{
    fontSize: 20,
    color: "#FFF"
  }
});

export default CustomTextButton;
