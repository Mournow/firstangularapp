import { Component, OnInit } from '@angular/core';
import { Todo, TodosService } from '../shared/todos.service';
import * as moment from 'moment';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  title: string = '' //здесь хранится название новой задачи

  constructor(public todosService: TodosService) { }

  ngOnInit(): void {
  }

  addTodo(){
    //добавление задачи
    const todo: Todo = {
      title: this.title,
      id: Date.now(),
      completed: false,
      date: moment().format('YYYY-MM-DD')
    }

    console.log(todo)

    this.todosService.addTodo( todo )
    this.title = ""
  }

}
