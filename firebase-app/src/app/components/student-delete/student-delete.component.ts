import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service.service';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html'
})
export class StudentDeleteComponent implements OnInit {
  studentId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
  }

  confirmDelete(): void {
    this.studentService.delete(this.studentId).subscribe({
      next: () => {
        alert('Estudiante eliminado correctamente.');
        this.router.navigate(['/students']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al eliminar el estudiante.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}