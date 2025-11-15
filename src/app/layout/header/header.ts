import { Component, OnInit } from '@angular/core'; // <-- Importar OnInit
import { Usuario } from '../../pages/usuarios/usuario.model'; // <-- ADICIONAR
import { UsuarioService } from '../../service/usuario.service'; // <-- ADICIONAR
import { UsuarioContextService } from '../../service/usuario-context.service'; // <-- ADICIONAR
import { FormsModule } from '@angular/forms'; // <-- ADICIONAR
import { NgForOf, NgIf } from '@angular/common'; // <-- ADICIONAR

// Imports de Estilização (Requisito 4)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'; // (Opcional, para ícone)

@Component({
  selector: 'app-header',
  standalone: true, // <-- ADICIONAR
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ], // <-- ADICIONAR
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit { // <-- Implementar OnInit

  usuarios: Usuario[] = [];
  usuarioSelecionadoId: number | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private usuarioContext: UsuarioContextService
  ) {}

  ngOnInit(): void {
    // Carrega os usuários para o dropdown
    this.usuarioService.getAll().subscribe(res => {
      this.usuarios = res;
      // Seleciona o primeiro usuário por padrão
      if (res.length > 0) {
        this.usuarioSelecionadoId = res[0].id!;
        this.onUsuarioChange();
      }
    });
  }

  // Notifica o serviço de contexto (que o Dashboard está ouvindo)
  onUsuarioChange(): void {
    this.usuarioContext.setUsuarioId(this.usuarioSelecionadoId);
  }
}
