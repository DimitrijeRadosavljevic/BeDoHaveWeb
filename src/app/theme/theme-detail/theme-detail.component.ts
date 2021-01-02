import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Theme } from 'src/app/_shared/models/theme';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.scss']
})
export class ThemeDetailComponent implements OnInit {

  public theme: Theme;
  constructor(private route: ActivatedRoute, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  initializeComponent() {
    
  }

}
