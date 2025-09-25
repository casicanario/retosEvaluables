import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookReference'
})
export class BookReferencePipe implements PipeTransform {

  transform(id: number): string {
    if (!id || id <= 0) {
      return 'Ref-000000';
    }
    
    // Formatear el ID con 6 dígitos rellenando con ceros
    const formattedId = id.toString().padStart(6, '0');
    return `Ref-${formattedId}`;
  }

}
