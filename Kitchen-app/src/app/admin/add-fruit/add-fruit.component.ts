import { Component, OnInit } from '@angular/core';
import { FruitServices } from 'src/app/services/fruit.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-fruit',
  templateUrl: './add-fruit.component.html',
  styleUrls: ['./add-fruit.component.css'],
})
export class AddFruitComponent implements OnInit {
  constructor(
    private routerService: Router,
    private activatedRoute: ActivatedRoute,
    protected fruitService: FruitServices,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<AddFruitComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.fruitService.fruitForm.valid) {
      if (this.fruitService.fruitForm.get('id').value === 0) {
        this.fruitService
          .addFruit(this.fruitService.fruitForm.value)
          .subscribe();
        this.notificationService.sucess('Added fruit successfully!');
      } else {
        this.fruitService
          .updateFruit(
            this.fruitService.fruitForm.get('id').value,
            this.fruitService.fruitForm.value
          )
          .subscribe();
        this.notificationService.sucess('Modified fruit successfully!');
      }
      this.fruitService.fruitForm.reset();
      this.fruitService.initializeFormGroup();
      this.routerService.navigate(['/admin/fruits'], {
        relativeTo: this.activatedRoute,
      });
      this.onClose();
    } else {
      console.log('Form is invalid');
    }
  }

  onClear() {
    this.fruitService.fruitForm.reset();
    this.fruitService.initializeFormGroup();
  }

  onClose() {
    this.routerService.navigate(['admin/fruits'], {
      relativeTo: this.activatedRoute,
    });
    this.fruitService.fruitForm.reset();
    this.fruitService.initializeFormGroup();
    this.dialogRef.close();
  }
}
