import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Todo } from './todos.service';
   
@Injectable({providedIn: 'root'})
export class HttpService{
   
    constructor(private http: HttpClient){ }
 
    postData(todo: Todo){
        const body = {type: "add_todo", title: todo.title, date: todo.date};
        return this.http.post('gate.php', body); 
    }

    
}