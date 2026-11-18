import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tarefa } from '../core/tarefa.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let httpTesting: HttpTestingController;

  const tarefas: Tarefa[] = [
    { titulo: 'Estudar components', feito: true },
    { titulo: 'Praticar diretivas', feito: false },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    httpTesting.expectOne('/assets/tarefas.json').flush(tarefas);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should render the welcome message and tasks from the service', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('h2')?.textContent).toContain('Home');
    expect(element.querySelector('.boas-vindas')?.textContent).toContain('Bem-vindo, Angularista!');
    expect(element.querySelectorAll('.lista-tarefas li')).toHaveLength(2);
  });

  it('should update the welcome message with two-way binding', () => {
    const input = fixture.nativeElement.querySelector('#nome') as HTMLInputElement;

    input.value = 'Maria';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.nome).toBe('Maria');
    expect(fixture.nativeElement.querySelector('.boas-vindas')?.textContent).toContain(
      'Bem-vindo, Maria!',
    );
  });

  it('should increment, reset and disable the reset button', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.acoes button',
    ) as NodeListOf<HTMLButtonElement>;
    const [incrementar, zerar] = buttons;

    expect(zerar.disabled).toBe(true);

    incrementar.click();
    incrementar.click();
    fixture.detectChanges();

    expect(component.contador).toBe(2);
    expect(incrementar.textContent).toContain('Cliquei 2 vezes');
    expect(zerar.disabled).toBe(false);

    zerar.click();
    fixture.detectChanges();

    expect(component.contador).toBe(0);
    expect(zerar.disabled).toBe(true);
  });

  it('should toggle the task list', () => {
    const toggle = fixture.nativeElement.querySelector('.tarefas-topo button') as HTMLButtonElement;

    expect(fixture.nativeElement.querySelector('.lista-tarefas')).not.toBeNull();

    toggle.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.lista-tarefas')).toBeNull();
    expect(toggle.textContent).toContain('Mostrar tarefas');

    toggle.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.lista-tarefas')).not.toBeNull();
  });

  it('should complete and reopen a task with ngClass', () => {
    const firstItem = () => fixture.nativeElement.querySelector('.lista-tarefas li') as HTMLElement;
    const firstButton = () => firstItem().querySelector('button') as HTMLButtonElement;

    expect(firstItem().classList.contains('done')).toBe(true);
    expect(firstButton().textContent).toContain('Desmarcar');

    firstButton().click();
    fixture.detectChanges();

    expect(firstItem().classList.contains('done')).toBe(false);
    expect(firstButton().textContent).toContain('Concluir');
    expect(component.tarefas[0].feito).toBe(false);

    firstButton().click();
    fixture.detectChanges();

    expect(firstItem().classList.contains('done')).toBe(true);
    expect(component.tarefas[0].feito).toBe(true);
  });
});
