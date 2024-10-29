import {Component, OnInit} from '@angular/core';
import {ScheduleService} from "../../../../api-service/service/ScheduleService";
import Swal from "sweetalert2";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-view-exercise',
  templateUrl: './view-exercise.component.html',
  styleUrls: ['./view-exercise.component.scss']
})
export class ViewExerciseComponent implements OnInit {

  private userCode = '';
  scheduleDates: string[] = [];
  selectedDate = '';
  exercises: any[] = [];
  videoUrl: SafeResourceUrl | null = null;

  constructor(private scheduleService: ScheduleService,private sanitizer: DomSanitizer) {
    this.userCode = sessionStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.loadUserWiseScheduleDate();
  }

  private loadUserWiseScheduleDate() {
    const payload = {userCode: this.userCode};
    this.scheduleService.getUserScheduleCreateDates(payload).subscribe(response => {
      if (response.statusCode === 200) {
        if (response.data) {
          this.scheduleDates = response.data.map((item: any) => {
            return (item.createTime);
          });
        }
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.message,
          confirmButtonText: 'OK'
        });
      }
    }, error => {
      console.error('Error loading schedule dates', error);
    });
  }

  getExerciseList(selectedDate: string) {
    console.log("select data"+ selectedDate)
    if (!selectedDate) {
      return;
    }

    const payload = {
      userCode: this.userCode,
      creatDate: selectedDate // Pass the selected date
    };

    // Call API to fetch exercises for the selected date
    this.scheduleService.getUserWiseSchedule(payload).subscribe(response => {
      if (response.statusCode === 200) {
        this.exercises = response.data; // Store the exercises in the component
        console.log(this.exercises)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.message,
          confirmButtonText: 'OK'
        });
      }
    }, error => {
      console.error('Error fetching exercises', error);
    });
  }

  // Sanitize and set the video URL when "View" is clicked
  playVideo(videoUrl: string) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl); // Sanitize the URL for iframe
  }
}
