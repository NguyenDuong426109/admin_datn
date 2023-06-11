import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(public admin : AdminService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.admin.islog.pipe(
        // kiểm tra xem đã đăng nhập hay chưa
        tap((isLoggedIn:any)=>{
          if(!isLoggedIn){
            alert("bạn cần đăng nhập để vào page này");
            this.router.navigate(['/login']);
          }
        })
      );

  }
  
}
