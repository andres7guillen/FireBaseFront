import { Component, OnInit } from '@angular/core';

import { IStudent } from 'src/app/models/IStudent';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html'
})
export class ListStudentComponent implements OnInit {
  students: IStudent[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentService.getAll().subscribe({
      next: (data) => {
        this.students = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los estudiantes';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/students/detail', id]);
  }

  editStudent(id: string): void {
    this.router.navigate(['/students/edit', id]);
  }

  deleteStudent(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      this.studentService.delete(id).subscribe({
        next: () => {
          this.students = this.students.filter(s => s.id !== id);
        },
        error: (err) => {
          alert('Error al eliminar el estudiante');
          console.error(err);
        }
      });
    }
  }

  onFilter(event: { fieldName: string, fieldValue: string }): void {
  if (!event.fieldName || !event.fieldValue) {
    this.loadStudents();
  } else {
    this.studentService.getByFilter(event.fieldName, event.fieldValue).subscribe({
      next: (data) => this.students = data,
      error: () => alert('No se encontraron resultados con ese filtro.')
    });
  }
}

selectedFile: File | null = null;

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}

onUploadCsv(): void {
  if (!this.selectedFile) return;

  this.studentService.uploadCsv(this.selectedFile).subscribe({
    next: (response: string) => {
      alert(response || 'CSV cargado exitosamente');
      this.loadStudents();
      this.selectedFile = null;
    },
    error: (err) => {
      console.error('Error al subir CSV:', err);
      const message = err?.error ?? 'Error al subir CSV';
      alert(message);
    }
  });
}

}