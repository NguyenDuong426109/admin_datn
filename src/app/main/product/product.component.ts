import { keyframes } from '@angular/animations';
import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { __values } from 'tslib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  private subscription: Subscription;
  product: any;
  sizeId :any;
  category_product:any
  id: number;
  colors:any;
  product_size:any;
  sizes:any;
  imageFiles: File[] = [];

  productss:any;
  // isEdit: boolean = true;
  searchText:any;
  size:any[]=[];
  color:any[]=[];
  fileName: any;
  selectedFile:File;
  //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  data = [];
  //end
  constructor(public admin : AdminService,private _router: ActivatedRoute , private router :Router) { }
  submitted:boolean = false;
  product_form: FormGroup = new FormGroup({
    // id: new FormControl(),
    name: new FormControl('', Validators.required),
    categories_id: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  
  
  ngOnInit(): void {
    this.get_all_product();
    this.get_all_size();
    this.get_all_color();
    
  }
  get_all_size(){
    this.admin.getallproduct()
   .subscribe((data:any)=>{
     this.product = data.product;
     this.product_size = data.product_size_color
     console.log( this.product);
     this.category_product = data.category;
     this.size = data.size;
     this.color = data.color;
   },error =>{
     console.log(error);
 
   }
   )
 }
 get_all_color(){
  this.admin.getallproduct()
 .subscribe((data:any)=>{
   this.product = data.product;
   this.product_size = data.product_size_color
   console.log( this.product);
   this.category_product = data.category;
   this.size = data.size;
   this.color = data.color;
 },error =>{
   console.log(error);

 }
 )
}
  get_all_product(){
     this.admin.getallproduct()
    .subscribe((data:any)=>{
      this.product = data.product;
      this.product_size = data.product_size_color
      console.log( this.product);
      this.category_product = data.category;
      this.size = data.size;
      this.color = data.color;
    },error =>{
      console.log(error);
    }
    )
  }
  get f(){
    return this.product_form.controls;
  }
  onCreate(){
    // this.submitted=true;
    // console.log('đây nè',this.product_form.value)
    // this.admin.create_product(this.product_form.value).subscribe(data=>{
    //   this.product_form.reset();
    //   console.log('đây',data);
    //    this.get_all_product();
    // })
    const formData: FormData = new FormData();
    formData.append('name', this.product_form.value.name);
    formData.append('categories_id', this.product_form.value.categories_id);
    formData.append('price', this.product_form.value.price);
    formData.append('description', this.product_form.value.description);
     
    if(this.imageFiles && this.imageFiles.length >0){
      for(let i = 0; i<this.imageFiles.length;i++){
        formData.append(`image[${i}]`,this.imageFiles[i])
      }
    }
    console.log('data', this.product_form.value);


    this.admin.create_product(formData).subscribe((data: any) => {
      ;
      console.log('success', data)
    
      this.product_form.reset();
      this.get_all_product();
      window.location.reload();
    }
    )
  }

  size_form: FormGroup = new FormGroup({
    // id: new FormControl(),
    namesize: new FormControl('', Validators.required),
    product_id: new FormControl( '', Validators.required),
    quantity: new FormControl( '', Validators.required),
   


  });
  color_form: FormGroup = new FormGroup({
    // id: new FormControl(),
    namecolor: new FormControl('', Validators.required),
    product_id: new FormControl( '', Validators.required),
   


  });
  onsize(){
    // this.submitted=true;
    this.size_form.patchValue({
      product_id:this.id
    })
    console.log('đây nè122', this.id)
    console.log('đây nè 3',this.size_form.value)
    this.admin.create_sizes(this.size_form.value).subscribe(data=>{
      this.size_form.reset();
      console.log('đây nè2',this.size_form.value)
      console.log('đây',data);
    })
  }
  oncolor(){
    // this.submitted=true;
    this.color_form.patchValue({
      product_id:this.id
    })
    console.log('đây nè122', this.id)
    console.log('đây nè 3',this.color_form.value)
    this.admin.create_colors(this.color_form.value).subscribe(data=>{
      this.color_form.reset();
      console.log('đây nè2',this.color_form.value)
      console.log('đây',data);
    })
  }
  onDelete(id: number){
       if(confirm("bạn có chắc chắn xóa không ?")){
        this.admin.delete_product(id).subscribe((data)=>{
          this.get_all_product();
        })
       }
  }
  onDelete_size(id: number){
    if(confirm("bạn có chắc chắn xóa không ?")){
      this.router.navigate(['/product']);
     this.admin.delete_sizes(id).subscribe((data)=>{
       this.get_all_size();
     })
    }
}
onDelete_color(id: number){
  if(confirm("bạn có chắc chắn xóa không ?")){
    this.router.navigate(['/product']);
   this.admin.delete_colors(id).subscribe((data)=>{
     this.get_all_color();
   })
  }
}
  
  get_id(id: number)
  {
    //  this.id = this._router.snapshot.params['id'];
    this.id =id;
    console.log('id day',this.id);
      this.admin.get_product(id).subscribe(data=> {
       console.log(id,data)
       this.product_form.patchValue(data.product); // đưa data vào form
       this.product = data.product;
       // this.images=data.images;
        console.log('data', data);
      //  this.product_form = new FormGroup({
      //   name: new FormControl(data.product.name,Validators.required), 
      //   categories_id: new FormControl(data.product.categories_id,Validators.required), 
      //   price: new FormControl(data.product.price,Validators.required), 
      //   description: new FormControl(data.product.description,Validators.required), 
      //   status: new FormControl(data.product.status,Validators.required), 
      // });
      console.log('â');
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }
  get_size(id: number) {
  
      this.id =id;
      this.admin.getsize(id).subscribe(data=> {
       this.sizes= data.size
       console.log(id,data)
       this.size_form = new FormGroup({
        namesize: new FormControl(data.size.namesize,Validators.required),
        product_id: new FormControl(data.size.product_id,Validators.required), 
        quantity: new FormControl(data.size.quantity,Validators.required),
      });
       console.log('size', this.sizes)
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }
  get_id_size(id: number)
{
    //  this.id = this._router.snapshot.params['id'];
    this.id =id;
    this.admin.get_size(id).subscribe(data=> {
     console.log(id,data)
    this.size_form = new FormGroup({
      namesize: new FormControl(data.size.namesize,Validators.required), 
      product_id: new FormControl(data.size.product_id,Validators.required),
      quantity: new FormControl(data.size.quantity,Validators.required),
    });
    // this.isEdit = true; // Xác định là chức năng sửa
  })
}
get_id_color(id: number)
{
    //  this.id = this._router.snapshot.params['id'];
    this.id =id;
    this.admin.get_color(id).subscribe(data=> {
     console.log(id,data)
    this.color_form = new FormGroup({
      namecolor: new FormControl(data.color.namecolor,Validators.required), 
      product_id: new FormControl(data.color.product_id,Validators.required),
    });
    // this.isEdit = true; // Xác định là chức năng sửa
  })
}
  get_color(id: number) {
  
    this.id =id;
    this.admin.getcolor(id).subscribe(data=> {
    this.colors= data.color
    this.color_form = new FormGroup({
      namecolor: new FormControl(data.color.namecolor,Validators.required),
      product_id: new FormControl(data.color.product_id,Validators.required), 
    
    });
    console.log('color',data.color.namecolor )
   // this.isEdit = true; // Xác định là chức năng sửa
 })
}
  onEdit() {

    const formData: FormData = new FormData();
    formData.append('name', this.product_form.value.name);
    formData.append('categories_id', this.product_form.value.categories_id);
    formData.append('price', this.product_form.value.price);
    formData.append('description', this.product_form.value.description);
    // formData.append('status', this.product_form.value.status);
     
    if(this.imageFiles && this.imageFiles.length >0){
      for(let i = 0; i<this.imageFiles.length;i++){
        if(this.imageFiles[i]){
        formData.append(`image[${i}]`,this.imageFiles[i])
        }
      }
    }
    formData.forEach((value,key) =>{
      console.log('đây r',value, key)
    });

    
   
    // console.log()
    this.admin.update_product(this.id, formData).subscribe(data => {
      this.router.navigate(['/product']);
      this.product_form.reset();
      // console.log(data);
      this.get_all_product();
    });
    
  }
  deleteImg(imageId:any)
  {
    const index = this.product.image.findIndex(
      (img :any) => img.id === imageId 
    );
    if(index !== -1){
      this.product.image.splice(index,1);
    }

  };
  onEdit_sizes() {
      console.log( 'nnnn',this.size_form.value.namesize)
      console.log( 'id đay',this.id)
    this.admin.update_sizes(this.id, this.size_form.value).subscribe(data => {
      this.router.navigate(['/product']);
      this.size_form.reset();
       console.log(this.id,data);
    },error=>{
      console.log('loi',error);
    });
  }
  // OnFilechange(ev: any) {
  //   const fileInput = ev?.target as HTMLInputElement;
  //   if(fileInput.files && fileInput.files[0]  ){
  //     const file = fileInput.files[0];
  //     this.product_form.patchValue({img_product:file});
  //     this.selectedFile = ev.target.file[0];
  //     const reader = new FileReader();
  //     reader.onload = ()=> {
  //       this.previewUrl = reader.result;
  //     }
  //   }
  

       // if (ev.target.files) {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(ev.target.files[0]);
    //   reader.onload = (event: any) => {
    //     this.url = event.target.result;
    //   }
    // }
    // this.fileName = ev.target.files[0];

    // console.log('file name', this.fileName);

  // }
  OnfileSlected(event:any){
    if(event.target.files.length>0){
    for(let i =0 ; i < event.target.files.length; i++  ){
    const reader = new FileReader();
    const file = event.target.files[i];
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      const result = reader.result as string;
      const previewDiv = document.getElementById('preview')!;
      const images = document.createElement('img');
      images.src = result;
      images.width = 150 ;
      previewDiv.appendChild(images);
      const deleteButton = document.createElement('button');
       deleteButton.innerHTML = 'x';
       deleteButton.onclick = () =>{
        previewDiv.removeChild(images);
        previewDiv.removeChild(deleteButton);
        this.imageFiles.splice(this.imageFiles.indexOf(file), 1);

      };
      previewDiv.appendChild(deleteButton);


    };
    this.imageFiles.push(file);
  }
    }
  }
  OnfileSlecteds(event:any){
    if(event.target.files.length>0){
    for(let i =0 ; i < event.target.files.length; i++  ){
    const reader = new FileReader();
    const file = event.target.files[i];
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      const result = reader.result as string;
      const previewDiv = document.getElementById('previews')!;
      const images = document.createElement('img');
      images.src = result;
      images.width = 150 ;
      previewDiv.appendChild(images);
      const deleteButton = document.createElement('button');
       deleteButton.innerHTML = 'x';
       deleteButton.onclick = () =>{
        previewDiv.removeChild(images);
        previewDiv.removeChild(deleteButton);
        this.imageFiles.splice(this.imageFiles.indexOf(file), 1);

      };
      previewDiv.appendChild(deleteButton);


    };
    this.imageFiles.push(file);
  }
    }
  }
  onEdit_colors() {

    this.admin.update_colors(this.id, this.color_form.value).subscribe(data => {
      this.router.navigate(['/product']);
      this.color_form.reset();
      // console.log(data);
      this.get_all_color();
    });
  }
  resetForm() {
    this.product_form.reset();
    this.size_form.reset();
     this.product_form.reset();
  }
    //phân trang
    ontableDataChange(event: any) {
      this.page = event;
      this.get_all_product();
    }
    ontableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.get_all_product();
    }
}
