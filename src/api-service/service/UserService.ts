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

  public getUserRolWiseUser(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'user/getUserRolWiseUser', payload, { headers });
  }


  public getUserWiseUserPrivilege(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'user/getUserWiseUserPrivilege', payload, { headers });
  }

  public getAllUsers(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'user/get-all-users',payload, { headers });
  }



  public getRoles(): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<ApiResultFormatModel>(this.BASEURL+'user/get-roles', { headers });
  }
}
