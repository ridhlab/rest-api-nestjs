import {
    Controller,
    Post,
    Get,
    Put,
    Body,
    Res,
    Param,
    Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/')
    public async getAll() {
        return await this.userService.getAll();
    }

    @Post('/create')
    public async create(
        @Body() createUserDto: CreateUserDto,
        @Res() response: Response,
    ) {
        const res = await this.userService.create({ ...createUserDto });
        return response.send(res);
    }

    @Put('/:id/update')
    public async update(
        @Body() updateUserDto: UpdateUserDto,
        @Param('id') id: string,
        @Res() response: Response,
    ) {
        const res = await this.userService.update(id, { ...updateUserDto });
        return response.send(res);
    }

    @Delete('/:id/delete')
    public async delete(@Param('id') id: string, @Res() response: Response) {
        const res = await this.userService.delete(id);
        return response.send(res);
    }
}
