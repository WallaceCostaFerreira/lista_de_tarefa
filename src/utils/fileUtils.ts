import RNFS from 'react-native-fs';

export const criaDiretorioImagem = async () => {
  const imageDirPath = `${RNFS.DocumentDirectoryPath}/imagesTarefas`;
  try {
    const dirExists = await RNFS.exists(imageDirPath);
    if (!dirExists) {
      await RNFS.mkdir(imageDirPath);
    }
  } catch (error) {
    console.error('Error criaDiretorioImagem:', error);
  }
};
