import { NgModule } from "@angular/core";
import { HomeComponent } from "./pages/home/home.component";
import { UsersComponent } from "./pages/users/users.component";
import { UserDetailComponent } from "./pages/users/pages/user-detail/user-detail.component";
import { CoursesComponent } from "./pages/courses/courses.component";
import { TeachersComponent } from "./pages/teachers/teachers.component";
import { RouterModule } from "@angular/router";
import { adminGuard } from "../core/guards/admin.guard";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'users',
                canActivate: [adminGuard],
                loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
            },
            {
                path: 'courses',
                loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule)
            },
            {
                path: 'teachers',
                loadChildren: () => import('./pages/teachers/teachers.module').then((m) => m.TeachersModule)
            },
            {
                path: 'students',
                loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule)
            },
            {
                path: 'inscriptions',
                loadChildren: () => import('./pages/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
            },
            {
                path: '**',
                redirectTo: 'home',
            }
        ])
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
