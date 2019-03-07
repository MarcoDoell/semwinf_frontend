import { Injectable } from '@angular/core';
import { TreeVM } from '../model/TreeVM';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable(
)

export class TreeServiceService {

  url: string = "https://secure-fortress-85338.herokuapp.com/api/v1/";

  currentTreeId: string;
  firstStepId:string;

  constructor(private http: HttpClient) { }

  testTree (caption: string):Observable<any>{
      return this.http.get(this.url+"tree");
  }

  createTree (send: TreeVM): Observable<TreeVM> {
    return this.http.post<TreeVM>(this.url+"tree", send, httpOptions).pipe(
      tap((tree: TreeVM) => console.log("added tree :", tree)),
    ); 
  }

  markTreeAsFinished(): any {
    return this.http.put<String>(this.url+"tree",this.currentTreeId, httpOptions).pipe(tap(m => {

    }));
  }

  getCurrentTreeId() {
    return this.currentTreeId;
  }

  setCurrentTreeId(id: string) {
    this.currentTreeId = id;
  }

  getFirstStepId() {
    return this.firstStepId;
  }

  setFirstStepId(id:string) {
    this.firstStepId = id;
  }

  getAllTrees() {
    return this.http.get(this.url+"tree").pipe(tap(m => {

    }));
  }
  
}

