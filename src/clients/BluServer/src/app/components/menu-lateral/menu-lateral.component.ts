import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {
   @Output() opcaoSelecionada = new EventEmitter<string>();

  opcaoAtiva = 'informacoes';

  selecionar(opcao: string) {
    this.opcaoAtiva = opcao;
    this.opcaoSelecionada.emit(opcao);
  }
}

