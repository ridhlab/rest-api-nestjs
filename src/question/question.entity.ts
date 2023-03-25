import { User } from 'src/user/user.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';

@Entity()
export class Question {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    question: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateddAt: Date;

    @ManyToOne(() => User, (user) => user.questions)
    user: User;
}
