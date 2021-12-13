import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITodo } from 'src/app/_models/interface/itodo';
import { ITodoEventEmitter } from 'src/app/_models/interface/itodo-event-emitter';
import { TodoService } from 'src/app/_services/todo.service';

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

  constructor() {
    /*     this.todo$ = {
      id: 1,
      label: '',
      status: false,
      position: 1,
    }; */
  }

  ngOnInit() {
    this.index = this.todo$.id;
    this.isCompleted = this.todo$.isCompleted;
  }

  edit() {
    this.editValue = true;
  }
  toggleStatus() {
    this.todo$.status = !this.todo$.status;
    /* console.log(this.todo.status); */
    /* console.log(this.todoEventEmitter); */
    console.log(this.todo$.id);
    /* let item = document.querySelector('.todo-card');
    if (this.todo$.isCompleted === false) {
      item.classList.add('completed');
      this.todo$.isCompleted = true;
    } else {
      item.classList.remove('completed');
      this.todo$.isCompleted = false;
    } */
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
    console.log('clickededed');
    console.log(this.todo$);
    const eventObject: ITodoEventEmitter = {
      action: 'delete',
      object: this.todo$,
    };
    /* this.todoEventEmitter.emit(this.todo$); */
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
