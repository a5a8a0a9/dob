import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatButtonModule, MatIconModule,
  MatSidenavModule,MatToolbarModule,
  MatCardModule,MatTreeModule
} from '@angular/material';

const MATMODULES = [
  MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatTreeModule
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
