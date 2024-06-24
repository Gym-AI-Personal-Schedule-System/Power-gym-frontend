import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {ApiResultFormatModel} from "../model/common/ApiResultFormatModel";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASEURL = '';
  constructor(private http: HttpClient) {
    this.BASEURL = environment.baseURL;
  }

  public getAllActiveCategoryList(): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'category/getAllActiveCategoryList', null, { headers });
  }

  public saveCategory(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'category/saveCategory', payload, { headers });
  }

  public saveSubCategory(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'category/saveSubCategory', payload, { headers });
  }

  public getCategoryAndSubCategoryData(): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'category/getCategoryAndSubCategoryData', null, { headers });
  }

  public getAllActiveProductList(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'product/getAllActiveProductList', payload, { headers });
  }

  public updateProductStock(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'product/updateProductStock', payload, { headers });
  }

  public getActiveProductSupplierList(): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'productSupplier/getActiveProductSupplierList', null, { headers });
  }

  public saveProductSupplier(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'productSupplier/saveProductSupplier', payload, { headers });
  }

  public saveProduct(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'product/saveProduct', payload, { headers });
  }

  public getAllActiveSubCategoryListByCategoryID(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'category/getAllActiveSubCategoryListByCategoryID', payload, { headers });
  }

  public getActiveProductByProductCode(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'product/getActiveProductByProductCode', payload, { headers });
  }
  public getCategoryWiseAllProductCode(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'product/getCategoryWiseAllProductCode', payload, { headers });
  }
  public deleteProduct(id: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL+'product/deleteProduct/'+id,null, { headers });
  }

}
