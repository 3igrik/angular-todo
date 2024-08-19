import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Todo } from '../../models/todo';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-details-dialog',
  standalone: true,
  imports: [CommonModule, DynamicDialogModule, DatePipe,],
  templateUrl: './todo-details-dialog.component.html',
  styleUrls: ['./todo-details-dialog.component.scss']
})
export class TodoDetailsDialogComponent implements OnInit {
  todo: Todo | null = null;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.todo = this.config.data.todo;
  }

  close(): void {
    this.ref.close();
  }
}
