import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITodo } from 'src/app/_models/interface/itodo';
import { ITodoEventEmitter } from 'src/app/_models/interface/itodo-event-emitter';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo$: ITodo;
  @Output() todoEventEmitter = new EventEmitter<any>();
  editValue = false;
  index = null;
  isCompleted = null;

  constructor() {}

  ngOnInit() {
    this.index = this.todo$.id;
    this.isCompleted = this.todo$.isCompleted;
  }

  edit() {
    this.editValue = true;
  }
  toggleStatus() {
    this.todo$.status = !this.todo$.status;
    const eventObject: ITodoEventEmitter = {
      action: 'toggle',
      object: this.todo$,
    };
    this.todoEventEmitter.emit(eventObject);
  }

  onKeyUp(text: string) {
    this.todo$.label = text;
  }

  deleteTodo() {
    const eventObject: ITodoEventEmitter = {
      action: 'delete',
      object: this.todo$,
    };
    this.todoEventEmitter.emit(eventObject);
  }

  putTodo() {
    const eventObject: ITodoEventEmitter = {
      action: 'put',
      object: this.todo$,
    };
    this.todoEventEmitter.emit(eventObject);
  }
}
