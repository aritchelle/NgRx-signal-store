import { CommonModule } from '@angular/common';
import { Component, effect, inject, viewChild } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule, MatButtonToggleGroup, MatButtonToggleChange} from '@angular/material/button-toggle';
import { TodosFilter, TodosStore } from '../store/todos.store';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'todos-list',
  imports: [CommonModule, MatFormFieldModule,MatInputModule, MatLabel, MatButtonToggleModule, MatListModule, MatIconModule, MatButtonToggleGroup],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {

  store = inject(TodosStore);

  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filter = this.filter();

      filter.value = this.store.filter()
    })
  }

  async onAddTodo( title: string){
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id: string, event: MouseEvent){
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async onTodoToggle(id: string, completed: boolean){
    await this.store.updateTodo(id, completed);
  }

  onFilterTodos(event: MatButtonToggleChange){
    const filter = event.value as TodosFilter;

    this.store.updateFilter(filter);
  }


}
