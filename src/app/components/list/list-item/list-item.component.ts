import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrekesService } from 'src/app/service/prekes.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  public isError=false;
  public error=null;

  @Input() preke;
  @Output() afterDelete=new EventEmitter<String>();

  constructor(private prekiuService:PrekesService) { }

  ngOnInit(): void {
  }

  public delete(id){
    this.prekiuService.deletePreke(id).subscribe((result)=>{
      this.afterDelete.emit("klaida");
    }, (response)=>{
      this.error="Įvyko klaida atnaujinant įrašą serveryje. Bandykite dar kartą: <br>Klaidos tekstas: <strong>"+response.error.name+"</strong>";
    });
  }




}
