import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { BicycleService } from '../bicycle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit,OnChanges {
  currentUser;
  constructor(private _service: BicycleService, private _router: Router) { }
  ngOnChanges(changes: SimpleChanges) {
    this.getLoggedUser();
  }

  ngOnInit() {
    this.getLoggedUser();
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
  goLogout() {
    this._service.logout().subscribe(
      (data) => { console.log(data) },
      (err) => { console.log(err) }
    );
    window.location.reload();
    this._router.navigateByUrl('/')
  }
}
