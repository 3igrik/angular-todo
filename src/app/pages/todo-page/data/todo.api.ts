import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoDto } from '../models/todo.dto';
import { TodoListResponseDto } from '../models/todo-list-response.dto';

@Injectable()
export class TodoApi {
  private readonly http = inject(HttpClient);

  private readonly BASE_URL = 'api/todo/';

  getList(): Observable<TodoListResponseDto> {
    return this.http.get<TodoListResponseDto>(this.BASE_URL);
  }

  getDetails(id: number): Observable<TodoDto> {
    return this.http.get<TodoDto>(`${this.BASE_URL + id}/`);
  }

  create(todo: Partial<TodoDto>): Observable<TodoDto> {
    return this.http.post<TodoDto>(this.BASE_URL, todo);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL + id}/`);
  }

  update(todo: Partial<TodoDto>, id: number): Observable<TodoDto> {
    return this.http.put<TodoDto>(`${this.BASE_URL + id}/`, todo);
  }
}
