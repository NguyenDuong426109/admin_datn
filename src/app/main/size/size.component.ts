import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent {
// Mục khai báo biến
size: any;
title='Danh mục sản phẩm';
sizeId :any;
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
size_product: FormGroup = new FormGroup({
  // id: new FormControl(),
  namesize: new FormControl('', Validators.required),
  product_id: new FormControl('', Validators.required),
  quantity: new FormControl('', Validators.required),
});


ngOnInit(): void {
  this.get_all_size();
}

get_all_size(){
   this.admin.getallsize()
  .subscribe((data:any)=>{
    this.size = data.size;
   
  },error =>{
    console.log(error);

  }
  )
}
get f(){
  return this.size_product.controls;
}
onCreate(){
  this.submitted=true;
  this.admin.create_size(this.size_product.value).subscribe(data=>{
    this.size_product.reset();
    console.log(data);
     this.get_all_size();
  })
}
onDelete(id: number){
     if(confirm("bạn có chắc chắn xóa không ?")){
      this.admin.delete_size(id).subscribe((data)=>{
        this.get_all_size();
      })
     }
}

get_id(id: number)
{
    //  this.id = this._router.snapshot.params['id'];
    this.id =id;
    this.admin.get_size(id).subscribe(data=> {
     console.log(id,data)
    this.size_product = new FormGroup({
      namesize: new FormControl(data.size.namesize,Validators.required), 
      product_id: new FormControl(data.size.product_id,Validators.required),
      quantity: new FormControl(data.size.quantity,Validators.required),
    });
    // this.isEdit = true; // Xác định là chức năng sửa
  })
}

onEdit() {

  this.admin.update_size(this.id, this.size_product.value).subscribe(data => {
    this.router.navigate(['/size']);
    this.size_product.reset();
    // console.log(data);
    this.get_all_size();
  });
}
resetForm() {
  this.size_product.reset();
}
  //phân trang
  ontableDataChange(event: any) {
    this.page = event;
    this.get_all_size();
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.get_all_size();
  }

}
