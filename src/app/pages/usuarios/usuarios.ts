import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from './usuario.model';
import { UsuarioService } from '../../service/usuario.service';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './usuarios.html'
  // Adicione styleUrls se criar um CSS específico
})
export class UsuariosComponent implements OnInit {

  dataSource = new MatTableDataSource<Usuario>([]);
  usuario: Usuario = this.novoUsuario();
  displayedColumns: string[] = ['id', 'nome', 'email', 'acoes']; // Para MatTable

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  private buscarUsuarios() {
    this.usuarioService.getAll().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: () => alert('Erro ao buscar a lista de usuários.')
    });
  }

  private novoUsuario(): Usuario {
    return { nome: '', email: '' };
  }

  onSubmit() {
    if (!this.validarFormulario()) return;

    if (this.usuario.id) { // Edição (PUT)
      this.usuarioService.update(this.usuario.id, this.usuario).subscribe({
        next: () => {
          alert('Usuário atualizado com sucesso!');
          this.buscarUsuarios();
          this.resetarFormulario();
        },
        error: () => alert('Erro ao atualizar o usuário.')
      });
    } else { // Criação (POST)
      this.usuarioService.create(this.usuario).subscribe({
        next: () => {
          alert('Usuário criado com sucesso!');
          this.buscarUsuarios();
          this.resetarFormulario();
        },
        error: () => alert('Erro ao criar o usuário.')
      });
    }
  }

  editarUsuario(row: Usuario) {
    this.usuario = { ...row }; // Copia o objeto para edição
  }

  deletarUsuario(id: number) {
    if (confirm('Deseja realmente remover este usuário?')) {
      this.usuarioService.delete(id).subscribe({
        next: () => {
          alert('Usuário removido com sucesso!');
          this.buscarUsuarios();
        },
        error: () => alert('Erro ao remover o usuário.')
      });
    }
  }

  private validarFormulario(): boolean {
    if (!this.usuario.nome || !this.usuario.email) {
      alert('Por favor, preencha nome e email.');
      return false;
    }
    return true;
  }

  private resetarFormulario() {
    this.usuario = this.novoUsuario();
  }
}
