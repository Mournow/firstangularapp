import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodosService } from '../shared/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  public loading: boolean = true //флаг загрузки
  public searchString = '' //шаблон поиска
  public view_completed = false //флаг отображения завершенных


  constructor(public todosService: TodosService) { }

  ngOnInit(): void {
    //получим дела
    this.todosService.fetchTodos().subscribe( () => {
      this.loading = false
    })
  }

  onChange(id: number) {
    //переключени задачи завершена\открыта
    this.todosService.onToggle(id)
  }

  removeTodo(id: number) {
    //удаление задачи
    this.todosService.removeTodo(id)
  }

}
