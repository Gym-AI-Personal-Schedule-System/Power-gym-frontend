import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExerciseService} from "../../../../api-service/service/ExerciseService";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent {
  exerciseForm: FormGroup;
  exercises: any[] = [];

  constructor(private fb: FormBuilder, private exerciseService: ExerciseService) {
    // Initialize the form with form controls
    this.exerciseForm = this.fb.group({
      exerciseName: ['', Validators.required],
      videoUrl: ['', Validators.required],
    });

    this.getActiveExerciseList();
  }

  // Method to handle form submission
  onSubmit() {
    if (this.exerciseForm.valid) {
      const exerciseName = this.exerciseForm.get('exerciseName')?.value;
      const videoUrl = this.exerciseForm.get('videoUrl')?.value;

      const payload = {
        exerciseName: exerciseName,
        video_url: videoUrl
      }
      this.exerciseService.addExercise(payload).subscribe(value => {
        console.log(value);
        if (value.statusCode === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: value.message,
            confirmButtonText: 'OK'
          });
        }
      })

    } else {
      console.log('Form is invalid');
    }
  }

  onCancel() {
    this.exerciseForm.reset();  // Resets all form fields
  }

  private getActiveExerciseList() {
    this.exerciseService.getActiveExerciseList().subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.exercises = response.data; // Assume 'data' contains the list of exercises
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

  deleteExercise(id) {
    console.log(id);
  }
}
