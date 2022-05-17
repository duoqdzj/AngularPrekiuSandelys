import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrekesService } from 'src/app/service/prekes.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  public name=null;
  constructor(private prekiuService:PrekesService, private user:UserService, private router:Router) {
    if (!user.isLoggedIn()){
      this.router.navigate(["/login"]);
    }

   }


  ngOnInit(): void {
  }

  public onSubmit(form){
    let values=form.form.value;
    this.prekiuService.addPreke(null,values.name,values.summary,values.price,values.quantity, values.pic).subscribe(
      (response)=>{
        this.router.navigate(["/"]);
      }
    );
    
  }

}
