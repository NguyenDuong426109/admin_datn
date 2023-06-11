import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-unprocessed-order',
  templateUrl: './unprocessed-order.component.html',
  styleUrls: ['./unprocessed-order.component.css']
})
export class UnprocessedOrderComponent {
  payment_status:number;

// id: number;
// cập nhật trạng thái
update_status_orders(id: number,payment_status:number) {
  this.id = id;
  this.payment_status=payment_status;
  console.log('payment_status', this.payment_status);
  // if(confirm("bạn có chắc chắn xác thực không ?")){
  this.admin.update_order_status(this.id, this.payment_status).subscribe(
    (data) => {
      this.getall_order();
      console.log(' this.payment_status', this.payment_status)
      alert('Thay đổi trạng thái đơn hàng thành công!');
    },
    (error) => {
      console.log('error', error);
      alert('Cập nhật thất bại!');
    }
  );
  // }
}
  customer: any;
  categoryId :any;
  id: number;
  // isEdit: boolean = true;
  searchText:any;
  order:any;
  order_detail:any;
  //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  constructor(public admin : AdminService,private _router: ActivatedRoute , private router :Router) { }
  order_detail_form: FormGroup = new FormGroup({
    // id: new FormControl(),
    order_id: new FormControl('', Validators.required),
    product_id: new FormControl('', Validators.required),
    size_id: new FormControl('', Validators.required),
    color_id: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    img_oder: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
   this.getall_order()
  
  
  }

  
 
 get_order_id(id: number)
 {
     //  this.id = this._router.snapshot.params['id'];
     this.id =id;
     this.admin.get_oder_detail_id(id).subscribe(data=> {
     //  console.log(id,data.category.name)
     this.order_detail= data.oder_detail
     this.customer= data.oder_customer
    
     // this.isEdit = true; // Xác định là chức năng sửa
   })
 }
  getall_order() {
    this.admin.get_order_processing()
     .subscribe((data: any) => {
      
       this.order = data;
       // console.log('non',this.id)
       console.log('order11',  this.order);
     }, error => {
      error('Hiển thị lỗi!');
     }
     )
 }
 from: FormGroup = new FormGroup({
   // id: new FormControl(),
   payment_status: new FormControl(2, Validators.required),
 });
 openModal(id: number): void {
  this.id = id; // lưu lại id vào một biến trong component
}
resetForm() {
  this.order_detail_form.reset();
}
get_all_oder(){
  this.admin.getalloder()
 .subscribe((data:any)=>{
   this.order = data.order;
   console.log('asas',this.order)
 },error =>{
   console.log(error);

 }
 )
}
onDelete(id: number){
  if(confirm("bạn có chắc chắn xóa không ?")){
   this.admin.delete_order(id).subscribe((data)=>{
    this.getall_order()
   })
  }
}
  //phân trang
  ontableDataChange(event: any) {
    this.page = event;
    // this.get_all_oder();
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.get_all_oder();
}
}
