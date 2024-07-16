import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ScheduleComponent} from "./schedule.component";

const routes: Routes = [
  { path: '', redirectTo: 'schedule', pathMatch: 'full' },
  {
    path: '',
    component: ScheduleComponent,
    children: [
      {
        path: 'create-schedule',
        loadChildren: () =>
          import('./generate-schedule/generate-schedule.module').then(
            (m) => m.GenerateScheduleModule
          ),
      },
      {
        path: 'add-exercise',
        loadChildren: () =>
          import('./add-exercise/add-exercise.module').then(
            (m) => m.AddExerciseModule
          ),
      },
      {
        path: 'view-exercise',
        loadChildren: () =>
          import('./view-exercise/view-exercise.module').then(
            (m) => m.ViewExerciseModule
          ),
      },
      {
        path: 'manage-exercise',
        loadChildren: () =>
          import('./manage-exercise/manage-exercise.module').then(
            (m) => m.ManageExerciseModule
          ),
      },




    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule { }
