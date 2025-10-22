import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListagemScreen from "./screens/listagem";
import OperacaoScreen from "./screens/operacao";
import DetalhesScreen from "./screens/detalhes";

import { criaDiretorioImagem } from "./utils/fileUtils";

import { TarefaProvider } from './contexts/TarefaContext';

export type RootStackParamList = {
    Listagem: undefined;
    Operacao: undefined;
    Detalhes: { tarefaId: string };
};

const RootStack = createNativeStackNavigator<RootStackParamList>({
    initialRouteName: 'Listagem',
    screens: {
        Listagem: {
            screen: ListagemScreen,
            options: {
                title: 'Listagem de tarefas'
            }
        },
        Operacao: {
            screen:OperacaoScreen,
            options:{
                title: "Criação/Edição de tarefa"
            }
        },
        Detalhes: {
            screen: DetalhesScreen,
            options:{
                title: "Detalhes da tarefa"
            }
        },
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    useEffect(() => {
        criaDiretorioImagem();
    }, []);

    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: 'black'}}>
            <StatusBar barStyle={'dark-content'}/>
            <TarefaProvider>
                <Navigation />
            </TarefaProvider>
        </SafeAreaView>
    
    );
}