import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.less']
})
export class WalletComponent implements OnInit {

  displayTitles: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday'];
  obj = {
    event:'',
    event_cost:0,
    monthly_income:0,
    monthly_save:0,
    bank_money: 0,
    total_money:0,
    time:0,
    daily_cost:0,
  }

  constructor(private title: Title,) { }

  ngOnInit() {
    this.title.setTitle("錢包");
  }



}
