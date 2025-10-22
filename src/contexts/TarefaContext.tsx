import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";

import { deleteTarefaDB, getAllTarefasDB, postTarefaDB, putTarefaDB } from "../database/services/tarefas";
import { Tarefa } from "../types/tarefa";

interface TarefaContextData {
  tarefas: Tarefa[];
  putTarefa: (tarefa: Tarefa) => Promise<Tarefa>;
  postTarefa: (tarefa: Tarefa) => Promise<Tarefa>;
  getTarefas: () => Tarefa[];
  deleteTarefa: (id: string) => Promise<void>;
}

const TarefaContext = createContext<TarefaContextData | undefined>(undefined);

export const TarefaProvider = ({ children }: { children: ReactNode }) => {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() => {
        const carregaDadosDB = () => {
            try {
                const response = getAllTarefasDB();
                console.log("carregaDadosDB - ", response);
                
                if(response.length > 0){
                    setTarefas(response);
                }
            } catch (error) {
                console.error("Erro ao carregar tarefas do DB:", error);
            }
        };

        carregaDadosDB();
    }, []);

    const postTarefa = async (tarefa: Tarefa): Promise<Tarefa> => {
        const novaTarefa: Tarefa = {
            ...tarefa,
        };
        setTarefas(prev => [...prev, novaTarefa]);

        postTarefaDB(novaTarefa);

        return novaTarefa;
    };

    const putTarefa = async (tarefa: Tarefa): Promise<Tarefa> => {
        setTarefas(prev => 
            prev.map(t => t.id === tarefa.id ? tarefa : t)
        );

        putTarefaDB(tarefa);

        return tarefa;
    };

    const getTarefas = (): Tarefa[] => {
        return tarefas;
    };

    const deleteTarefa = async (id: string): Promise<void> => {
        setTarefas(prev => prev.filter(t => t.id !== id));
        deleteTarefaDB(id);
    };

    const value: TarefaContextData = {
        tarefas, 
        postTarefa, 
        putTarefa, 
        getTarefas,
        deleteTarefa
    };

    return (
        <TarefaContext.Provider value={value}>
            {children}
        </TarefaContext.Provider>
    );
};

export const useTarefa = () => {
    const context = useContext(TarefaContext);
    if (!context) {
        throw new Error('useTarefa must be used within a TarefaProvider');
    }
    return context;
};