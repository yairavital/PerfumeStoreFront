import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { productType } from '../usersType';

@Injectable()
export class perfumesService implements OnInit {
  isExist: boolean = false;
  index: any;

  womanPerfume: any = [];
  mansPerfumes: any = [];
  onSalePerfumes: any = [];

  onSalePerf: Subject<[]> = new Subject();
  perfumesFromLocal: any;
  perfumes: any;
  constructor(private route: Router, private http: HttpClient) {}
  ngOnInit(): void {
    this.savePerfumes();
    this.perfumeSorting();
    this.onSalePerf.subscribe((ne) => (this.onSalePerfumes = ne));
    this.onSalePerf.next(this.onSalePerfumes);
  }

  perfumeSorting() {
    this.perfumes.forEach((item) => {
      if (item.onSale === true) this.onSalePerfumes.push(item);
      if (item.gender == 0) this.womanPerfume.push(item);
      else this.mansPerfumes.push(item);
    });
  }

  deletePerfume(productItem: any) {
    return this.http.delete(
      `http://localhost:5233/api/Products/${productItem.id}`
    );
  }
  savePerfumes() {
    localStorage.setItem('perfumes', JSON.stringify(this.perfumes));
  }

  getPerfumes() {
    return this.http.get('http://localhost:5233/api/Products');
  }

  addItem(perfume: any) {
    return this.http.post('http://localhost:5233/api/Products', perfume);
  }
  onSale: any = [];
  updatePerfume(perfume: any) {
    let _perfume = {
      id: Number(perfume.id),
      imgSrc: perfume.imgSrc,
      name: perfume.name,
      price: perfume.price,
      gender: Number(perfume.gender),
      productType: 1,
      onSale: perfume.onSale,
    };
    return this.http.put(
      `http://localhost:5233/api/Products/${perfume.id}`,
      _perfume
    );
  }
}
