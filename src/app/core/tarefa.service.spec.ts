import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Tarefa, TarefaService } from './tarefa.service';

describe('TarefaService', () => {
  let service: TarefaService;
  let httpTesting: HttpTestingController;

  const tarefas: Tarefa[] = [
    { titulo: 'Estudar components', feito: true },
    { titulo: 'Praticar diretivas', feito: false },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(TarefaService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should load tasks from the assets JSON file', () => {
    let resultado: Tarefa[] = [];

    service.listar().subscribe((data) => {
      resultado = data;
    });

    const request = httpTesting.expectOne('/assets/tarefas.json');
    expect(request.request.method).toBe('GET');
    request.flush(tarefas);

    expect(resultado).toEqual(tarefas);
  });
});
