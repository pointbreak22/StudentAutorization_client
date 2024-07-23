import { NgOptimizedImage, JsonPipe, AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { GroupsService } from '../../services/groups.service';
import { CourseService } from '../../services/course.service';
import { Course } from '../../interfaces/course';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../interfaces/teacher';
import { MatSelectModule } from '@angular/material/select';
import { Student } from '../../interfaces/students';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule, JsonPipe, RouterLink, AsyncPipe, MatIcon, MatInputModule, MatSelectModule, AsyncPipe, CommonModule, RouterLink],
  templateUrl: './group-form.component.html',
  styleUrl: './group-form.component.css'
})
export class GroupFormComponent implements OnInit, OnDestroy {


  authService = inject(AuthService);
  isAdmin = this.authService.isAdmin;

  courseService = inject(CourseService);
  courses$!: Observable<Course[]>;


  teacherService = inject(TeacherService);
  teachers$!: Observable<Teacher[]>;

  form!: FormGroup;
  groupformSubscription!: Subscription;
  paramsSubscription!: Subscription;
  groupService = inject(GroupsService);
  studentService = inject(StudentService);

  students!: Observable<Student[]>


  courseName = "";
  teacherName = "";




  isEdit = false;
  id = 0;

  constructor(private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    // private toasterService: ToastrService
  ) {
  }

  deleteStudent(arg0: number) {
    this.studentService.deleteStudent(arg0).subscribe({
      next: (response) => {
        this.students = this.groupService.getStudents(arg0);
        //  this.toasterService.success("Sucessfuly Deleted");
      }
    }
    )
  }
  ngOnInit(): void {
    this.courses$ = this.courseService.getCourses();
    this.teachers$ = this.teacherService.getTeachers();


    this.paramsSubscription = this.activatedRouter.params.subscribe(
      {

        next: (response) => {

          console.log(response['id']);
          let id = response['id'];
          this.id = id;
          console.log('id=' + id);
          if (!id) return;
          this.students = this.groupService.getStudents(id);
          this.groupService.getGroup(id).subscribe(
            {
              next: response => {

                this.form.patchValue(response);
                this.isEdit = true;


                if (!this.isAdmin()) {
                  this.courseService.getCourse(response.courseId).subscribe({
                    next: (values) => { this.courseName = values.name }
                  })
                  this.teacherService.getTeacher(response.teacherId).subscribe({
                    next: (values) => { this.teacherName = values.name }
                  })
                }

              },
              error: err => {
                console.log(err)
              }
            }
          )
        },
        error: err => {
          console.log(err)

        }
      }


    );

    this.form = this.fb.group({


      name: ['', Validators.required],
      year: [],
      specialty: [],
      courseId: [],
      teacherId: [],




    });

  }
  ngOnDestroy(): void {
    if (this.groupformSubscription) {
      this.groupformSubscription.unsubscribe();
    }

    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();

    }
  }

  onSubmit() {
    if (!this.isEdit) {
      this.groupformSubscription = this.groupService.addGroup(this.form.value).subscribe({
        next: (response) => {
          console.log(response);
          //  this.toasterService.success("Group sucesfully added");
          this.router.navigateByUrl('/');

        },
        error: err => {
          console.log(err);
        }

      })

    }
    else {
      this.groupService.editGroup(this.id, this.form.value).subscribe(
        {
          next: value => {
            //  this.toasterService.success("Edited sucessfully");
            this.router.navigateByUrl('/');
          }, error: err => {
            //    this.toasterService.error('Unable to edit');
          }
        }
      )
    }
  }

}
