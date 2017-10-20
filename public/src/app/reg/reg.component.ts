import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { BicycleService } from '../bicycle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {
  user:User;
  private regErrs = [];

  constructor(private _service: BicycleService, private _router: Router) {
    this.user = new User();
  }

  ngOnInit() {
  }

  onRegister() {
    this._service.create(this.user)
      .then((data) => {
        console.log(data)
        this.user = new User()
        this._router.navigateByUrl('/main/browse')
      })
      .catch((err) => {
        // console.log(err)
        const errors = JSON.parse(err._body)
        console.log(errors)
        for (let key in errors) {
          // console.log(key)
          this.regErrs.push(errors[key].message)
        }
      })

  }
}
