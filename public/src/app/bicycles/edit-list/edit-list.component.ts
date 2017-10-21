import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { BicycleService } from '../../bicycle.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit, OnChanges {
  @Input() editBicycle;
  errors;
  constructor(private _service:BicycleService) { }

  ngOnInit() {
  }
  ngOnChanges(changes:SimpleChanges){
    this.editBicycle = changes.editBicycle.currentValue;
  }


  deleteBike(idx){
    // console.log("ID:",idx);
    this._service.delete(idx);
  }
  onSubmit(){
    // console.log("Update",this.editBicycle)
    this._service.editBicycle(this.editBicycle._id,this.editBicycle)
    .then(bike=>{
      this.editBicycle=bike;
    })
    .catch(err=>{
      this.errors=err;
    })

  }
}
