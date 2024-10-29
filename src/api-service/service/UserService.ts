import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {ApiResultFormatModel} from "../model/common/ApiResultFormatModel";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BASEURL = '';
  constructor(private http: HttpClient) {
    this.BASEURL = environment.baseURL;
  }

  public getUserDataByMobileNumber(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'user/getUserDataByMobileNumber',payload, { headers });
  }

  otpSend( body: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<any>(this.BASEURL+'user/otpSend', body,{ headers });

  }

  updatePassword( body: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.put<any>(this.BASEURL+'user/updatePassword', body,{ headers });

  }
  getActiveMemberList() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<any>(this.BASEURL+'user/getActiveMemberList',{ headers });

  }
  getAgeWiseMemberCount() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<any>(this.BASEURL+'user/getAgeWiseMemberCount',{ headers });

  }
}
