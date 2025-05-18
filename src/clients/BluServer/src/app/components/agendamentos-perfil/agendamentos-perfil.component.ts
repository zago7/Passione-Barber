import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agendamentos-perfil',
  standalone: true,
  imports: [CommonModule  ],
  templateUrl: './agendamentos-perfil.component.html',
  styleUrl: './agendamentos-perfil.component.css'
})
export class AgendamentosPerfilComponent {
  agendamentos: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    const usuarioId = this.authService.getUsuarioId();
      console.log('usuarioId:', usuarioId);

    if (usuarioId) {
      this.http.get<any[]>(`http://localhost:5129/api/agendamento/${usuarioId}`)
        .subscribe({
          next: (dados) => {
            console.log('Agendamentos recebidos:', dados),
            this.agendamentos = dados},
          
          error: (err) => console.error('Erro ao buscar agendamentos:', err)
        });
    }
    else {
    console.log('Usuário não está logado ou ID não disponível.');
  }
  }
}
