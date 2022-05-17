import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preke } from 'src/app/models/preke.model';
import { PrekesService } from 'src/app/service/prekes.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public prekiuSarasas:Preke[]=[];
  public isLoading=true;
  public isError=false;
  public error=null;

  constructor(private prekiuService:PrekesService, private user:UserService, private router:Router) {
    if (!user.isLoggedIn()){
      this.router.navigate(["/login"]);
    }

   }


  private loadPrekiuSarasas(){
    //Kviečiame serviso metodą getSauktiniai, metodas gražins Observable 
    //(t.y. objektą prie kurio galėsime prisiskirti f-jas kurios bus vykdomos tuomet kai bus gauti duomenys)
    this.isLoading=true;
    
    this.prekiuService.getPrekes()  
    
    //Su metodu subscribe galime priskirti f-ją kuri bus įvykdyta tuomet kai duomenys bus gauti
    .subscribe(
      // Lamda išraiška su kintamuoju response kuriame bus talpinami parsiusti duomenys
      (response)=>{
        //Parsiustus duomenis prisiskiriame komponento kitnamajam Sarasui kurį atvaizduojame
        this.prekiuSarasas=response;
        console.log("Atvaizdavau duomenis");
        this.isLoading=false;
      },
      (response)=>{
        this.isError=true;  
      }
    );

    console.log("Pabaigiau darba");
    
  }

  ngOnInit(): void {
    this.loadPrekiuSarasas();
  }

  public delete(id){
    this.prekiuService.deletePreke(id).subscribe((result)=>{
      this.loadPrekiuSarasas();
    }, (response)=>{
      this.error="Įvyko klaida atnaujinant įrašą serveryje. Bandykite dar kartą: <br>Klaidos tekstas: <strong>"+response.error.name+"</strong>";
    });
  }


  afterDelete(tekstas){
    console.log(tekstas);
    this.loadPrekiuSarasas();
  }

}
