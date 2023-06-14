import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleNewComponent } from './article-new/article-new.component';

const routes: Routes = [
  { path: '', redirectTo: 'article_new', pathMatch: 'full' },
  { path: 'article_new', component: ArticleNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
