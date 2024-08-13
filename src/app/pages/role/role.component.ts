import { Component, inject } from '@angular/core';
import { RoleFormComponent } from "../../components/role-form/role-form.component";
import { RoleService } from '../../services/role.service';
import { RoleCreateRequest } from '../../interfaces/role-create-request';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleListComponent } from '../../components/role-list/role-list.component';
import { AsyncPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-role',
  standalone: true,
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
  imports: [RoleFormComponent, RoleListComponent, MatSnackBarModule, AsyncPipe, MatSelectModule, MatInputModule]
})
export class RoleComponent {
  roleService = inject(RoleService);
  authService = inject(AuthService);
  errorMessage = '';
  role: RoleCreateRequest = {} as RoleCreateRequest;
  roles$ = this.roleService.getRoles();
  users$ = this.authService.getAll();
  selectedUser: string = '';
  selectedRole: string = '';
  snacBar = inject(MatSnackBar);
  createRole(role: RoleCreateRequest) {
    this.roleService.createRole(role).subscribe({
      next: (response: { message: string }) => {
        this.snacBar.open("Role created Successfullly", "Ok", {
          duration: 3000,
        });

      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.errorMessage = error.error;
        }

      }

    })


  }

  deleteRole(id: string) {
    this.roleService.deleteRole(id).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.snacBar.open("Role Deleted Successfully", "Close", {
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snacBar.open(error.message, "Close", {
          duration: 3000,
        });

      },


    });


  }
  assignRole() {
    this.roleService.assignRole(this.selectedUser, this.selectedRole).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.snacBar.open("Role Assign Successfully", "Close", {
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snacBar.open(error.message, "Close", {
          duration: 3000,
        });

      },


    });
  }
  deleteAssignRole() {
    this.roleService.deleteAssignRole(this.selectedUser, this.selectedRole).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.snacBar.open("Role Delete Successfully", "Close", {
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snacBar.open(error.message, "Close", {
          duration: 3000,
        });

      },


    });

  }
}
