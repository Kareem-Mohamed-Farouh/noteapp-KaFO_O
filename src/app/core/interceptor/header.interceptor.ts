import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('notToken')) {
    req = req.clone({
      setHeaders: {
        token: '3b8ny__' + localStorage.getItem('notToken')!,
      },
    });
  }

  return next(req);
};
