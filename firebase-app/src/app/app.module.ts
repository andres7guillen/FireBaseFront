import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { ListStudentComponent } from './components/list-student/list-student.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';

import { StudentFilterComponent } from './components/student-filter/student-filter.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentDeleteComponent } from './components/student-delete/student-delete.component';
import { TimeTranslatePipe } from './pipes/timne-translate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ListStudentComponent,
    StudentDetailComponent,
    StudentEditComponent,
    StudentDeleteComponent,
    StudentFilterComponent,
    TimeTranslatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
