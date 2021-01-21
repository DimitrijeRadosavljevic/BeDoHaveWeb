import { Component, OnInit } from '@angular/core';
import {Essay} from '../../_shared/models/essay';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {EssayService} from '../../essay/essay.service';
import {LikeService} from '../../_shared/services/like.service';
import {Theme} from '../../_shared/models/theme';
import {ThemeService} from '../theme.service';
import {PaginatePipeArgs} from 'ngx-pagination/dist/paginate.pipe';

@Component({
  selector: 'app-theme-detail-public',
  templateUrl: './theme-detail-public.component.html',
  styleUrls: ['./theme-detail-public.component.scss']
})
export class ThemeDetailPublicComponent implements OnInit {
  private themeId: string;
  public theme: Theme;
  public essays: Essay[];
  public loading: number = 0;
  public alreadySubscribed: boolean;

  public paginationConfig: PaginatePipeArgs = {
    id: 'essays',
    itemsPerPage: 10,
    currentPage: 1
  };

  constructor(private route: ActivatedRoute,
              private toastrService: ToastrService,
              private themeService: ThemeService,
              private essayService: EssayService,
              private likeService: LikeService,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      this.themeId = params.get('themeId');
      this.fetchTheme();
      this.fetchEssays()
      this.checkIfSubscribed(this.themeId);
    });
  }

  private fetchTheme(): void {
    this.loading++;
    this.themeService.getThemePublic(this.themeId).subscribe(
      result => {
        this.theme = result.data;
      },
      error => {
      },
      () => this.loading--
    );
  }

  public likeTheme(): void {
    this.likeService.likeTheme(this.theme.id).subscribe(
      result => {
        this.theme.likedByUser = true;
        this.theme.likersCount++;
        this.toastrService.success('Theme successfully liked!');
      },
      error => {
        this.toastrService.error('Error occurred, try again later!');
      }
    );
  }

  public unLikeTheme(): void {
    this.likeService.unLikeTheme(this.theme.id).subscribe(
      result => {
        this.theme.likedByUser = false;
        this.theme.likersCount--;
        this.toastrService.success('Theme successfully unliked!');
      },
      error => {
        this.toastrService.error('Error occurred, try again later!');
      }
    );
  }

  private fetchEssays(): void {
    this.essayService.getEssaysPublic(this.themeId, this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage).subscribe(
      result => {
        this.paginationConfig.totalItems = result.data.total;
        this.essays = result.data.essays as Essay[];
      },
      error => {
        console.log(error)
      }
    );
  }

  public onPageChange($event: number): void {
    this.paginationConfig.currentPage = $event;
    this.fetchEssays();
  }

  public goToCreateEssay() {
    this.router.navigate([`themes/${this.themeId}/essays/public/create`]);
  }

  public subscribeOnTheme(theme: Theme) {
    this.themeService.subscribeOnTheme(theme, undefined).subscribe(
      response => {
        this.checkIfSubscribed(theme.id);
        this.toastrService.success("Successfully subscribed")
      },
      error => {
        this.toastrService.error("Some error occured please try leater")
      }
    )
  }

  public unsubscribeFromTheme(theme: Theme) {
    this.themeService.unsubscribeFromTheme(theme).subscribe(
      response => {
        this.checkIfSubscribed(theme.id);
        this.toastrService.success("Successfully unsubscribed");
      },
      error => {
        this.toastrService.error("Some error occured please try leater");
      }
    ) 
  }

  public checkIfSubscribed(themeId: string) {
    const theme = new Theme();
    this.themeService.subscribeOnTheme(theme, themeId).subscribe(
      response => {
        if(response.data == 1) {
          this.alreadySubscribed = true;
        } else {
          this.alreadySubscribed = false;
        }
      }
    ) 
  } 
}
