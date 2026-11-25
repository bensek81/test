import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { CartService } from '../cart.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  firestore = inject(Firestore);
  cartService = inject(CartService);
  
  product$: Observable<any> | undefined;

  constructor() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const productRef = doc(this.firestore, `products/${productId}`);
      this.product$ = docData(productRef, { idField: 'id' });
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}