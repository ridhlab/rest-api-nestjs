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
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dtos/CreateAnswer.dto';
import { FilterAnswerDto } from './dtos/FilterAnswer.dto';
import { UpdateAnswerDto } from './dtos/UpdateAnswer.dto';

@Controller('answer')
export class AnswerController {
    constructor(private answerService: AnswerService) {}

    @Get('/')
    public async getAll(@Query() queryInput: FilterAnswerDto) {
        return await this.answerService.getAll(queryInput);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    public async create(
        @Body('questionId', ParseIntPipe) questionId: number,
        @Body() createAnswerDto: CreateAnswerDto,
        @Res() response: Response,
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { questionId: _questionId, ...rest } = createAnswerDto;
        const res = this.answerService.create({ ...rest, questionId });
        return response.send(res);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id/update')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAnswerDto: UpdateAnswerDto,
        @Res() response: Response,
    ) {
        const res = this.answerService.update(id, { ...updateAnswerDto });
        return response.send(res);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id/delete')
    public async delete(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response,
    ) {
        const res = await this.answerService.delete(id);
        return response.send(res);
    }
}
