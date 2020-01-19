import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { EditNoteComponent } from './dialogs/edit-note/edit-note.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  collectionName: string = 'note';
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  noteList = [];
  noteForm: FormGroup;

  constructor(private ngfs: AngularFirestore, private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.noteForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getData();
  }

  showEditDialog() {
    const dialogRef = this.dialog.open(EditNoteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });

  }

  getData() {
    let env = this;
    this.noteList = [];
    this.ngfs.collection(this.collectionName)
      .get()
      .subscribe(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.data());
          env.noteList.push({
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            date: new Date(doc.data().date.nanoseconds)
          });
        });
      });
  }

  delete(id) {
    console.log(id);
    this.ngfs.collection(this.collectionName).doc(id).delete()
      .then(() => {
        this.getData();
      });
  }

}
