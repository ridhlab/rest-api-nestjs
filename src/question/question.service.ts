import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dtos/CreateQuestion.dto';
import { FilterQuestionDto } from './dtos/FilterQuestion.dto';
import { UpdateQuestionDto } from './dtos/UpdateQuestion.dto';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getAllQuestion(filters: FilterQuestionDto) {
        const res = await this.questionRepository.find({
            relations: { user: true },
            where: { ...(filters.userId && { user: { id: filters.userId } }) },
        });
        return {
            status: HttpStatus.OK,
            message: 'Success get questions',
            data: res,
        };
    }

    async getQuestionsFromUser(id: string) {
        const res = await this.questionRepository.find({
            where: { user: { id } },
        });
        console.log({ res });
    }

    async createQuestion(createQuestionDto: CreateQuestionDto) {
        try {
            const { userId, ...rest } = createQuestionDto;
            const user = await this.userRepository.findOne({
                where: { id: userId },
            });
            if (!user) {
                throw new HttpException(
                    'User is not valid',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const newQuestion = this.questionRepository.create({
                ...rest,
                user,
            });
            const res = await this.questionRepository.save(newQuestion);
            return {
                status: HttpStatus.CREATED,
                message: 'Question created',
                data: res,
            };
        } catch (error) {
            throw error;
        }
    }

    async updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto) {
        try {
            const res = await this.questionRepository.update(id, {
                ...updateQuestionDto,
            });
            if (res.affected === 1) {
                return {
                    status: HttpStatus.CREATED,
                    message: 'Question has been updated',
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

    async deleteQuestion(id: number) {
        try {
            const res = await this.questionRepository.delete(id);
            if (res.affected === 1) {
                return {
                    message: 'Question has been deleted',
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
