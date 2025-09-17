import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para confirmar contraseña
  passwordMatchValidator(control: AbstractControl): {[key: string]: any} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      const formData = this.registerForm.value;
      console.log('Datos de registro:', formData);
      
      // Simular proceso de registro
      setTimeout(() => {
        alert('¡Registro exitoso! Bienvenido a MyBooks');
        this.registerForm.reset();
        this.isSubmitting = false;
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `El campo ${this.getFieldDisplayName(fieldName)} es requerido`;
      }
      if (field.errors['email']) {
        return 'El email no tiene un formato válido';
      }
      if (field.errors['minlength']) {
        return `El campo debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      }
    }

    // Validación especial para confirmar contraseña
    if (fieldName === 'confirmPassword' && this.registerForm.errors?.['passwordMismatch'] && field?.touched) {
      return 'Las contraseñas no coinciden';
    }

    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const names: {[key: string]: string} = {
      name: 'nombre',
      lastname: 'apellido',
      email: 'email',
      password: 'contraseña',
      confirmPassword: 'confirmar contraseña'
    };
    return names[fieldName] || fieldName;
  }

  hasFieldError(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field?.errors && field.touched) || 
           (fieldName === 'confirmPassword' && this.registerForm.errors?.['passwordMismatch'] && field?.touched);
  }
}