import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule,
  MatCardModule, MatTreeModule, MatGridListModule, MatTableModule,
  MatInputModule,MatDialogModule, MatProgressSpinnerModule,MatTabsModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

const MATMODULES = [
  MatButtonModule, MatIconModule, MatSidenavModule,
  MatToolbarModule, MatCardModule, MatTreeModule,
  MatGridListModule, MatTableModule, MatInputModule,
  MatDialogModule,LayoutModule ,MatProgressSpinnerModule,
  MatTabsModule
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
