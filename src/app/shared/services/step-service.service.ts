import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { StepVM } from '../model/StepVM';
import { Step } from '../model/Step';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable(
)
export class StepServiceService {
  url: string = "https://secure-fortress-85338.herokuapp.com/api/v1/";
  public currentStep:Step=<Step>{};
  constructor(private http: HttpClient) { }

  createStep (step: Step): Observable<Step> {
    let send: Step = step;
    return this.http.post<Step>(this.url+"step", send, httpOptions).pipe(tap((step: Step) => {

    }));
  }
  getCurrentStep():Step{
    return this.currentStep;
  }
  setCurrentStep(newCurrentStep:Step):void{
    this.currentStep=newCurrentStep;
  }
  getStepById(stepId: String):Observable<Step> {
    return this.http.get(this.url + "step/byid/" + stepId).pipe(tap((step:Step) => {
      
    }));
  }

  
  getAllSteps(treeId: String) {
    return this.http.get<Step[]>(this.url +"step/"+treeId).pipe(tap(res => {
      
    }));
  }

  updateAnswersForStepId(toBeUpdatedStepid: String, addStepIdToAnswer: String) {
    return this.http.put<String>(this.url+"step/"+toBeUpdatedStepid,addStepIdToAnswer);
  }

  deleteStep(stepid: String) {
    return this.http.delete(this.url+"step/"+stepid).pipe(tap(res => {

    }));
  }
}
