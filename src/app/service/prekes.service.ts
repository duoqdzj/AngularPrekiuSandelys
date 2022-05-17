import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, pipe, throwError } from 'rxjs';
import { Preke } from '../models/preke.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PrekesService {

  public prekes: Preke[]=[
    // {id:1, name:"Dezute", summary:"Dezute daiktams", price:100, quantity:3, pic:"https://aromama.lt/880-home_default/medine-dezute-eteriniams-aliejams-maza.jpg"},
    // {id:2, name:"Stiklainis", summary:"Stiklinis daiktas uogienei laikyt", price:2, quantity:1, pic:"https://www.sanitex.eu/o/out/pictures/generated/product/1/380_340_75/barcodes_lv_2015_4771323250316.jpg"},
    
  ];

  private checkLogin=(response)=>{
    if (response.status==401){
      this.user.logOut();
    }
  
    return throwError( ()=> new Error("Nesate prisijungę"))
  };

  constructor(private http:HttpClient,  private user:UserService) { }

  public getPrekes(){   
    //Vykdoma užklausa ir grąžinamas observable
    return this.http.get<Preke[]>("http://localhost:8080/prekes/",  {headers:this.user.getHeaders()})
    .pipe(catchError(this.checkLogin));;
    
  }

  // public addPreke(id, name, summary, price,  quantity, pic){
  //   console.log("Pridedu preke kurios vardas: "+name);
  //   this.prekes.push(new Preke(id, name, summary, price,  quantity, pic));
  // }

  public addPreke(id, name, summary, price,  quantity, pic){
    return this.http.post("http://localhost:8080/prekes/", {
      name:name,
      summary:summary,
      price:price,
      quantity:quantity, 
      pic:pic
    }, {headers:this.user.getHeaders()})
    .pipe(catchError(this.checkLogin));;
    
  }

  public getPreke(id){
    return this.http.get<Preke>("http://localhost:8080/prekes/"+id, {headers:this.user.getHeaders()})
    .pipe(catchError(this.checkLogin));;
  }

  //Išsiųs duomenis į Spring tam kad irasas būtų atnaujintas
  public updatePreke(id, name, summary, quantity, price, pic){
    return this.http.patch("http://localhost:8080/prekes/"+id, {
      id:id,
      name:name,
      summary:summary,
      quantity:quantity,
      price:price,
      pic:pic
    }, {headers:this.user.getHeaders()})
    .pipe(catchError(this.checkLogin));;
  }

  public deletePreke(id){
    return this.http.delete("http://localhost:8080/prekes/"+id, {headers:this.user.getHeaders()})
    .pipe(catchError(this.checkLogin));;
  }

}
