1.  ng new Client --routing
    cd Client c{rep.enter}
    ng g c components/layout --skipTests
    ng g c components/header --skipTests
    ng g c components/add-comment --skipTests
    ng g c components/page-not-found --skipTests
    ng g c components/games --skipTests

2.  clear 4 app.module files
    import { HttpClientModule } from "@angular/common/http";
    import { FormsModule } from "@angular/forms";
    HttpClientModule,
    FormsModule
    layout + index

3.  ng s --aot -o --port 420
del app files
{**one-div-to-rule-layout** make sure components are declared at app}
<div class="container">
  <app-header></app-header>
  <main class="jumbotron">
    <router-outlet></router-outlet>
  </main>
  <div class="text-center">all rights reserved &copy; JohnMogi</div>
</div>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
.jumbotron{
    min-height: 70vh;
}

4.  import { HttpClientModule } from "@angular/common/http";
    import { FormsModule } from "@angular/forms";
    connect to imports.

5.  [ROUTES]:
    { path: "home", component: HomeComponent },
    { path: "games/new", component: AddCommentComponent },
    { path: "games/:cat", component: DetailsComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" }, // full = exact
    { path: "**", component: PageNotFoundComponent }

6.  app-header:
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Score-Board</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" routerLink="/games" routerLinkActive="active">Games</a>
            </li>

          </ul>
        </div>

      </nav>

7.  [MODELS] mkdir models:
    export class DishModel {
    public constructor(
    public dishID?: number,
    public dishName?: string
    ) {
    }
    }

8.  ng g s services/GameScores --skipTests
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { GameModel } from '../models/game-model';
    import { CommentModel } from '../models/comment-model';
    @Injectable({
    providedIn: 'root'
    })
    export class GameScoreService {
    constructor(private http: HttpClient) { }
    public getAllGames(): Observable<GameModel[]> {
    return this.http.get<GameModel[]>("http://localhost:3000/api/games");
    }
    public getAllCommentsFromGame(id: number): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`http://localhost:3000/api/games/game/${id}/comments`);
    }
    public addRecep(comment: CommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>("http://localhost:3000/api/games", comment);
    }
    }

9.  component level import use:

10. time in server (bonus)
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const nowTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

11. [HTML SAMPLES] bring order:
<form>
<select name="gameID" [(ngModel)]="comment.gameID">
<option selected disabled>Select Game</option>
<option \*ngFor="let g of games" value="{{g.gameID}}">
{{g.teamA}} vs {{g.teamB}}
</option>
</select>
<br><br>
<input type="text" name="comment" [(ngModel)]="comment.comment">
<br><br>
<input type="text" name="tags" [(ngModel)]="comment.tags">
<br><br>
<button (click)="addComment()">Add Comment</button>
</form>

---

<div>
    <h1 class="text-center">Games List</h1>
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>team A</th>
                <th>team B</th>
                <th>scoreA</th>
                <th>scoreB</th>
                <th>teamb</th>
                <th>category</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let g of games">
                <td>{{g.gameID}}</td>
                <td>{{g.teamA}}</td>
                <td>{{g.teamB}}</td>
                <td>{{g.scoreA}}</td>
                <td>{{g.scoreB}}</td>
                <td>{{g.gameTime}}</td>
                <td><a routerLink='cat/{{g.cat}}'>{{g.cat}}</a></td>
            </tr>
        </tbody>
    </table>

11. some insert mumbo:
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameModel } from 'src/app/models/game-model';
import { GameScoreService } from 'src/app/services/game-score.service';
import { CommentModel } from 'src/app/models/comment-model';
@Component({
selector: 'app-add-comment',
templateUrl: './add-comment.component.html',
styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
public games: GameModel[];
public comment = new CommentModel();
constructor(private myGamesService: GameScoreService, private router: Router) { }
ngOnInit() {
this.myGamesService
.getAllGames()
.subscribe(games => this.games = games,
err => alert(err.message));
}
public addComment(): void {
this.myGamesService
.addComment(this.comment)
.subscribe(addedComment => {
alert("Comment has been added. ID: " + addedComment.commentID);
this.router.navigateByUrl("/games");
}, err => alert(err.message));
}
}
@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public games: GameModel[];
public comments: CommentModel[];
constructor(private myGameService: GameScoreService) { }
ngOnInit() {
this.myGameService.getAllGames().subscribe(
(games) => (this.games = games),
(err) => alert(err.message)
);
}
public showComments(game: GameModel) {
this.myGameService
.getAllCommentsFromGame(game.gameID)
.subscribe(comments => this.comments = comments,
err => alert(err.message));
}
}
