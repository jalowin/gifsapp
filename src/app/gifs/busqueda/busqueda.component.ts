import { Component, ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  public searching: string = 'Gifs';

  //Con el signo de interogacion se le dice a TS que el elemento siempre va a estar y no va a ser nulo
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor ( private gifsService: GifsService) {

  }

  buscar( termino:string ){
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0) {
      return;
    }
    this.txtBuscar.nativeElement.value = '';
    this.gifsService.buscarGifs(valor,0);
  }

  GetStats(event: any) {
    if (event.target.checked){
      this.gifsService.url = 'https://api.giphy.com/v1/gifs';
      this.searching = 'Gifs';
    }else {
      this.gifsService.url = 'https://api.giphy.com/v1/stickers';
      this.searching = 'Stickers';
    }
  }

  changeCount(event:any){
    console.log(event.target.value);
    this.gifsService.count=event.target.value;
  }
}
