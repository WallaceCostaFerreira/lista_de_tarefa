import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface FloatingButtonProps {
  onPress: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} >
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    backgroundColor: "#1e7038ff",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  text:{
    color: '#FFF',
    fontSize: 30,
    textAlign: 'center'
  }
})

export default FloatingButton;