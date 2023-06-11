import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    public admin : AdminService,
    private router: Router,
    // private toastr: ToastrService
    ) {}

  ngOnInit() {}
  onlogout() {
    // alert()
    const confirmed = confirm('Bạn có muốn đăng xuất không?');
    console.log('đât',confirmed)
    if (confirmed) {
      this.admin.logout().subscribe((data) => {
        console.log('ad',data)
        localStorage.removeItem('profanis_auth');
        // localStorage.removeItem('cart');
        this.router.navigate(['/login']);
        alert('đăng xuất thành công!')
      });
    } else {
    }
    //
  }
}
