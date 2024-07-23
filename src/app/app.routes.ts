import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { authGuard } from './guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { roleGuard } from './guards/role.guard';
import { RoleComponent } from './pages/role/role.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { LoginSuccessfullyComponent } from './pages/login-successfully/login-successfully.component';
import { GroupFormComponent } from './pages/group-form/group-form.component';
import { StudentFormComponent } from './pages/student-form/student-form.component';
import { StudentsViewComponent } from './pages/students-view/students-view.component';
import { TeachersViewComponent } from './pages/teachers-view/teachers-view.component';
import { CoursesViewComponent } from './pages/courses-view/courses-view.component';
import { PicturesViewComponent } from './pages/pictures-view/pictures-view.component';
import { TeacherFormComponent } from './pages/teacher-form/teacher-form.component';
import { CourseFormComponent } from './pages/course-form/course-form.component';
import { PictureFormComponent } from './pages/picture-form/picture-form.component';



export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'successfully',
        component: LoginSuccessfullyComponent,
    },

    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'account/:id',
        component: AccountComponent,
        canActivate: [authGuard],
    },
    {
        path: 'forget-password',
        component: ForgetPasswordComponent,

    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,

    },
    {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [authGuard]

    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin'],
        }
    },
    {
        path: 'roles',
        component: RoleComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin'],
        }
    },
    {
        path: 'group/form',
        component: GroupFormComponent,
        canActivate: [authGuard]

    },
    {
        path: 'groups/:id',
        component: GroupFormComponent,
        canActivate: [authGuard]

    },
    {
        path: 'student/form',
        component: StudentFormComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin'],
        }

    },
    {
        path: 'students/:id',
        component: StudentFormComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin'],
        }

    },
    {
        path: 'students',
        component: StudentsViewComponent,
        canActivate: [authGuard]

    },
    {
        path: 'teachers',
        component: TeachersViewComponent,
        canActivate: [authGuard]

    },
    {
        path: 'teachers/:id',
        component: TeacherFormComponent,
        data: {
            roles: ['Admin'],
        }

    },
    {
        path: 'teacher/form',
        component: TeacherFormComponent,
        data: {
            roles: ['Admin'],
        }

    },
    {
        path: 'courses',
        component: CoursesViewComponent,
        canActivate: [authGuard]

    },
    {
        path: 'courses/:id',
        component: CourseFormComponent,
        data: {
            roles: ['Admin'],
        }

    },
    {
        path: 'course/form',
        component: CourseFormComponent,
        data: {
            roles: ['Admin'],
        }

    },
    {
        path: 'pictures',
        component: PicturesViewComponent,
        canActivate: [authGuard]

    },
    {
        path: 'pictures/:id',
        component: PictureFormComponent,
        data: {
            roles: ['Admin'],
        }

    },
    {
        path: 'picture/form',
        component: PictureFormComponent,
        data: {
            roles: ['Admin'],
        }

    },





];
