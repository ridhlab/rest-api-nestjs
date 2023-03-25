import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
    @IsNotEmpty()
    readonly question: string;

    @IsNotEmpty()
    readonly userId: string;
}
