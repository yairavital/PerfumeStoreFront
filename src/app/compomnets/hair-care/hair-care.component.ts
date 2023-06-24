import { Component, OnInit } from '@angular/core';
import { perfumesService } from 'src/app/Services/perfumes.service';

@Component({
  selector: 'app-hair-care',
  templateUrl: './hair-care.component.html',
  styleUrls: ['./hair-care.component.scss'],
})
export class HairCareComponent implements OnInit {
  products = [];
  constructor(private productsService: perfumesService) {}

  ngOnInit(): void {
    this.fillPerfumes();
  }

  fillPerfumes() {
    this.productsService.getPerfumes().subscribe((items) => {
      for (let item in items) {
        if (items[item].productType == 1) {
          this.products.push(items[item]);
        }
      }
    });
  }
}
