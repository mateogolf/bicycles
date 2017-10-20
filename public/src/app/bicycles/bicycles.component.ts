import { Component, OnInit } from '@angular/core';
import { BicycleService } from '../bicycle.service';

@Component({
  selector: 'app-bicycles',
  templateUrl: './bicycles.component.html',
  styleUrls: ['./bicycles.component.css']
})
export class BicyclesComponent implements OnInit {
  bicycles=[];
  constructor(private _service:BicycleService) { }

  ngOnInit() {
    this._service.getUsersBikes((bikes)=>this.bicycles = bikes)
  }


}
