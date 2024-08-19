import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TodoPageMediator } from './services/todo-page.mediator';
import { TodoPageData } from './data/todo-page.data';
import { TodoApi } from './data/todo.api';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ButtonModule } from 'primeng/button';
import { LoaderComponent } from '@shared/ui';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, ButtonModule, LoaderComponent],
  providers: [TodoPageMediator, TodoPageData, TodoApi],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent implements OnInit {
  private readonly mediator = inject(TodoPageMediator);

  readonly listIsLoading$ = this.mediator.listIsLoading$;
  readonly todos$ = this.mediator.todos$;
  
  ngOnInit(): void {
    this.mediator.init();
  }

  logout(): void {
    this.mediator.logout();
  }

  addTodo(): void {
    this.mediator.addTodo();
  }
}
