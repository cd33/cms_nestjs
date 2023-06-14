# cms_nestjs
CMS with Nest, MongoDB, Mongoose, Angular

## TODO
* intercepteur lors du register pour empecher si l'email existe déja
* ++sécurité coté nest, check des requetes recu avant d'inscrire en base
* hasher les mdp en bdd
* photos articles et profile user

## Useful commands
```
npm i -g --prefix D:\Programmes\Nestjs @nestjs/cli
nest new cms_nestjs
yarn add @nestjs/mongoose mongoose
nest g mo articles (nest generate module articles)
nest g s articles (nest generate service articles)
nest g co articles (nest generate controller articles)

yarn run start:dev
```

## NEST
* MongooseModule.forRoot(config.mongoUri) dans app.module
* Création module articles
* Création schéma article
* Implémentation du schéma dnas articles.module avec imports
* Création d'un service articles
* Création d'un dto create_article
* Création d'une interface article
* Dans app.service, création de la fonction async de création d'article en utilisant Model de mongoose, le dto et l'interface
* Création du controller articles, capable d'écouter un post pour créer l'article
* Création d'un interceptor, pour modifier la requete au besoin lors de la création d'un article:
nest g interceptor checkauthor
On écris la logique puis on l'associe au controller
* Put: mise à jour article avec findByIdAndUpdate(id, article, { new: true } (payload (pour attendre la modification)))
* Créer un module, un component et un service pour gérer les USERS: nest g mo users, nest g co users, nest g s users
* Créer un dto, une interface et un schema
* Pour l'authentication use solution est d'utilisé la librairie Passport et jwt.

## Angular:
* ng new client_angular --routing=true
* ng g m articles --routing (generate module)
* ng g c articles/articles (generate component)
* Dans articles-routing.module, const routes: Routes = [{ path: '', component: ArticlesComponent }];
* Dans app-routing.module, const routes: Routes = [{ path: 'articles', loadChildren: () => import('./articles/articles.module').then((m) => m.ArticlesModule)}];
* Pour faire une requete Get vers les articles: Dans articles.module, ajouter HttpClientModule
Dans articles.component: constructor(private httpClient: HttpClient) {}
Pour faire le get: this.httpClient.get<any[]>('http://localhost:3000/articles')
* Pour les liens sans rafraichissement:  <a [routerLink]="['articles']" >
* Créer partie admin: 
ng g m admin --routing
ng g c admin/home
ng g c admin/article_new
* Créer routage dans admin-routing.module : [{ path: 'home', component: HomeComponent }, { path: 'article_new', component: ArticleNewComponent }]
* Pour le form, ajouter FormsModule, ReactiveFormsModule dans admin.module
* Implementer FormBuilder, FormGroup dans article-new.component.ts, voir fichier
* Dans article-new.component.html: 
<form [formGroup]="articleForm" (ngSubmit)="submit()">
et formControlName="title" dans les inputs
* Création d'un service pour poster vers le server Nest: ng g s admin/article
createArticle(article: any) {return this.httpClient.post<any>('http://localhost:3000/articles', article);}
* Dans article-new.component.ts, s'abonner à l'Observable: this.articleService.createArticle(this.articleForm.value).subscribe((res) => console.log('res :>> ', res));
* Pour gérer les erreurs (comme celles server): catchError dans un pipe
* ng g c articles/article-summary
* Pour rafraichir la page après une réponse server, Output et EventEmitter.
On envoit un event (deleteSuccess) coté enfant (article-summary.component) vers le parent (articles.component.html) qui l'intercepte puis reload la page avec une fonction dans son component. ((deleteSuccess)="reloadArticles($event)")
* ng g c admin/article_edit
* @Input() article, pour recevoir un article du parent

## Tailwind:
https://tailwindcss.com/docs/guides/angular

Si bug module pnpm: faire pnpm upgrade

