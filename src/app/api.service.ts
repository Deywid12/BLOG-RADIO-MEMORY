import { Injectable } from '@angular/core'; // importar módulo de injeção de dependência
import { HttpClient, HttpHeaders } from '@angular/common/http'; // importar módulos HTTP
import { Observable } from 'rxjs'; // importar módulo de observáveis
import { Card } from './card.model'; // importar modelo de dados do card
import { environment } from '../environments/environment';   // importar variáveis de ambiente

@Injectable({ providedIn: 'root' }) // definir serviço injetável
export class ApiService {
  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> { // método para obter cards da API
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.apiToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<Card[]>(environment.apiUrl, { acao: 'getTodosCards' }, { headers }); // fazer requisição POST para a API
  }
}
