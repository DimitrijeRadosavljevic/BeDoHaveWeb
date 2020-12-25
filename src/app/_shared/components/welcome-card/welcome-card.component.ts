import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-welcome-card',
  templateUrl: './welcome-card.component.html',
  styleUrls: ['./welcome-card.component.scss']
})
export class WelcomeCardComponent implements OnInit {
  @Input() text: string;
  @Input() color: string;

  constructor() { }

  ngOnInit(): void {
  }

}
