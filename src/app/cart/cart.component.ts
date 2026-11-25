import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartService = inject(CartService);
  firestore = inject(Firestore);

  async checkout() {
    if (this.cartService.cartItems().length === 0) return;
    
    const orderData = {
      items: this.cartService.cartItems(),
      total: parseFloat(this.cartService.cartTotal()),
      date: new Date().toISOString(),
      status: 'En attente'
    };

    try {
      const ordersRef = collection(this.firestore, 'orders');
      await addDoc(ordersRef, orderData);
      
      alert('Commande validée avec succès !');
      this.cartService.cartItems.set([]); 
      this.cartService.isCartOpen.set(false); 
    } catch (error) {
      console.error("Erreur lors de la commande:", error);
      alert('Une erreur est survenue.');
    }
  }
}