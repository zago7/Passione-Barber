import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informacoes-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informacoes-perfil.component.html',
  styleUrl: './informacoes-perfil.component.css'
})
export class InformacoesPerfilComponent {
  usuario: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const usuarioId = this.authService.getUsuarioId();

    if (usuarioId) {
      this.authService.getUsuarioPorId(usuarioId).subscribe({
        next: (usuario) => {
          this.usuario = usuario;
        },
        error: (err) => {
          console.error('Erro ao buscar dados do usuário:', err);
        }
      });
    } else {
      console.warn('Usuário não está logado.');
    }
  }
}
