import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class ApidataService {
  private apiurl = 'https://gorest.co.in/public-api/users';
  private dbapiUrl ='https://localhost:5001/api/Users/getAllUsers';
  private postUrl='https://localhost:5001/api/Users/CreateUser';
  private deleteUrl='https://localhost:5001/api/Users';
  private deleteAllUrl='https://localhost:5001/api/Users/DeleteAll';
  constructor(private httpClient: HttpClient) { }

  //data: Employee = new Employee();
  
  getEmployeeData(): Observable<HttpResponse<Employee[]>> {
    return this.httpClient.get<Employee[]>(
      this.apiurl, { observe: 'response' });
  }

  getDataFromApi(){
    return this.httpClient.get(this.apiurl);
  }

  getDataFromDb(){
    return this.httpClient.get(this.dbapiUrl);
  }

  postapiDataToDb(data:Employee[]){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(data);
    this.httpClient.post<any>(this.postUrl, body,{'headers':headers}).subscribe(data => {
      return data;
  })
  }

  deleteEmpById(id: number) {
    this.httpClient.delete<any>(`${this.deleteUrl}/${id}`).subscribe(data => {
      return data;
  })
  }

  deleteAllData() {
    this.httpClient.delete<any>(this.deleteAllUrl).subscribe(data => {
      return data;
  })
  }
}
