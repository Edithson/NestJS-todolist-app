import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { createTodoFto } from "./dto/create-todo.dto";

@Injectable()
export class TodosService {
    todos:Todo[] = [
        {
            id: 1,
            title: 'to does',
            description: 'liste de choses à faire',
            done: false,
        },
        {
            id: 2,
            title: 'to does',
            description: 'liste de choses à faire',
            done: false,
        },
    ]

    findAll(): Todo[] {
        return this.todos;
    }

    findOne(id: string){
        return this.todos.find(todos => todos.id === Number(id));
    }

    create(todo: createTodoFto){
        this.todos = [... this.todos, todo];
    }

    update(id: string, todo: Todo){
        const todoToUpdate = this.todos.find(todo => todo.id === +(id));
        if (!todoToUpdate) {
            return new NotFoundException('Rien ici!');
        }
        if (todo.hasOwnProperty('done')) {
            todoToUpdate.done = todo.done;
        }
        if (todo.title) {
            todoToUpdate.title = todo.title;
        }
        if (todo.description) {
            todoToUpdate.description = todo.description;
        }
        const updatedTodo = this.todos.map(t => t.id !== +id ? t : todoToUpdate);
        this.todos = [... updatedTodo];
        return{updatedTodo: 1, todos: todoToUpdate};
    }

    delete(id: string){
        const nbrTodoBeforeDeleted = this.todos.length;
        this.todos = this.todos.filter(t => t.id !== +id);
        if (this.todos.length < nbrTodoBeforeDeleted) {
            return{deletedTodos: 1, bnrTodos: this.todos.length};
        }else{
            return{deletedTodos: 0, bnrTodos: this.todos.length};
        }
    }
}
