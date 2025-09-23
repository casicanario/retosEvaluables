// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BooksComponent } from './pages/books/books.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { AddBookFormComponent } from './components/add-book-form/add-book-form.component';
import { BookReferencePipe } from './pipes/book-reference.pipe';
import { CardComponent } from './components/card/card.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { UpdateBookComponent } from './pages/update-book/update-book.component';
import { LoginComponent } from './pages/login/login.component';
import { FormLoginComponent } from './components/form-login/form-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    FormRegisterComponent,
    ProfileComponent,
    BooksComponent,
    BookCardComponent,
    AddBookFormComponent,
    BookReferencePipe,
    CardComponent,
    AddBookComponent,
    UpdateBookComponent,
    LoginComponent,
    FormLoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
