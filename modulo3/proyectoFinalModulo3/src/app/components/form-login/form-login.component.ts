import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
  @Output() loginSuccess = new EventEmitter<any>();
  
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const formData = this.loginForm.value;
      
      // Simular validación de login (en aplicación real sería una llamada al backend)
      setTimeout(() => {
        if (this.validateCredentials(formData.email, formData.password)) {
          // Login exitoso
          this.loginSuccess.emit({
            email: formData.email,
            loginTime: new Date()
          });
          this.loginForm.reset();
        } else {
          // Login fallido
          this.toastr.error('Email o contraseña incorrectos', 'Error de autenticación');
        }
        this.isLoading = false;
      }, 1500);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
      this.toastr.warning('Por favor, completa todos los campos correctamente', 'Formulario inválido');
    }
  }

  private validateCredentials(email: string, password: string): boolean {
    // Simulación de validación - en aplicación real usar servicio de autenticación
    const validUsers = [
      { email: 'admin@mybooks.com', password: '123456' },
      { email: 'user@test.com', password: 'password' },
      { email: 'demo@demo.com', password: '123456' }
    ];
    
    return validUsers.some(user => user.email === email && user.password === password);
  }
}
