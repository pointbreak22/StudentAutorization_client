import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Picture } from '../../interfaces/pictures';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PictureService } from '../../services/picture.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pictures-view',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './pictures-view.component.html',
  styleUrl: './pictures-view.component.css'
})
export class PicturesViewComponent implements OnInit {
  authService = inject(AuthService);
  isAdmin = this.authService.isAdmin;
  pictures!: Observable<Picture[]>
  toasterService!: ToastrService;
  pictureService = inject(PictureService);
  //public arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ngOnInit(): void {
    this.getPictures();
  }
  delete(id: number) {
    this.pictureService.deletePicture(id).subscribe({
      next: (response) => {
        this.getPictures();
        this.toasterService.success("Sucessfuly Deleted");
      }
    }
    )

  }
  private getPictures(): void {
    this.pictures = this.pictureService.getPictures()
  }

}
