import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import FloatingButton from '../components/FloatingButton';
import TarefaItem from '../components/TarefaItem';

import { RootStackParamList } from '../routes';

import { useTarefa } from '../contexts/TarefaContext';
import CustomTextButton from '../components/CustomTextButton';

export default function ListagemScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tarefas } = useTarefa();

  const [listaTarefas, setListaTarefas] = useState(tarefas);

  navigation.addListener('focus' ,() => {
    setListaTarefas(tarefas);
  })

  return (
    <View style={styles.container}>
      <View style={styles.rowFilter}>
        <CustomTextButton
          text='Todos'
          onPress={
            () => setListaTarefas(tarefas)
          }
        />
        <CustomTextButton
          text='Pendentes'
          onPress={
            () => setListaTarefas(tarefas.filter(x => !x.completed))
          }
        />
        <CustomTextButton
          text='Concluídos'
          onPress={
            () => setListaTarefas(tarefas.filter(x => x.completed))
          }
        />
      </View>
      <FlatList
        data={listaTarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TarefaItem tarefa={item} />}
        contentContainerStyle={styles.listContent}
      />
      <FloatingButton
        onPress={() => navigation.navigate('Operacao')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  rowFilter:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  listContent: {
    paddingBottom: 80, // Adjust based on FloatingButton height
  },
});