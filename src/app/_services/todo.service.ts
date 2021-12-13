import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { Todo } from '../_models/class/todo';
import { ITodo } from '../_models/interface/itodo';
import { IGetTodos } from '../_models/interface/iget-todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly URL = 'http://localhost:5000/todos';
  private todos$ = new Subject<ITodo[]>();
  $todos = this.todos$.asObservable();

  constructor(private _http: HttpClient) {}

  //GET
  get() {
    this._http.get<ITodo[]>(this.URL).subscribe((data) => {
      this.todos$.next(data);
    });
  }

  //POST
  post(newTodo: ITodo) {
    this._http.post<ITodo>(this.URL, newTodo).subscribe((next) => {
      this.get();
    });
  }

  //PUT
  put(obj: ITodo) {
    this._http
      .put<ITodo>(`http://localhost:5000/todos/${obj.id}`, obj)
      .subscribe((next) => this.get());
  }
  //DELETE
  delete(id: number) {
    const deleteEndpoint = `http://localhost:5000/todos/${id}`;
    return this._http.delete<ITodo>(deleteEndpoint).subscribe((next) => {
      this.get();
    });
  }
}
