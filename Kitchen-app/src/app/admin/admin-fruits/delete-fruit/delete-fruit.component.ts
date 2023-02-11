import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-fruit',
  templateUrl: './delete-fruit.component.html',
  styleUrls: ['./delete-fruit.component.css'],
})
export class DeleteFruitComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DeleteFruitComponent>
  ) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close(false);
  }
}
