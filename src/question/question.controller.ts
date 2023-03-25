import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Res,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateQuestionDto } from './dtos/CreateQuestion.dto';
import { UpdateQuestionDto } from './dtos/UpdateQuestion.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Get('/')
    async getAll() {
        return await this.questionService.getAllQuestion();
    }

    @Post('/create')
    async create(
        @Body() createQuestionDto: CreateQuestionDto,
        @Res() response: Response,
    ) {
        const res = await this.questionService.createQuestion({
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
        const res = await this.questionService.updateQuestion(id, {
            ...updateUserDto,
        });
        return response.send(res);
    }

    @Delete('/:id/delete')
    public async delete(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ) {
        const res = await this.questionService.deleteQuestion(id);
        return response.send(res);
    }
}
