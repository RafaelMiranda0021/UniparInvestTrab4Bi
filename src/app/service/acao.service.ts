import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Acao} from '../pages/tickers/acao.model';

@Injectable({
  providedIn: 'root'
})
export class AcaoService {
  private readonly API_URL = 'http://localhost:8081/acoes';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Acao[]> {
    return this.http.get<Acao[]>(this.API_URL);
  }

  public getById(id: number): Observable<Acao> {
    return this.http.get<Acao>(`${this.API_URL}/${id}`);
  }

  public create(acao: Acao): Observable<Acao> {
    return this.http.post<Acao>(this.API_URL, acao);
  }

  public update(id: number, acao: Acao): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, acao);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
