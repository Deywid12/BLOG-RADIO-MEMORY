import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; //filtro de busca
import DOMPurify from 'dompurify'; //proteger api de scripts maliciosos
import { ApiService } from './api.service';
import { Card } from './card.model';
import { SafePipe } from './safe.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, SafePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  cards: Card[] = []; // todos os cards da API
  filteredCards: Card[] = []; //somente cards filtrados
  displayedCards: Card[] = [];  // cards exibidos na página
  categorias: string[] = []; // filtragem dos cards por categoria
  
  selectedCard: Card | null = null; // exibir card selecionado na tela
  selectedCategoria = '';  // categoria selecionada no filtro
  searchTerm = '';// termo de busca
  loading = false; // indicador de carregamento
  page = 1;// página atual
  itemsPerPage = 6; // itens por página

  constructor(private api: ApiService) {} // injeção do serviço de API

  ngOnInit() {
    this.loadCards(); // carregar cards ao iniciar o componente
  }

  loadCards() { // carregar cards da API
    this.loading = true;
    this.api.getCards().subscribe({
      next: (data: any) => {
        console.log('Dados recebidos:', data); 
        this.cards = data.filter((c: Card) => c.status === 1);
        this.categorias = [...new Set(this.cards.map((c: Card) => c.categoria))]; // extrair categorias únicas
        this.sortCards();
        this.applyFilters();
        this.loading = false; // finalizar carregamento
      },
      error: (err: any) => {
        console.error('Erro na API:', err);
        this.loading = false;
        alert('Erro ao carregar notícias: ' + err.message); // exibir mensagem de erro caso não carregue os cards
      }
    });
  }

  sortCards() { // ordenar cards fixados e não fixados
    const now = new Date();
    const fixados = this.cards.filter(c => c.data_fixo && new Date(c.data_fixo) >= now);
    const naoFixados = this.cards.filter(c => !c.data_fixo || new Date(c.data_fixo) < now);
    
    fixados.sort((a, b) => new Date(b.data_fixo!).getTime() - new Date(a.data_fixo!).getTime());
    naoFixados.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    
    this.cards = [...fixados, ...naoFixados];
  }

  applyFilters() { // aplicar filtros de categoria e busca
    let filtered = [...this.cards];
    
    if (this.selectedCategoria) {
      filtered = filtered.filter(c => c.categoria === this.selectedCategoria);  // filtro de categoria
    }
    
    if (this.searchTerm) { // filtro de busca
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(c =>  //busca no título e subtítulo
        c.titulo.toLowerCase().includes(term) || // busca no título
        c.subtitulo.toLowerCase().includes(term) // busca no subtítulo
      );
    }
    
    this.filteredCards = filtered; // cards após aplicação dos filtros
    this.page = 1; 
    this.updateDisplay(); 
  }

  updateDisplay() { // atualizar cards exibidos conforme a página
    const end = this.page * this.itemsPerPage;
    this.displayedCards = this.filteredCards.slice(0, end);
  }

  loadMore() { // carregar mais cards ao clicar no botão
    this.page++;
    this.updateDisplay();
  }

  hasMore() { // verificar se há mais cards para carregar
    return this.displayedCards.length < this.filteredCards.length;
  }

  viewDetail(card: Card) { // exibir detalhes do card selecionado
    this.selectedCard = card;
  }

  closeDetail() { // fechar visualização do card
    this.selectedCard = null;
  }

  formatDate(date: string): string { // formatar data para exibição
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  isFixado(card: Card): boolean { // verificar se o card está fixado
    return card.data_fixo ? new Date(card.data_fixo) >= new Date() : false;
  }

  sanitizeHtml(html: string): string { // sanitizar HTML para evitar scripts maliciosos
    return DOMPurify.sanitize(html);
  }
}
