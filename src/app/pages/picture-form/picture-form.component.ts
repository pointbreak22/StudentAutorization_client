import { JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { PictureService } from '../../services/picture.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-picture-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './picture-form.component.html',
  styleUrl: './picture-form.component.css'
})
export class PictureFormComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  isAdmin = this.authService.isAdmin;
  form!: FormGroup;
  pictureformSubscription!: Subscription;
  paramsSubscription!: Subscription;
  pictureService = inject(PictureService);

  isEdit = false;
  id = 0;

  src = '';
  //private toasterService: ToastrService
  constructor(private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) {
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
          this.pictureService.getPicture(id).subscribe(
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


      src: ['', Validators.required],

    });
  }
  changePhoto() {
    this.src = this.form.value.src;
  }
  onSubmit() {
    if (!this.isEdit) {
      this.pictureformSubscription = this.pictureService.addPicture(this.form.value).subscribe({
        next: (response) => {
          console.log(response);
          //  this.toasterService.success("Picture sucesfully added");
          this.router.navigateByUrl('/pictures');
        },
        error: err => {
          console.log(err);
        }

      })

    }
    else {
      this.pictureService.editPicture(this.id, this.form.value).subscribe(
        {
          next: value => {
            //   this.toasterService.success("Edited sucessfully");
            this.router.navigateByUrl('/pictures');
          }, error: err => {
            // this.toasterService.error('Unable to edit');
          }
        }
      )
    }
  }
  ngOnDestroy(): void {
    if (this.pictureformSubscription) {
      this.pictureformSubscription.unsubscribe();
    }

    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();

    }
  }
}
