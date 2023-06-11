import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(public admin : AdminService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request=request.clone({
      headers:request.headers.set('authorization',this.admin.token),
  })
    return next.handle(request);
  }
}
