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

## Configuração da API

Edite `src/environment.ts` para alterar o token:

```typescript
export const environment = {
  apiUrl: 'https://sua-api.com/endpoint',
  apiToken: 'seu-token-aqui'
};
```

## Build

```bash
npm run build
```

Arquivos compilados em `dist/blog-simples/`

---



