import { Component, OnInit, Input } from '@angular/core';
import { BicycleService } from '../../bicycle.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  @Input() editBicycle;
  constructor(private _service:BicycleService) { }

  ngOnInit() {
  }
  delete(idx){
    this._service.delete(idx);
  }
}
