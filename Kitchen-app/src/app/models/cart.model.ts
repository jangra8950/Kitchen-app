import { User } from './user.model';

export class CartItem {
  id: number;
  user: User;
  fruitName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  imageUrl: string;

  constructor(
    id: number,
    user: User,
    fruitName: string,
    quantity: number,
    price: number,
    totalPrice: number,
    imageUrl: string
  ) {
    this.id = id;
    this.user = user;
    this.fruitName = fruitName;
    this.quantity = quantity;
    this.price = price;
    this.totalPrice = totalPrice;
    this.imageUrl = imageUrl;
  }
}
