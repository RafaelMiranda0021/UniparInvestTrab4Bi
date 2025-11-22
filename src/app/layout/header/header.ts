import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../pages/usuarios/usuario.model';
import { UsuarioService } from '../../service/usuario.service';
import { UsuarioContextService } from '../../service/usuario-context.service';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSelecionadoId: number | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private usuarioContext: UsuarioContextService
  ) {}

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe(res => {
      this.usuarios = res;

      if (res.length > 0) {
        this.usuarioSelecionadoId = res[0].id!;
        this.onUsuarioChange();
      }
    });
  }

  onUsuarioChange(): void {
    this.usuarioContext.setUsuarioId(this.usuarioSelecionadoId);
  }
}
