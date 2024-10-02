import { Body, Controller, Get, Post } from '@nestjs/common'
import { TodoService } from './todo.service'
//import { CreateTodoDto } from '../dto/user.dto'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // @Get()
  // getHello(): string {
  //   return this.todoService.getHello();
  // }

  @Get('/list')
  getHello() {
    //return this.todoService.getList();
    return []
  }

  // @Post()
  // async createTodo(@Body() body: CreateTodoDto) {
  //   return this.todoService.create(body)
  // }
}
