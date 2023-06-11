import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  totalOrder: number;
  totalProduct: number;
  totalPriceOrder: number;
  productNews: any;

  constructor(public admin : AdminService,private _router: ActivatedRoute , private router :Router) { }


  ngOnInit(): void {
    this.get_all();
  }

  get_all(){
     this.admin.getall()
    .subscribe((data:any)=>{
      this.totalOrder = data.totalOrder;
      this.totalProduct = data.totalProduct;
      this.totalPriceOrder = data.totalPriceOrder;
      this.productNews = data.productNews;
     
    },error =>{
      console.log(error);

    }
    )
  }
}
