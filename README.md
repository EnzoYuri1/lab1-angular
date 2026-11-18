# Lista de Tarefas — Angular

Atividade acadêmica (Lab 1 – Angular): aplicação web de lista de tarefas com tema claro e detalhes em azul.

## Funcionalidades

- Campo de nome com atualização imediata da mensagem de boas-vindas
- Contador com incremento e zeragem (botão **Zerar** desabilitado em zero)
- Lista de tarefas carregada do arquivo `/assets/tarefas.json`
- Mostrar e ocultar a lista de tarefas
- Marcar e desmarcar tarefas como concluídas (texto riscado)
- Navegação entre **Home** e **Sobre** sem recarregar a página
- Redirecionamento de rotas inexistentes para Home

## Como executar

Pré-requisitos: [Node.js](https://nodejs.org) 22.22+ ou 24+ (compatível com Angular 22) e npm.

```bash
npm install
npm start             # abre em http://localhost:4200
npm run build         # gera o build de produção
npm test -- --watch=false  # executa os testes unitários
```

## Estrutura

```text
src/
├── app/
│   ├── core/
│   │   ├── tarefa.service.ts       # service, HttpClient e contrato Tarefa
│   │   └── tarefa.service.spec.ts
│   ├── home/
│   │   ├── home.component.ts       # estado, handlers e carregamento do JSON
│   │   ├── home.component.html     # data binding e diretivas
│   │   ├── home.component.css      # estilos da página e classe .done
│   │   └── home.component.spec.ts
│   ├── sobre/
│   │   ├── sobre.component.ts      # página Sobre
│   │   ├── sobre.component.html
│   │   └── sobre.component.css
│   ├── app.component.ts            # componente principal
│   ├── app.component.html          # cabeçalho, navegação e router-outlet
│   ├── app.component.css
│   ├── app.component.spec.ts
│   ├── app.config.ts               # provideRouter e provideHttpClient
│   └── app.routes.ts               # rotas Home, Sobre e wildcard
├── assets/
│   └── tarefas.json                # fonte dos dados das tarefas
├── index.html
├── main.ts
└── styles.css
```

## Conceitos de Angular aplicados

| Recurso                                           | Onde                                           | Para quê                                                |
| ------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| Interpolation                                     | `app.component.html`, `home.component.html`    | exibir título, saudação e contador                      |
| Property binding                                  | `home.component.html`                          | desabilitar o botão Zerar quando o contador é zero      |
| Event binding                                     | `home.component.html`                          | incrementar, zerar, alternar a lista e concluir tarefas |
| Two-way binding                                   | `home.component.html` (`[(ngModel)]`)          | sincronizar o campo de nome com o componente            |
| `*ngIf`                                           | `home.component.html`                          | mostrar ou ocultar a lista de tarefas                   |
| `*ngFor`                                          | `home.component.html`                          | percorrer e numerar as tarefas                          |
| `ngClass`                                         | `home.component.html`                          | aplicar a classe `done` às tarefas concluídas           |
| `RouterLink`, `RouterLinkActive` e `RouterOutlet` | `app.component.html` e `app.routes.ts`         | navegação entre Home e Sobre com rota ativa             |
| Service com `HttpClient` e `Observable`           | `core/tarefa.service.ts` e `home.component.ts` | buscar as tarefas do arquivo JSON                       |
| Injeção de dependência                            | construtor de `HomeComponent`                  | receber o `TarefaService`                               |
| Componentes standalone                            | todos os componentes                           | importar diretamente os recursos usados                 |

### Como verificar o carregamento das tarefas

O `HomeComponent` injeta o `TarefaService` no construtor e chama `listar()` no `ngOnInit`. Ao abrir a página Home, o navegador requisita `/assets/tarefas.json`; o retorno deve ser `200` e a lista deve exibir três tarefas, sendo a primeira concluída.

Para conferir: abra o DevTools do navegador (`F12`), acesse a aba **Network**, recarregue a página e verifique a requisição `tarefas.json`. O teste unitário do `TarefaService` também valida essa chamada.

## Separação de responsabilidades

- **Lógica:** `services`/`core` concentra o acesso aos dados com `TarefaService`; `home.component.ts` mantém o estado, os handlers e o carregamento inicial.
- **Interface:** `components` e templates HTML/CSS cuidam apenas da exibição; o `AppComponent` organiza o cabeçalho e a navegação.
- **Rotas:** `app.routes.ts` define as páginas Home, Sobre e o redirecionamento de rotas desconhecidas.

## Nota técnica (Angular 22)

Os componentes são standalone por padrão e o projeto usa detecção de mudanças zoneless. Por isso, após a resposta assíncrona do `HttpClient`, o `HomeComponent` chama `ChangeDetectorRef.markForCheck()` para atualizar a tela. O diretório `src/assets` está configurado no `angular.json` para ser servido em `/assets`.
