import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  get hasFilters() {
    return this.data.time !== 7 || this.data.showUserFires !== true || this.data.showNasaFires !== true;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FilterComponent>
  ) {
    this.data = Object.assign({}, this.data);
  }

  ngOnInit() { }

  reset() {
    this.data.reset = true;
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close(this.data);
  }
}
