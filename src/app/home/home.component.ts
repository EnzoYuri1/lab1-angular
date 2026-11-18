import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarefa, TarefaService } from '../core/tarefa.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  nome = 'Angularista';
  contador = 0;

  mostrar = true;
  tarefas: Tarefa[] = [];
  carregando = true;
  erro = '';

  constructor(
    private readonly tarefaService: TarefaService,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.tarefaService.listar().subscribe({
      next: (data) => {
        this.tarefas = data;
        this.carregando = false;
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.erro = 'Não foi possível carregar as tarefas. Tente novamente mais tarde.';
        this.carregando = false;
        this.changeDetector.markForCheck();
      },
    });
  }

  incrementar(): void {
    this.contador++;
  }

  zerar(): void {
    this.contador = 0;
  }

  toggleLista(): void {
    this.mostrar = !this.mostrar;
  }

  marcar(i: number): void {
    const tarefa = this.tarefas[i];

    if (tarefa) {
      tarefa.feito = !tarefa.feito;
    }
  }
}
