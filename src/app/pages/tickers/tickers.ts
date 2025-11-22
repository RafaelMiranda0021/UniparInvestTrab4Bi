import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Acao } from './acao.model';
import { AcaoService } from '../../service/acao.service';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tickers',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './tickers.html',
  styleUrl: './tickers.css'
})

export class Tickers implements OnInit {
  dataSource = new MatTableDataSource<Acao>([]);
  ticker: Acao = this.novoTicker();
  displayedColumns: string[] = ['id', 'empresa', 'ticker', 'descricao', 'acoes'];

  constructor(private acoesService: AcaoService) { }

  ngOnInit(): void {
    this.buscarAcoes();
  }

  private validarFormulario(): boolean {
    if (!this.ticker.empresa || !this.ticker.ticker) {
      alert('Por favor, preencha os campos Empresa e Ticker.');
      return false;
    }

    return true;
  }

  private buscarAcoes() {
    this.acoesService.getAll().subscribe({
        next: (res) => {
          this.dataSource.data = res;
          console.log(JSON.stringify(res));
        },
        error: () => alert('Erro ao buscar a lista de ações.')
      }
    );
  }

  private novoTicker(): Acao {
    return { empresa: '',
      ticker: '',
      descricao: ''
    };
  }

  onSubmit() {
    if (!this.validarFormulario()) return;

    if(this.ticker.id) {
      this.acoesService.update(this.ticker.id, this.ticker).subscribe({
        next: () => {
          alert('Ticker atualizado com sucesso!');
          this.buscarAcoes();
          this.resetarFormulario();
        },
        error: () => alert('Erro ao atualizar o ticker.')
      });
    } else {
      this.acoesService.create(this.ticker).subscribe({
        next: () => {
          alert('Ticker criado com sucesso!');
          this.buscarAcoes();
          this.resetarFormulario();
        },
        error: () => alert('Erro ao criar o ticker.')
      });
    }
  }

  editarTicker(row: Acao) {
    this.ticker = { ...row };
  }

  deletarTicker(id: number) {
    if(confirm('Deseja realmente remover esta ação?')) {
      this.acoesService.delete(id).subscribe({
        next: () => {
          alert('Ticker removido com sucesso!');
          this.buscarAcoes();
        },
        error: () => alert('Erro ao remover o ticker.')
      });
    }
  }

  private resetarFormulario() {
    this.ticker = this.novoTicker();
  }
}
