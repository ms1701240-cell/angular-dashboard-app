import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Authservice } from "../services/authservice";  
import { Loadingservice } from "../services/loadingservice";
import { finalize } from "rxjs";
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(Authservice);
    const token = authService.getToken();
    const loadingService = inject(Loadingservice);
    loadingService.show();
    if (token) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(authReq).pipe(
            finalize(() => {
                loadingService.hide();
            })
        );
    }
    return next(req);
};