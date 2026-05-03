import { Task } from "../interfaces/task.interface";

export interface ITaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

export const initialState: ITaskState = {
    tasks: [],
    loading: false,
    error: null
}