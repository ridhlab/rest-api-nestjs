import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { QuestionModule } from './modules/question/question.module';
import { Question } from './modules/question/question.entity';
import { AnswerModule } from './modules/answer/answer.module';
import { Answer } from './modules/answer/answer.entity';
import { AuthModule } from './modules/auth/auth.module';

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
        AuthModule,
        UserModule,
        QuestionModule,
        AnswerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
