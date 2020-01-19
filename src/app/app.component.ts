import {Component, Injectable} from '@angular/core';
import { MatSidenav, MatDrawerToggleResult, } from '@angular/material';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';

export class FileNode {
  children: FileNode[];
  name: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);
  
  constructor() {
    this.treeSetting();
  }


  toggleSideNav(sideNav: MatSidenav) {
    sideNav.toggle().then((result: MatDrawerToggleResult) => {
      console.log(result);
      
    });
  }

  treeSetting(){
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.dataChange.subscribe(data => this.nestedDataSource.data = data);

    this.dataChange.next([
      {
        name: "Dashboard",
        path: "",
        icon: "",
        children: [
          {
            name: "首頁",
            path: "/home",
            icon: "home",
            children: [],
          },
          {
            name: "錢包",
            path: "/wallet",
            icon: "account_balance_wallet",
            children: [],
          },
          {
            name:"筆記",
            path: "/note",
            icon:"menu_book",
            children:[]
          }
        ],
      }
    ]);
  }

  private _getChildren = (node: FileNode) => { return observableOf(node.children); };
  
  hasNestedChild = (_: number, nodeData: FileNode) => {return !(nodeData.children.length==0); };


}
