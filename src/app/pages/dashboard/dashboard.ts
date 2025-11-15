import { Component, OnDestroy, OnInit } from '@angular/core';
import { AcaoDashboard, DashboardService } from '../../service/dashboard.service';
import { ConfiguracaoService } from '../../service/configuracao.service';
import { DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { UsuarioContextService } from '../../service/usuario-context.service';

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
  configId: number | null = null;
  intervaloMs = 5000;
  timer: any;
  userSub: Subscription | undefined;

  constructor(
    private dashboardService: DashboardService,
    private configuracaoService: ConfiguracaoService,
    private usuarioContext: UsuarioContextService
  ) {}

  ngOnInit(): void {

    this.userSub = this.usuarioContext.usuarioId$.subscribe(usuarioId => {

      if (this.timer) clearInterval(this.timer);
      this.dados = [];
      this.configId = null;

      if (usuarioId) {

        this.configuracaoService.getByUsuarioId(usuarioId).subscribe({
          next: (config) => {
            this.configId = config.id!;
            this.intervaloMs = config.intervaloAtualizacaoMs;

            this.buscarDados();


            this.timer = setInterval(() => this.buscarDados(), this.intervaloMs);
          },
          error: () => {

            console.warn(`Usuário ${usuarioId} não possui configuração de dashboard.`);
          }
        });
      }

    });
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    this.userSub?.unsubscribe();
  }

  buscarDados(): void {
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

      },
    });
  }
}
