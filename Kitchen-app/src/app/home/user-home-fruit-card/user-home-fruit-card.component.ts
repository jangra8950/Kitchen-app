import { Component, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from 'src/app/models/cart.model';
import { Fruit } from 'src/app/models/fruit.model';
import { Order } from 'src/app/models/order.model';
import { UserOrder } from 'src/app/models/user-order.model';
import { CartServices } from 'src/app/services/cart.service';
import { FruitServices } from 'src/app/services/fruit.service';
import { OrderService } from 'src/app/services/order.service';
import { UserOrderServices } from 'src/app/services/user-order.service';

@Component({
  selector: 'app-user-home-fruit-card',
  templateUrl: './user-home-fruit-card.component.html',
  styleUrls: ['./user-home-fruit-card.component.css'],
})
export class UserHomeFruitCardComponent implements OnInit {
  fruits: Fruit[] = [];
  orderedFruits: Fruit[] = [];
  cartItem: CartItem;
  cartItems: CartItem[] = [];
  order: Order;
  userOrder: UserOrder;
  shipping: number = 6;
  total: number = 0;
  sortDirection = 'asc';
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  constructor(
    private fruitServices: FruitServices,
    private cartService: CartServices,
    private orderService: OrderService,
    private userOrderService: UserOrderServices
  ) {}

  ngOnInit(): void {
    this.fruitServices.getFruitsForUser().subscribe((response) => {
      response.forEach((fruit) => this.fruits.push(fruit));
    });
    this.cartService.getCartItems().subscribe((response) => {
      response.forEach((cartItem) => this.cartItems.push(cartItem));
    });
    this.shipping = this.cartService.getShipping();
  }

  onNavigateOrder(fruit: Fruit) {
    console.log(fruit);
    this.orderedFruits.push(fruit);
    this.cartItem = this.cartService.createCartItem(fruit);
    this.userOrder = this.userOrderService.createUserOrderFromHome(
      this.cartItem
    );
    console.log(this.userOrder);
    this.cartItems = [];
    this.order = this.orderService.convertUserOrderToOrder(this.userOrder);
    console.log(this.order);
    this.orderService.addOrder(this.order).subscribe();
  }

  addToCart(fruit: Fruit) {
    this.cartItem = this.cartService.createCartItem(fruit);
    let existingCartItem = this.cartItems.find(
      (cartItem) => cartItem.fruitName === this.cartItem.fruitName
    );

    if (existingCartItem) {
      this.cartItem = this.cartService.editCartItem(existingCartItem);
      this.cartService.updateCartItem(this.cartItem).subscribe();
    } else {
      this.cartService.addCartItem(this.cartItem).subscribe((response) => {
        this.cartItems.push(response);
      });
    }
  }

  onSortDirection() {
    console.log('button is pressed');
    if (this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'desc';
    }
  }
}
