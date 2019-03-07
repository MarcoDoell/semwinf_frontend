import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TreeServiceService } from '../shared/services/tree-service.service'
import { TreeVM } from '../shared/model/TreeVM';
import { NavController } from 'ionic-angular';
import { ProfileEditorComponent } from '../profile-editor/profile-editor.component';
import { LoaderService } from '../shared/services/loader-service.service';
import { ErrorService } from '../shared/services/error-service.service';

@Component ({
  selector: 'app-create-show-tree',
  templateUrl: './create-show-tree.component.html',
  styleUrls: ['/src/app/create-show-tree/create-show-tree.component.css']
})
export class CreateShowTreeComponent implements OnInit {
  isDisabled:boolean;
  treeVm:TreeVM=<TreeVM>{};
  createShowTree:any;
 
  @Input() mycaption: string;
  constructor(private treeService: TreeServiceService,public navCtrl: NavController,public loaderService:LoaderService, public errorService:ErrorService) { 
    this.createShowTree=ProfileEditorComponent;
    this.isDisabled=true;
  }

  ngOnInit() {
  }
  createTree() {
    // TODO Lade Animation einbauen. progress spinner 
    if(this.treeVm.caption !="") {
       this.loaderService.presentLoading();
      //let loading= this.loadingCtrl.create({content:'Bitte warten...'})
      console.log("starting to create tree...")
    this.treeService.createTree(this.treeVm).subscribe(m =>{ 
          
      console.log("created tree with: ", m.treeid);

      // TreeId setzen
      this.treeService.setCurrentTreeId(m.treeid);
      this.treeService.setFirstStepId(undefined);
      this.loaderService.destroyLoading();
      this.navCtrl.push(ProfileEditorComponent, {"tree": this.treeVm})
      
      }, (err) =>{
      this.errorService.showAlert("could not create Tree");
      console.error("could not create Tree")
      this.loaderService.destroyLoading();
      }
      );
    }
    else {
     console.error("can't create tree without caption")
    }
  }
  
  enableMatButton(){
    if(this.treeVm.caption =="")
    {
      console.log("Caption ist leer")
      this.isDisabled=true;
    }
    else
      this.isDisabled=false;
  }
}
