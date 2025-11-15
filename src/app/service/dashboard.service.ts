import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AcaoDashboard {
  ticker: string;
  empresa: string;
  preco: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly API_URL = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard(configId: number): Observable<AcaoDashboard[]> {
    return this.http.get<AcaoDashboard[]>(`${this.API_URL}/${configId}`);
  }
}
