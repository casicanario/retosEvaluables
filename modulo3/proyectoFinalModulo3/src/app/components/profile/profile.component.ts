import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: User = new User(
    1,
    'Ruben',
    'Rivas Briceño',
    'unicornio123@gmail.com',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'password123'
  );
  
  profileForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      imageUrl: ['', [Validators.required]]
    });
  }
  
  ngOnInit(): void {
    // Inicializar el formulario con los datos actuales del perfil
    this.profileForm.patchValue({
      name: this.user.name,
      lastName: this.user.last_name,
      email: this.user.email,
      imageUrl: this.user.photo
    });
  }
  
  // Método para el click del botón (Reto 5)
  onUserNameClick(): void {
    console.log('Nombre del usuario:', this.user.name);
  }
  
  onSubmit(): void {
    if (this.profileForm.valid) {
      // Actualizar los datos del perfil con los valores del formulario
      this.user.name = this.profileForm.get('name')?.value || '';
      this.user.last_name = this.profileForm.get('lastName')?.value || '';
      this.user.email = this.profileForm.get('email')?.value || '';
      this.user.photo = this.profileForm.get('imageUrl')?.value || '';
      
      console.log('Perfil actualizado:', this.user);
      
      // Opcional: Mostrar mensaje de éxito
      alert('¡Perfil actualizado correctamente!');
      
    } else {
      console.log('Formulario inválido');
      
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.profileForm.controls).forEach(key => {
        this.profileForm.get(key)?.markAsTouched();
      });
      
      alert('Por favor, completa todos los campos correctamente');
    }
  }
}
