    export class Answer {
    answer:string;
    stepid:string;
    resultid:string;
    placeholderresult:string = "";
    placeholderstep:string = "";
    
    constructor(answerIn:string,stepidIn:string)
    {
        this.answer=answerIn;
        this.stepid=stepidIn;

    }
}