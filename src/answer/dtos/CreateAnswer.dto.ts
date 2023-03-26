import { IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
    @IsNotEmpty()
    readonly answer: string;

    @IsNotEmpty()
    readonly userId: string;

    @IsNotEmpty()
    readonly questionId: number;
}
