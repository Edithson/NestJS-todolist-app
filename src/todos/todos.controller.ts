import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { get } from 'http';
import { createTodoFto } from "./dto/create-todo.dto";

@Controller('todos')
export class TodosController {
    constructor(private readonly TodosService: TodosService){}
    @Get()
    findAll(): Todo[] {
        return this.TodosService.findAll();
    };
    
    @Get(':id')
    findOne(@Param('id') id: string){
        console.log('id = ', id);
        return this.TodosService.findOne(id);
    }
    @Post()
    createTodo(@Body() newTodo: createTodoFto){
        this.TodosService.create(newTodo);
    }

    @Patch(':id')
    updateTodo(@Param('id') id: string, @Body() todo: createTodoFto){
        return this.TodosService.update(id, todo);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string){
        return this.TodosService.delete(id);
    }
}
