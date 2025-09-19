// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import { FormsModule } from '@angular/forms';

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
    AddBookFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
