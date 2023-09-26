import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
    <div class="flex flex-column flex-align_center flex-justify_center dashboard">
      <h1>Products Page</h1>
      <h3>Vectra Technical Assessment</h3>
      <p>By Cornel Syrzysko</p>

      <button [routerLink]="['/products']">View Products</button>

    </div>

  `,
  styles: [`
    .dashboard {
      height: 100vh;
      width: 100vw;
    }

    button{
      height: 50px;
      width: 150px;
      border: none;
      outline: none;
      background-color: #44464e;
      color: white;
      border-radius: 5px;
      font-size: 1.1em;
      margin: 10px;
    }

  `]
})
export class LandingComponent {

}
