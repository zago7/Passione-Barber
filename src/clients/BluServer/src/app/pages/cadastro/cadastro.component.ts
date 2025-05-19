import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  cadastrar() {
    if (!this.nome || !this.email || !this.senha) {
      this.toastr.warning('Preencha todos os campos!');
      return;
    }

    this.authService.cadastro(this.nome, this.email, this.senha).subscribe({
      next: () => {
        this.toastr.success('Cadastro realizado com sucesso! Faça login para continuar.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao cadastrar: ' + (err.error?.mensagem || err.message));
      }
    });
  }
}
