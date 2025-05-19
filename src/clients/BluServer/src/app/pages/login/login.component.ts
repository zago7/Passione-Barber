import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {  
  email: string = "";
  senha: string = "";

  constructor(private router: Router , private authService: AuthService, private toastr: ToastrService) { }

  login() {
  this.authService.login(this.email, this.senha).subscribe({
    next: usuario => {
      this.toastr.success('Login realizado com sucesso!');
      this.router.navigate(['/home']);
    },
    error: err => {
      this.toastr.error(err.error.mensagem || 'Erro ao fazer login.');
    }
  });
}

}
