import { Observable } from 'rxjs';
import { Answer } from './Answer';
import { InputType } from './InputType';
export class StepVM {

    treeid: string;
    caption: string;
    question: string;
    type: InputType;
    answers: Answer[];
    constructor(treeidIn: string, captionIn: string, questionIn: string, typeIn: InputType, answersIn: Answer[]) {
        this.treeid = treeidIn,
            this.caption = captionIn,
            this.question = questionIn,
            this.type = typeIn,
            this.answers = answersIn
    }
}