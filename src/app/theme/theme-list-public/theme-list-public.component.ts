import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { Tag } from 'src/app/_shared/models/tag';
import { Theme } from 'src/app/_shared/models/theme';
import { TagService } from 'src/app/_shared/services/tag.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-list-public',
  templateUrl: './theme-list-public.component.html',
  styleUrls: ['./theme-list-public.component.scss']
})
export class ThemeListPublicComponent implements OnInit {

  public paginationConfig: PaginatePipeArgs = {
    id: 'essays',
    itemsPerPage: 6,
    currentPage: 1
  };
  
  public tagDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 10,
    allowSearchFilter: true,
    limitSelection: 5
  };
  public titleFilter: string | undefined;
  public loading: number = 0;
  public publicThemes: Theme [];
  public filterTags: string | undefined;
  public selectedTags: Tag[] = new Array();
  public tags: Tag [];

  constructor(private themeService: ThemeService, private router: Router, private tagService: TagService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  public initializeComponent() {
    this.fetchPublicThemes();
    this.fetchTags();
  }

  public fetchPublicThemes() {
    this.loading++;
    this.themeService.fetchPublicThemes(this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage, this.titleFilter, this.filterTags, ).subscribe(
      response => {
        this.paginationConfig.totalItems = response.data.total;
        this.publicThemes = response.data.themes as Theme[]
      },
      error => {
        this.router.navigate(['/error'])
      },
      () => {
        this.loading--
      }
    )
  }

  public tagSelected($event: Tag): void {
    this.selectedTags.push($event);
    this.filterThemes();
  }

  public tagDeSelected($event: Tag): void {
    this.selectedTags = this.selectedTags.filter(tag => tag.id !== $event.id);
    this.filterThemes();
  }

  public setTitleFilter(titleFilterValue: string) {
    this.titleFilter = titleFilterValue;
    this.filterThemes();
  }

  public onPageChange($event: number): void {
    this.paginationConfig.currentPage = $event;
    this.filterThemes();
  }

  filterThemes() {
    if(this.selectedTags.length == 0 && this.titleFilter == ""){
      this.filterTags = undefined;
      this.titleFilter = undefined;
      this.fetchPublicThemes();
    } else {
      let tags:string = "";
      this.selectedTags.forEach(tag => {
        tags += tag.name;
      });
      this.filterTags = tags;
      this.fetchPublicThemes();
    }
  }

  private fetchTags(): void {
    this.tagService.getTags('').subscribe(
      result => {
        this.tags = result.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  public goToDetails(theme: Theme) {
    this.router.navigate([`themes/${theme.id}/public`]);
  }


}
