import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  inputItem = {
    title: '',
    content: '',
    date: new Date()
  };
  collectionName: string = 'note';
  constructor(private ngfs: AngularFirestore,public dialog: MatDialog) { }

  ngOnInit() {
  }

  add() {
    console.log(this.inputItem)
    this.ngfs.collection(this.collectionName).add(this.inputItem).then((result)=>{
      console.log(result);
      this.dialog.closeAll();
    });
    
  }

}
