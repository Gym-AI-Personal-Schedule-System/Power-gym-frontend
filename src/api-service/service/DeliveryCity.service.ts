import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {ApiResultFormatModel} from "../model/common/ApiResultFormatModel";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeliveryCityService {

  BASEURL = '';
  constructor(private http: HttpClient) {
    this.BASEURL = environment.baseURL;
  }


  getActiveDeliveryCity(){
    const payload ={
      pageNo:0,
      pageSize:10
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'deliveryCity/getAllaActiveDeliveryCity', payload, { headers });
  }

  public getAllCityListByJson(): Observable<ApiResultFormatModel> {
    return this.http.get<ApiResultFormatModel>('assets/JSON/cityList.json').pipe(
      map((cityList: ApiResultFormatModel) => {
        return cityList;
      })
    );
  }
}
