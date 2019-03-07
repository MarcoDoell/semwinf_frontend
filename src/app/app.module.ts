import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { LoginComponent } from './login/login.component';
import { CreateShowTreeComponent } from './create-show-tree/create-show-tree.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { RegisterComponent } from './register/register.component';
import { TreeoverviewComponent } from './treeoverview/treeoverview.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TreeServiceService } from './shared/services/tree-service.service';
import { StepServiceService } from './shared/services/step-service.service';
import { LoaderService } from './shared/services/loader-service.service';
import { ErrorService } from './shared/services/error-service.service';
import { CreateNewTreeComponent } from './createNewStep/createNewStep.component';
import { CreateNewResultComponent } from './create-new-result/create-new-result.component';
import { ResultService } from './shared/services/result-service.service';
import { UserviewComponent } from './userview/userview.component';
import { ResultviewComponent } from './resultview/resultview.component';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProfileEditorComponent,
    CreateShowTreeComponent,
    LoginComponent,
    RegisterComponent,
    LandingpageComponent,
    TreeoverviewComponent,
    CreateNewTreeComponent,
    CreateNewResultComponent,
    UserviewComponent,
    ResultviewComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule, 
 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProfileEditorComponent,
    CreateShowTreeComponent,
    LoginComponent,
    RegisterComponent,
    LandingpageComponent,
    TreeoverviewComponent,
    CreateNewTreeComponent,
   CreateNewResultComponent,
   UserviewComponent,
   ResultviewComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    TreeServiceService,
    StepServiceService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoaderService,
    ErrorService,
    ResultService
  ]
})
export class AppModule {}
