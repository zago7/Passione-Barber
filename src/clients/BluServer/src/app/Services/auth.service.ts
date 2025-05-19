import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { isBrowser } from '../utils/is-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cadastroUrl = 'http://localhost:5129/api/usuario';
  private loginUrl = 'http://localhost:5129/api/Auth';
  private usuarioId: number | null = null;

  constructor(private http: HttpClient) {
    if (isBrowser()) {
      const storedId = sessionStorage.getItem('userId');
      this.usuarioId = storedId ? Number(storedId) : null;
    } else {
      this.usuarioId = null;
    }
  }

  getUsuarioId(): number | null {
    return this.usuarioId;
  }

  getUsuarioPorId(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5129/api/usuario/${id}`);
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post<{ id: number, nome: string, email: string }>(
      `${this.loginUrl}/login`,
      { email, senha }
    ).pipe(
      tap(response => {
        this.usuarioId = response.id;
        if (isBrowser()) {
          sessionStorage.setItem('userId', String(response.id));
        }
      })
    );
  }

  logout() {
    this.usuarioId = null;
    if (isBrowser()) {
      sessionStorage.removeItem('userId');
    }
  }

  cadastro(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post(this.cadastroUrl, { nome, email, senha });
  }

  isLogado(): boolean {
    return this.usuarioId !== null;
  }
}
