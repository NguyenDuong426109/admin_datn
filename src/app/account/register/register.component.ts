import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private subscription: Subscription;
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    public admin : AdminService,
    private router: Router,
  ) {}

  ngOnInit() {}

  register() {
    console.log('aa',this.form.value)

    this.admin.register(this.form.value).subscribe(
      (data: any) => {
        // console.log('tạo thành công', data);
        // this.toastr.success(data.message);
        alert('Đăng ký thành công')
        this.router.navigate(['/login']);
      },
      (error) => {
    console.log('ero',error)
          // this.toastr.error('Lỗi server, vui lòng thử lại sau!','api chưa chạy');
          alert('Lỗi server, vui lòng thử lại sau!')
        }
    
    );
  }
}
