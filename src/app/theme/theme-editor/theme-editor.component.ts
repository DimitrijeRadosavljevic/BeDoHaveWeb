import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {ThemeService} from '../theme.service';
import {Theme} from '../../_shared/models/theme';

@Component({
  selector: 'app-theme-editor',
  templateUrl: './theme-editor.component.html',
  styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {
  public form: FormGroup;
  public formActive: boolean = false;

  public loading: number = 0;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private themeService: ThemeService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.buildForm();
  }

  private buildForm(theme?: Theme): void {
    this.form = this.formBuilder.group({
      id: [theme ? theme.id : null],
      title: [theme ? theme.title : null, Validators.required],
      description: [theme ? theme.description : null, Validators.required],
      date: [theme ? new Date(theme.date).getDate() : new Date().getDate(), Validators.required]
    });

    this.formActive = true;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading++;
    this.themeService.postTheme(this.form.value as Theme).subscribe(
      result => {
        this.toastrService.success('Theme successfully created!');
        this.router.navigate([`/themes/${result.data.id}`]);
      },
      error => {
        this.toastrService.error('Error has occurred, try again later');
      },
      () => this.loading--
    );
  }
}
