import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface UserProfile {
  name: string;
  lastName: string;
  email: string;
  imageUrl: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  userProfile: UserProfile = {
    name: 'Ruben',
    lastName: 'Rivas Briceño',
    email: 'unicornio123@gmail.com',
    imageUrl: 'myBooks/src/assets/profile-photo.jpg'
  }
  
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
      name: this.userProfile.name,
      lastName: this.userProfile.lastName,
      email: this.userProfile.email,
      imageUrl: this.userProfile.imageUrl
    });
  }
  
  onSubmit(): void {
    if (this.profileForm.valid) {
      // Actualizar los datos del perfil con los valores del formulario
      this.userProfile = {
        name: this.profileForm.get('name')?.value || '',
        lastName: this.profileForm.get('lastName')?.value || '',
        email: this.profileForm.get('email')?.value || '',
        imageUrl: this.profileForm.get('imageUrl')?.value || ''
      };
      
      console.log('Perfil actualizado:', this.userProfile);
      
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
