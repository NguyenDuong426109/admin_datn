import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  // Mục khai báo biến
  category: any;
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
  category_product: FormGroup = new FormGroup({
    // id: new FormControl(),
    name: new FormControl('', Validators.required),
     
  });


  ngOnInit(): void {
    this.get_all_category_product();
  }

  get_all_category_product(){
     this.admin.getallcategory_product()
    .subscribe((data:any)=>{
      this.category = data.category;
     
    },error =>{
      console.log(error);

    }
    )
  }
  get f(){
    return this.category_product.controls;
  }
  onCreate(){
    this.submitted=true;
    this.admin.create_category_product(this.category_product.value).subscribe(data=>{
      this.category_product.reset();
      console.log(data);
       this.get_all_category_product();
    })
  }
  onDelete(id: number){
       if(confirm("bạn có chắc chắn xóa không ?")){
        this.admin.delete_category(id).subscribe((data)=>{
          this.get_all_category_product();
        })
       }
  }
  
  get_id(id: number)
  {
      //  this.id = this._router.snapshot.params['id'];
      this.id =id;
      this.admin.get_category(id).subscribe(data=> {
      //  console.log(id,data.category.name)
      this.category_product = new FormGroup({
        name: new FormControl(data.category.name,Validators.required), 
      });
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }

  onEdit() {

    this.admin.update_category(this.id, this.category_product.value).subscribe(data => {
      this.router.navigate(['/category']);
      this.category_product.reset();
      // console.log(data);
      this.get_all_category_product();
    });
  }
  resetForm() {
    this.category_product.reset();
  }
    //phân trang
    ontableDataChange(event: any) {
      this.page = event;
      this.get_all_category_product();
    }
    ontableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.get_all_category_product();
    }



}
