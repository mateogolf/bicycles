import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BicycleService } from '../../bicycle.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() oneBike;
  @Input() myId;
  @Output() emitter = new EventEmitter();
  isCurrentOwner=false;
  constructor(private _service: BicycleService) { }


  ngOnInit() {
    console.log(this.myId === this.oneBike._user);
    if(this.myId===this.oneBike._user){
      this.isCurrentOwner=true;
    }
  }
  deleteOrContact(){
    if(this.isCurrentOwner){
      this._service.delete(this.oneBike._id);
      this.emitter.emit();
      return;
    }
    this._service.contactUser(this.oneBike._user);
  }
  

}
