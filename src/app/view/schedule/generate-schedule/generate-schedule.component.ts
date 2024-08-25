import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ScheduleService} from "../../../../api-service/service/ScheduleService";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generate-schedule',
  templateUrl: './generate-schedule.component.html',
  styleUrls: ['./generate-schedule.component.scss']
})
export class GenerateScheduleComponent {
  scheduleForm: FormGroup;

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService) {
    // Initialize form group with form controls
    this.scheduleForm = this.fb.group({
      mobileNumOne: ['', Validators.required],
      MemberName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bmi: ['', Validators.required],
      workoutTime: ['', Validators.required],
      fitnessGoal: ['', Validators.required],
      aiSchedule: ['']
    });

    // Subscribe to changes in height and weight
    this.scheduleForm.get('height')?.valueChanges.subscribe(() => this.calculateBMI());
    this.scheduleForm.get('weight')?.valueChanges.subscribe(() => this.calculateBMI());
  }
  // Method to calculate BMI
  calculateBMI() {
    const height = this.scheduleForm.get('height')?.value;
    const weight = this.scheduleForm.get('weight')?.value;

    if (height && weight) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      this.scheduleForm.patchValue({ bmi: bmi.toFixed(2) });
    }
  }


  generateSchedule() {
    if (this.scheduleForm.valid) {
      const payload = this.scheduleForm.value; // get the form values

      // Call the service method
      this.scheduleService.generateSchedule(payload).subscribe({
        next: (response) => {
          if (response.statusCode === 200) {
            // Extract prediction data from response
            const prediction = response.data?.prediction?.[0] || [];

            // Convert prediction array to a readable format
            const aiScheduleValue = prediction.join(', '); // Convert array to a comma-separated string

            // Set the value of the aiSchedule form control
            this.scheduleForm.patchValue({ aiSchedule: aiScheduleValue });

            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Schedule generated successfully.',
              confirmButtonText: 'OK'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `Unexpected status code: ${response.statusCode}`,
              confirmButtonText: 'OK'
            });
          }
        },
        error: (error) => {
          console.error('Error generating schedule', error);

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error generating the schedule. Please try again later.',
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill out all required fields correctly.',
        confirmButtonText: 'OK'
      });
    }
  }
}
