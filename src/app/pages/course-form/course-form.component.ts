import { JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  courseformSubscription!: Subscription;
  paramsSubscription!: Subscription;
  courseService = inject(CourseService);
  authService = inject(AuthService);
  isAdmin = this.authService.isAdmin;
  isEdit = false;
  id = 0;


  constructor(private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private toasterService: ToastrService
  ) {
  }
  ngOnDestroy(): void {
    if (this.courseformSubscription) {
      this.courseformSubscription.unsubscribe();
    }

    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();

    }
  }
  onSubmit() {
    if (!this.isEdit) {
      this.courseformSubscription = this.courseService.addCourse(this.form.value).subscribe({
        next: (response) => {
          console.log(response);
          this.toasterService.success("Course sucesfully added");
          this.router.navigateByUrl('/courses');
        },
        error: err => {
          console.log(err);
        }

      })

    }
    else {
      this.courseService.editCourse(this.id, this.form.value).subscribe(
        {
          next: value => {
            this.toasterService.success("Edited sucessfully");
            this.router.navigateByUrl('/courses');
          }, error: err => {
            this.toasterService.error('Unable to edit');
          }
        }
      )
    }
  }
  ngOnInit(): void {
    this.paramsSubscription = this.activatedRouter.params.subscribe(
      {

        next: (response) => {
          console.log(response['id']);
          let id = response['id'];
          this.id = id;
          console.log('id=' + id);
          if (!id) return;
          this.courseService.getCourse(id).subscribe(
            {
              next: response => {
                this.form.patchValue(response);
                this.isEdit = true;
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

    });
  }

}
