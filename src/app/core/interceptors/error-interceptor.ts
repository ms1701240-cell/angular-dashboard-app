import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Toasterror } from '../services/toasterror';
import { throwError,catchError } from 'rxjs';
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastError = inject(Toasterror);
  return next(req).pipe(
     catchError((error) => {
       if (error.status === 401) {
         toastError.show('Unauthorized access. Please log in.');
       } else if (error.status === 403) {
         toastError.show('Forbidden access. You do not have permission to view this resource.');
       } else if (error.status === 404) {
         toastError.show('Resource not found. The requested resource could not be found.');
       } else if (error.status === 500) {
         toastError.show('Internal server error. Please try again later.');
       } else {
         toastError.show('An unexpected error occurred. Please try again later.');
       }
       return throwError(() => error);
     })
     
  );
  
};
