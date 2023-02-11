import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Fruit } from 'src/app/models/fruit.model';
import { FruitServices } from 'src/app/services/fruit.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddFruitComponent } from '../add-fruit/add-fruit.component';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DeleteFruitComponent } from './delete-fruit/delete-fruit.component';

@Component({
  selector: 'app-admin-fruits',
  templateUrl: './admin-fruits.component.html',
  styleUrls: ['./admin-fruits.component.css'],
})
export class AdminFruitsComponent implements OnInit {
  fruits: Fruit[] = [];
  faPen = faPen;
  faTrash = faTrash;
  searchKey: string;
  fruitsTableList: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'fruits',
    'name',
    'quantityAvailable',
    'price',
    'actions',
  ];

  routerEventSubscription = this.routerService.events.subscribe();

  constructor(
    private activatedRouterService: ActivatedRoute,
    private fruitService: FruitServices,
    private routerService: Router,
    private dailog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fruitsTableList = new MatTableDataSource();
    this.getFruits();
    if (this.routerEventSubscription) {
      this.routerSubscription();
    }
  }

  routerSubscription(): void {
    this.routerEventSubscription = this.routerService.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.getFruits();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }

  getFruits() {
    this.fruits = [];

    this.fruitService.getFruitsForAdmin().subscribe((response) => {
      response.forEach((fruit) => this.fruits.push(fruit));
    });
  }

  onAdd() {
    this.fruitService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dailog.open(AddFruitComponent, dialogConfig);
    this.routerService.navigate(['addFruit'], {
      relativeTo: this.activatedRouterService,
    });
  }

  onEdit(fruit: Fruit) {
    this.fruitService.populateEditFruitForm(fruit);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dailog.open(AddFruitComponent, dialogConfig);
    this.routerService.navigate([`editFruit/${fruit.id}`], {
      relativeTo: this.activatedRouterService,
    });
  }

  onDelete(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'confirm-dialog-container';
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you sure you want to delete this fruit?',
    };
    this.dailog
      .open(DeleteFruitComponent, dialogConfig)
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          let index = this.fruits.findIndex((item) => item.id === id);
          if (index > -1) {
            this.fruits.splice(index, 1);
          }
          this.fruitService.deleteFruit(id).subscribe();
          this.notificationService.warn('Deleted successfully.');
        }
      });
    this.routerService.navigate(['/admin/fruits'], {
      relativeTo: this.activatedRouterService,
    });
  }
}
