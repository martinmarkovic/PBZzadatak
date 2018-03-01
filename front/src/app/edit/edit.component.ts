import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { AuthenService } from '../service/index';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnChanges {

  editing: boolean = false;





  constructor(private authenservice: AuthenService) { }

  @Input() note
  
  @Output()
  spremanjeEdita: EventEmitter<any>=new EventEmitter();

  ngOnChanges() {

    // if (changes.note){
    //   this.note = Object.assign({}, changes.note.currentValue);

    // }

  }

  toggleEdit() {
    if (this.editing){
      this.spremanjeEdita.emit(this.note);
      if (this.spremanjeEdita.emit){
        console.log("note lokalno promjenjen")
      }
    }
    this.editing = !this.editing;
  }

  onNoteChange(value: string) {
    console.log('Value:', value);
    this.note = value;
  }



}
