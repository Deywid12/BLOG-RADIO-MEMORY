# Blog Simples - Visualizador de Notícias

Um projeto Angular simples para listar, filtrar e visualizar notícias de uma API.

## Estrutura de Arquivos

```
src/
├── app/
│   ├── app.ts          # Componente principal (lógica)
│   ├── app.html        # Template (interface)
│   ├── app.css         # Estilos
│   ├── card.model.ts   # Interface Card
│   ├── api.service.ts  # Serviço de API
│   └── safe.pipe.ts    # Pipe para URLs seguras
├── environment.ts      # Configuração (token da API)
└── styles.css          # Estilos globais
```

## Instalação

```bash
npm install
npm start
```

Acesse `http://localhost:4200/`

## Funcionalidades

✅ Listar notícias da API  
✅ Filtrar por categoria  
✅ Buscar por título/subtítulo  
✅ Ordenar fixados primeiro  
✅ Visualizar detalhes em modal  
✅ Sanitizar HTML (segurança)  
✅ Responsivo (mobile/desktop)

## Explicação Rápida do Código

### 1. **app.ts** (Componente Principal)
Toda a lógica está em um único componente:
- `loadCards()`: Busca dados da API
- `sortCards()`: Ordena fixados primeiro
- `applyFilters()`: Filtra por categoria e busca
- `viewDetail()`: Abre modal com detalhes

### 2. **api.service.ts** (Serviço)
Responsável por fazer a requisição POST à API com os headers corretos.

### 3. **safe.pipe.ts** (Segurança)
Permite que URLs do YouTube sejam carregadas no iframe sem bloqueios de segurança.

### 4. **app.html** (Interface)
- Header com filtros (busca + categoria)
- Grid de cards
- Modal para detalhes
- Sanitização de HTML com `[innerHTML]`

### 5. **app.css** (Estilos)
- Grid responsivo
- Gradientes roxo/azul
- Efeitos hover
- Modal overlay

## 6. **Sanitização (Segurança)**
- O projeto implementa duas camadas de sanitização para garantir a segurança e prevenir ataques de Cross-Site Scripting (XSS), conforme implementado nos arquivos src/app/app.ts e src/app/safe.pipe.ts.
- Sanitização de Conteúdo HTML (DOMPurify)
- O pacote dompurify é utilizado no componente principal (src/app/app.ts) para limpar o conteúdo HTML recebido da API antes de ser renderizado.
- A função sanitizeHtml(html: string) usa DOMPurify.sanitize(html) para remover scripts e tags maliciosas, garantindo que apenas HTML seguro seja exibido.
- wSanitização de URLs (Angular DomSanitizer)
- O SafePipe (src/app/safe.pipe.ts) utiliza o DomSanitizer do Angular para marcar URLs de recursos (como vídeos incorporados) como seguras.
- O método bypassSecurityTrustResourceUrl() é usado especificamente para URLs de recursos, permitindo que sejam carregadas sem que o Angular bloqueie por motivos de segurança.

## 7. **Roteamento**
- O projeto utiliza um roteamento simples baseado em componentes do Angular.
- Navegação de Detalhes: A exibição de detalhes de um card é gerenciada pelo estado do componente App (selectedCard). Ao clicar em um card, o estado é atualizado e o template (app.html) exibe a seção de detalhes.
- Filtros e Busca: A filtragem e busca de cards são realizadas no lado do cliente dentro do componente App, manipulando os arrays cards, filteredCards e displayedCards.

## Configuração do Token da API

Para rodar este projeto, é necessário fornecer um token de API. Por motivos de segurança, o token não é incluído no repositório.

1. Criar o arquivo .env

Copie o arquivo de exemplo:
```typescript
cp .env.example .env
```
2. Abra o .env e adicione seu token:
```typescript
NG_APP_TOKEN=
NG_APP_API_URL=
```


