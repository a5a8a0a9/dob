import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  name: string;
  content: string;
  description: string;
  image: string = null;

  constructor(private title:Title,) {
    
   }

  ngOnInit() {
    this.title.setTitle("首頁");
  }


}
