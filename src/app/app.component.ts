import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodosStore } from './store/todos.store';
import { TodosListComponent } from "./todos-list/todos-list.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [FormsModule, CommonModule, TodosListComponent,MatProgressSpinnerModule ],
})
export class AppComponent  implements OnInit {

  store = inject(TodosStore);

  ngOnInit(): void {
    this.loadTodos().then(() => console.log('Todos loaded'));
  }

  async loadTodos(){
    await this.store.loadAll();
  }
}
