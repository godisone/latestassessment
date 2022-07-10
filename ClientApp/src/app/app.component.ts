import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './employee';
import { ApidataService } from './services/apidata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ClientApp';
  directApiRes:Employee[]=[];
  LocalApiRes:Employee[]=[];
  data:any[]=[];

  
  constructor(private router: Router,private service:ApidataService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit() {
      this.service.getEmployeeData()
        .subscribe(response => {
          let apiData : any =[];
          apiData=response;
          this.directApiRes = apiData.body.data;
          var res = this.directApiRes.sort((a,b)=> a.id-b.id)
          //this.postDataToDb(this.directApiRes);
          console.log('posts',this.directApiRes);
        });
        this.getDataFromDb();
        
  }

  getDataFromDb(){
    debugger;
    this.service.getDataFromDb()
        .subscribe(response => {
          debugger;
          let apiData : any =[];
          apiData=response;
          this.LocalApiRes = apiData;
          var res = this.LocalApiRes.sort((a,b)=> a.id-b.id)
          console.log('localApi',this.LocalApiRes);
        });
  
  }

  postDataToDb(data:any[]){
    debugger;
    data.forEach(element => {
      this.service.postapiDataToDb(element);
    });
  }

  postDataFromApi(){
    let postData:any[];
    postData=this.directApiRes;
    var res = postData.sort((a,b)=> a.id-b.id);
    res.forEach(element => {
      this.service.postapiDataToDb(element);
    });
    if(res){
    setInterval(() => {         
      //replaced function() by ()=>
    this.reload();
      // just testing if it is working
    }, 1000);
  }
  }

  deleteEmpByid(){
    let postData:any[];
    postData=this.directApiRes;
    postData.forEach(element => {
      this.service.deleteEmpById(element.id);
    });
  }

  deleteAll(){
      this.service.deleteAllData();
      this.getDataFromDb();
      setInterval(() => {         
        //replaced function() by ()=>
      this.reload();
        // just testing if it is working
      }, 500);
  }

  reload() {
    if (this.router && this.router.url === '/') { 
    window.location.reload();
  } else {
    this.router.navigate(['./']);
  }
  }

}
