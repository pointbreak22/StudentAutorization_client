import { NgOptimizedImage, JsonPipe, AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Student } from '../../interfaces/students';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-students-view',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './students-view.component.html',
  styleUrl: './students-view.component.css'
})
export class StudentsViewComponent implements OnInit {
  students!: Observable<Student[]>
  toasterService!: ToastrService;
  studentService = inject(StudentService);
  authService = inject(AuthService);
  isAdmin = this.authService.isAdmin;
  ngOnInit(): void {
    this.getStudents();
  }
  delete(id: number) {
    this.studentService.deleteStudent(id).subscribe({
      next: (response) => {
        this.getStudents();
        this.toasterService.success("Sucessfuly Deleted");
      }
    }
    )

  }

  private getStudents(): void {
    this.students = this.studentService.getStudents()
  }

}
