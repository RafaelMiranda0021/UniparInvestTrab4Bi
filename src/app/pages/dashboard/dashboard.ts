import { Component, OnDestroy, OnInit } from '@angular/core';
import { AcaoDashboard, DashboardService } from '../../service/dashboard.service';
import { ConfiguracaoService } from '../../service/configuracao.service';
import { DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { Subscription } from 'rxjs'; // <-- ADICIONAR
import { UsuarioContextService } from '../../service/usuario-context.service'; // <-- ADICIONAR

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dados: AcaoDashboard[] = [];
  configId: number | null = null; // <-- MODIFICADO (não é mais fixo '1')
  intervaloMs = 5000;
  timer: any;
  userSub: Subscription | undefined; // <-- ADICIONAR

  constructor(
    private dashboardService: DashboardService,
    private configuracaoService: ConfiguracaoService,
    private usuarioContext: UsuarioContextService // <-- ADICIONAR
  ) {}

  ngOnInit(): void {
    // Ouve as mudanças de usuário selecionado no Header
    this.userSub = this.usuarioContext.usuarioId$.subscribe(usuarioId => {

      if (this.timer) clearInterval(this.timer); // Limpa o timer anterior
      this.dados = []; // Limpa os dados atuais
      this.configId = null;

      if (usuarioId) {
        // 1. Busca a Configuração associada ao Usuário
        this.configuracaoService.getByUsuarioId(usuarioId).subscribe({
          next: (config) => {
            this.configId = config.id!; // Pega o ID da CONFIGURAÇÃO
            this.intervaloMs = config.intervaloAtualizacaoMs;

            this.buscarDados(); // Busca dados pela primeira vez

            // Recria o timer com o novo intervalo
            this.timer = setInterval(() => this.buscarDados(), this.intervaloMs);
          },
          error: () => {
            // Usuário selecionado não tem configuração salva
            console.warn(`Usuário ${usuarioId} não possui configuração de dashboard.`);
          }
        });
      }
      // Se usuarioId for null, o dashboard permanece vazio
    });
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    this.userSub?.unsubscribe(); // <-- ADICIONAR (limpa a inscrição)
  }

  buscarDados(): void {
    // Só busca dados se houver um configId válido
    if (!this.configId) {
      this.dados = [];
      return;
    }

    console.log(`Buscando dados do dashboard para configId: ${this.configId}...`);
    this.dashboardService.getDashboard(this.configId).subscribe({
      next: (res) => {
        console.log('Retorno do backend:', res);
        this.dados = res;
      },
      error: (err) => {
        console.error('Erro ao carregar dados do dashboard:', err);
        // Evita 'alert' aqui, pois o timer pode falhar repetidamente
      },
    });
  }
}
