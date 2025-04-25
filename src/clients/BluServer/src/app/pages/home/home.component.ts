import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { CardComponent } from "../../components/card/card.component";
import { CardGrandeComponent } from "../../components/card-grande/card-grande.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, CardComponent, CardGrandeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
