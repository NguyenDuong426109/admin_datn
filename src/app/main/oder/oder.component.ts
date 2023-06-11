import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-oder',
  templateUrl: './oder.component.html',
  styleUrls: ['./oder.component.css']
})
export class OderComponent {
  customer: any;
  categoryId :any;
  id: number;
  // isEdit: boolean = true;
  searchText:any;
  order:any;
  orders:any;
  order_detail:any;

  //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  //end
  constructor(public admin : AdminService,private _router: ActivatedRoute , private router :Router) { }
  submitted:boolean = false;
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
    this.get_all_oder();
    
 
  }
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
      this.getall_orders();
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
getall_orders() {
  this.admin.get_order_processing()
   .subscribe((data: any) => {
    
     this.orders = data;
     // console.log('non',this.id)
     console.log('order11',  this.orders);
   }, error => {
    error('Hiển thị lỗi!');

   }
   )
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
  get_all_oder_deatail(){
    this.admin.get_all_oder_detail()
   .subscribe((data:any)=>{
     this.order_detail = data.order_detail;
     console.log(this.order_detail)
   },error =>{
     console.log(error);

   }
   )
 }
  get f(){
    return this.order_detail_form.controls;
  }

  onDelete(id: number){
       if(confirm("bạn có chắc chắn xóa không ?")){
        this.admin.delete_customer(id).subscribe((data)=>{
          this.get_all_oder();
        })
       }
  }
  
  get_id(id: number)
  {
      //  this.id = this._router.snapshot.params['id'];
      this.id =id;
      this.admin.get_oder_detail_id(id).subscribe(data=> {
      //  console.log(id,data.category.name)
      this.order_detail_form = new FormGroup({
        order_id: new FormControl(data.order_detail.order_id,Validators.required), 
        product_id: new FormControl(data.order_detail.product_id,Validators.required), 
        size_id: new FormControl(data.order_detail.size_id,Validators.required), 
        color_id: new FormControl(data.order_detail.color_id,Validators.required), 
        price: new FormControl(data.order_detail.price,Validators.required), 
        quantity: new FormControl(data.order_detail.quantity,Validators.required),
        img_oder: new FormControl(data.order_detail.img_oder,Validators.required),

      });
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }
  
  get_order_id(id: number)
  {
      //  this.id = this._router.snapshot.params['id'];
      this.id =id;
      this.admin.get_oder_detail_id(id).subscribe(data=> {
   
       this.order_detail= data.oder_detail
       this.customer= data.oder_customer
       console.log("data",this.customer)
      this.order_detail_form = new FormGroup({
        order_id: new FormControl(data.oder_detail.order_id,Validators.required), 
        product_id: new FormControl(data.oder_detail.product_id,Validators.required), 
        size_id: new FormControl(data.oder_detail.size_id,Validators.required), 
        color_id: new FormControl(data.oder_detail.color_id,Validators.required), 
        price: new FormControl(data.oder_detail.price,Validators.required), 
        quantity: new FormControl(data.oder_detail.quantity,Validators.required),

      });
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }
  from_status: FormGroup = new FormGroup({
    // id: new FormControl(),
    payment_status: new FormControl("", Validators.required),
  });
  get_id_status(id:number){
    this.id=id;
    console.log('id click',this.id);
  }
  onEdit() {

    // this.admin.update_order_status(this.id, this.from_status.value).subscribe(data => {
    //   this.router.navigate(['/order']);
    //   this.from_status.reset();
    //   // console.log(data);
    //   this.get_all_oder();
    // });
    console.log('co id',this.id);
    this.admin.update_status(this.id, this.from_status.value).subscribe(
      (data) => {
        this.get_all_oder();
        // this.router.navigate(['/oder']);
        console.log(' this.payment_status', this.from_status.value)
        alert('Thay đổi trạng thái đơn hàng thành công!');

      },
      (error) => {
        console.log('error', error);
        alert('Cập nhật thất bại!');
      });
  }
  getStatusText(payment_status: number): string {
    switch (payment_status) {
      case 2:
        return 'Đơn hàng đã được xác thực';
      case 3:
        return 'Đã xuất hàng - đang giao';
      case 4:
        return 'Giao thành công';
      case 5:
        return 'Hủy đơn';
      default:
        return '';
    }
  }
  resetForm() {
    this.order_detail_form.reset();
  }
    //phân trang
    ontableDataChange(event: any) {
      this.page = event;
      this.get_all_oder();
    }
    ontableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.get_all_oder();
    }
}
