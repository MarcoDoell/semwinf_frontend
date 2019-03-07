import { Component, OnInit } from '@angular/core';
import { TreeServiceService } from '../shared/services/tree-service.service';
import { TreeVM } from '../shared/model/TreeVM';
import { NavParams, NavController } from 'ionic-angular';
import { LoaderService } from '../shared/services/loader-service.service';
import { StepServiceService } from '../shared/services/step-service.service';
import { StepVM } from '../shared/model/StepVM';
import { Step } from '../shared/model/Step';
import { ErrorService } from '../shared/services/error-service.service';
import { getSupportedInputTypes } from '@angular/cdk/platform';
import { InputType } from '../shared/model/InputType';
import { Answer } from '../shared/model/Answer';
import { ResultviewComponent } from '../resultview/resultview.component';
@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['/src/app/userview/userview.component.css']
})
export class UserviewComponent implements OnInit {

    tree:TreeVM=<TreeVM>{};
    step:Step=<Step>{};
   
  constructor(private _treeService: TreeServiceService,
    public loaderService:LoaderService, private _navCtrl: NavController,
    private navParams:NavParams,public stepService: StepServiceService
    , public errorService: ErrorService) { 
  this.tree.treeid=navParams.get('treeid');
  this.tree.caption=navParams.get('treeCaption');
  this.tree.startStepId=navParams.get('treeStartStepId');
  this.getStep(this.tree.startStepId);
    }

  ngOnInit() {

  }
  getStep(stepId) {
    this.stepService.getStepById(stepId).subscribe(s=>{ 
        this.step=s;
         },err => {
            let error: string = "could'nt get next question"
            this.errorService.showAlert(error);
        });
        console.log(this.step);
        console.log(this.tree);   
    }
  answerChosen(answer:Answer)
  {   
    if(!answer.resultid&&!answer.stepid){
      this.errorService.showAlert("Antwort ist leider nicht richtig angelegt")
      return;
    }
    if(!answer.resultid) {
      this.getStep(answer.stepid)   
      return;       
    }
    
    

      this._navCtrl.push(ResultviewComponent,{
        resultId:answer.resultid
    }).then(
      response=>{
        console.log('Response push' +response)
      }
    ).catch(exception=>{
      this.errorService.showAlert("Ergebnis ist nicht richtig angelegt")
    }
      )
    
   
   }
  
}
