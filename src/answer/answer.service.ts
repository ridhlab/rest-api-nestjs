import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionService } from 'src/question/question.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Answer } from './answer,entity';
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

    async getAllAnswer(filters: FilterAnswerDto) {
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

    async getAnswerById(id: number) {
        try {
            const user = await this.answerRepository.findOne({
                where: { id: id },
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async createAnswer(createAnswerDto: CreateAnswerDto) {
        try {
            const { userId, questionId, ...rest } = createAnswerDto;

            const user = await this.userService.getUserById(userId);
            const question = await this.questionService.getQuestionById(
                questionId,
            );

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

    async updateAnswer(id: number, updateAnswerDto: UpdateAnswerDto) {
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
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'Bad Request',
            };
        } catch (error) {
            throw error;
        }
    }

    async deleteAnswer(id: number) {
        try {
            const res = await this.answerRepository.delete(id);
            if (res.affected === 1) {
                return {
                    message: 'Answer has been deleted',
                    status: HttpStatus.CREATED,
                };
            }
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'Bad Request',
            };
        } catch (error) {
            throw error;
        }
    }
}
