// app.module.ts - Configuración del módulo principal para usar el servicio de API

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BooksApiComponent } from './components/books-api.component';
import { BooksService } from './shared/books.service';

@NgModule({
  declarations: [
    AppComponent,
    BooksApiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // ¡IMPORTANTE! Necesario para usar HttpClient
    FormsModule        // Para usar ngModel en formularios
  ],
  providers: [
    BooksService       // El servicio que conecta con la API
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
🔧 INSTRUCCIONES DE CONFIGURACIÓN:

1. HttpClientModule:
   - Es OBLIGATORIO importar HttpClientModule en el módulo
   - Sin esto, el servicio BooksService no puede hacer llamadas HTTP
   - Debe estar en el array 'imports'

2. FormsModule:
   - Necesario para usar [(ngModel)] en el template
   - Permite el binding bidireccional en formularios

3. BooksService:
   - Se registra como provider para inyección de dependencias
   - Una sola instancia será compartida en toda la aplicación

4. Componente BooksApiComponent:
   - Se declara en el array 'declarations'
   - Está listo para usar en cualquier template del módulo

📋 EJEMPLO DE USO EN APP.COMPONENT.HTML:
<div class="container">
  <h1>Mi Aplicación de Libros</h1>
  <app-books-api></app-books-api>
</div>

⚠️ ANTES DE USAR:
1. Asegúrate de que la API REST esté ejecutándose en http://localhost:3000
2. Verifica que la API tenga los endpoints:
   - GET /api/books
   - GET /api/books/:id
   - POST /api/books
   - PUT /api/books/:id
   - DELETE /api/books/:id
   - GET /api/books/search/:term

🚀 COMANDO PARA EJECUTAR LA API:
cd "modulo4/Tema 3"
node app.js
*/