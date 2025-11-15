import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acao } from '../pages/tickers/acao.model';
import { Usuario } from '../pages/usuarios/usuario.model'; // <-- ADICIONAR

export interface Configuracao {
  id?: number;
  usuario: Usuario; // <-- MODIFICADO (deve ser o usuário ou usuarioId)
  acoesSelecionadas: Acao[];
  intervaloAtualizacaoMs: number;
}

@Injectable({ providedIn: 'root' })
export class ConfiguracaoService {
  private readonly API_URL = 'http://localhost:8080/configuracoes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Configuracao[]> {
    return this.http.get<Configuracao[]>(this.API_URL);
  }

  getById(id: number): Observable<Configuracao> {
    return this.http.get<Configuracao>(`${this.API_URL}/${id}`);
  }

  // VVV ADICIONAR ESTE MÉTODO VVV
  // (Depende do backend implementar o endpoint GET /configuracoes/usuario/{usuarioId})
  getByUsuarioId(usuarioId: number): Observable<Configuracao> {
    return this.http.get<Configuracao>(`${this.API_URL}/usuario/${usuarioId}`);
  }
  // ^^^ ADICIONAR ESTE MÉTODO ^^^

  create(config: Configuracao): Observable<Configuracao> {
    return this.http.post<Configuracao>(this.API_URL, config);
  }

  update(id: number, config: Configuracao): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, config);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
