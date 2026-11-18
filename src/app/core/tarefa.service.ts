import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Tarefa {
  titulo: string;
  feito: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  constructor(private readonly http: HttpClient) {}

  listar(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>('/assets/tarefas.json');
  }
}
