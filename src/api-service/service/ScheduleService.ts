import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Injectable} from "@angular/core";
import {ApiResultFormatModel} from "../model/common/ApiResultFormatModel";

@Injectable({
  providedIn: 'root',
})
export  class ScheduleService{
  private BASEURL:string;
  constructor(private http:HttpClient) {
    this.BASEURL = environment.baseURL;
  }

  generateSchedule(payLoad: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'schedule/generateSchedule', payLoad, { headers });
  }

  getAllUserScheduleDetails(payLoad: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'schedule/getAllUserScheduleDetails', payLoad, { headers });
  }

  getUserWiseSchedule(payLoad: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'schedule/getUserWiseSchedule', payLoad, { headers });
  }

  getSchedule() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<ApiResultFormatModel>(this.BASEURL+'schedule/getSchedule', { headers });
  }
  saveScheduleWiseExerciseList(payLoad: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'schedule/saveScheduleWiseExerciseList',payLoad,{ headers });
  }

  getScheduleCount() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<ApiResultFormatModel>(this.BASEURL+'schedule/getScheduleCount', { headers });
  }
}
