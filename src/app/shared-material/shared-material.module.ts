import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule,
  MatCardModule, MatTreeModule, MatGridListModule, MatTableModule,
  MatInputModule,MatDialogModule
} from '@angular/material';

const MATMODULES = [
  MatButtonModule, MatIconModule, MatSidenavModule,
  MatToolbarModule, MatCardModule, MatTreeModule,
  MatGridListModule, MatTableModule, MatInputModule,
  MatDialogModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MATMODULES
  ],
  exports: [
    ...MATMODULES
  ],
  declarations: []
})
export class SharedMaterialModule { }
