import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Article } from '../../models/article';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
})
export class ArticleEditComponent implements OnInit {
  response$: Observable<Article> | null = null;
  error: Error | null = null;

  @Input() article: Article = {
    _id: '',
    title: '',
    content: '',
  };
  @Input() handleEditMode: any;

  articleForm: any;

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.articleForm = this.fb.group({
      title: [this.article.title, Validators.required],
      content: [
        this.article.content,
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: [this.article.title, Validators.required],
      content: [
        this.article.content,
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  get title() {
    return this.articleForm.get('title');
  }

  get content() {
    return this.articleForm.get('content');
  }

  async submit() {
    this.error = null;
    this.response$ = this.articleService
      .updateArticle(this.article._id as string, this.articleForm.value)
      .pipe(
        catchError((error) => {
          this.error = error;
          return EMPTY;
        }),
      );
  }
}
