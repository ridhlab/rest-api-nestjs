import { Answer } from 'src/modules/answer/answer.entity';
import { Question } from 'src/modules/question/question.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/modules/auth/auth.constants';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column({ type: 'text', unique: true })
    username: string;

    @Column('text')
    password: string;

    @OneToMany(() => Question, (question) => question.user)
    questions: Question[];

    @OneToMany(() => Answer, (answer) => answer.user)
    answers: Answer[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateddAt: Date;

    // Hash password
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, SALT_OR_ROUNDS);
    }
}
