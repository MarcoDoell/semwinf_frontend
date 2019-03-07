import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorService {

    constructor(public alertCtrl: AlertController ) {
     
     }
    showAlert(errorMessage:string) {
        const alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: errorMessage,
          buttons: ['OK']
        });
        alert.present();
      }
   
}
