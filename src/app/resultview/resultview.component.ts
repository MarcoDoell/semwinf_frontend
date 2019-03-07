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
import { Result } from '../shared/model/Result';
import { ResultService } from '../shared/services/result-service.service';
@Component({
  selector: 'app-resultview',
  templateUrl: './resultview.component.html',
  styleUrls: ['/src/app/resultview/resultview.component.css']
})
export class ResultviewComponent implements OnInit { 
result:Result=<Result>{};
constructor(public resultService:ResultService,
    public loaderService:LoaderService,private navParams:NavParams,
    public errorService: ErrorService) 
{ 
  this.result.resultid=navParams.get('resultId');
  this.getResult(this.result.resultid);
}

ngOnInit() {}

getResult(stepId) {    
    this.resultService.getResult(this.result.resultid).subscribe(r=>{ 
        this.result=r;
         },err => {
            let error: string = "could'nt get result"
            this.errorService.showAlert(error);
        });
        console.log(this.result);   
    }
    

}
