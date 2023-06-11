import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SizeComponent } from './size/size.component';
import { ColorComponent } from './color/color.component';
import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CKEditorModule } from 'ckeditor4-angular';
import { UnprocessedOrderComponent } from './unprocessed-order/unprocessed-order.component';
import { OderComponent } from './oder/oder.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from '../account/login/login.component';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';
import { RegisterComponent } from '../account/register/register.component';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';



const MainRoutes: Routes = [
 {
  path:"",
  component: DashboardComponent,
  canActivate: [AuthGuardGuard],
  children:[
    {
      path: '', component: IndexComponent
    },
    {
      path:"category",
      component:CategoryComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"color",
      component:ColorComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"product",
      component:ProductComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"new",
      component:NewComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"size",
      component:SizeComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"customer",
      component:CustomerComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"order",
      component:OderComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"UnprocessedOrder",
      component:UnprocessedOrderComponent,
      canActivate: [AuthGuardGuard],
    },
    
]
 },
 {
  path:"login",
  component:LoginComponent,
  // canActivate: [BlockPageLoginGuard],
},
{
  path:"dangky",
  component:RegisterComponent,
  // canActivate: [BlockPageLoginGuard],
},

 
];

@NgModule({
  declarations: [
    DashboardComponent,
    CategoryComponent,
    SizeComponent,
    ColorComponent,
    ProductComponent,
    CustomerComponent,
    UnprocessedOrderComponent,
    OderComponent,
    IndexComponent,
    NewComponent
 
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    SharedModule,
    RouterModule.forChild(MainRoutes)
  ]
})
export class MainModule { }
