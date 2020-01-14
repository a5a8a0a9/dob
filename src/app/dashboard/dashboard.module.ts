import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {SharedMaterialModule} from '../shared-material/shared-material.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    DashboardRoutingModule,
  ],
  declarations: [HomeComponent],
  exports:[]
})
export class DashboardModule { }
