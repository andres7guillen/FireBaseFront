import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-filter',
  templateUrl: './student-filter.component.html'
})
export class StudentFilterComponent {
  @Output() filterApplied = new EventEmitter<{ fieldName: string, fieldValue: string }>();

  filterForm: FormGroup;

  fields: string[] = [
    'Name', 'LastName', 'University', 'Gender', 'Semester', 'Age'
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      fieldName: ['', Validators.required],
      fieldValue: ['', Validators.required]
    });
  }

  applyFilter(): void {
    if (this.filterForm.valid) {
      this.filterApplied.emit(this.filterForm.value);
    }
  }

  clearFilter(): void {
    this.filterForm.reset();
    this.filterApplied.emit({ fieldName: '', fieldValue: '' });
  }
}