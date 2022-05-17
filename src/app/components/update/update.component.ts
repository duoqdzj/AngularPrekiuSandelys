import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrekesService } from 'src/app/service/prekes.service';
import { Preke } from 'src/app/models/preke.model';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public id;
  public name;
  public summary;
  public quantity;
  public price;
  public pic;
  public old=new Preke();
  public error=null;
  public isNotFound=true;

  //Pasiimame esamą kelią
  constructor(private route:ActivatedRoute, private prekesService:PrekesService, private router:Router) { }

  
  ngOnInit(): void {
    //Paimkime sauktinio kurį norime užkrauti ID
    this.id=this.route.snapshot.params['id'];

    //Paprašykime serviso kad jis užkrautu šauktinį ir mums atsiūstų Observable
    this.prekesService.getPreke(this.id).subscribe(
      {
      next:(preke)=>{
    
      this.name=preke.name;
      this.summary=preke.summary;
      this.quantity=preke.quantity;
      this.price=preke.price;
      this.pic=preke.pic;
      this.isNotFound=false;
    },
    error: (response)=>{
      console.log(response.error.name);
      this.isNotFound=true;
      this.error=response.error.name;
    }

    });

  }

  public onSubmit(form){
    this.prekesService.updatePreke(this.id,this.name,this.summary,this.quantity,this.price, this.pic).subscribe((preke)=>{
      this.router.navigate(["/"]);
    }, (response)=>{
      this.error="Įvyko klaida atnaujinant įrašą serveryje. Bandykite dar kartą: <br>Klaidos tekstas: <strong>"+response.error.name+"</strong>";
    });

  }

}
function next(next: any, arg1: (preke: any) => void) {
  throw new Error('Function not implemented.');
}

