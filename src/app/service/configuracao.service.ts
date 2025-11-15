import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acao } from '../pages/tickers/acao.model';
import { Usuario } from '../pages/usuarios/usuario.model';

export interface Configuracao {
  id?: number;
  usuario: Usuario;
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

  getByUsuarioId(usuarioId: number): Observable<Configuracao> {
    return this.http.get<Configuracao>(`${this.API_URL}/usuario/${usuarioId}`);
  }

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
