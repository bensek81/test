import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<any[]>([]);
  isCartOpen = signal<boolean>(false); // حالة القائمة الجانبية

  cartCount = computed(() => this.cartItems().length);
  cartTotal = computed(() => this.cartItems().reduce((total, item) => total + item.price, 0).toFixed(2));

  addToCart(product: any) {
    this.cartItems.update(items => [...items, product]);
    this.isCartOpen.set(true); // فتح القائمة تلقائياً عند إضافة منتج
  }

  removeFromCart(index: number) {
    this.cartItems.update(items => items.filter((_, i) => i !== index));
  }

  toggleCart() {
    this.isCartOpen.update(val => !val);
  }
}