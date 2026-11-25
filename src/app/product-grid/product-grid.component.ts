import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent {
  cartService = inject(CartService);
  firestore = inject(Firestore);
  products$: Observable<any[]>;

  constructor() {
    const productsCollection = collection(this.firestore, 'products');
    this.products$ = collectionData(productsCollection, { idField: 'id' });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}