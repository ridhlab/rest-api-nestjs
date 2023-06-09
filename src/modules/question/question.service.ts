import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/modules/user/user.service';
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
        private userService: UserService,
    ) {}

    async getAll(filters: FilterQuestionDto) {
        try {
            const res = await this.questionRepository.find({
                relations: { user: true },
                where: {
                    user: { id: filters.userId || undefined },
                },
            });
            return {
                status: HttpStatus.OK,
                message: 'Success get questions',
                data: res,
            };
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        const question = await this.questionRepository.findOne({
            where: { id: id },
        });
        return question;
    }

    async create(createQuestionDto: CreateQuestionDto) {
        try {
            const { userId, ...rest } = createQuestionDto;
            const user = await this.userService.findOne(userId);
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

    async update(id: number, updateQuestionDto: UpdateQuestionDto) {
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
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            const res = await this.questionRepository.delete(id);
            if (res.affected === 1) {
                return {
                    message: 'Question has been deleted',
                    status: HttpStatus.CREATED,
                };
            }
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        } catch (error) {
            throw error;
        }
    }
}
