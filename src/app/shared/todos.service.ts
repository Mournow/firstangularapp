import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { HttpService } from "./http.service"

export interface Todo {
    id: number
    title: string
    completed: boolean
    date?: any
  }

  
@Injectable({providedIn: 'root'})

export class TodosService {
    public todos: Todo[]

    constructor(private http: HttpClient, private httpService: HttpService) {}

    //получение задач
    fetchTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>('gate.php?type=get_todos')
            .pipe( tap( todos => this.todos = todos) )
    }

    //завершаем\возобновляем задачу
    onToggle(id: number){
        const idx = this.todos.findIndex( t => t.id === id )
        this.todos[idx].completed = !this.todos[idx].completed;
    }

    //удаляем задачу
    removeTodo(id: number){
        const idx = this.todos.findIndex( t => t.id === id )
        this.todos = this.todos.filter( t => t.id != id )
    }

    //добавление задачи
    addTodo(todo: Todo){

        this.httpService.postData(todo)
                .subscribe(
                    (data: any) => { console.log(data); },
                    error => console.log(error)
                );

        this.todos.unshift( todo )
    }
}