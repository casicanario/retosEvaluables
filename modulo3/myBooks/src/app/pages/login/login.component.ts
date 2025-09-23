import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  onLoginSuccess(userData: any): void {
    // Mostrar notificación de éxito
    this.toastr.success(`¡Bienvenido ${userData.email}!`, 'Login exitoso');
    
    // Redirigir a books después del login
    setTimeout(() => {
      this.router.navigate(['/books']);
    }, 1500);
  }
}
