import { perfumesService } from 'src/app/Services/perfumes.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-perfume',
  templateUrl: './add-perfume.component.html',
  styleUrls: ['./add-perfume.component.scss'],
})
export class AddPerfumeComponent implements OnInit {
  newPerfume: any;

  constructor(public perfumesService: perfumesService, private route: Router) {}

  ngOnInit(): void {}
  addPerfume(
    imgSrc: string,
    name: string,
    price: string,
    gender: string,
    sale: string,
    productType: string
  ) {
    this.newPerfume = {
      imgSrc: imgSrc,
      name: name,
      price: price,
      gender: gender == 'female' ? 0 : 1,
      onSale: sale,
      productType: Number(productType),
    };
    this.newPerfume.onSale === 'true'
      ? (this.newPerfume.onSale = true)
      : (this.newPerfume.onSale = false);
    this.perfumesService.addItem(this.newPerfume).subscribe((res) => {
      if (res) alert('You add Perfume Successfuly');
    });
    this.route.navigate(['/manageProducts']);
  }
}
