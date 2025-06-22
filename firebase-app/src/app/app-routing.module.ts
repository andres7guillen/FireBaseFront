import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudentComponent } from './components/list-student/list-student.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { StudentFilterComponent } from './components/student-filter/student-filter.component';
import { StudentDeleteComponent } from './components/student-delete/student-delete.component';

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: ListStudentComponent },
  { path: 'students/detail/:id', component: StudentDetailComponent },
  { path: 'students/edit/:id', component: StudentEditComponent },
  { path: 'students/delete/:id', component: StudentDeleteComponent },
  { path: 'students/filter', component: StudentFilterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
