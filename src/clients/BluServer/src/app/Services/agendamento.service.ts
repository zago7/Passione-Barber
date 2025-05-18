import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export interface Servico {
  id: number;
  nome: string;
  preco: number;
  duracao: number;
  agendamentos: string[];
}

export interface Agendamento {
  id: number;
  dataHora: string;
  usuarioId: number;
  usuario: Usuario;
  servicoId: number;
  servico: Servico;
}


@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = 'http://localhost:5129/api/agendamento';

  constructor(private http: HttpClient) { }

  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl);
  }

  excluirAgendamento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAgendamentoPorId(id: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.apiUrl}/${id}`);
  }

  criarAgendamentosMultiplos(
    servicosIds: number[],
    usuarioId: number,
    dataHora: string
  ): Observable<Agendamento[]> {
    const payload = {
      servicoIds: servicosIds,
      usuarioId: usuarioId,
      dataHora: dataHora
    };

    return this.http.post<Agendamento[]>(`${this.apiUrl}/multiplos`, payload);
  }
}
