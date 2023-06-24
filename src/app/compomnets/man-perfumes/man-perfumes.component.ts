import { Component, OnInit } from '@angular/core';
import { perfumesService } from 'src/app/Services/perfumes.service';

@Component({
  selector: 'app-man-perfumes',
  templateUrl: './man-perfumes.component.html',
  styleUrls: ['./man-perfumes.component.scss'],
})
export class ManPerfumesComponent implements OnInit {
  perfumes = [];
  constructor(private perfumesService: perfumesService) {}

  ngOnInit(): void {
    this.fillPerfumes();
  }
  fillPerfumes() {
    this.perfumesService.getPerfumes().subscribe((items) => {
      for (let item in items) {
        if (items[item].gender == 1) {
          this.perfumes.push(items[item]);
        }
      }
    });
  }
}
