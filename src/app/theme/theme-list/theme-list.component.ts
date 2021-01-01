import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/_shared/models/theme';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  public themes:Theme[] = [
      { id: '1', title: "Title", description: "Content", date: new Date()},
      { id: '2', title: "Title", description: "Content", date: new Date()},
      { id: '3', title: "Title", description: "Content", date: new Date()},
      { id: '4', title: "Title", description: "Content", date: new Date()},
      { id: '5', title: "Title", description: "Content", date: new Date()},
      { id: '6', title: "Title", description: "Content", date: new Date()}
    ]
  constructor() { }

  ngOnInit(): void {
  }

}
