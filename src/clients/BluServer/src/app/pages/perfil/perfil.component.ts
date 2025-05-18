import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { AgendamentoService } from '../../Services/agendamento.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InformacoesPerfilComponent } from "../../components/informacoes-perfil/informacoes-perfil.component";
import { AgendamentosPerfilComponent } from "../../components/agendamentos-perfil/agendamentos-perfil.component";
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, InformacoesPerfilComponent, AgendamentosPerfilComponent, MenuLateralComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  secaoAtual: string = 'informacoes';

  constructor(private router: Router) { }

  exibirSecao(secao: string) {
    if (secao === 'voltar') {
      this.router.navigate(['/home']);
      return;
    }
    this.secaoAtual = secao;
  }

  voltar() {
    this.router.navigate(['/home']);

  }
}