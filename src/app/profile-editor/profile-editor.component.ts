import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TreeServiceService } from '../shared/services/tree-service.service';
import { StepServiceService } from '../shared/services/step-service.service';
import { inputTypes as INPUTTYPE } from '../shared/model/InputType';
import { StepVM } from '../shared/model/StepVM';
import { Answer } from '../shared/model/Answer';
import { NavController, NavParams, Thumbnail } from 'ionic-angular';
import { TreeVM } from '../shared/model/TreeVM';
import { Step } from '../shared/model/Step';
import { LoaderService } from '../shared/services/loader-service.service';
import { ErrorService } from '../shared/services/error-service.service';
import { Result } from '../shared/model/Result';
import { ResultService } from '../shared/services/result-service.service';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['/src/app/profile-editor/profile-editor.component.css']
})
export class ProfileEditorComponent {
  otherSteps: Step[] = <Step[]>[];
  otherResults: Result[] = <Result[]>[];

  currentStepId: String;

  newStepitem: Step = <Step> {}

  ergebnisWirdAngezeigtFrageNicht:boolean=false;

  tree: TreeVM = <TreeVM>{};

  constructor(public treeService: TreeServiceService, public stepService: StepServiceService,
    private _navCtrl: NavController, private _navParams: NavParams, public loadService: LoaderService, 
    public errorService: ErrorService, private _resultService: ResultService) {
      this.newStepitem.stepid = undefined;
      this.tree = this._navParams.get('tree');
  }

  ionViewDidEnter() {
    this.getAllSteps();
    this.getAllResults();
    
  }
  

  /*isSelected(item: Step) {
    return item.stepid === this.currentStepId
  }*/
  

  navigateToItem(item: Step) {
    this.currentStepId = item.stepid;
  }

  getAllSteps() {
    console.log("treeid:", this.treeService.getCurrentTreeId())
    this.stepService.getAllSteps(this.treeService.getCurrentTreeId()).subscribe(m => {
      console.log("found steps: ", m);
      this.otherSteps = m;
    }, () => {
      console.error("error getting steps")
    });
  }

  getAllResults() {
    console.log("treeid:", this.treeService.getCurrentTreeId())
    this._resultService.getAllResults(this.treeService.getCurrentTreeId()).subscribe(m => {
      this.otherResults = m;
      console.log("found resukts:",m)
    }, err => {
      console.error("trying to find reuslts:",err)
    });
  }

  onSavedNewQuestion(event) {
    console.log("got update",event);
    this.currentStepId = event;
    this.getAllSteps();
  }

  onSavedNewResult(event) {
    this.getAllResults();
  }

  ergebnisAnzeigen(){
    this.ergebnisWirdAngezeigtFrageNicht = !this.ergebnisWirdAngezeigtFrageNicht
  }
}
