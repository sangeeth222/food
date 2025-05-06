import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signupentity } from './app/signup/signupentity';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http:HttpClient) { }
 // baseurl= "http://localhost:10000";
  //  baseurl= "http://localhost:8080";
   //  baseurl="https://foodappapi-b7ig.onrender.com";
    
     baseurl= 'https://foodapi-97dt.onrender.com';
  
  post(path:any,data:any):Observable<any>{
    return this.http.post(this.baseurl+path,data)
  }
  get(path:any):Observable<any>{
    return this.http.get(this.baseurl+path);
  }
  getAll(path:any):Observable<any>{
    return this.http.get(this.baseurl+path);
  }
  delete(path:any):Observable<any>{
    return this.http.delete(this.baseurl+path);
  }
  put(path:any,data:any):Observable<any>{
    return this.http.put(this.baseurl+path,data)
  }
  sigPpost(data:any):Observable<Signupentity>{
    return this.http.post<Signupentity>(this.baseurl+'/user/save',data)
  }

  postProduct(formData: FormData): Observable<any> {
    return this.http.post(this.baseurl + '/products', formData);
  }
  // postCategory(path: string, data: any): Observable<any> {
  //   return this.http.post<any>(this.baseurl + '/category/save', data);
  // }
     /** ✅ Save a new category */
  postCategory(path: string, data: any): Observable<any> {
    return this.http.post(this.baseurl+path,data);
  }

  /** ✅ Fetch all categories */
  getCategories(): Observable<any> {
    return this.http.get(this.baseurl+'/category/getall');
  }
  DeleteCategory(id:number):Observable<any> {
    return this.http.delete(this.baseurl+'/category/delete/'+id);
  }
  getAllProduct(): Observable<any> {
return this.http.get(this.baseurl+'/products/getall');
  }
 
  getProductById(id:number):Observable<any> {
return this.http.get(this.baseurl+'/products/getById/'+id);
  }
  DeleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseurl+'/products/delete/'+id);
   }
  UpdateProductId(id: number, updatedData: any): Observable<any> {
    return this.http.put(this.baseurl + '/products/update/' + id, updatedData);
  }
  getUserDetails():Observable<any>{
    return this.http.get(this.baseurl+'/user/getall');
  }
  getUserById(id: number):Observable<any>{
    return this.http.get(this.baseurl+'/user/getById/'+id);
  }
  
  updateUserId(id: number, userData: any):Observable<any>{
    return this.http.put(this.baseurl+'/user/update/'+id,userData);
  }
  deleteUserId(id:number):Observable<any>{
    return this.http.delete(this.baseurl+'/user/delete/'+id);
  }
  
  }
  