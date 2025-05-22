import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spin = inject(NgxSpinnerService);
  spin.show('spin2');
  return next(req).pipe(
    finalize(() => {
      spin.hide('spin2');
    })
  );
};
