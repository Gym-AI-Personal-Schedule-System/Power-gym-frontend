import { Component } from '@angular/core';
import {ScheduleService} from "../../../../api-service/service/ScheduleService";
import Swal from "sweetalert2";
import {ExerciseService} from "../../../../api-service/service/ExerciseService";

@Component({
  selector: 'app-manage-exercise',
  templateUrl: './manage-exercise.component.html',
  styleUrls: ['./manage-exercise.component.scss']
})
export class ManageExerciseComponent {
  public selectedDate = '';
  public schedule = [];
  exercises: any[] = [];
  selectedExercises: any[] = [];

  constructor(private scheduleService: ScheduleService, private exerciseService: ExerciseService) {
    this.loadSchedule();
    this.getActiveExerciseList();
  }

  loadSchedule() {
    this.scheduleService.getSchedule().subscribe(value => {
        if (value.statusCode === 200) {
          this.schedule = value.data;
        } else {
          Swal.fire(
            'Error',
            value.message,
            'error'
          );
        }
      },
      error => {
        Swal.fire(
          '',
          error.error.data,
          'error'
        );
      });
  }

  private getActiveExerciseList() {
    this.exerciseService.getActiveExerciseList().subscribe((response: any) => {
      if (response.statusCode === 200) {
        // Assume 'data' contains the list of exercises
        this.exercises = response.data.map((exercise: any) => ({
          ...exercise,
          isSelected: false, // Initialize selection state
          sets: '' // Initialize sets as empty string
        }));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not load exercise list',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  submitSelectedExercises() {
    if (!this.selectedDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please select a schedule before submitting.',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.selectedExercises = this.exercises.filter(
      exercise => exercise.isSelected && exercise.sets && exercise.exerciseId
    );

    console.log("Selected Exercises:", this.selectedExercises);
  }
  removeExercise(exerciseToRemove: any) {
    // Remove the exercise from selectedExercises array
    this.selectedExercises = this.selectedExercises.filter(
      exercise => exercise.exerciseId !== exerciseToRemove.exerciseId
    );
  }

  cleanTable() {
    this.getActiveExerciseList();
  }
}
