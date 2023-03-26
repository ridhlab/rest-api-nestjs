import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { Question } from './question/question.entity';
import { AnswerModule } from './answer/answer.module';
import { Answer } from './answer/answer,entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'quora-clone',
            entities: [User, Question, Answer],
            synchronize: true,
        }),
        UserModule,
        QuestionModule,
        AnswerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
