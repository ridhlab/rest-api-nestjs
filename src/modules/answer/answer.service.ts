import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionService } from 'src/modules/question/question.service';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { CreateAnswerDto } from './dtos/CreateAnswer.dto';
import { FilterAnswerDto } from './dtos/FilterAnswer.dto';
import { UpdateAnswerDto } from './dtos/UpdateAnswer.dto';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer) private answerRepository: Repository<Answer>,
        private userService: UserService,
        private questionService: QuestionService,
    ) {}

    async getAll(filters: FilterAnswerDto) {
        try {
            const res = await this.answerRepository.find({
                relations: { question: true, user: true },
                where: {
                    user: { id: filters.userId || undefined },
                    question: { id: parseInt(filters.questionId) || undefined },
                },
            });
            return {
                status: HttpStatus.OK,
                message: 'Success get answers ',
                data: res,
            };
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        const user = await this.answerRepository.findOne({
            where: { id: id },
        });
        return user;
    }

    async create(createAnswerDto: CreateAnswerDto) {
        try {
            const { userId, questionId, ...rest } = createAnswerDto;

            const user = await this.userService.findOne(userId);
            const question = await this.questionService.findOne(questionId);

            if (!question) {
                throw new HttpException(
                    'Question is not valid',
                    HttpStatus.BAD_REQUEST,
                );
            }
            if (!user) {
                throw new HttpException(
                    'User is not valid',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const newAnswer = this.answerRepository.create({
                ...rest,
                user,
                question,
            });

            const res = await this.answerRepository.save(newAnswer);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, updateAnswerDto: UpdateAnswerDto) {
        try {
            const res = await this.answerRepository.update(id, {
                ...updateAnswerDto,
            });
            if (res.affected === 1) {
                return {
                    status: HttpStatus.CREATED,
                    message: 'Answer has been updated',
                };
            }
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            const res = await this.answerRepository.delete(id);
            if (res.affected === 1) {
                return {
                    message: 'Answer has been deleted',
                    status: HttpStatus.CREATED,
                };
            }
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        } catch (error) {
            throw error;
        }
    }
}
