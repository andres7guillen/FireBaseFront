import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IStudent } from 'src/app/models/IStudent';
import { StudentService } from 'src/app/services/student.service.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html'
})
export class StudentEditComponent implements OnInit {
  studentForm!: FormGroup;
  studentId: string = '';
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
  this.studentId = this.route.snapshot.paramMap.get('id') || '';

  if (!this.studentId) {
    this.errorMessage = 'ID de estudiante no proporcionado.';
    this.isLoading = false;
    return;
  }

  this.initForm();

  this.studentService.getById(this.studentId).subscribe({
    next: (data: any) => {
      const student = data.value; 
      this.studentForm.patchValue(student);
      this.isLoading = false;
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = 'No se pudo cargar el estudiante.';
      this.isLoading = false;
    }
  });
}

  initForm(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      age: [0, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      university: [''],
      semester: [''],
      time: [''],
      gender: ['']
    });
  }

  onSubmit(): void {
  if (this.studentForm.invalid) return;

  const formValues = this.studentForm.value;

  const updatedStudent: IStudent = {
    id: this.studentId, // Este campo es importante si tu DTO lo espera
    name: formValues.name,
    lastName: formValues.lastName,
    phone: formValues.phone,
    age: Number(formValues.age), // aseguramos que llegue como número
    email: formValues.email,
    address: formValues.address,
    university: formValues.university,
    semester: formValues.semester,
    time: formValues.time,
    gender: formValues.gender
  };

  this.studentService.update(this.studentId, updatedStudent).subscribe({
    next: () => {
      alert('Estudiante actualizado exitosamente.');
      this.router.navigate(['/students']);
    },
    error: (err) => {
      console.error(err);
      alert('Error al actualizar el estudiante.');
    }
  });
}

  cancel(): void {
    this.router.navigate(['/students']);
  }
}