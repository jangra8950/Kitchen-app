import { User } from './user.model';

export class Order {
  orderId: number;
  user: User;
  totalPrice: number;
  status: string;
  fruits: string;

  constructor(
    orderId: number,
    user: User,
    totalPrice: number,
    status: string,
    fruits: string
  ) {
    this.orderId = orderId;
    this.user = user;
    this.totalPrice = totalPrice;
    this.status = status;
    this.fruits = fruits;
  }
}
