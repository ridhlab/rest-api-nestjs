import { Answer } from 'src/answer/answer,entity';
import { Question } from 'src/question/question.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column({ type: 'text', unique: true })
    username: string;

    @OneToMany(() => Question, (question) => question.user)
    questions: Question[];

    @OneToMany(() => Answer, (answer) => answer.user)
    answers: Answer[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateddAt: Date;
}
