import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {MatDialog} from '@angular/material';
@Injectable()
export class DialogService {

    constructor(public dialog: MatDialog ) {
     
     }
    openYesOrNoDialog(dialogMessage:string) {
  
      }
   
}
