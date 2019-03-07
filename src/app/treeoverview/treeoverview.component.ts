import { Component, OnInit } from '@angular/core';
import { TreeServiceService } from '../shared/services/tree-service.service';
import { TreeVM } from '../shared/model/TreeVM';
import { NavParams, NavController } from 'ionic-angular';
import { LandingpageComponent } from '../landingpage/landingpage.component';
import { UserviewComponent } from '../userview/userview.component';
@Component({
  selector: 'app-treeoverview',
  templateUrl: './treeoverview.component.html',
  styleUrls: ['/src/app/treeoverview/treeoverview.component.css']
})
export class TreeoverviewComponent implements OnInit {

  trees: TreeVM[] = <TreeVM[]>[];

  constructor(private _treeService: TreeServiceService,private _navCtrl: NavController) { 
   let arr;
      this._treeService.getAllTrees().subscribe(m => {
     arr=m;
     console.log(m);
     arr.forEach(el => {
      let treevm :TreeVM=<TreeVM>{};
       treevm.caption=el.caption;
       treevm.startStepId=el.startStepId;
       treevm.treeid=el.treeid;
       this.trees.push(treevm)
     });

    }, err => {
      console.error("error:", err)
    })
  }

  ngOnInit() {

  }
  openTree(tree:TreeVM)
  {
    this._navCtrl.push(UserviewComponent, {
      treeid:tree.treeid,
      treeCaption:tree.caption,
      treeStartStepId:tree.startStepId    });
  
  }
}
