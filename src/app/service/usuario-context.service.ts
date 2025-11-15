import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioContextService {
  // BehaviorSubject armazena o valor atual e o emite para novos inscritos
  private usuarioIdSource = new BehaviorSubject<number | null>(null);

  /** Observable que os componentes (Dashboard, Config) irão "ouvir" */
  public usuarioId$ = this.usuarioIdSource.asObservable();

  /** * Método que o Header irá chamar quando o usuário mudar no <select>
   */
  setUsuarioId(id: number | null) {
    this.usuarioIdSource.next(id);
  }
}
