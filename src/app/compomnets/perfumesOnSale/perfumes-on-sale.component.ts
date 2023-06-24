import { Component, OnInit } from '@angular/core';
import { perfumesService } from 'src/app/Services/perfumes.service';

@Component({
  selector: 'perfumes-on-sale',

  templateUrl: './perfumes-on-sale.component.html',
  styleUrls: ['./perfumes-on-sale.component.scss'],
})
export class PerfumesOnSaleComponent implements OnInit {
  perfumesOnSale = [];
  constructor(private perfumesService: perfumesService) {}

  ngOnInit(): void {
    this.fillPerfumes();
  }

  fillPerfumes() {
    this.perfumesService.getPerfumes().subscribe((items) => {
      for (let item in items) {
        if (items[item].onSale == true) {
          this.perfumesOnSale.push(items[item]);
        }
      }
    });
  }
}
