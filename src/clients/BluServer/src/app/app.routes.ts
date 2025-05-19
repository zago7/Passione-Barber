import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import path from 'path';
import { Component } from '@angular/core';
import { BarbeiroPainelComponent } from './pages/barbeiro-painel/barbeiro-painel.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component : HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent},
    { path: 'perfil', component: PerfilComponent },
     {path: 'painel',component: BarbeiroPainelComponent}
];

