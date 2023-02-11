import { Fruit } from '../models/fruit.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../models/http-response';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FruitServices {
  private hostUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fruitForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    quantityAvailable: new FormControl(null, Validators.required),
    imageUrl: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.fruitForm.setValue({
      id: 0,
      name: '',
      price: null,
      quantityAvailable: null,
      imageUrl: '',
    });
  }

  populateEditFruitForm(fruit: Fruit) {
    this.fruitForm.setValue({
      id: fruit.id,
      name: fruit.name,
      price: fruit.price,
      quantityAvailable: fruit.quantityAvailable,
      imageUrl: fruit.imageUrl,
    });
  }

  public getFruitsForUser(): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(`${this.hostUrl}` + '/fruits');
  }

  public getFruitsForAdmin(): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(`${this.hostUrl}` + '/admin/fruits');
  }

  public addFruit(newFruit: Fruit): Observable<Fruit> {
    console.log(newFruit);
    return this.http.post<Fruit>(
      `${this.hostUrl}` + '/admin/fruits/addFruit',
      newFruit
    );
  }

  public updateFruit(id: number, updatedFruit: Fruit): Observable<Fruit> {
    console.log(id);
    return this.http.put<Fruit>(
      `${this.hostUrl}/admin/fruits/editFruit/${id}`,
      updatedFruit
    );
  }

  public deleteFruit(id: number): Observable<CustomHttpResponse> {
    console.log(id);
    return this.http.delete<CustomHttpResponse>(
      `${this.hostUrl}/admin/fruits/deleteFruit/${id}`
    );
  }
}
