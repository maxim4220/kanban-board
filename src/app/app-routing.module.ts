import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KanbanComponent} from './components/kanban/kanban.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuardService} from './guards/auth-guard.service';
import {ErrorComponent} from './components/error/error.component';
import {SingUpGuardService} from './guards/sing-up-guard.service';
import { GraphQlComponent } from './components/graph-ql/graph-ql.component';


export const routes: Routes = [
  {
    path: 'kanban-board',
    canActivate: [AuthGuardService],
    component: KanbanComponent
  },
  {
    path: 'login',
    canActivate: [SingUpGuardService],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [SingUpGuardService],
    component: RegisterComponent
  },
  {
    path: 'graphQl',
    component: GraphQlComponent
  },
  {path: 'error/404', component: ErrorComponent},
  // otherwise redirect to kanban board
  {path: '**', redirectTo: 'kanban-board'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {
}

