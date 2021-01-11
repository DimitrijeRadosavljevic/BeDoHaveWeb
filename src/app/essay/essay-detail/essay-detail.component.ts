import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EssayService} from '../essay.service';
import {Essay} from '../../_shared/models/essay';
import {ToastrService} from 'ngx-toastr';
import {LikeService} from '../../_shared/services/like.service';

@Component({
  selector: 'app-essay-detail',
  templateUrl: './essay-detail.component.html',
  styleUrls: ['./essay-detail.component.scss']
})
export class EssayDetailComponent implements OnInit {
  public essay: Essay;
  public loading: number = 0;
  public publicEssay: boolean;

  constructor(private route: ActivatedRoute,
              private toastrService: ToastrService,
              private essayService: EssayService,
              private likeService: LikeService,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.publicEssay = this.route.toString().includes('public');
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      const essayId: string = params.get('essayId');
      this.fetchEssay(essayId);
    });
  }

  private fetchEssay(id: string): void {
    this.loading++;
    this.essayService.getEssayDetail(id).subscribe(
      result => {
        this.essay = result.data;
      },
      error => {
      },
      () => this.loading--
    );
  }

  public likeEssay(): void {
    this.likeService.likeEssay(this.essay.id).subscribe(
      result => {
        this.essay.likedByUser = true;
        this.essay.likersCount++;
        this.toastrService.success('Essay successfully liked!');
      },
      error => {
        this.toastrService.error('Error occurred, try again later!');
      }
    );
  }

  public unLikeEssay(): void {
    this.likeService.unLikeEssay(this.essay.id).subscribe(
      result => {
        this.essay.likedByUser = false;
        this.essay.likersCount--;
        this.toastrService.success('Essay successfully unliked!');
      },
      error => {
        this.toastrService.error('Error occurred, try again later!');
      }
    );
  }

  public goToEditEssay() {
    if(this.publicEssay) {
      this.router.navigate([`themes/${this.essay.theme.id}/essays/${this.essay.id}/edit/public`]);
    } else {
      this.router.navigate([`themes/${this.essay.theme.id}/essays/${this.essay.id}/edit`]);
    }
  }

  public goBack() {
    if(this.publicEssay) {
      this.router.navigate([`themes/${this.essay.theme.id}/public`])
    } else {
      this.router.navigate([`themes/${this.essay.theme.id}`])
    }
  }
}
