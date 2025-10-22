import Realm from 'realm';

class TarefasDTO extends Realm.Object<TarefasDTO> {
  id!: string;
  title!: string;
  description!: string;
  completed!: boolean;
  imageUri?: string;
  latitude?: number;
  longitude?: number;
  createdAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'TarefasDTO',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: 'string',
      description: 'string',
      completed: 'bool',
      imageUri: 'string?',
      latitude: 'double?',
      longitude: 'double?',
      createdAt: 'date',
    },
  };
}

const config: Realm.Configuration = {
  schemaVersion: 1,
  schema: [TarefasDTO],
  deleteRealmIfMigrationNeeded: true,
};

const RealmInstance = new Realm(config);

export default RealmInstance;
export { TarefasDTO };