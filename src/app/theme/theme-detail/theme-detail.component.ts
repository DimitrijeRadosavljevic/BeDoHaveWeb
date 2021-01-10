import { ActivatedRoute, Router } from '@angular/router';
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
  public themeId: string | null;
  constructor(private route: ActivatedRoute, private themeService: ThemeService, private tagService: TagService, private router: Router) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  initializeComponent() {
    this.themeId = this.getActivatedRoute();
    this.fetchTheme(this.themeId);
    this.fetchTags(this.themeId);
    this.fetchThemeTags(this.themeId);
  }

  getActivatedRoute(): string | null{
    return this.route.snapshot.paramMap.get('themeId');
  }

  fetchTheme(themeId: string | null) {
    this.themeService.getTheme(themeId, false).subscribe(
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

  public goToCreateEssay() {
    this.router.navigate([`themes/${this.themeId}/essays/create`]);
  }

}
