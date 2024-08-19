import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { BehaviorSubject, concatMap, filter, finalize, switchMap, tap } from 'rxjs';
import { TodoPageData } from '../data/todo-page.data';
import { AuthService } from '@shared/services';
import { DialogService } from 'primeng/dynamicdialog';
import { TodoDetailsDialogComponent } from '../components/todo-details-dialog/todo-details-dialog.component';
import { TodoCreateEditDialogComponent } from '../components/todo-create-edit-dialog/todo-create-edit-dialog.component';

@Injectable()
export class TodoPageMediator {
  private readonly dataService = inject(TodoPageData);
  private readonly authService = inject(AuthService);
  private readonly dialogService = inject(DialogService);

  private readonly _todos$ = new BehaviorSubject<Todo[]>([]);
  private readonly _listIsLoading = new BehaviorSubject<boolean>(false);
  private readonly userId$ = new BehaviorSubject<number>(1);

  readonly listIsLoading$ = this._listIsLoading.asObservable();
  readonly todos$ = this._todos$.asObservable();

  init(): void {
    this._listIsLoading.next(true);

    this.dataService
      .getList()
      .pipe(
        tap((todos) => {
          this.userId$.next(todos[0]?.user);
          this._todos$.next(todos);
        }),
        finalize(() => this._listIsLoading.next(false)),
      )
      .subscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  completeTodo(todo: Todo): void {
    this._listIsLoading.next(true);

    this.dataService.complete(todo)
      .pipe(
        concatMap(() => this.dataService.getList()),
        tap((todos) => this._todos$.next(todos)),
        finalize(() => this._listIsLoading.next(false)),
      )
      .subscribe();
  }

  addTodo(): void {
    const ref = this.dialogService.open(TodoCreateEditDialogComponent, {
      header: 'Create New Todo',
      width: '50%',
    });

    ref.onClose.pipe(
      filter((title: string) => !!title),
      tap(() => this._listIsLoading.next(true)),
      switchMap((title: string) => this.dataService.create(title, this.userId$.value)),
      concatMap(() => this.dataService.getList()),
      tap((todos) => this._todos$.next(todos)),
      finalize(() => this._listIsLoading.next(false)),
    ).subscribe();
  }

  updateTodo(todo: Todo): void {
    const ref = this.dialogService.open(TodoCreateEditDialogComponent, {
      header: 'Change Todo',
      width: '50%',
      data: {
        title: todo.title,
      }
    });

    ref.onClose.pipe(
      filter((title: string) => !!title),
      tap(() => this._listIsLoading.next(true)),
      switchMap((title: string) => this.dataService.update({...todo, title})),
      concatMap(() => this.dataService.getList()),
      tap((todos) => this._todos$.next(todos)),
      finalize(() => this._listIsLoading.next(false)),
    ).subscribe();
  }

  removeTodo(todoId: number): void {
    this._listIsLoading.next(true);

    this.dataService.remove(todoId)
      .pipe(
        concatMap(() => this.dataService.getList()),
        tap((todos) => this._todos$.next(todos)),
        finalize(() => this._listIsLoading.next(false)),
      )
      .subscribe();
  }

  openTodoDetailsDialog(todoId: number): void {
    this.dataService.getDetails(todoId)
      .pipe(
        tap((todo) => {
          this.dialogService.open(TodoDetailsDialogComponent, {
            header: 'Todo Details',
            width: '50%',
            closable: true,
            data: {
              todo: todo
            }
          });
        })
      )
      .subscribe();
  }
}
