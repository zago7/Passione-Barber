import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { CardComponent } from "../../components/card/card.component";
import { CardGrandeComponent } from "../../components/card-grande/card-grande.component";
import { CardServicosComponent } from "../../components/card-servicos/card-servicos.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, CardComponent, CardGrandeComponent, CardServicosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
