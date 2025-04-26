import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // loginRequest: LoginRequest = {email:'', senha:''};
  
  email: string = "";
  senha: string = "";

  constructor(private router: Router) { }


  login(form: any) {
    if (form.valid) {
      // Validação de login com dados fictícios
      if (this.email === "zago@email" && this.senha === "123") {
        this.router.navigate(['/']);
      } else {
        alert("Email ou senha incorretos");
      return;
      }
    }
  }
}
