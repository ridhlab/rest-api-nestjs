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
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dtos/CreateAnswer.dto';
import { FilterAnswerDto } from './dtos/FilterAnswer.dto';
import { UpdateAnswerDto } from './dtos/UpdateAnswer.dto';

@Controller('answer')
export class AnswerController {
    constructor(private answerService: AnswerService) {}

    @Get('/')
    public async getAll(@Query() queryInput: FilterAnswerDto) {
        return await this.answerService.getAllAnswer(queryInput);
    }

    @Post('/create')
    public async create(
        @Body('questionId', ParseIntPipe) questionId: number,
        @Body() createAnswerDto: CreateAnswerDto,
        @Res() response: Response,
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { questionId: _questionId, ...rest } = createAnswerDto;
        const res = this.answerService.createAnswer({ ...rest, questionId });
        return response.send(res);
    }

    @Put('/:id/update')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAnswerDto: UpdateAnswerDto,
        @Res() response: Response,
    ) {
        const res = this.answerService.updateAnswer(id, { ...updateAnswerDto });
        return response.send(res);
    }

    @Delete('/:id/delete')
    public async delete(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ) {
        const res = await this.answerService.deleteAnswer(id);
        return response.send(res);
    }
}
