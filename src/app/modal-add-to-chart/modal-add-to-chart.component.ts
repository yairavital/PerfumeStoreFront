import { perfumesService } from 'src/app/Services/perfumes.service';
import { Component, Input, OnInit } from '@angular/core';
import { cartService } from '../compomnets/cart/cart.service';

@Component({
  selector: 'app-modal-add-to-chart',
  templateUrl: './modal-add-to-chart.component.html',
  styleUrls: ['./modal-add-to-chart.component.scss'],
})
export class ModalAddToChartComponent implements OnInit {
  cartService: any;
  quantity = 0;
  constructor(
    cartListService: cartService,
    public perfumesService: perfumesService
  ) {
    this.cartService = cartListService;
  }

  ngOnInit(): void {}
  @Input() product: any;
  @Input() perfumes: any;
  AddToChart(product: any, quantity: number) {
    product.quantity = quantity;
    this.cartService.addItem(product);
  }
  UpdateQuanitty(product: any, updateType: string, perfumes: any) {
    for (let i = 0; i < perfumes.length; i++) {
      if (this.perfumes[i].id == product.id) {
        if (updateType === 'subtract') {
          if (this.quantity !== 0) {
            this.quantity--;
          }
        } else {
          this.quantity++;
        }

        this.perfumesService.savePerfumes();
        break;
      }
    }
  }
}
