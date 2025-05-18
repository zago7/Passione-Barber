import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../Services/modal.service';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent  implements OnInit {
    usuarioLogado: boolean = false;

  constructor(private modalService: ModalService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getUsuarioId() !== null;
  }

  scrollTo(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  abrirLogin(): void {
    this.router.navigate(['/login']);
  }

  abrirPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  logout() {
  this.authService.logout(); // limpe o token ou dados do usuário
  this.router.navigate(['/home']);
  this.usuarioLogado = false;
}

  abrirAgendamento() {
    this.modalService.abrirModal();
  }
}


