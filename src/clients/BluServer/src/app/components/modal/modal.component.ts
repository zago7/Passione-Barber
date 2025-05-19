import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../Services/modal.service';
import { Agendamento, AgendamentoService } from '../../Services/agendamento.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  modalAberto: boolean = false;
  usuarioId: number | null = null;

  servicos = [
    { id: 1, nome: 'Corte de cabelo', selecionado: false },
    { id: 2, nome: 'Barba', selecionado: false },
    { id: 3, nome: 'Máquina', selecionado: false },
    { id: 4, nome: 'Acabamento', selecionado: false },
    { id: 5, nome: 'Escova progressiva', selecionado: false },
    { id: 6, nome: 'Depilação com cera', selecionado: false },
  ];


  dataSelecionada: string = '';
  horariosDisponiveis: string[] = [];
  horarioSelecionado: string | null = null;

  constructor(
    private modalService: ModalService,
    private agendamentoService: AgendamentoService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.modalService.modalAberto$.subscribe((aberto) => {
      this.modalAberto = aberto;
    });

    this.gerarHorarios();
  }

  ngOnInit(): void {
    this.usuarioId = this.authService.getUsuarioId();
  }
  

  gerarHorarios() {
    const horarios: string[] = [];
    let hora = 8;
    let minuto = 0;

    while (hora < 18) {
      const horaFormatada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
      horarios.push(horaFormatada);

      minuto += 30;
      if (minuto === 60) {
        minuto = 0;
        hora += 1;
      }
    }

    this.horariosDisponiveis = horarios;
  }

  selecionarHorario(horario: string) {
    this.horarioSelecionado = horario;
  }

  fecharModal() {
    this.resetarFormulario();
    this.modalService.fecharModal();
  }

  resetarFormulario() {
    this.servicos.forEach((servico) => (servico.selecionado = false));
    this.dataSelecionada = '';
    this.horarioSelecionado = null;
  }

  enviarFormulario() {
    const servicosIds = this.servicos
      .filter(s => s.selecionado)
      .map(s => s.id);

    if (servicosIds.length === 0) {
      this.toastr.warning('Selecione pelo menos um serviço!');
      return;
    }

    if (!this.dataSelecionada || !this.horarioSelecionado) {
      this.toastr.warning('Selecione uma data e horário!');
      return;
    }

    const dataHoraCompleta = new Date(`${this.dataSelecionada}T${this.horarioSelecionado}`);
    const agora = new Date();

    if (dataHoraCompleta < agora) {
      this.toastr.warning('Você não pode selecionar uma data e horário anteriores ao momento atual.');
      return;
    }

    if (!this.authService.isLogado()) {
      this.toastr.warning('Você precisa estar logado para agendar.');
      this.fecharModal();
      return;
    }

    const dataHoraISO = dataHoraCompleta.toISOString();

    const usuarioId = this.authService.getUsuarioId!(); // pega atualizado

    this.agendamentoService.criarAgendamentosMultiplos(
      servicosIds,
      usuarioId!,
      dataHoraISO
    ).subscribe({
      next: (agendamentos) => {
        this.toastr.success('Serviço(s) agendado(s) com sucesso!');
        this.fecharModal();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao salvar agendamentos: ' + (err.error?.mensagem || err.message));
      }
    });
  }

}


