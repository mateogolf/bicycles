import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BicycleService } from '../../bicycle.service';
import { Bicycle } from '../../bicycle';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  // bicycle;
  currentUser;
  bicycle={//:Bicycle;
    title:"",
    description:"",
    price:0,
    location:"",
    image_url:""
  }
  errors=[];
  constructor(private _service:BicycleService,private _router: Router) {
    // this.bicycle = new Bicycle();
  }

  ngOnInit() {
  }

  onSubmit(){
    console.log("Onsubmit",this.bicycle)
    // this.getLoggedUser();
    // this.bicycle._user = this.currentUser._id
    this._service.addBicycle(this.bicycle)
    .subscribe(
      bike=> { 
        window.location.reload();
      },
      err=>{
        console.log("err",err,typeof err)
        const errs = JSON.parse(err._body);
        // for (let key in errs) {
        //   this.errors.push(errs[key].message)
        // }
      }
    )
    //Using promises
      // .then(data=>{
      //   this.bicycle = new Bicycle();
      //   // window.location.reload();
      //   // this._router.navigateByUrl('/main/listings')
      // })
      // .catch(err=>{
      //   console.log("NOT ADDED",err)
      //   // const errs = JSON.parse(err._body);
      //   // for (let key in errs) {
      //   //   // console.log(key)
      //   //   this.errors.push(errs[key].message)
      //   // }
      // })
    // this._service.addBicycle(this.bicycle, (err) => {
    //   this.errors = err;
    // });
  }
  getLoggedUser() {
    this._service.getUser()//currentUser => this.currentUser = currentUser);
      .then((data) => {
        this.currentUser = data
      })
      .catch((err) => {
        this.currentUser = "";
        this._router.navigateByUrl('/')
        console.log('could not find user')
      })
  }
}
