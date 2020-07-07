import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent  {
  public currentYear: Number = new Date().getFullYear()
  
 constructor() {}

 
}
