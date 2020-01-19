import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { WalletComponent } from './wallet/wallet.component';
import { NoteComponent } from './note/note.component';
import { EditNoteComponent } from './note/dialogs/edit-note/edit-note.component';


@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule, ReactiveFormsModule,
    DashboardRoutingModule,
  ],
  entryComponents:[EditNoteComponent],
  declarations: [HomeComponent, DashboardComponent, WalletComponent, NoteComponent, EditNoteComponent],
  exports: []
})
export class DashboardModule { }
