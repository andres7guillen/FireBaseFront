import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/app/models/IStudent';
import { StudentService } from 'src/app/services/student.service.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html'
})
export class StudentDetailComponent implements OnInit {
  student: IStudent | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.studentService.getById(id).subscribe({
        next: (data) => {
          this.student = (data as any).value;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Error al obtener el estudiante.';
          console.error(err);
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'ID no proporcionado.';
      this.isLoading = false;
    }
  }

  back(): void {
    this.router.navigate(['/students']);
  }
}