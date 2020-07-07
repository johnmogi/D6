DIVIDE AND CONQUER: create new snippets master:
1. time handeling file.
client side:
form
serer side

2. select with auto populate send id

0. innerJOIN:  
   SELECT \*
   FROM `receps`
   INNER JOIN dishes ON dishes.dishID = receps.dishID

1. [CLi] startJump:  
   mkdir Server
   cd Server
   touch app.js
   npm init -y
   npm i mysql express cors
   mkdir data-access-layer
   mkdir business-logic
   mkdir data-access-layer
   mkdir controllers
   cd data-access-layer
   touch dal.js

2) [Server] App.js:  
   require("./data-access-layer/dal");
   const express = require("express");
   const cors = require("cors");
   const dishesController = require("./controllers/");
   const server = express();
   server.use(cors());
   server.use(express.json());
   server.use("/api/dishes", dishesController);
   server.listen(3000, () => console.log("Listening on http://localhost:3000"));

3) [dal.js]:
4) {MONGO}
   const mongoose = require("mongoose");
   function connectAsync() {
   return new Promise((resolve, reject) => {
   mongoose.connect("mongodb://localhost:27017/<dbName>",
   { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
   if (err) {
   reject(err);
   return;

   }
   resolve(db);
   });
   });
   }
   async function connectToDatabase() {
   try {
   const db = await connectAsync();
   console.log("We're connected to " + db.name + " database on MongoDB");
   }
   catch (err) {
   console.error(err);
   }
   }
   connectToDatabase();

5) {SQL}:
   const mysql = require("mysql");
   const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "q1w2e3",
   database: "tourist"
   });
   connection.connect(err => {
   if (err) {
   console.error(err);
   return;
   }
   console.log("We're connected to Tourist on MySQL.");
   });
   function executeAsync(sql) {
   return new Promise((resolve, reject) => {
   connection.query(sql, (err, result) => {
   if (err) {
   reject(err);
   return;
   }
   resolve(result);
   });
   });
   }
   module.exports = {
   executeAsync
   };

6) buisness-logic/dish-logic.js:
   module.exports = {
   getAllVacsAsync
   }
   const dal = require("../data-access-layer/dal");
   async function getAllVacsAsync() {
   const sql = `SELECT vacationID,description, destination, picFileName, DATE_FORMAT(startDate, "%m/%d/%Y") as startDate, DATE_FORMAT(endDate, "%m/%d/%Y") as endDate, price FROM vacations`;
   const vacs = await dal.executeAsync(sql);
   return vacs;
   }
   async function getOneVacAsync(id) {
   const sql = `SELECT vacationID,description, destination, picFileName, DATE_FORMAT(startDate, "%m/%d/%Y") as startDate, DATE_FORMAT(endDate, "%m/%d/%Y") as endDate, price FROM vacations WHERE vacationID = ${id}`;
   const user = await dal.executeAsync(sql);
   return user;
   }
   async function addVacAsync(vac) {
   const sql = `INSERT INTO vacations (description, destination, picFileName, startDate, endDate, price, followed) VALUES('${vac.description}','${vac.destination}','${vac.picFileName}','${vac.startDate}','${vac.endDate}','${vac.price}', 0)`;
   const info = await dal.executeAsync(sql);
   vac.id = info.insertId;
   return vac;
   }
   async function updateFullVacationAsync(vac) {
   const sql = `UPDATE vacations SET description = '${vac.description}', destination = '${vac.destination}', picFileName = '${vac.picFileName}', startDate = '${vac.startDate}', endDate = '${vac.endDate}', price = '${vac.price}' WHERE vacationID = ${vac.id}`;
   const info = await dal.executeAsync(sql);
   return info.affectedRows === 0 ? null : vac;
   }
   async function updatePartialVacAsync(vac) {
   let sql = "UPDATE vacations SET ";
   if (vac.description) {
   sql += `description = '${vac.description}',`;
   }
   if (vac.destination) {
   sql += `destination = '${vac.destination}',`;
   }
   if (vac.picFileName) {
   sql += `picFileName = '${vac.picFileName}',`;
   }
   if (vac.startDate) {
   sql += `startDate = '${vac.startDate}',`;
   }
   if (vac.endDate) {
   sql += `endDate = '${vac.endDate}',`;
   }
   if (vac.price) {
   sql += `price = '${vac.price}',`;
   }
   sql = sql.substr(0, sql.length - 1);
   sql += `WHERE ProductID = ${vac.id}`;
   const info = await dal.executeAsync(sql);
   return info.affectedRows === 0 ? null : vac;
   }
   async function deleteOneVacAsync(id) {
   const sql = `DELETE FROM vacations WHERE vacationID = ${id}`;
   await dal.executeAsync(sql);
   }
   module.exports = {
   getAllVacsAsync,
   getOneVacAsync,
   addVacAsync,
   updateFullVacationAsync,
   updatePartialVacAsync,
   deleteOneVacAsync
   };

7) controller/dish-logic.js:
   module.exports = router;
   const express = require("express");
   const DishLogic = require("../business-logic/dish-logic");
   const router = express.Router();
   // GET http://localhost:3000/api/vacations
   router.get("/vacations", async (request, response) => {
   try {
   const vacs = await vacsLogic.getAllVacsAsync();
   response.json(vacs);
   } catch (err) {
   response.status(500).send(err.message);
   }
   });
   // GET http://localhost:3000/api/vacations/1
   router.get("/vacations/:id", async (request, response) => {
   try {
   const id = +request.params.id;
   const vac = await vacsLogic.getOneVacAsync(id);
   response.json(vac);
   } catch (err) {
   response.status(500).send(err.message);
   }
   });
   router.post("/vacations", async (request, response) => {
   try {
   const vac = request.body;
   const addedVac = await vacsLogic.addVacAsync(vac);
   response.status(201).json(addedVac);
   } catch (err) {
   response.status(500).send(err.message);
   }
   });
   router.delete("/vacations/:id", async (request, response) => {
   try {
   const id = +request.params.id;
   const vac = await vacsLogic.deleteOneVacAsync(id);
   response.json(vac);
   } catch (err) {
   response.status(200);
   }
   });
   module.exports = router;
   _
   ---\*\*---
   _

8) [Client] :
@import '../node_modules/@angular/material/prebuilt-themes/indigo-pink.css';
import {MatIconModule} from '@angular/material/icon';
   ng new Client --routing -css
   import { HttpClientModule } from "@angular/common/http";
   import { FormsModule } from "@angular/forms";
   imports: [
   BrowserModule,
   AppRoutingModule,
   HttpClientModule,
   FormsModule
   ],

**TOAST**

2.  [ROUTE] guide:  
    routerLinkActive="active"
    const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "products", component: ProductsComponent },
    { path: "products/new", component: InsertComponent },
    { path: "products/:prodID", component: DetailsComponent },
    { path: "about", component: AboutComponent },
    // { path: "admin", loadChildren: "./admin/admin.module#AdminModule" }, // Lazy Loading
    { path: "admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule) }, // Lazy Loading
    { path: "", redirectTo: "/home", pathMatch: "full" }, // full = exact
    { path: "**", component: PageNotFoundComponent }
    ];

3.  [MODELS] mkdir models:
    export class DishModel {
    public constructor(
    public dishID?: number,
    public dishName?: string
    ) {
    }
    }

3) updated service<obs>:
   import { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { Observable } from 'rxjs';
   import { RecepModel } from 'src/app/models/recep-model';
   import { DishModel } from 'src/app/models/dish-model';
   @Injectable({
   providedIn: 'root'
   })
   export class DishesService {
   constructor(private http: HttpClient) { }
   public getAllReceps(): Observable<RecepModel[]> {
   return this.http.get<RecepModel[]>("http://localhost:3000/api/receps");
   }
   public getAllDishes(): Observable<DishModel[]> {
   return this.http.get<DishModel[]>("http://localhost:3000/api/dishes");
   }
    public addUser(user: AuthModel): Promise<AuthModel> {
      return this.http
          .post<AuthModel>("http://localhost:3000/api/auth/register", user)
          .toPromise();
  }
   }
   [INFO]

   implimented:
    ngOnInit() {
    this.myDishService.getAllDishes().subscribe(
      (dishes) => (this.dishes = dishes),
      (err) => alert(err.message)
    );
  }

   public toys: ToyModel[];
   public toy = new ToyModel();
    constructor(private myDishService: GetDishesService) { }
   async ngOnInit() {
   try {
   this.toys = await this.myToyService.getAllToysAsync();
   console.log(this.toys);
   }
   catch (err) {
   alert("Error: " + err.message);
   }
   }
   public async addToy() {
   try {
   if(!this.toy.price ||!this.toy.manufacturer ){
   alert("plese fill out both prices and manufacturer");
   return
   }
   const addToy = await this.myToyService.addToyAsync(this.toy);
   alert("toy has been added. ID: " + addToy.toyID);
   this.myRouter.navigateByUrl("/toys");
   }
   catch(err) {
   alert(err.message);
   }
   }
   }

4) SERVICE - Fetch: (deprecated)
   ng g s services/getDishes --skipTests
   ng g s services/getReceps --skipTests
   **ng g s services/Receps --skipTests**
   constructor() { }
   public getAllProductsAsync(): Promise<DishModel[]> {
   return new Promise<DishModel[]>((resolve, reject) => {
   fetch("http://localhost:3000/api/dishes")
   .then(response => response.json())
   .then(dishes => resolve(dishes))
   .catch(err => reject(err));
   });
   }
5) dishes component :  
   export class DishesComponent implements OnInit {
   public dishes: DishModel[];
   constructor(private myDishService: GetDishesService) { }
   async ngOnInit() {
   try {
   this.dishes = await this.myDishService.getAllDishesAsync();
   console.log(this.dishes);
   }
   catch (err) {
   alert("Error: " + err.message);
   }
   }
   }

6.  dishes.html:
<div>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let d of dishes">
                <td>{{d.name}}</td>
                <td>{{d.price}}</td>
            </tr>
        </tbody>
    </table>
</div>

7.  Theme up components  
    ng g c components/layouts/layout --skipTests
    ng g c components/layouts/header --skipTests
    ng g c components/layouts/main --skipTests
    ng g c components/layouts/sidebar --skipTests
    ng g c components/layouts/footer --skipTests
    ng g c components/pages/home --skipTests
    ng g c components/Insert --skipTests
    ng g c components/pages/page-not-found --skipTests
    ng g c components/pages/dishes --skipTests |
    ng g c components/pages/receps --skipTests |
    ng g c components/pages/about --skipTests
    ng g c components/pages/contact --skipTests
    ng g c components/pages/auth --skipTests
    ng g c components/pages/auth/login --skipTests
    ng g c components/pages/auth/logout --skipTests
    ng g c components/pages/auth/register --skipTests

666. ui LINKS :
<iframe width="560" height="315" src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=1" allow="autoplay" title="Page not Found"></iframe>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
main{
    min-height: 70vh;
}
.container {
    padding-right: 0;
    padding-left: 0;
}

cd app/ mkdir redux

3. directive guide:

4. template:
<div class="container">
  <app-header></app-header>
  <main class="row">
    <app-sidebar class="col-one"></app-sidebar>
    <section class="col-two">
      <router-outlet></router-outlet>
    </section>
  </main>
  <app-footer></app-footer>
</div>

5. layout.css:  (deprecated) 
   .container {
   max-width: 90%;
   margin: 0 auto;
   }
   .row {
   display: flex;
   }
   .col {
   flex: 1;
   }
   .col-one {
   flex: 1 1 auto;
   }
   .col-two {
   flex: 2 1 auto;
   min-height:60vh;
   }

7) sample insert form: 

<app-heading>Add new Product: </app-heading>
<form>
    <input type="text" placeholder="Name..." name="name" [(ngModel)]="product.name">
    <br><br>
    <input type="number" placeholder="Price..." name="price" [(ngModel)]="product.price">
    <br><br>
    <input type="number" placeholder="Stock..." name="stock" [(ngModel)]="product.stock">
    <br><br>
    <button (click)="addProduct()">Add</button>
</form>

8) sample table ngfor:
<tr *ngFor="let d of dishes">
 <td>{{d.dishID}}</td>
 <td>{{d.dishName}}</td>
 </tr>

9) [observable vs promise]:
   הבדלים בין Promise ל-Observable
   A. יצירת אובייקט Promise מיד מתחילה אותו.
   יצירת אובייקט Observable לא מתחילה אותו, אלא רק קריאה ל-subscribe מתחילה אותו
   B. Promise ברגע שמתחיל - לא ניתן לביטול. או שהוא יצליח או שיכשל.
   Observable ניתן לבטל לאחר שהתחיל גם אם הוא לא סיים.
   C. Promise יכול לדווח הצלחה אחת או כשלון אחד.
   Observable יכול לדווח אינסוף הצלחות או כשלון אחד.
   D. ברגע ש Observable מסתיים בהצלחה - לאחר דיווח ההצלחה האחרונה -
   הוא מפעיל עוד פונקציה אחת עבור Complete. זו הפונקציה השלישית ב-subscribe.
   E. עם Promise ניתן לעבוד ע"י async-await.
   עם Observable לא ניתן.

10) preloader:
    <img \*ngIf="!products" src="/assets/images/loading.gif" width="200">
    \_
    --------------------[PROJECT]

11) [REDUX] info:
    ארכיטקטורה המנהלת מידע ברמת האפליקציה והמאפשרת להחזיק את המידע במקום אחד. המידע נקרא ב-AppState.
    כל אזור באפליקציה שרוצה לשלוח מידע ל-AppState יכול לבצע זאת.
    כל אזור באפליקציה שרוצה לקבל עדכונים מה-AppState יכול לבצע זאת.
    המונחים החשובים:
    A. AppState - המידע הקיים בכל האפליקציה.
    B. ActionType - סוג הפעולה הניתנת לביצוע (Enum). לדוגמה: עדכון כל המוצרים מהשרת. לדוגמה: הוספת מוצר חדש. לדוגמה: מחיקת מוצר.
    C. Payload (מטען) -
    המידע עצמו שאנו משתמשים בו בביצוע פעולה. לוגמה: כל המוצרים. לדוגמה: מוצר בודד: לדוגמה: קוד מוצר. אבל, לא בהכרח חובה לשלוח Payload.
    D. Action - תאור פעולה לביצוע - מכיל שני דברים: א. ActionType - איזו פעולה אנו רוצים לבצע. ב. Payload - מה המידע הקשור לפעולה.
    E. Reducer - פונקציה שמבצעת את כל הפעולות.
    חוק: אסור ל-Reducer לשנות את ה-AppState המקורי שנשלח אליו. הוא חייב לייצר AppState חדש, לשנות אותו ולהחזיר אותו.
    F. Store - האובייקט שמנהל הכל. מכיר גם את ה-AppState (מכיל אותו) ומכיר גם את ה-Reducer (מפעיל אותו).
    G. Dispatch - שליחת Action ל-Store לביצוע.
    H. Subscribe - האזנה לשינויים שהתבצעו ב-Store.
    התקנת Redux:
    npm i redux

12) touch action-type.ts:  
    export enum ActionType {GetAllBooks}

13) touch action.ts:
    import { ActionType } from './action-type';
    export interface Action {
    type: ActionType;
    payload?: any; // Optional!
    }

14) touch app-state:
    import { BookModel } from '../models/book-model';
    export class AppState {
    public books: BookModel[];
    public constructor() {
    this.books = [];
    }
    }

15) touch reducer.ts:
    import { AppState } from './app-state';
    import { Action } from './action';
    import { ActionType } from './action-types';
    export function reducer
    (oldAppState: AppState, action: Action): AppState {
    const newAppState = { ...oldAppState };
    // Spread Operator
    switch(action.type) {
    case ActionType.GetAllBooks:
    newAppState.books = action.payload;
    break;
    }
    return newAppState;
    }

16) touch store.ts:
    npm i redux
    import { createStore } from "redux";
    import { reducer } from './reducer';
    import { AppState } from './app-state';
    export const store = createStore(reducer, new AppState())

17) {assignments}:
    LAZY LOAD
    REDUX
    RXJS
    DIRECTIVE
    SERVICES

18) Questions for Assaf / other:  
    **in angular, redux- how to unsubscribe?
    **global variable import in angular client such as port

19) angular-cli.json
mkdir sass/styles.scss
etc