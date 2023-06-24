import { Component, OnInit } from '@angular/core';
import { perfumesService } from 'src/app/Services/perfumes.service';

@Component({
  selector: 'app-women-perfume',
  templateUrl: './women-perfume.component.html',
  styleUrls: ['./women-perfume.component.scss'],
})
export class WomenPerfumeComponent implements OnInit {
  perfumes = [];
  constructor(private perfumesService: perfumesService) {}

  ngOnInit(): void {
    this.fillPerfumes();
  }

  fillPerfumes() {
    this.perfumesService.getPerfumes().subscribe((items) => {
      for (let item in items) {
        if (items[item].gender == 0 && items[item].productType == 0) {
          this.perfumes.push(items[item]);
        }
      }
    });
  }
}
