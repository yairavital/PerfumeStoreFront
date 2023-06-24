import { perfumesService } from 'src/app/Services/perfumes.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, observable, Subject } from 'rxjs';

@Component({
  selector: 'app-random-perfume',

  templateUrl: './random-perfume.component.html',
  styleUrls: ['./random-perfume.component.scss'],
})
export class RandomPerfumeComponent implements OnInit {
  constructor(public perfumes: perfumesService) {}
  products: any;
  changeGender = new Subject<string>();

  genderSelect = '';
  filterProducts = [];
  randomIndex: any;
  ngOnInit(): void {}
  randomPerfumeItem: any;
  showCard = new BehaviorSubject(false);
  perfumeContainer: HTMLElement = document.querySelector(
    '.perfumeContainer'
  ) as HTMLElement;
  rangeInput: HTMLInputElement = document.getElementById(
    'myRange'
  ) as HTMLInputElement;
  onSelected(value: string, range: string) {
    this.changeGender.subscribe({
      next: (data) => (this.genderSelect = data),
    });
    this.changeGender.next(value);
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  randomPerfume(range: string) {
    this.products = this.perfumes.getPerfumes();
    if (this.genderSelect === 'female') {
      this.products.subscribe((items) => {
        for (let item in items) {
          if (items[item].gender == 0 && items[item].productType == 0) {
            this.filterProducts.push(items[item]);
          }
        }
      });
    } else {
      this.products.subscribe((items) => {
        for (let item in items) {
          if (items[item].gender == 1 && items[item].productType == 0) {
            this.filterProducts.push(items[item]);
          }
        }
      });
    }
    this.randomIndex = this.getRandomInt(this.filterProducts.length + 1);
    while (this.filterProducts[this.randomIndex].price > parseInt(range)) {
      this.randomIndex = this.getRandomInt(this.filterProducts.length + 1);
    }

    this.randomPerfumeItem = this.filterProducts[this.randomIndex];
    this.showCard.next(true);
    this.filterProducts = [];
  }
}
