import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { BicycleService } from '../bicycle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin={email:"",password:''};
  logErrs = '';

  constructor(private _service: BicycleService, private _router: Router) {}

  ngOnInit() {
  }

  onLogin() {
    this._service.login(this.userLogin)
      .then((data) => {
        window.location.reload();
        this._router.navigateByUrl('/main/browse')
      })
      .catch((err) => {
        console.log(err)
        this.logErrs = JSON.parse(err._body);
      })

  }

}
