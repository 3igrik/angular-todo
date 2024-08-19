import { TodoDto } from './todo.dto';

export interface TodoListResponseDto {
  count: number
  next: string
  previous: string
  results: TodoDto[]
}
