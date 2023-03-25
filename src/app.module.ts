import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { Question } from './question/question.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'quora-clone',
            entities: [User, Question],
            synchronize: true,
        }),
        UserModule,
        QuestionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
