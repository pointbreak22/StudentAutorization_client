import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../interfaces/teacher';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-teachers-view',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './teachers-view.component.html',
  styleUrl: './teachers-view.component.css'
})
export class TeachersViewComponent implements OnInit {
  teachers!: Observable<Teacher[]>
  toasterService!: ToastrService;
  teacherService = inject(TeacherService);
  authService = inject(AuthService);
  isAdmin = this.authService.isAdmin;
  ngOnInit(): void {
    this.getTeachers();
  }
  delete(id: number) {
    this.teacherService.deleteTeacher(id).subscribe({
      next: (response) => {
        this.getTeachers();
        this.toasterService.success("Sucessfuly Deleted");
      }
    }
    )

  }

  private getTeachers(): void {
    this.teachers = this.teacherService.getTeachers()
  }


}
