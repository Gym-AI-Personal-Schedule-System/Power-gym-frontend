import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ScheduleService} from "../../../../api-service/service/ScheduleService";
import Swal from 'sweetalert2';
import {ScheduleModel} from "../../../../api-service/model/ScheduleModel";
import {UserService} from "../../../../api-service/service/UserService";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
  exerciseList: any[] = [];
  sanitizedVideoUrl: SafeResourceUrl | null = null;


  constructor(private fb: FormBuilder, private scheduleService: ScheduleService,private userService: UserService,
              private sanitizer: DomSanitizer, private modalService: NgbModal) {
    // Initialize form group with form controls
    this.scheduleForm = this.fb.group({
      mobileNumOne: ['', Validators.required],
      MemberName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      height: ['0', Validators.required],
      weight: ['0', Validators.required],
      bmi: ['0', Validators.required],
      workoutTime: ['0', Validators.required],
      fitnessGoal: ['', Validators.required],
      experience: ['0', Validators.required],
      aiSchedule: ['']
    });

    // Subscribe to changes in height and weight
    this.scheduleForm.get('height')?.valueChanges.subscribe(() => this.calculateBMI());
    this.scheduleForm.get('weight')?.valueChanges.subscribe(() => this.calculateBMI());
  }

  openVideoPopup(videoUrl: string, content: TemplateRef<any>) {
    const videoId = this.extractYouTubeVideoId(videoUrl);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    this.modalService.open(content, { size: 'lg', backdrop: 'static' });
  }

  extractYouTubeVideoId(url: string): string | null {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
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
        formValues.fitnessGoal,
        formValues.mobileNumOne
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

            this.exerciseList = response.data.scheduleDTOList.map(dto => dto.exerciseDetails);
            this.isAISchedule = true;
            // this.exerciseList = response.data.scheduleDTOList;
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
            text: error.error.message,
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

  isValidValue(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  }

  searchUser() {
    const mobileNum = this.scheduleForm.get('mobileNumOne')?.value;

    if (!mobileNum) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Input',
        text: 'Please enter a valid contact number.',
        confirmButtonText: 'OK'
      });
      return;
    }
    const payload = { mobileNum: mobileNum }; // Send mobileNum as payload to the service

    this.userService.getUserDataByMobileNumber(payload).subscribe({
      next: (response) => {
        if (response.statusCode === 200 && response.data) {
          const userData = response.data;
          console.log(JSON.stringify(userData))
          // Patch the form with user data
          this.scheduleForm.patchValue({
            MemberName: this.isValidValue(userData.name) ? userData.name : '',
            mobileNumOne: this.isValidValue(userData.mobileNum) ? userData.mobileNum : '',
            age: this.isValidValue(userData.age) ? userData.age : '0',
            height: this.isValidValue(userData.height) ? userData.height : '0',
            weight: this.isValidValue(userData.weight) ? userData.weight : '0',
            bmi: this.isValidValue(userData.bmi) ? userData.bmi : '0'
          });

          if (userData.gender) {
            this.scheduleForm.patchValue({
              gender: userData.gender
            });
          }
          this.calculateBMI();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'User Not Found',
            text: `No user found with the provided contact number.`,
            confirmButtonText: 'OK'
          });
        }
      },
      error: (error) => {
        console.error('Error fetching user data', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message,
          confirmButtonText: 'OK'
        });
        this.bmiUIChange(0);
        this.scheduleForm.reset({
          mobileNumOne: '',
          MemberName: '',
          age: '',
          gender: '',
          height: '',
          weight: '',
          bmi: ''
        });



      }
    });
  }
}
