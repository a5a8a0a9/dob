import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { DashboardService } from '../dashboard.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { EditNoteComponent } from './dialogs/edit-note/edit-note.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import * as swal from 'sweetalert2';
import { s } from '@angular/core/src/render3';


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
  grid_col = 3;
  isLoading = false;

  constructor(
    private title: Title,
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
    this.title.setTitle("筆記本");
    this.getData();
    this.getWidth();
  }

  getWidth() {
    console.log();
    this.breakpointObserver.observe(Object.values(Breakpoints)).subscribe(result => {
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

  showEditDialog(item?) {
    const dialogRef = this.dialog.open(EditNoteComponent, {
      data: item ? item : null
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
        this.isLoading = true;
        this.getData();
      }
    });

  }

  getData() {
    this.isLoading = true;
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
        env.isLoading = false;
      });
  }

  delete(id) {
    console.log(id);

    swal.default.fire({
      title:'確定刪除?',
      confirmButtonText:'確定的啦！',
      cancelButtonText:'不要哦！！！',
      showCancelButton:true,
      type:'warning'
    }).then(result=>{
      console.log(result);
      if (result.value){
        this.ngfs.collection(this.collectionName).doc(id).delete()
        .then(() => {
          this.isLoading = true;
          swal.default.fire({title:'刪除成功',type:'success'});
          this.getData();
        });
      }
    })

    

  }

  trackByFn(item, index) {
    return item.id;
  }

}
