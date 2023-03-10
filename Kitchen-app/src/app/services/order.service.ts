import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminOrder } from '../models/admin-order.model';
import { CustomHttpResponse } from '../models/http-response';
import { Order } from '../models/order.model';
import { OrderedItem } from '../models/orderedItem.model';
import { UserOrder } from '../models/user-order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private hostUrl = environment.apiUrl;
  private order: Order;
  private userOrder: UserOrder;
  private adminOrder: AdminOrder;
  private userOrders: UserOrder[] = [];
  private adminOrders: AdminOrder[] = [];

  constructor(private http: HttpClient) {}

  public getOrdersForAdmin(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.hostUrl}` + '/admin/orders');
  }

  public getOrdersForUser(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.hostUrl}` + '/orders');
  }

  public addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.hostUrl}` + '/orders', order);
  }

  public deleteOrder(id: number): Observable<CustomHttpResponse> {
    console.log(id);
    return this.http.delete<CustomHttpResponse>(
      `${this.hostUrl}` + `/orders/${id}`
    );
  }

  public convertUserOrderToOrder(newUserOrder: UserOrder): Order {
    this.order = new Order(
      newUserOrder.id,
      JSON.parse(localStorage.getItem('user')),
      newUserOrder.totalPrice,
      newUserOrder.status,
      JSON.stringify(newUserOrder.orderedItems)
    );
    return this.order;
  }

  public convertOrdersToUserOrders(orders: Order[]): UserOrder[] {
    this.userOrders = [];
    orders.forEach((order) => {
      let orderedItems: OrderedItem[] = this.convertFruitStringToOrderedItems(
        order.fruits
      );
      this.userOrder = new UserOrder(
        order.orderId,
        orderedItems,
        order.totalPrice,
        order.status
      );
      this.userOrders.push(this.userOrder);
    });

    return this.userOrders;
  }

  public convertOrdersToAdminOrders(orders: Order[]): AdminOrder[] {
    this.adminOrders = [];
    orders.forEach((order) => {
      let orderedItems: OrderedItem[] = this.convertFruitStringToOrderedItems(
        order.fruits
      );
      this.adminOrder = new AdminOrder(
        order.orderId,
        order.user,
        orderedItems,
        order.totalPrice,
        order.status
      );
      this.adminOrders.push(this.adminOrder);
    });
    return this.adminOrders;
  }

  private convertFruitStringToOrderedItems(fruits: string): OrderedItem[] {
    return JSON.parse(fruits);
  }
}
