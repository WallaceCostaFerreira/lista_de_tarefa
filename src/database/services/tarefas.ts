import RealmInstance, { TarefasDTO } from '../realm';
import { Tarefa } from '../../types/tarefa';

export const postTarefaDB = (tarefa: Tarefa) => {
  RealmInstance.write(() => {
    RealmInstance.create('TarefasDTO', tarefa);
  });
};

export const putTarefaDB = (tarefa: Tarefa) => {
  RealmInstance.write(() => {
    RealmInstance.create('TarefasDTO', tarefa, Realm.UpdateMode.Modified);
  });
};

export const deleteTarefaDB = (id: string) => {
  RealmInstance.write(() => {
    const tarefaToDelete = RealmInstance.objectForPrimaryKey<Tarefa>('TarefasDTO', id);
    if (tarefaToDelete) {
      RealmInstance.delete(tarefaToDelete);
    }
  });
};

export const getAllTarefasDB = (): Tarefa[] => {
  const response = RealmInstance.objects<TarefasDTO>('TarefasDTO');

  return response as unknown as Tarefa[];
};