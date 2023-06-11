import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });
  errorMessage: string = '';
  constructor(
    public admin : AdminService,
    private router: Router,
  ) {}

  ngOnInit() {}

  loginProces() {
    //kiểm tra đầu vào của dữ liệu
    if (this.form.invalid) {
      const emailControl = this.form.get('email');
      if (emailControl && emailControl.hasError('email')) {
        // this.toastr.error('Email không hợp lệ', 'Sai email kìa!');
        alert('Email không hợp lệ')
      } else {
        // this.toastr.error('Vui lòng nhập đầy đủ thông tin', 'Lỗi');
        alert('Vui lòng nhập đầy đủ thông tin')
      }
      return;
    }

    this.admin.login(this.form.value).subscribe(
      (data) => {
        this.router.navigate(['']).then(() => {
          // đăng nhập xong load lại trang
          window.location.reload();
          // this.toastr.success('Đăng nhập thành công!', 'Tốt');
          alert('Đăng nhập thành công!')
        });
      },
      (error) => {
        // this.toastr.error('Thông tin tài khoản & mật khẩu chưa đúng!');
        alert('Thông tin tài khoản & mật khẩu chưa đúng!')
        // const errorMessage = error.error.message[0];
        // this.toastr.error(errorMessage, '!!');
      }
    );
  }
}
