import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para confirmar contraseña
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  hasPasswordMismatch(): boolean {
    return this.registerForm.errors?.['passwordMismatch'] && 
           this.registerForm.get('confirmPassword')?.touched;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const formData = this.registerForm.value;
      
      // Simular registro (en aplicación real sería llamada al backend)
      setTimeout(() => {
        console.log('Usuario registrado:', formData);
        
        // Mostrar notificación de éxito
        this.toastr.success(
          `¡Bienvenido ${formData.name}! Tu cuenta ha sido creada exitosamente.`, 
          'Registro exitoso'
        );
        
        // Limpiar formulario
        this.registerForm.reset();
        this.isLoading = false;
        
        // Redirigir a login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
        
      }, 1500);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
      
      this.toastr.warning(
        'Por favor, completa todos los campos correctamente', 
        'Formulario inválido'
      );
    }
  }
}
