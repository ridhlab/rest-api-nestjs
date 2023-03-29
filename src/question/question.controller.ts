import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Res,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateQuestionDto } from './dtos/CreateQuestion.dto';
import { FilterQuestionDto } from './dtos/FilterQuestion.dto';
import { UpdateQuestionDto } from './dtos/UpdateQuestion.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Get('/')
    public async getAll(@Query() queryInput: FilterQuestionDto) {
        return await this.questionService.getAll(queryInput);
    }

    @Post('/create')
    public async create(
        @Body() createQuestionDto: CreateQuestionDto,
        @Res() response: Response,
    ) {
        const res = await this.questionService.create({
            ...createQuestionDto,
        });
        return response.send(res);
    }

    @Put('/:id/update')
    public async update(
        @Body() updateUserDto: UpdateQuestionDto,
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ) {
        const res = await this.questionService.update(id, {
            ...updateUserDto,
        });
        return response.send(res);
    }

    @Delete('/:id/delete')
    public async delete(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ) {
        const res = await this.questionService.delete(id);
        return response.send(res);
    }
}
