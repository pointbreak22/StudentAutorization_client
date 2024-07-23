import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { GroupsService } from '../../services/groups.service';
import { Group } from '../../interfaces/group';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  group$!: Observable<Group[]>
  groupService = inject(GroupsService);

  authService = inject(AuthService);
  isAdmin = this.authService.isAdmin;
  toasterService!: ToastrService;
  teacherService = inject(GroupsService);

  ngOnInit(): void {
    this.getGroups();
  }
  delete(id: number) {
    this.groupService.deleteGroup(id).subscribe({
      next: (response) => {
        this.getGroups();
        this.toasterService.success("Sucessfuly Deleted");
      }
    }
    )

  }
  private getGroups(): void {
    this.group$ = this.groupService.getGroups()
  }
}
