import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Injectable} from "@angular/core";
import {ApiResultFormatModel} from "../model/common/ApiResultFormatModel";

@Injectable({
  providedIn: 'root',
})
export  class ExerciseService{
  private BASEURL:string;
  constructor(private http:HttpClient) {
    this.BASEURL = environment.baseURL;
  }

  addExercise(payLoad: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'exercise/saveExercise', payLoad, { headers });
  }
  getActiveExerciseList() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'exercise/getActiveExerciseList', null,{ headers });
  }
  getExerciseCount() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<ApiResultFormatModel>(this.BASEURL+'exercise/getExerciseCount', { headers });
  }

}
