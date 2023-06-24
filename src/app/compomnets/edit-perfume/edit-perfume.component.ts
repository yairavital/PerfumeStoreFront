import { Router } from '@angular/router';
import { perfumesService } from 'src/app/Services/perfumes.service';
import { Component, OnInit } from '@angular/core';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-edit-perfume',
  templateUrl: './edit-perfume.component.html',
  styleUrls: ['./edit-perfume.component.scss'],
})
export class EditPerfumeComponent implements OnInit {
  perfumeToUpdate: any;
  newPerfume: any;

  perfumeFromLocal: any;
  constructor(private perfService: perfumesService, public router: Router) {
    this.perfumeFromLocal = localStorage.getItem('perfumeToUpdate');
    this.perfumeToUpdate = JSON.parse(this.perfumeFromLocal);
  }

  updatePerfume(
    id: number,
    name: string,
    imgSrc: string,
    sale: string,
    price: number,
    gender: string
  ) {
    this.newPerfume = {
      id: id,
      imgSrc: imgSrc,
      name: name,
      price: price,
      gender: gender == 'female' ? 0 : 1,
      productType: 0,
      onSale: sale,
    };

    this.newPerfume.onSale === 'true'
      ? (this.newPerfume.onSale = true)
      : (this.newPerfume.onSale = false);
    this.perfService.updatePerfume(this.newPerfume).subscribe((res: any) => {
      if (res) {
        alert('ok');

        localStorage.setItem('perfumeToUpdate', null);
        this.router.navigate(['/manageProducts']);
      } else {
        alert('not ok');
      }
    });
  }

  ngOnInit(): void {}
}
