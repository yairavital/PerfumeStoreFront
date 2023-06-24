import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './compomnets/about/about.component';
import { CartComponent } from './compomnets/cart/cart.component';
import { OrderConfirmComponent } from './compomnets/cart/order-confirm/order-confirm.component';
import { ContactUsComponent } from './compomnets/contact-us/contact-us.component';
import { HairCareComponent } from './compomnets/hair-care/hair-care.component';
import { LoginComponent } from './compomnets/login/login.component';
import { ManPerfumesComponent } from './compomnets/man-perfumes/man-perfumes.component';
import { MyHomeComponent } from './compomnets/my-home/my-home.component';
import { RegistrationComponent } from './compomnets/registration/registration.component';
import { WomenPerfumeComponent } from './compomnets/women-perfume/women-perfume.component';
import { OrderConfirmGuardService } from './Services/order-confirm-guard.service';
import { ManageUsersComponent } from './compomnets/manage-users/manage-users.component';
import { EditUserComponent } from './compomnets/edit-user/edit-user.component';
import { AddUserComponent } from './compomnets/add-user/add-user.component';
import { AdminGuardService } from './Services/editUsers-guard.service';
import { EditProductsComponent } from './compomnets/manage-products/edit-products.component';
import { AddPerfumeComponent } from './compomnets/add-perfume/add-perfume.component';
import { EditPerfumeComponent } from './compomnets/edit-perfume/edit-perfume.component';
import { AuthGuard } from './Guards/auth.guard';
import { CreatorGuard } from './Guards/creator.guard';

const routes: Routes = [
  { path: 'home', component: MyHomeComponent },
  { path: '', component: MyHomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'womenPerfume', component: WomenPerfumeComponent },
  { path: 'manPerfume', component: ManPerfumesComponent },
  { path: 'hairCare', component: HairCareComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'manageUsers',
    component: ManageUsersComponent,
    canActivate: [CreatorGuard],
  },
  {
    path: 'editUser',
    component: EditUserComponent,
    canActivate: [CreatorGuard],
  },
  {
    path: 'addUser',
    component: AddUserComponent,
    canActivate: [CreatorGuard],
  },
  {
    path: 'orderComplete',
    component: OrderConfirmComponent,
    canActivate: [OrderConfirmGuardService, AuthGuard],
  },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'manageProducts',
    component: EditProductsComponent,
    canActivate: [CreatorGuard],
  },
  {
    path: 'addPerfume',
    component: AddPerfumeComponent,
    canActivate: [CreatorGuard],
  },
  {
    path: 'editPerfume',
    component: EditPerfumeComponent,
    canActivate: [CreatorGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
