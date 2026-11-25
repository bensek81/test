import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // حقن الخدمة (Injection de dépendance)
  cartService = inject(CartService);
}