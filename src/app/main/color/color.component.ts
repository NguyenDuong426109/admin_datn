import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent {
color: any;
title='Danh mục sản phẩm';
colorId :any;
id: number;
// isEdit: boolean = true;
searchText:any;

//phân trang
// POSTS: any;
page: number = 1;
count: number = 0;
tablecolor: number = 5;
tablecolors: any = [5, 10, 15, 20];
//end
constructor(public admin : AdminService,private _router: ActivatedRoute , private router :Router) { }
submitted:boolean = false;
color_product: FormGroup = new FormGroup({
  // id: new FormControl(),
  namecolor: new FormControl('', Validators.required),
  product_id: new FormControl('', Validators.required),
});


ngOnInit(): void {
  this.get_all_color();
}

get_all_color(){
   this.admin.getallcolor()
  .subscribe((data:any)=>{
    this.color = data.color;  
    console.log(this.color) 
  },error =>{
    console.log(error);
  }
  )
}
get f(){
  return this.color_product.controls;
}
onCreate(){
  this.submitted=true;
  this.admin.create_color(this.color_product.value).subscribe(data=>{
    this.color_product.reset();
    console.log(data);
     this.get_all_color();
  })
}
onDelete(id: number){
     if(confirm("bạn có chắc chắn xóa không ?")){
      this.admin.delete_color(id).subscribe((data)=>{
        this.get_all_color();
      })
     }
}

get_id(id: number)
{
    //  this.id = this._router.snapshot.params['id'];
    this.id =id;
    this.admin.get_color(id).subscribe(data=> {
     console.log(id,data)
    this.color_product = new FormGroup({
      namecolor: new FormControl(data.color.namecolor,Validators.required), 
      product_id: new FormControl(data.color.product_id,Validators.required),
    });
    // this.isEdit = true; // Xác định là chức năng sửa
  })
}

onEdit() {

  this.admin.update_color(this.id, this.color_product.value).subscribe(data => {
    this.router.navigate(['/color']);
    this.color_product.reset();
    // console.log(data);
    this.get_all_color();
  });
}
resetForm() {
  this.color_product.reset();
}
  //phân trang
  ontableDataChange(event: any) {
    this.page = event;
    this.get_all_color();
  }
  ontablecolorChange(event: any): void {
    this.tablecolor = event.target.value;
    this.page = 1;
    this.get_all_color();
  }

  
  }
  
