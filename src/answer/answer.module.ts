import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from 'src/question/question.module';
import { UserModule } from 'src/user/user.module';
import { Answer } from './answer.entity';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
    imports: [TypeOrmModule.forFeature([Answer]), UserModule, QuestionModule],
    controllers: [AnswerController],
    providers: [AnswerService],
})
export class AnswerModule {}
