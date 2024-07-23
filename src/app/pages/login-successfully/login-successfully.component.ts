import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-successfully',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-successfully.component.html',
  styleUrl: './login-successfully.component.css'
})
export class LoginSuccessfullyComponent {
  authService = inject(AuthService);
}
