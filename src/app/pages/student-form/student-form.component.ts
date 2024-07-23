import { JsonPipe, AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { StudentService } from '../../services/student.service';
import { GroupsService } from '../../services/groups.service';
import { PictureService } from '../../services/picture.service';
import { Group } from '../../interfaces/group';
import { Picture } from '../../interfaces/pictures';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule, JsonPipe, RouterLink, AsyncPipe, MatIcon, MatInputModule, MatSelectModule, AsyncPipe, CommonModule, RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  studentformSubscription!: Subscription;
  paramsSubscription!: Subscription;
  studentService = inject(StudentService);
  groupService = inject(GroupsService);
  pictureService = inject(PictureService);
  authService = inject(AuthService);
  isAdmin = this.authService.isAdmin;
  groups$!: Observable<Group[]>;
  pictures$!: Observable<Picture[]>;

  pictureName = "";

  isEdit = false;
  id = 0;
  flagParams = false;

  navigateRoute = '/students';

  groupId = 0;
  groupName = "";
  //src = '/assets/Photo/1.png'
  //src = 'https://disk.yandex.ru/client/disk/Picture?idApp=client&dialog=slider&idDialog=%2Fdisk%2FPicture%2F1.png';
  // src = 'https://disk.yandex.ru/i/Ma_60-lhVs_brw';
  //src = 'C:/Users/POINTBREAK22/Desktop/1.png'

  constructor(private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    activatedRouter.queryParams.subscribe(
      (queryParam: any) => {
        this.groupId = queryParam["groupId"];
        this.groupService.getGroup(this.groupId).subscribe({
          next: (response) => {
            this.groupName = response.name;
            this.flagParams = true;

          }
        }
        );

      }
    );
  }
  selected($event: string) {
    // this.pictureName = $event;
    this.pictureService.getPicture(+$event).subscribe({
      next: (response) => {
        this.pictureName = response.src;

      }


    });

  }
  ngOnDestroy(): void {
    if (this.studentformSubscription) {
      this.studentformSubscription.unsubscribe();
    }

    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();

    }
  }





  onSubmit() {
    console.log(this.isEdit);
    if (!this.isEdit) {

      this.studentformSubscription = this.studentService.addStudent(this.form.value).subscribe({
        next: (response) => {
          console.log(response);
          //  this.toasterService.success("Teacher sucesfully added");

          if (this.flagParams) {
            this.router.navigateByUrl('/groups/' + this.form.value.groupId);
          }
          else {
            this.router.navigateByUrl('/students');
          }
        },
        error: err => {
          console.log(err);
        }

      })

    }
    else {
      this.studentService.editStudent(this.id, this.form.value).subscribe(
        {
          next: value => {
            //  this.toasterService.success("Edited sucessfully");

            if (this.flagParams) {
              this.router.navigateByUrl('/groups/' + this.form.value.groupId);
            }
            else {
              this.router.navigateByUrl('/students');
            }
          }, error: err => {
            //    this.toasterService.error('Unable to edit');
          }
        }
      )
    }
  }


  ngOnInit(): void {


    this.pictures$ = this.pictureService.getPictures();
    this.groups$ = this.groupService.getGroups();
    this.paramsSubscription = this.activatedRouter.params.subscribe(
      {
        next: (response) => {
          console.log(response['id']);
          let id = response['id'];
          this.id = id;
          console.log('id=' + id);
          if (!id) return;
          else this.isEdit = true;

          this.navigateRoute = '/students'
          this.studentService.getStudent(id).subscribe(
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

      numberPhone: [],
      groupId: [],
      pictureId: [],
    });


  }



}
