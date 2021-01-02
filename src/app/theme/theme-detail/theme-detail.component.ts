import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Theme } from 'src/app/_shared/models/theme';
import { Tag } from 'src/app/_shared/models/tag';
import { TagService } from 'src/app/_shared/services/tag.service';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.scss']
})
export class ThemeDetailComponent implements OnInit {

  theme: Theme = new Theme();
  tags: Tag[];
  public tagsText: string="";
  constructor(private route: ActivatedRoute, private themeService: ThemeService, private tagService: TagService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  initializeComponent() {
    const themeId = this.getActivatedRoute();
    this.fetchTheme(themeId);
    this.fetchTags(themeId);
    this.fetchThemeTags(themeId);
  }

  getActivatedRoute(): string | null{
    return this.route.snapshot.paramMap.get('themeId');
  }

  fetchTheme(themeId: string | null) {
    this.themeService.getTheme(themeId).subscribe(
      response => {
        this.theme = response.data 
      },
      error => { console.log(error) }
    )
  }

  fetchTags(themeId: string | null) {
    this.tagService.getTagsForTheme(themeId).subscribe(
      result => {
        this.tags = result.data; 
        for(let i=0;i<this.tags.length;i++){
          this.tagsText += " #" + this.tags[i].name;
        }
      },
      error => { console.log(error) }
    )
  }

  fetchThemeTags(themeId: string | null) {
    this.tagService.getTagsForTheme(themeId).subscribe({
      next: response => {
        this.tags = response.data;
      }
    })
  }

}
