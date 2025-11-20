import { Pipe, PipeTransform } from '@angular/core'; // importar módulos necessários
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // para sanitização de URLs

@Pipe({ name: 'safe', standalone: true }) // definir pipe seguro
export class SafePipe implements PipeTransform {  // implementar transformação de pipe
  constructor(private sanitizer: DomSanitizer) {} 

  transform(url: string): SafeResourceUrl { // transformar URL em recurso seguro
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
