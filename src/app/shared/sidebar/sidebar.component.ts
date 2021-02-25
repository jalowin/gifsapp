import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public current : string = '';

  get historial() {
    return this.gifsService.historial;
  }

  constructor( private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(){
    this.current = localStorage.getItem('current')!;
  }

  buscar( query:string){
    this.gifsService.buscarGifs(query,0);

  }

}
