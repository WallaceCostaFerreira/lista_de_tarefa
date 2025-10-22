import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

export const criaDiretorioImagem = async ():Promise<void> => {
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

export const copiaParaDiretorioDeImagens = async (imagem: string):Promise<string> => {
  const imageDirPath = `${RNFS.DocumentDirectoryPath}/imagesTarefas`;
  try {

    const caminhoArquivo = imageDirPath+`/${imagem.slice(imagem.lastIndexOf('/') + 1)}`;

    const caminhoArquivoPlatatorma = Platform.OS == 'android' ? 'file://'+caminhoArquivo : caminhoArquivo;

    const response = await RNFS.exists(caminhoArquivoPlatatorma);

    if (response) {
      console.log('O arquivo já existe no destino.');
      return caminhoArquivoPlatatorma;
    }

    await RNFS.copyFile(
      imagem,
      caminhoArquivoPlatatorma
    );

    return caminhoArquivoPlatatorma;

  } catch (error) {
    console.error('Error criaDiretorioImagem:', error);
    return imagem;
  }
};
