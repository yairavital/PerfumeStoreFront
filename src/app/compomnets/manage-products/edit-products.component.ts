import { Component, OnInit } from '@angular/core';
import { perfumesService } from 'src/app/Services/perfumes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss'],
})
export class EditProductsComponent implements OnInit {
  productsList: any;

  constructor(public perfumesList: perfumesService, public route: Router) {}
  deletePerfume(productItem: any) {
    this.perfumesList.deletePerfume(productItem).subscribe((res) => {
      if (res) {
        alert('ok');
        location.reload();
      } else alert('not ok');
    });
  }
  addItem(perfume: any) {
    this.perfumesList.addItem(perfume);
  }
  SaveProductLocaL(perfume: any) {
    localStorage.setItem('perfumeToUpdate', JSON.stringify(perfume));
  }

  ngOnInit(): void {
    this.perfumesList.getPerfumes().subscribe((response) => {
      this.productsList = response;
    });
  }
}
