import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ExcluirButtonProps {
  onPress: () => void;
}

const ExcluirButton: React.FC<ExcluirButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>X</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    zIndex: 1,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ExcluirButton;