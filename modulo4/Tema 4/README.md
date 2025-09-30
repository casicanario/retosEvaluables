# 📚 Módulo 4 - Tema 4: Servicio Angular con API REST

## 🎯 Objetivo del Reto
Modificar el servicio `BooksService` de Angular para que se comunique con la API REST creada en el Tema 3, usando **HttpClient** y **Observables**.

## 🔧 Implementación Realizada

### 1. **BooksService Modificado** (`src/shared/books.service.ts`)
- ✅ **HttpClient Integration**: Inyección del HttpClient para hacer peticiones HTTP
- ✅ **Observable Methods**: Todos los métodos retornan Observables
- ✅ **API Endpoints**: Comunicación con localhost:3000/api/books
- ✅ **Error Handling**: Manejo de errores con catchError y throwError
- ✅ **Type Safety**: Tipado correcto con Book model

#### Métodos Implementados:
```typescript
- getAll(): Observable<Book[]>           // GET /api/books
- getOne(id: number): Observable<Book>   // GET /api/books/:id  
- add(book: Book): Observable<Book>      // POST /api/books
- edit(book: Book): Observable<Book>     // PUT /api/books/:id
- delete(id: number): Observable<Book>   // DELETE /api/books/:id
- search(term: string): Observable<Book[]> // GET /api/books/search/:term
```

### 2. **Book Model Actualizado** (`src/models/book.model.ts`)
- ✅ **API Compatibility**: Métodos para conversión hacia/desde formato API
- ✅ **Validation**: Método isValid() para validar datos
- ✅ **Type Safety**: Propiedades tipadas correctamente

### 3. **Componente de Ejemplo** (`src/components/books-api.component.ts`)
- ✅ **CRUD Operations**: Ejemplos completos de todas las operaciones
- ✅ **Observable Subscriptions**: Uso correcto de subscribe/unsubscribe
- ✅ **Error Handling**: Manejo de errores de API
- ✅ **Loading States**: Indicadores de carga y estados
- ✅ **Memory Management**: Cleanup de subscripciones en OnDestroy

### 4. **Template Completo** (`books-api.component.html`)
- ✅ **Formulario de Agregado**: Para crear nuevos libros
- ✅ **Lista Interactiva**: Grid responsive con acciones CRUD
- ✅ **Búsqueda**: Input de búsqueda con funcionalidad
- ✅ **Error Display**: Mensajes de error user-friendly
- ✅ **Loading Indicators**: Estados de carga visibles

### 5. **Estilos CSS** (`books-api.component.css`)
- ✅ **Responsive Design**: Adaptable a diferentes pantallas
- ✅ **Modern UI**: Diseño limpio y profesional
- ✅ **Interactive Elements**: Hover effects y transiciones
- ✅ **Accessibility**: Colores y contrastes apropiados

### 6. **Module Configuration** (`app.module.ts`)
- ✅ **HttpClientModule**: Importado para peticiones HTTP
- ✅ **FormsModule**: Para binding bidireccional
- ✅ **Service Registration**: BooksService como provider
- ✅ **Component Declaration**: Componente registrado

## 🚀 Cómo Usar

### Prerequisitos:
1. **API REST ejecutándose**: 
   ```bash
   cd "modulo4/Tema 3"
   node app.js
   ```
   La API debe estar corriendo en `http://localhost:3000`

2. **Angular Project Setup**:
   ```bash
   npm install @angular/core @angular/common @angular/platform-browser @angular/forms rxjs
   ```

### Uso en Componente:
```typescript
// En tu app.component.html
<app-books-api></app-books-api>

// En tu componente TypeScript
constructor(private booksService: BooksService) {}

ngOnInit() {
  this.booksService.getAll().subscribe({
    next: (books) => console.log('Libros:', books),
    error: (error) => console.error('Error:', error)
  });
}
```

## 📋 Funcionalidades Implementadas

### ✅ **Operaciones CRUD Completas**
- **Create**: Agregar nuevos libros con validación
- **Read**: Obtener todos los libros o uno específico
- **Update**: Editar libros existentes
- **Delete**: Eliminar libros con confirmación

### ✅ **Características Avanzadas**
- **Búsqueda**: Buscar libros por término
- **Validación**: Validación de formularios y datos
- **Error Handling**: Manejo robusto de errores de API
- **Loading States**: Indicadores de carga en operaciones
- **Responsive UI**: Interfaz adaptable a móviles y desktop

### ✅ **Buenas Prácticas**
- **Memory Management**: Cleanup de subscripciones
- **Type Safety**: Tipado completo con TypeScript
- **Observable Patterns**: Uso correcto de RxJS
- **Component Architecture**: Separación de responsabilidades
- **Error Boundaries**: Manejo de errores en UI

## 🔗 Conexión con API REST

El servicio se conecta automáticamente con la API del Tema 3:
- **Base URL**: `http://localhost:3000/api/books`
- **CORS**: Configurado para peticiones desde cualquier origen
- **Formato**: JSON request/response
- **Autenticación**: No requerida (API pública)

## 📊 Estructura de Archivos

```
modulo4/Tema 4/src/
├── shared/
│   └── books.service.ts       # Servicio con HttpClient
├── models/
│   └── book.model.ts          # Modelo Book para API
├── components/
│   ├── books-api.component.ts    # Componente ejemplo
│   ├── books-api.component.html  # Template completo  
│   └── books-api.component.css   # Estilos responsive
└── app.module.ts              # Configuración del módulo
```

## ✨ Resultado Final

El reto está **completamente implementado** con:
- ✅ Servicio Angular que se comunica con API REST
- ✅ Métodos que retornan Observables
- ✅ Manejo de errores y estados de carga
- ✅ Ejemplo completo de uso en componente
- ✅ UI moderna y responsive para testing
- ✅ Configuración completa del módulo Angular

**¡El servicio está listo para integrarse en cualquier aplicación Angular y comunicarse perfectamente con la API REST del Tema 3!** 🚀