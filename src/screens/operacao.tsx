import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Platform, Alert } from 'react-native';
import uuid from 'react-native-uuid';

import CustomTextInput from '../components/CustomTextInput';
import ImagePickerButton from '../components/ImagePickerButton';
import ExcluirButton from '../components/ExcluirButton';
import CustomTextButton from '../components/CustomTextButton';

import localizaoUsuario from '../utils/getLocation';
import { copiaParaDiretorioDeImagens } from '../utils/fileUtils';

import { useTarefa } from '../contexts/TarefaContext';
import { Tarefa } from '../types/tarefa';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type OperacaoScreenRouteProp = RouteProp<RootStackParamList, 'Operacao'>;

export default function OperacaoScreen() {
  const route = useRoute<OperacaoScreenRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const tarefa:Tarefa | undefined = route.params?.tarefa;

  const { postTarefa, putTarefa } = useTarefa();

  const [createdAt, setCreatedAt] = useState<Date>(new Date());
  const [id, setId] = useState<string>('');
  const [titulo, setTitulo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {

    const inicializaCampos = () => {
      if(tarefa){
        setId(tarefa.id);
        setTitulo(tarefa.title);
        setDescricao(tarefa.description);
        setImageUri(tarefa.imageUri ? tarefa.imageUri : null);
        setLatitude(tarefa.latitude ? tarefa.latitude : null);
        setLongitude(tarefa.longitude ? tarefa.longitude : null);
        setCreatedAt(tarefa.createdAt);
      }
    }

    inicializaCampos();
  }, [tarefa])

  const handleImageSelected = (uri: string) => {
    setImageUri(uri);
  };

  const removeImageSelecionada = () => {setImageUri(null)};

  const capturaLocalizacao = async () => {
    const {latitude, longitude} = await localizaoUsuario();    

    setLatitude(latitude);
    setLongitude(longitude);
  }

  const salvarTarefa = async ():Promise<void> => {

    if(!titulo){
      Alert.alert("Título","Necessário preencher o título!");
      return;
    }

    let caminhoImagemAjustado: string = '';

    if(imageUri != null){
      const response = await copiaParaDiretorioDeImagens(imageUri);
      caminhoImagemAjustado = response;
    }

    const tarefaAux:Tarefa = {
      id: id ? id : uuid.v4(),
      title: titulo,
      description: descricao,
      completed: false,
      imageUri: caminhoImagemAjustado,
      latitude: latitude ? latitude : 0,
      longitude: longitude ? longitude : 0,
      createdAt: createdAt,
    }

    if(id){
      putTarefa(tarefaAux);
    }else{
      postTarefa(tarefaAux);
    }
    
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Título da Tarefa</Text>
        <CustomTextInput
          value={titulo}
          onChangeText={setTitulo}
          placeholder=""
          qntCaracters={60}
        />

        <Text style={styles.label}>Descrição da Tarefa</Text>
        <CustomTextInput
          value={descricao}
          onChangeText={setDescricao}
          placeholder=""
          qntCaracters={200}
        />

        <Text style={styles.label}>Imagem</Text>
        {imageUri ? (
          <View style={styles.imageWrapper}>
            <ExcluirButton onPress={removeImageSelecionada}/>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
        ): 
        <ImagePickerButton onImageSelected={handleImageSelected} />
        }

        <Text style={styles.label}>Localização</Text>
        <CustomTextButton
          onPress={capturaLocalizacao}
          text='Capturar localização'
        />
        {(latitude && longitude) &&
        <>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
        </>
        }
      </View>
      
      <CustomTextButton
        onPress={salvarTarefa}
        text='Salvar'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
    color: '#1e7038ff'
  },
  imageWrapper: {
    position: 'relative',
    marginTop: 20,
    width: 200,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
