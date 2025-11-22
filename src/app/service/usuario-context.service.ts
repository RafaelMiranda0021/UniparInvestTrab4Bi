import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioContextService {
  private usuarioIdSource = new BehaviorSubject<number | null>(null);

  public usuarioId$ = this.usuarioIdSource.asObservable();

  setUsuarioId(id: number | null) {
    this.usuarioIdSource.next(id);
  }
}
