import React, { useState } from 'react';
import { View, Button, Modal, StyleSheet, Text, Touchable, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import CustomTextButton from './CustomTextButton';

interface ImagePickerButtonProps {
  onImageSelected: (uri: string) => void;
}

const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({ onImageSelected }) => {

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('Usuário cancelou');
      return;
    } 
    
    if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
      return;
    } 
    
    if (response.assets && response.assets[0].uri) {
      onImageSelected(response.assets[0].uri);
    }
  };

  const chamaCamera = () => {
    launchCamera({ mediaType: 'photo' }, handleResponse);
  };

  const chamaGaleria = () => {
    launchImageLibrary({ mediaType: 'photo' }, handleResponse);
  };

  return (
    <View style={styles.containerPrincipal}>
      <CustomTextButton
        text='Câmera'
        onPress={chamaCamera}
      />
      <CustomTextButton
        text='Galeria'
        onPress={chamaGaleria}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerPrincipal: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default ImagePickerButton;
