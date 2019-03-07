import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { TreeServiceService } from '../shared/services/tree-service.service'
import { NavController } from 'ionic-angular';
import { LoaderService } from '../shared/services/loader-service.service';
import { ErrorService } from '../shared/services/error-service.service';
import { ResultService } from '../shared/services/result-service.service';
import { Result } from '../shared/model/Result';

@Component ({
  selector: 'app-create-new-result',
  templateUrl: './create-new-result.component.html',
  styleUrls: ['/src/app/create-new-result/create-new-result.component.css']
})
export class CreateNewResultComponent  {
  ergebnis:string;
  ergebnisToSend: Result = <Result> {};

  @Output() savedStep = new EventEmitter<boolean>();

  constructor(private treeService: TreeServiceService,public navCtrl: NavController,public loaderService:LoaderService, public errorService:ErrorService,
    public resultService: ResultService) { 
      this.resetErgebnis();
  }

  ionViewDidEnter() {
    this.resetErgebnis();
  }
  discardResult(){
    this.resetErgebnis();
  }

  resetErgebnis() {
    this.ergebnisToSend.resultid = undefined;
    this.ergebnisToSend.result = "";
    this.ergebnis = "";
    this.ergebnisToSend.treeid = this.treeService.getCurrentTreeId();
  }

  // Ergebnis abspeichern -> Backend Call
  saveResult() {
    this.ergebnisToSend.result = this.ergebnis;

     this.resultService.saveResult(this.ergebnisToSend).subscribe(m => {
       this.ergebnisToSend = m;
       this.savedStep.emit(true);
        console.log("saved result",m);
     }, err => {
        console.log("erroring saving result", err);
     })
     
  } 
}
