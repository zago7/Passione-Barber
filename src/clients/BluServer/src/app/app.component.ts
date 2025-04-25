import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { CarrosselComponent } from './components/carrossel/carrossel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, CarrosselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BluServer';

  showCarrossel = true;
  showNavbar = true;


  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        if(event.url === '/login'){
          this.showCarrossel = false;
           this.showNavbar = false;
        } else {
          this.showCarrossel = true;
          this.showNavbar = true;
        }
      }
    })
  }
}
