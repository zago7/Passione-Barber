import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agendamentos-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendamentos-perfil.component.html',
  styleUrl: './agendamentos-perfil.component.css'
})
export class AgendamentosPerfilComponent {
  agendamentos: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    const usuarioId = this.authService.getUsuarioId();
    if (usuarioId) {
      this.http.get<any[]>(`http://localhost:5129/api/agendamento/${usuarioId}`)
        .subscribe({
          next: (dados) => {
            console.log('Agendamentos recebidos:', dados),
              this.agendamentos = dados
          },

          error: (err) => console.error('Erro ao buscar agendamentos:', err)
        });
    }
    else {
      console.log('Usuário não está logado ou ID não disponível.');
    }
  }
  excluirAgendamento(agendamentoId: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Essa ação não poderá ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:5129/api/agendamento/${agendamentoId}`)
          .subscribe({
            next: () => {
              this.agendamentos = this.agendamentos.filter(a => a.id !== agendamentoId);
              Swal.fire('Excluído!', 'O agendamento foi removido.', 'success');
            },
            error: () => {
              Swal.fire('Erro', 'Não foi possível excluir o agendamento.', 'error');
            }
          });
      }
    });
  }
}

