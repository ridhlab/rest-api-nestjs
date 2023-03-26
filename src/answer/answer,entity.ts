import { Question } from 'src/question/question.entity';
import { User } from 'src/user/user.entity';
import {
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';

@Entity()
export class Answer {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('longtext')
    answer: string;

    @ManyToOne(() => User, (user) => user.answers)
    user: User;

    @ManyToOne(() => Question, (question) => question.answers)
    question: Question;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateddAt: Date;
}
