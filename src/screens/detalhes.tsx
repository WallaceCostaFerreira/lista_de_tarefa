import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes';
import { useTarefa } from '../contexts/TarefaContext';
import { Tarefa } from '../types/tarefa';
import CustomTextButton from '../components/CustomTextButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type DetalhesScreenRouteProp = RouteProp<RootStackParamList, 'Detalhes'>;

export default function DetalhesScreen() {
  const route = useRoute<DetalhesScreenRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tarefaId } = route.params;
  const { tarefas, deleteTarefa, putTarefa } = useTarefa();
  const [tarefa, setTarefa] = useState<Tarefa | undefined>(undefined);

  useEffect(() => {
    const responseTarefa = tarefas.find(t => t.id === tarefaId);
    setTarefa(responseTarefa);
  }, [tarefaId, tarefas]);

  if (!tarefa) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Tarefa não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{tarefa.title}</Text>
      {tarefa.imageUri ? (
        <Image source={{ uri: tarefa.imageUri }} style={styles.taskImage} />
      ):
        <View style={styles.placeholderImage} />
        }
      
      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.description}>{tarefa.description ? tarefa.description : "Não há descrição!"}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={tarefa.completed ? styles.statusCompleted : styles.statusPending}>
        {tarefa.completed ? 'Concluído' : 'Pendente'}
      </Text>

        <View>
          <Text style={styles.label}>Localização:</Text>
          <Text style={styles.locationText}>Latitude: {tarefa.latitude ? tarefa.latitude : "-"}</Text>
          <Text style={styles.locationText}>Longitude: {tarefa.longitude ? tarefa.longitude : "-"}</Text>
        </View>

      <View style={styles.row}>
        <CustomTextButton
          text='Excluir'
          onPress={
            () => {
              deleteTarefa(tarefa.id);
              navigation.goBack();
            }
          }
        />
        {!tarefa.completed &&
          <CustomTextButton
            text='Concluir tarefa'
            onPress={
              () => {
                const tarefaAux:Tarefa = {
                  ...tarefa,
                  completed: true
                } 

                putTarefa(tarefaAux);
                navigation.goBack();
              }
            }
          />
        }
        <CustomTextButton
          text='Editar tarefa'
          onPress={
            () => {
              navigation.navigate('Operacao', {tarefa: tarefa});
            }
          }
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  taskImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#555',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  statusPending: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  statusCompleted: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: "100%"
  },
});
