import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  news: any;
  fileName: any;
  previewURL: any;
  selectedFile: File;
  id: number;
  constructor(public admin : AdminService,private _router: ActivatedRoute , private router :Router) { }
  submitted:boolean = false;
  new: FormGroup = new FormGroup({
    // id: new FormControl(),
    title: new FormControl('', Validators.required),
    description: new FormControl(),
    content: new FormControl(),
  });

  ngOnInit(): void {
    this.get_all_new();
  }

  get_all_new(){
     this.admin.getallnew()
    .subscribe((data:any)=>{
      this.news = data.news;
     
    },error =>{
      console.log(error);

    }
    )
  }
  // get f(){
  //   return this.new.controls;
  // }
  updateImage(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {   
      console.log('file1', fileInput.files); 
      const file = fileInput.files[0];
      this.new.patchValue({ avatar_path: file });
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewURL = reader.result;
      }
      reader.readAsDataURL(file);
      console.log('ảnh', this.selectedFile);
    }
  }
  onCreate(){
    // this.submitted=true;
    const formData: FormData = new FormData();
    // formData.append('avatar_path', this.fileName);
    formData.append('title', this.new.value.title);
    formData.append('description', this.new.value.description);
    formData.append('content', this.new.value.content);
    if (this.selectedFile) {
      // console.log('tên ảnh', this.selectedFile.name);
      formData.append('avatar_path', this.selectedFile, this.selectedFile.name);
    }
    formData.forEach((value, key) => {
      console.log('form data', key, value);
    }),
    this.admin.create_new(formData).subscribe(data=>{
      console.log(data);
      this.new.reset();
      
       this.get_all_new();
       alert('Thêm tin tức thành công');
      }, 
       error => {
        alert('Thêm tin tức thất bại');
        console.log('Lỗi create post', error);
      }
  )
  }
  onDelete(id: number){
       if(confirm("bạn có chắc chắn xóa không ?")){
        this.admin.delete_new(id).subscribe((data)=>{
          this.get_all_new();
        })
       }
  }
  
  get_id(id: number)
  {
      //  this.id = this._router.snapshot.params['id'];
      this.id =id;
      this.admin.get_new(id).subscribe(data=> {
      //  console.log(id,data.category.name)
      this.new = new FormGroup({
        title: new FormControl(data.new.title,Validators.required), 
        description: new FormControl(data.new.description), 
        content: new FormControl(data.new.content), 
      });
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }

  onEdit() {

    this.admin.update_new(this.id, this.new.value).subscribe(data => {
      this.router.navigate(['/new']);
      this.new.reset();
      // console.log(data);
      this.get_all_new();
    });
  }
  resetForm() {
    this.new.reset();
  }
    //phân trang
    // ontableDataChange(event: any) {
    //   this.page = event;
    //   this.get_all_new();
    // }
    // ontableSizeChange(event: any): void {
    //   this.tableSize = event.target.value;
    //   this.page = 1;
    //   this.get_all_new();
    // }


}
