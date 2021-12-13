import { ITodo } from './itodo';

export interface ITodoEventEmitter {
  action: string;
  object: ITodo;
}
