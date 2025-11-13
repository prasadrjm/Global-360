import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  newTodo = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((data) => (this.todos = data));
  }

  addTodo() {
    if (!this.newTodo.trim()) return;
    this.todoService.addTodo(this.newTodo).subscribe((todo) => {
      this.todos.push(todo);
      this.newTodo = '';
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((t) => t.id !== id);
    });
  }
}
