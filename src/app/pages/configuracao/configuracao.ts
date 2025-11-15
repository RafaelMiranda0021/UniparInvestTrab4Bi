import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Acao } from '../tickers/acao.model';
import { Configuracao, ConfiguracaoService } from '../../service/configuracao.service';
import { AcaoService } from '../../service/acao.service';
import { Usuario } from '../usuarios/usuario.model'; // <-- ADICIONAR
import { UsuarioService } from '../../service/usuario.service'; // <-- ADICIONAR

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
    // Imports de Estilização
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

  usuarios: Usuario[] = []; // <-- ADICIONAR
  usuarioSelecionado: Usuario | null = null; // <-- ADICIONAR
  configuracaoAtual: Configuracao | null = null; // <-- ADICIONAR

  constructor(
    private acoesService: AcaoService,
    private configuracaoService: ConfiguracaoService,
    private usuarioService: UsuarioService // <-- ADICIONAR
  ) {}

  ngOnInit(): void {
    this.buscarAcoes();
    this.buscarUsuarios(); // <-- ADICIONAR
  }

  buscarAcoes(): void {
    this.acoesService.getAll().subscribe({
      next: (res) => (this.acoes = res),
      error: () => alert('Erro ao buscar ações'),
    });
  }

  // VVV MÉTODOS ADICIONADOS/MODIFICADOS VVV

  buscarUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: (res) => (this.usuarios = res),
      error: () => alert('Erro ao buscar usuários'),
    });
  }

  // Carrega a config quando o usuário muda no <mat-select>
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
        // Se não encontrar, reseta para uma nova config
        this.resetarCamposConfig();
        this.configuracaoAtual = null; // Garante que será um POST
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
      // UPDATE (PUT)
      this.configuracaoService.update(this.configuracaoAtual.id, config).subscribe({
        next: () => alert('Configuração atualizada!'),
        error: () => alert('Erro ao atualizar configuração'),
      });
    } else {
      // CREATE (POST)
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
