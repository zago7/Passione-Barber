// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environments';
// import { ContatoComponent } from '../components/contato/contato.component';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ContatoService {

//   private apiUrl = `${environment.apiUrl}/contatos`;
//   constructor(private http: HttpClient) { }

//   obterContatos(): Observable<ContatoComponent[]> {
//     return this.http.get<ContatoComponent[]>(this.apiUrl);
//   }

//   excluir(id:number): Observable<string[]> {
//     return this.http.delete<string[]>(this.apiUrl + '/' + id);
//   }

//   salvarContato(contato: ContatoComponent): Observable<ContatoComponent> {
//     return this.http.post<ContatoComponent>(this.apiUrl, contato);
//   }
// }
