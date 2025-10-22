import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  qntCaracters: number;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ value, onChangeText, placeholder, qntCaracters }) => {
  const qntCaracteres = qntCaracters - value.length;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        maxLength={qntCaracters}
        multiline={true}
        numberOfLines={4}
      />
      <Text style={styles.charCount}>{qntCaracteres} / {qntCaracters}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomTextInput;
