import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from './usuario.model';
import { UsuarioService } from '../../service/usuario.service';
import { FormsModule } from '@angular/forms';
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
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})

export class UsuariosComponent implements OnInit {
  dataSource = new MatTableDataSource<Usuario>([]);
  usuario: Usuario = this.novoUsuario();
  displayedColumns: string[] = ['id', 'nome', 'email', 'acoes'];

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

    if (this.usuario.id) {
      this.usuarioService.update(this.usuario.id, this.usuario).subscribe({
        next: () => {
          alert('Usuário atualizado com sucesso!');
          this.buscarUsuarios();
          this.resetarFormulario();
        },
        error: () => alert('Erro ao atualizar o usuário.')
      });
    } else {
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
    this.usuario = { ...row };
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
