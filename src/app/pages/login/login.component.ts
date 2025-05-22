import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/user/auth.service';
import { ButtonComponent } from '../../core/shared/components/UI/button/button.component';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  myToken!: string;

  loginForm!: FormGroup;
  apiFormError!: string;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z|A-Z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
    });
  }

  submitRegister(): void {
    console.log(this.loginForm.valid);
    console.log(this.loginForm.value);
    console.log(this.loginForm);

    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('res', res);
          this.myToken = res.token;
          localStorage.setItem('notToken', this.myToken);
          this.toastr.success(res.msg, '', {
            timeOut: 2000,
            easing: 'ease-in-out',
            positionClass: 'toast-top-center',
            progressBar: true,
          });
          this.loginForm.reset();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.msg, '', {
            timeOut: 1500,
            easing: 'ease',
            positionClass: 'toast-bottom-right',
            progressBar: true,
          });
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
