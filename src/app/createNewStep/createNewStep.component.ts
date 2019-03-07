import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, EventEmitter, Output } from '@angular/core';
import { CreateShowTreeComponent } from '../create-show-tree/create-show-tree.component';
import { TreeoverviewComponent } from '../treeoverview/treeoverview.component';
import { Step } from '../shared/model/Step';
import { TreeVM } from '../shared/model/TreeVM';
import { Answer } from '../shared/model/Answer';
import { TreeServiceService } from '../shared/services/tree-service.service';
import { StepServiceService } from '../shared/services/step-service.service';
import { NavParams, NavController } from 'ionic-angular';
import { LoaderService } from '../shared/services/loader-service.service';
import { ErrorService } from '../shared/services/error-service.service';
import { inputTypes as INPUTTYPE } from '../shared/model/InputType';
import { ResultService } from '../shared/services/result-service.service';
import { Result } from '../shared/model/Result';

@Component({
    selector: 'app-createnewstep',
    templateUrl: './createNewStep.component.html',
    styleUrls: ['/src/app/createNewStep/createNewStep.component.css']
})

//TODO Endpoint für Result createResult, getById, getAllResults
//TODO Answer im Backend Anpassen
//TODO update resultId beim Createn

//TODO Flag für erste Frage // ?? 
// TOdo Verlinkung Dropdown // MD
// TODO Abfrage ob die Frage wirklich entfernt werden möchte  // CS
//TODO IonViewWillLeave Schon gespeichert? // CS



// Todo bei neuem Erstellen NgOnChange triggern // MD
// Todo bei neuer Frage die aktuelle speichern // CS
// TODO auf linker Seite die aktuelle Frage kennzeichnen // CS
// TODO Icon in Folgefrage zentrieren // CS

export class CreateNewTreeComponent implements OnChanges {

    addIsDisabled: boolean = true;
    finishTreeIsDisabled: boolean = true;
    saveQuestionIsDisabled: boolean = true;
    placeHolderAntwortInput: string = "";
    inputs: any[] = INPUTTYPE;
    stepIdFromFirstQuestion: string;

    otherSteps: Step[] = <Step[]>[];
    otherResults: Result[] = <Result[]>[];
    inputType: any;
    step: Step = <Step>{};

    selectedResultValue = "ass"

    @Input()
    stepId: string;

    @Output() savedStep = new EventEmitter<string>();

    constructor(public treeService: TreeServiceService, public stepService: StepServiceService,
        private _navCtrl: NavController, private _navParams: NavParams, private _resultService: ResultService,
        public loadService: LoaderService, public errorService: ErrorService) {
        this.resetFormular();
        this.getAllSteps();
        this.getAllResultsFromTreeId();
    }

    ionViewDidEnter() {
        
    }

    createNewQuestion(answer) {

        this.loadService.presentLoading();
        try {
            // reaidng all Values from Formular to Create Step
            if(this.inputType && this.inputType.value)
                this.step.type = this.inputType.value;

            this.step.treeid = this.treeService.getCurrentTreeId();
            console.log("trying to create step: ", this.step)


            this.stepService.createStep(this.step).subscribe(e => {
                // Beim reinen Speichern der Frage, muss ja die Antwort nicht geupdated werden
                // Backend Call, Antworten der vorherigen Frage updaten mit neuer Step-ID
                if (answer !== "") {
                    this.stepService.updateAnswersForStepId(this.step.stepid, e.stepid)
                }

                // Check if First Question is set already
                this.checkFirstQuestion(e.stepid);

                this.step.stepid = e.stepid;
                this.getAllSteps();
                console.log("successfully created Step: ", e);
                //Tell Parent Component that something was saved, so it can update view on the left
                this.savedStep.emit(this.step.stepid);

                this.loadService.destroyLoading();


            }, err => {
                let error: string = "could'nt create new question"
                this.errorService.showAlert(error);
                this.loadService.destroyLoading();
            });
        }
        catch (e) {
            this.errorService.showAlert(e);
            this.loadService.destroyLoading();
        }
    }

    // Hier kommt beim Klick auf eine andere Frage die neue ID -> Reset und neue Infos reinladen ins Formular
    ngOnChanges(changes: SimpleChanges) {
        const id: SimpleChange = changes.stepId;
        this.stepId = id.currentValue;
        this.step.stepid = id.currentValue;
        this.changeViewToNewStep();
    }

    // Call um Step id zu holen (this.stepId)
    private getStep() {
        if(!this.stepId)
            return;
            
        console.log("getting Step by id: ", this.stepId);
        let arr;
        this.stepService.getAllSteps(this.treeService.getCurrentTreeId()).subscribe(m => {
            arr = m;

            console.log("looking for stepid: ", this.stepId)
            console.log(m)
            let x = arr.find(el => {
                if (this.stepId.match(el.stepid))
                    return el;
            })

            console.log("found step: ", x)
            if (!x)
                return;

            this.step.answers = x.answers;
            this.step.caption = x.caption;
            this.step.question = x.question;
            this.step.treeid = x.treeid;
            this.step.type = x.type;
            this.step.stepid = x.stepid;
        });
    }

    // Löschen einer Frage, die Erste darf hierbei nicht gelöscht werden
    discardQuestion() {
        if (this.step.stepid === this.treeService.getFirstStepId()) {
            this.errorService.showAlert("can not delete first question!")
            return;
        }

        this.stepService.deleteStep(this.step.stepid).subscribe(m => {
            this.resetFormular();
            this.getAllSteps();
        }, err => {
            this.errorService.showAlert("Could not Delete Question");
        });
    }

    // Schaut ob die erste Frage schon gesetzt ist
    checkFirstQuestion(id) {
        if (!this.treeService.getFirstStepId()) {
            this.treeService.setFirstStepId(id);
            let tree:TreeVM = this._navParams.get("tree")
            tree.startStepId = id;
            tree.treeid = this.treeService.getCurrentTreeId();
            console.log("trying to save tree: ",tree)
            this.treeService.createTree(tree).subscribe(m => {

            }, err => {
                console.error(err);
            })
        }
            

    }

    // Hier wird eine Frage zu einer Antwort verknüpft
    addQuestionToAnswer(step:Step, answer) {
        console.log("chosen stepid: ", step, answer);
        this.step.answers.map(m => {
            if (m.answer === answer.answer) {
                m.stepid = step.stepid;
                m.placeholderstep = step.caption;
            }
                
        });
    }

    // Hier wird ein Ergebnis zu einer Antwort verknüpft
    addResultToAnswer(result:Result,answer) {
        console.log("chosen result:", result, answer)
        this.step.answers.map(m => {
            if (m.answer === answer.answer) {
                m.resultid = result.resultid;
                m.placeholderresult = result.result;
            }
                
        });
    }

    // Hinzufügen einer neuen Frage -> neues Formular muss erstellt werden
    addNewAnswer(answer) {
        this.resetFormular();
        this.step.caption = "Neue Frage";
        //this.createNewQuestion(answer);
    }

    // Holt Alle Fragen zu einer TreeId
    getAllSteps() {
        console.log("treeid:", this.treeService.getCurrentTreeId())
        this.stepService.getAllSteps(this.treeService.getCurrentTreeId()).subscribe(m => {
            console.log("found steps: ", m);
            this.otherSteps = m;
        }, () => {
            console.error("error getting steps")
        });
    }

    getAllResultsFromTreeId() {
        this._resultService.getAllResults(this.treeService.getCurrentTreeId()).subscribe(m => {
            console.log("got results:",m)
            this.otherResults = m;
        }, err => {
            console.error("error getting reuslts:",err);
        });
    }

    // neue Antwort hinzufügen
    addAnswer(text: string) {
        if (text == "")
            this.errorService.showAlert("Leere Antwort. Bitte befüllen vor dem Hinzufügen!")
        else {
            let answer: Answer = new Answer(text, null);
            this.step.answers.push(answer);
            this.placeHolderAntwortInput = "";
            this.enableAddButton();

        }
    }

    finishTree() {
        this.loadService.presentLoading();
        this.treeService.markTreeAsFinished().subscribe(m => {
            this.loadService.destroyLoading();
            this._navCtrl.popToRoot();
        }, err => {
            this.loadService.destroyLoading();
        })
        
    }

    enableAddButton() {
        let captionFilled: boolean = false;
        let questionFilled: boolean = false;
        let inputTypeFilled: boolean = false;
        if (this.step.caption && this.step.caption !== "")
            captionFilled = true;
        if (this.step.question && this.step.question !== "")
            questionFilled = true;
        if (this.inputType && this.inputType !== "")
            inputTypeFilled = true;

        if (captionFilled === true && questionFilled === true && inputTypeFilled === true)
            this.addIsDisabled = false;
        else
            this.addIsDisabled = true;
        this.enableSaveQuestionButton();
    }

    enableSaveTreeButton() {
        this.finishTreeIsDisabled = false;
    }

    enableSaveQuestionButton() {
        if (this.step.answers.length) {
            this.saveQuestionIsDisabled = false;
            this.enableSaveTreeButton();
        }
        else
            this.saveQuestionIsDisabled = true;

    }
    
    // Formular reseten und mit neuen Werten füllen
    changeViewToNewStep() {
        this.resetFormularWithoutEmit();
        this.getStep();
    }

    resetFormularWithoutEmit() {
        this.step.question = "";
        this.step.caption = "";
        this.step.answers = [];
        this.step.stepid = undefined;
    }
    resetFormular() {
        this.step.question = "";
        this.step.caption = "";
        this.step.answers = [];
        this.step.stepid = undefined;
        this.savedStep.emit();
    }

    setInput(event) {
        console.log(event);
        this.inputType = event;
        this.enableAddButton()
    }


    getSelectedResult(answer) {
        let answerFound = this.step.answers.find(m => m.answer === answer.answer);
        let foundResult = this.otherResults.find(x => x.resultid === answerFound.resultid);
        if(foundResult)
            return foundResult.result 

        else return "Ergebnisse"
    }
}
