import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  @Input() editBicycle;
  constructor() { }

  ngOnInit() {
  }

}
