import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { CourseService } from '../../services/course.service';
import { Course } from '../../interfaces/course';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-courses-view',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './courses-view.component.html',
  styleUrl: './courses-view.component.css'
})
export class CoursesViewComponent implements OnInit {
  courses!: Observable<Course[]>
  toasterService!: ToastrService;
  courseService = inject(CourseService);
  authService = inject(AuthService);
  isAdmin = this.authService.isAdmin;
  ngOnInit(): void {
    this.getCourses();
  }
  delete(id: number) {
    this.courseService.deleteCourse(id).subscribe({
      next: (response) => {
        this.getCourses();
        this.toasterService.success("Sucessfuly Deleted");
      }
    }
    )

  }

  private getCourses(): void {
    this.courses = this.courseService.getCourses()
  }

}
