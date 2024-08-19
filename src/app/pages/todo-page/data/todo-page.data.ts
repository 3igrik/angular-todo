import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoApi } from './todo.api';
import { Todo } from '../models/todo';
import { TodoPageAdapter } from './todo-page.adapter';
import { TodoDto } from '../models/todo.dto';

@Injectable()
export class TodoPageData {
  private readonly todoApi = inject(TodoApi);

  getList(): Observable<Todo[]> {
    return this.todoApi.getList().pipe(
      map((data) => TodoPageAdapter.toTodosList(data))
    );
  }

  getDetails(id: number): Observable<Todo> {
    return this.todoApi.getDetails(id).pipe(
      map((data) => TodoPageAdapter.toTodo(data))
    );
  }

  complete(todo: Todo): Observable<TodoDto> {
    return this.todoApi.update({ title: todo.title, completed: true, user: todo.user }, todo.id);
  }

  create(todoTitle: string, userId: number): Observable<Todo> {
    return this.todoApi.create({ title: todoTitle, completed: false, user: userId }).pipe(
      map((data) => TodoPageAdapter.toTodo(data))
    );
  }

  update(todo: Todo): Observable<Todo> {
    return this.todoApi.update(todo, todo.id).pipe(
      map((data) => TodoPageAdapter.toTodo(data))
    );
  }

  remove(id: number): Observable<void> {
    return this.todoApi.remove(id);
  }
}
