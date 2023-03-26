import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './question.entity';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Question]), UserModule],
    providers: [QuestionService],
    controllers: [QuestionController],
    exports: [TypeOrmModule, QuestionService],
})
export class QuestionModule {}
