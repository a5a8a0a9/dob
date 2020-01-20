import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { EditNoteComponent } from './dialogs/edit-note/edit-note.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


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
  grid_col = 3

  constructor(
    private ngfs: AngularFirestore,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private pageService: DashboardService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.noteForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getData();
    this.getWidth();
  }

  getWidth() {
    console.log();
    this.breakpointObserver.observe(Object.values(Breakpoints)).subscribe(result => {
      console.log(result)
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.grid_col = 1;
      }
      if (result.breakpoints[Breakpoints.Small]) {
        this.grid_col = 2;
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        this.grid_col = 2;
      }
      if (result.breakpoints[Breakpoints.Large]) {
        this.grid_col = 3;
      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        this.grid_col = 4;
      }
    });
  }

  showEditDialog() {
    const dialogRef = this.dialog.open(EditNoteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
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
          env.noteList.push({
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            date: doc.data().date.toDate()
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

  trackByFn(item,index){
    return item.id;
  }

}
