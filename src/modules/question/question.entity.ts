import { Answer } from 'src/modules/answer/answer.entity';
import { User } from 'src/modules/user/user.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';

@Entity()
export class Question {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    question: string;

    @ManyToOne(() => User, (user) => user.questions)
    user: User;

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateddAt: Date;
}
