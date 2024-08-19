import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Todo } from '../../models/todo';
import { TodoPageMediator } from '../../services/todo-page.mediator';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  private readonly mediator = inject(TodoPageMediator);

  onEdit(): void {
    this.mediator.updateTodo(this.todo);
  }

  onDelete(): void {
    this.mediator.removeTodo(this.todo.id);
  }

  onComplete(): void {
    this.mediator.completeTodo(this.todo);
  }

  onOpen(): void {
    this.mediator.openTodoDetailsDialog(this.todo.id);
  }
}
