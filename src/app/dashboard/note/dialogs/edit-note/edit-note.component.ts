import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

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
  constructor(
    private ngfs: AngularFirestore,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
     ) { 
       
       if (this.data){
         this.inputItem = this.data;
       }
       else{
        console.log(this.data);
       }
     }

  ngOnInit() {
  }

  add() {
    var env = this;
    console.log(this.data);
    console.log(this.inputItem);
    if (this.data){
      this.ngfs.collection(this.collectionName).doc(this.data.id).update(this.inputItem).then(result=>{
        this.dialog.closeAll();
      });
    }
    else {
      this.ngfs.collection(this.collectionName).add(this.inputItem).then((result)=>{
        console.log(result);
        this.dialog.closeAll();
      });
    }
    
  }

}
