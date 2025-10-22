import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Tarefa } from '../types/tarefa';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';

interface TarefaItemProps {
  tarefa: Tarefa;
}

const TarefaItem = ({ tarefa }: TarefaItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('Detalhes', { tarefaId: tarefa.id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {tarefa.imageUri ? (
        <Image source={{ uri: tarefa.imageUri }} style={styles.taskImage} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{tarefa.title}</Text>
        <Text style={styles.description}>{tarefa.description}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={tarefa.completed ? styles.statusCompleted : styles.statusPending}>
          {tarefa.completed ? 'Concluído' : 'Pendente'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 15,
  },
  placeholderImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#ccc',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  statusPending: {
    color: 'red',
    fontWeight: 'bold',
  },
  statusCompleted: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default TarefaItem;
