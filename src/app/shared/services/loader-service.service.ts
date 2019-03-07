import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoaderService {
loader:any;
    constructor(public loadingCtrl: LoadingController) { }
    destroyLoading() {
        this.loader.dismiss();
    }
    presentLoading() {
        this.loader= this.loadingCtrl.create({
            content: "Please wait...",
            duration: 300000
          });
          this.loader.present();
    }
}
