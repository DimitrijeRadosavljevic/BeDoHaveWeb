import { Component, OnInit } from '@angular/core';
import {Essay} from '../../_shared/models/essay';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {EssayService} from '../../essay/essay.service';
import {LikeService} from '../../_shared/services/like.service';
import {Theme} from '../../_shared/models/theme';
import {ThemeService} from '../theme.service';

@Component({
  selector: 'app-theme-detail-public',
  templateUrl: './theme-detail-public.component.html',
  styleUrls: ['./theme-detail-public.component.scss']
})
export class ThemeDetailPublicComponent implements OnInit {
  public theme: Theme;
  public loading: number = 0;

  constructor(private route: ActivatedRoute,
              private toastrService: ToastrService,
              private themeService: ThemeService,
              private likeService: LikeService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      const themeId: string = params.get('themeId');
      this.fetchTheme(themeId);
    });
  }

  private fetchTheme(id: string): void {
    this.loading++;
    this.themeService.getThemePublic(id).subscribe(
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
  }}
