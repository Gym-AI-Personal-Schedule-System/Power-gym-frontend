import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {ApiResultFormatModel} from "../model/common/ApiResultFormatModel";

@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  BASEURL = '';
  constructor(private http: HttpClient) {
    this.BASEURL = environment.baseURL;
  }


  getUnprocessedMarketingCommissions(userCode: string){
    const payload ={
      commissionBy:userCode,
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'commission/getProcessableCommissions', payload, { headers });
  }

  getUnprocessedDoctorCommissions(userCode: string){
    const payload ={
      commissionBy:userCode,
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'commission/getProcessableDoctorCommissions', payload, { headers });
  }

  getUnprocessedRiderCommissions(userCode: string){
    const payload ={
      commissionBy:userCode,
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'commission/getProcessableRiderCommissions', payload, { headers });
  }

  processMarketingCommission(payload:any){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'commission/processMarketingCommission', payload, { headers });
  }

  processDoctorCommission(payload:any){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'commission/processDoctorCommission', payload, { headers });
  }

  processRiderCommission(payload:any){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'commission/processRiderCommission', payload, { headers });
  }

}
