import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { TeacherService } from '../../services/teacher.service';
import { PictureService } from '../../services/picture.service';
import { Picture } from '../../interfaces/pictures';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink, AsyncPipe, MatSelectModule, MatIcon, CommonModule],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css'
})
export class TeacherFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  teacherformSubscription!: Subscription;
  paramsSubscription!: Subscription;
  teacherService = inject(TeacherService);
  pictureService = inject(PictureService);
  pictures$!: Observable<Picture[]>;
  authService = inject(AuthService);
  isAdmin = this.authService.isAdmin;
  pictureName = "";
  isEdit = false;
  id = 0;


  constructor(private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private toasterService: ToastrService
  ) {
  }

  selected($event: string) {

    this.pictureService.getPicture(+$event).subscribe({
      next: (response) => {
        this.pictureName = response.src;

      }


    });

  }
  ngOnDestroy(): void {
    if (this.teacherformSubscription) {
      this.teacherformSubscription.unsubscribe();
    }

    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();

    }
  }
  onSubmit() {
    if (!this.isEdit) {
      this.teacherformSubscription = this.teacherService.addTeacher(this.form.value).subscribe({
        next: (response) => {
          console.log(response);
          this.toasterService.success("Teacher sucesfully added");
          this.router.navigateByUrl('/teachers');
        },
        error: err => {
          console.log(err);
        }

      })

    }
    else {
      this.teacherService.editTeacher(this.id, this.form.value).subscribe(
        {
          next: value => {
            this.toasterService.success("Edited sucessfully");
            this.router.navigateByUrl('/teachers');
          }, error: err => {
            this.toasterService.error('Unable to edit');
          }
        }
      )
    }
  }
  ngOnInit(): void {
    this.pictures$ = this.pictureService.getPictures();
    this.paramsSubscription = this.activatedRouter.params.subscribe(
      {

        next: (response) => {
          console.log(response['id']);
          let id = response['id'];
          this.id = id;
          console.log('id=' + id);
          if (!id) return;
          this.teacherService.getTeacher(id).subscribe(
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


      fio: ['', Validators.required],
      pictureId: [],
    });

  }

}
