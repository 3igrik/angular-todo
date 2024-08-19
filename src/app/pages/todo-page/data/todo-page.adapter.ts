import { Todo } from '../models/todo';
import { TodoListResponseDto } from '../models/todo-list-response.dto';
import { TodoDto } from '../models/todo.dto';

export class TodoPageAdapter {
  static toTodosList(dto: TodoListResponseDto): Todo[] {
    return dto.results.map(TodoPageAdapter.toTodo);
  }

  static toTodo(dto: TodoDto): Todo {
    return {
      user: dto.user,
      title: dto.title,
      completed: dto.completed,
      id: dto.id,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at
    };
  }

  static toTodoDto(todo: Todo): TodoDto {
    return {
      user: todo.user,
      title: todo.title,
      completed: todo.completed,
      id: todo.id,
      created_at: todo.createdAt,
      updated_at: todo.updatedAt
    };
  }
}
