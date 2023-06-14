import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private BASE_URL = 'http://localhost:3000/articles';
  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  createArticle(article: Article) {
    return this.httpClient.post<Article>(this.BASE_URL, article);
  }

  deleteArticle(article: Article) {
    return this.httpClient.delete<Article>(
      `${this.BASE_URL}/${article._id}`,
      this.httpHeaders,
    );
  }

  updateArticle(id: string, article: Article) {
    return this.httpClient.put<Article>(`${this.BASE_URL}/${id}`, article);
  }
}
