import { IsNotEmpty } from 'class-validator';

export class UpdateQuestionDto {
    @IsNotEmpty()
    readonly question: string;
}
