import { Component, OnInit } from '@angular/core';
import { CreateShowTreeComponent } from '../create-show-tree/create-show-tree.component';
import { TreeoverviewComponent } from '../treeoverview/treeoverview.component';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['/src/app/landingpage/landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  Treeoverview:any;
  CreateShowTree:any;
  constructor() { 
    this.Treeoverview=TreeoverviewComponent;
    this.CreateShowTree=CreateShowTreeComponent;
  }

  ngOnInit() {
    
  }
  
}
