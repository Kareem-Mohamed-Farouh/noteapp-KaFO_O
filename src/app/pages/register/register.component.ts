import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/user/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '../../core/shared/components/UI/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  registerForm!: FormGroup;
  apiFormError!: string;
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
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
      age: [
        null,
        [Validators.required, Validators.min(4), Validators.max(120)],
      ],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    });
  }

  submitRegister(): void {
    console.log(this.registerForm.valid);
    console.log(this.registerForm.value);
    console.log(this.registerForm);

    if (this.registerForm.valid) {
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log('res', res);

          this.toastr.success('successfully operation ', '', {
            timeOut: 2000,
            easing: 'ease-in-out',
            positionClass: 'toast-top-right',
            progressBar: true,
          });
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.msg, '', {
            timeOut: 2000,
            easing: 'ease',
            positionClass: 'toast-top-right',
            progressBar: true,
          });
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
