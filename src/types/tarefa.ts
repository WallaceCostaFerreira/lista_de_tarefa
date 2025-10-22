export interface Tarefa {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    imageUri?: string;
    latitude?: number;
    longitude?: number;
    createdAt: Date;
}