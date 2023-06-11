import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  // Mục khai báo biến
  customer: any;
  categoryId :any;
  id: number;
  // isEdit: boolean = true;
  searchText:any;

  //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  //end
  constructor(public admin : AdminService,private _router: ActivatedRoute , private router :Router) { }
  submitted:boolean = false;
  customer_form: FormGroup = new FormGroup({
    // id: new FormControl(),
    name: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),


     
  });


  ngOnInit(): void {
    this.get_all_customer();
  }

  get_all_customer(){
     this.admin.getallcustomer()
    .subscribe((data:any)=>{
      this.customer = data.customer;
     
    },error =>{
      console.log(error);

    }
    )
  }
  get f(){
    return this.customer_form.controls;
  }
  onCreate(){
    this.submitted=true;
    this.admin.create_customer(this.customer_form.value).subscribe(data=>{
      this.customer_form.reset();
      console.log(data);
       this.get_all_customer();
    })
  }
  onDelete(id: number){
       if(confirm("bạn có chắc chắn xóa không ?")){
        this.admin.delete_customer(id).subscribe((data)=>{
          this.get_all_customer();
        })
       }
  }
  
  get_id(id: number)
  {
      //  this.id = this._router.snapshot.params['id'];
      this.id =id;
      this.admin.get_customer(id).subscribe(data=> {
      //  console.log(id,data.category.name)
      this.customer_form = new FormGroup({
        name: new FormControl(data.customer.name,Validators.required), 
        adress: new FormControl(data.customer.adress,Validators.required), 
        phone: new FormControl(data.customer.phone,Validators.required), 
        email: new FormControl(data.customer.email,Validators.required), 
 
      });
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }

  onEdit() {

    this.admin.update_customer(this.id, this.customer_form.value).subscribe(data => {
      this.router.navigate(['/customer']);
      this.customer_form.reset();
      // console.log(data);
      this.get_all_customer();
    });
  }
  resetForm() {
    this.customer_form.reset();
  }
    //phân trang
    ontableDataChange(event: any) {
      this.page = event;
      this.get_all_customer();
    }
    ontableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.get_all_customer();
    }

}
