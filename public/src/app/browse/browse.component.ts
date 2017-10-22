import { Component, OnInit } from '@angular/core';
import { BicycleService } from '../bicycle.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  bicycles=[];
  id;
  search={content:""}
  // results: Object;
  // searchTerm$ = new Subject<string>();
  constructor(private _service: BicycleService, private _router: Router) { }

  ngOnInit() {
    this.getList();
  }
  updateList(){
    this.getList();
  }
  getList() {
    this._service.getUser()//currentUser => this.currentUser = currentUser);
      .then((user) => {
        console.log("CURRENT USER ID:", user._id)
        this.id = user._id
      })
      .catch((err) => {
        this.id = "";
        this._router.navigateByUrl('/')
        console.log('could not find user')
      })
    this._service.getAllBikes((bikes) => this.bicycles = bikes)
  }
  searchB(){
    this._service.searchBikes(this.search.content,(bikes) => this.bicycles = bikes)
  }
}
