import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';

export default function ListagemScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text>Listagem</Text>
      <FloatingButton
        onPress={() => navigation.navigate('Operacao')}
      />
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});