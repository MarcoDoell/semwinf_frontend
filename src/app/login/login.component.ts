import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NavController } from 'ionic-angular';
import { LandingpageComponent } from '../landingpage/landingpage.component';

@Component({templateUrl: 'login.component.html', selector: 'app-login'})
export class LoginComponent implements OnInit {
    
    constructor(
        private formBuilder: FormBuilder,public navCtrl: NavController
    ) {
      
    }

    ngOnInit() {
         }

    // convenience getter for easy access to form fields
 

    onSubmit() {
              
    }
    login(){
        this.navCtrl.setRoot(LandingpageComponent);
    }

}
