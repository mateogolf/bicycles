import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import "rxjs";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';


@Injectable()
export class BicycleService {

  constructor(private _http:Http,private _router:Router) { }
 
  create(user) {
    console.log(user);
    return this._http.post('/api/registration', user)
      .map((response: Response) => response.json())
      .toPromise();
  }

  login(user) {
    console.log("service");
    return this._http.post('/api/login', user)
      .map((response: Response) => {
        response.json()
      })
      .toPromise()
  }
  logout() {
    return this._http.get('/api/logout')
  }
  getUser() {
    return this._http.get('/api/user').map((response: Response) => response.json()).toPromise();
    // cb(this.currentUser);
  }
  addBicycle(bicycle){//,cb){
    console.log("Service",bicycle);
    return this._http.post('/api/bicycles/new', bicycle)
      .map((response: Response) => response.json())
      // .toPromise();
    // return this._http.post('/api/bicycles/new', bicycle)
    //   .subscribe(
    //   (response) => {
    //     console.log("Bike added, back in service",response.json());
    //     // this.bicycles.push(response.json());
    //     // cb(this.notes);
    //     return this._router.navigate(['/main/listings']);
    //   },
    //   (err) => {
    //     cb(err);
    //   },
    // )
  }
  getAllBikes(cb){
    return this._http.get("/api/bicycles")
      .subscribe(
      bikes => {
        cb(bikes.json())
      },
      err => { console.log("IN SERVICE back from SERVER:", err) }
      )
  }
  getUsersBikes(cb){
    return this._http.get("/api/bicycles/listings")
    .subscribe(
      bikes=>{
        cb(bikes.json())
      },
      err=>{console.log("IN SERVICE back from SERVER:",err)}
    )      
  }
  searchBikes(search,cb) {
    return this._http.get(`/api/bicycles/${search}`)
      .subscribe(
      bikes => {
        cb(bikes.json())
      },
      err => { console.log("IN SERVICE back from SERVER:", err) }
      )
  }
  editBicycle(idx,bicycle){
    return this._http.put(`/api/bicycles/${idx}`, bicycle)
      .map((response: Response) => response.json())
        .toPromise();
  }

  delete(idx){
    return this._http.delete(`/api/bicycles/${idx}`)
      .subscribe(
        result => { console.log("DELETED")},
        err => { console.log("NOT DELETED",err.json())}
      )
      // .map((response: Response) => {
      //   console.log(response.json())
      // })
  }
  contactUser(id){
    return this._http.get(`/api/contacts/${id}`)
      .map((response: Response) => response.json())
      .subscribe(
      contact => {
        let print = `Name: ${contact.name}\nEmail: ${contact.email}`
        alert(print)
      },
      err => { console.log("NOT FOUND") }
      )
  }
}
