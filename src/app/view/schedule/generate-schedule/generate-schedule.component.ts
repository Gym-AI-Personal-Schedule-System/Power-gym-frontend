import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ScheduleService} from "../../../../api-service/service/ScheduleService";
import Swal from 'sweetalert2';
import {ScheduleModel} from "../../../../api-service/model/ScheduleModel";

@Component({
  selector: 'app-generate-schedule',
  templateUrl: './generate-schedule.component.html',
  styleUrls: ['./generate-schedule.component.scss']
})
export class GenerateScheduleComponent {
  scheduleForm: FormGroup;
  showBmiMeter?: boolean = false;
  bmiValue?: number;
  bmiType="";
  loading = false;
  isAISchedule= false;

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
      experience: ['', Validators.required],
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
      this.showBmiMeter =  true;
      this.bmiUIChange(bmi);
    }else {
      this.showBmiMeter =  false;
    }
  }

  bmiUIChange(bmiValue:number){
    this.bmiValue = parseFloat(bmiValue.toFixed(2));
    let angle = (bmiValue - 0) * 180 / (50 - 0);

    const arrow = document.getElementById("bmiArrow");
    const meter = document.getElementById("bmiMeter");

    if (angle > 180){
      angle = 180;
    }
    arrow.style.transform = `translateX(-50%) rotate(${angle - 90}deg)`;

    // Set color based on BMI range
     if (bmiValue < 18.5) {
       this.bmiType ="Underweight";
      arrow.style.backgroundColor = "#a800fd";  // Blue for underweight
      meter.style.background = "linear-gradient(to top, #f7f7f7, #C56DF8FF)";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
       this.bmiType ="Normal";
      arrow.style.backgroundColor = "#28a828";  // Green for normal weight
      meter.style.background = "linear-gradient(to top, #f7f7f7, #32CD32)";
    } else if (bmiValue >= 25 && bmiValue < 30) {
       this.bmiType ="Overweight";
      arrow.style.backgroundColor = "#ffbb0d";  // Yellow for overweight
      meter.style.background = "linear-gradient(to top, #f7f7f7, #FFD700)";
    } else if (bmiValue >= 30 && bmiValue < 35) {
       this.bmiType ="Overweight";
      arrow.style.backgroundColor = "#ce740e";  // Orange for Obesity Class I
      meter.style.background = "linear-gradient(to top, #f7f7f7, #FF8C00)";
    } else if (bmiValue >= 35 && bmiValue < 40) {
       this.bmiType ="Obesity";
      arrow.style.backgroundColor = "#c53903";  // Dark Orange for Obesity Class II
      meter.style.background = "linear-gradient(to top, #f7f7f7, #FF4500)";
    } else {
       this.bmiType ="Obesity";
      arrow.style.backgroundColor = "#7a0000";  // Red for Obesity Class III
      meter.style.background = "linear-gradient(to top, #f7f7f7, #FF0000)";
    }
  }




  generateSchedule() {
    if (this.scheduleForm.valid) {

      const loaderElement = document.getElementById('loader');
      if (loaderElement) {
        loaderElement.style.display = 'block';
      }
      this.loading = true;



      const formValues = this.scheduleForm.value;
      // Create an instance of ScheduleModel with the form values
      const payload = new ScheduleModel(
        formValues.age,
        formValues.experience,
        formValues.workoutTime,
        formValues.weight,
        formValues.height,
        formValues.bmi,
        formValues.gender,
        formValues.fitnessGoal
      );

      // Call the service method
      this.scheduleService.generateSchedule(payload).subscribe({
        next: (response) => {
          if (response.statusCode === 200) {

            setTimeout(() => {
              this.loading=false;
              this.isAISchedule= true;
            }, 5000);

            const scheduleValue = response.data?.scheduleValue;

            // Set the value of the aiSchedule form control if scheduleValue exists
            if (scheduleValue) {
              this.scheduleForm.patchValue({ aiSchedule: scheduleValue });
            } else {
              // Handle case where scheduleValue is null or undefined
              this.scheduleForm.patchValue({ aiSchedule: '' });
            }

            // Swal.fire({
            //   icon: 'success',
            //   title: 'Success!',
            //   text: 'Schedule generated successfully.',
            //   confirmButtonText: 'OK'
            // });
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
