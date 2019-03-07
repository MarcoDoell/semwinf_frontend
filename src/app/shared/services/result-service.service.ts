import { Injectable } from '@angular/core';
import { List } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Result } from '../model/Result';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ResultService {
  url: string = "https://secure-fortress-85338.herokuapp.com/api/v1/";
    constructor(private http: HttpClient) {
     
    }
    
     saveResult(ergebnis: Result): any {
      return this.http.post<Result>(this.url+"result", ergebnis , httpOptions).pipe(tap((result: Result) => {
        
      }));
    }

    getAllResults(treeid:String):any {
      return this.http.get(this.url+"result/all/"+treeid).pipe(tap(m => {

      }));
    }
    getResult(resultId:String):Observable<Result>{
      return this.http.get(this.url + "result/" + resultId).pipe(tap((result:Result) => {
      
      }));
    }
}