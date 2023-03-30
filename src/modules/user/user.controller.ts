import {
    Controller,
    Get,
    Put,
    Body,
    Res,
    Param,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/')
    public async getAll() {
        return await this.userService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id/update')
    public async update(
        @Body() updateUserDto: UpdateUserDto,
        @Param('id') id: string,
        @Res() response: Response,
    ) {
        const res = await this.userService.update(id, { ...updateUserDto });
        return response.send(res);
    }
}
