import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Acao } from '../tickers/acao.model';
import { Configuracao, ConfiguracaoService } from '../../service/configuracao.service';
import { AcaoService } from '../../service/acao.service';
import { Usuario } from '../usuarios/usuario.model';
import { UsuarioService } from '../../service/usuario.service';

// Imports de Estilização (Requisito 4)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-configuracao',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    NgIf,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './configuracao.html'
})
export class ConfiguracaoComponent implements OnInit {
  acoes: Acao[] = [];
  selecionadas: Acao[] = [];
  intervaloAtualizacaoMs = 5000;

  usuarios: Usuario[] = [];
  usuarioSelecionado: Usuario | null = null;
  configuracaoAtual: Configuracao | null = null;

  constructor(
    private acoesService: AcaoService,
    private configuracaoService: ConfiguracaoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.buscarAcoes();
    this.buscarUsuarios();
  }

  buscarAcoes(): void {
    this.acoesService.getAll().subscribe({
      next: (res) => (this.acoes = res),
      error: () => alert('Erro ao buscar ações'),
    });
  }

  buscarUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: (res) => (this.usuarios = res),
      error: () => alert('Erro ao buscar usuários'),
    });
  }


  onUsuarioChange(): void {
    if (!this.usuarioSelecionado || !this.usuarioSelecionado.id) {
      this.resetarCamposConfig();
      return;
    }

    // Busca a config pelo ID do USUÁRIO
    this.configuracaoService.getByUsuarioId(this.usuarioSelecionado.id).subscribe({
      next: (config) => {
        this.configuracaoAtual = config;
        this.intervaloAtualizacaoMs = config.intervaloAtualizacaoMs;
        // Mapeia as selecionadas
        this.selecionadas = this.acoes.filter(acao =>
          config.acoesSelecionadas.some(aSel => aSel.id === acao.id)
        );
      },
      error: () => {

        this.resetarCamposConfig();
        this.configuracaoAtual = null;
      }
    });
  }

  private resetarCamposConfig() {
    this.intervaloAtualizacaoMs = 5000;
    this.selecionadas = [];
  }

  isSelecionada(acao: Acao): boolean {
    return this.selecionadas.some(a => a.id === acao.id);
  }

  toggleSelecao(acao: Acao): void {
    const index = this.selecionadas.findIndex((a) => a.id === acao.id);
    if (index >= 0) {
      this.selecionadas.splice(index, 1);
    } else {
      this.selecionadas.push(acao);
    }
  }

  salvarConfiguracao(): void {
    if (!this.usuarioSelecionado) {
      alert('Selecione um usuário primeiro.');
      return;
    }

    const config: Configuracao = {
      usuario: this.usuarioSelecionado, // Envia o objeto de usuário
      acoesSelecionadas: this.selecionadas,
      intervaloAtualizacaoMs: this.intervaloAtualizacaoMs,
    };

    if (this.configuracaoAtual && this.configuracaoAtual.id) {

      this.configuracaoService.update(this.configuracaoAtual.id, config).subscribe({
        next: () => alert('Configuração atualizada!'),
        error: () => alert('Erro ao atualizar configuração'),
      });
    } else {

      this.configuracaoService.create(config).subscribe({
        next: (novaConfig) => {
          this.configuracaoAtual = novaConfig; // Armazena a nova config (com ID)
          alert('Configuração salva com sucesso!');
        },
        error: () => alert('Erro ao salvar configuração'),
      });
    }
  }
}
