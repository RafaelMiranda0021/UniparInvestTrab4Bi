import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Acao} from './acao.model';
import {AcaoService} from '../../service/acao.service';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-tickers',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './tickers.html',
  styleUrl: './tickers.css'
})
export class Tickers implements OnInit {

  dataSource = new MatTableDataSource<Acao>([]);
  ticker: Acao = this.novoTicker();


  constructor(private acoesService: AcaoService) { }

  ngOnInit(): void {
    this.buscarAcoes();
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

    if(this.ticker.id) { //se tiver id, significa que é uma edição PUT
      this.acoesService.update(this.ticker.id, this.ticker).subscribe({
        next: () => {
          alert('Ticker criado com sucesso!');
          this.buscarAcoes();
          this.resetarFormulario();
        },
        error: () => alert('Erro ao criar o ticker.')
      });
    } else { //se não tiver id, é um novo CREATE
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
    this.ticker = { ...row }; //recebe uma cópia do objeto para edição
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

  private validarFormulario(): boolean {
    if(!this.ticker.empresa || !this.ticker.ticker) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    return true;
  }

  private resetarFormulario() {
    this.ticker = this.novoTicker();
  }
}
