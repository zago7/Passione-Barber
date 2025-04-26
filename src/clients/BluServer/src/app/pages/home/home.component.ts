import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { CardComponent } from "../../components/card/card.component";
import { CardGrandeComponent } from "../../components/card-grande/card-grande.component";
import { CardServicosComponent } from "../../components/card-servicos/card-servicos.component";
import { CarrosselComponent } from "../../components/carrossel/carrossel.component";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, CardComponent, CardGrandeComponent, CardServicosComponent, CarrosselComponent,CommonModule,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
