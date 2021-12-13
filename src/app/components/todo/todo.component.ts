import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/_models/class/todo';
import { ITodo } from 'src/app/_models/interface/itodo';
import { ITodoEventEmitter } from 'src/app/_models/interface/itodo-event-emitter';
import { TodoService } from 'src/app/_services/todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: ITodo[] = [];
  finishedTodos: ITodo[] = [];

  todosShow: Boolean;
  finishedTodosShow: boolean;
  todosLabel = 'Hide To-Dos';
  finishedTodosLabel = 'Show Finished To-Dos';

  constructor(private _TodoService: TodoService) {
    this.todosShow = true;
    this.finishedTodosShow = false;
  }

  ngOnInit() {
    this._TodoService.$todos.subscribe((data) => {
      this.todos = [];
      this.finishedTodos = [];
      data.forEach((todo) => {
        todo.isCompleted == true
          ? this.finishedTodos.push(todo)
          : this.todos.push(todo);
      });
    });
    this._TodoService.get();
  }

  getData() {}

  toggleShowTodos() {
    this.todosShow = !this.todosShow;
    this.todosShow == true
      ? (this.todosLabel = 'Hide To-Dos')
      : (this.todosLabel = 'Show To-Dos');
  }

  toggleFinishedTodos() {
    this.finishedTodosShow = !this.finishedTodosShow;
    this.finishedTodosShow == false
      ? (this.finishedTodosLabel = 'Show Finished To-Dos')
      : (this.finishedTodosLabel = 'Hide Finished To-Dos');
  }

  updateList(event: ITodoEventEmitter) {
    if (event.action == 'toggle') {
      if (!event.object.isCompleted) {
        event.object.isCompleted = true;
        this._TodoService.put(event.object);
      } else {
        event.object.isCompleted = false;
        this._TodoService.put(event.object);
      }
    } else if (event.action == 'put') {
      this._TodoService.put(event.object);
    } else if (event.action == 'delete') {
      this._TodoService.delete(event.object.id);
    }
  }

  post(text: string) {
    const newTodo = new Todo(text);
    this._TodoService.post(newTodo);
  }

  putTodo() {}
}
