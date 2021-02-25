import { Component, OnInit, Input } from '@angular/core';

import { GifsService } from '../services/gifs.service';



@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styles: [
  ]
})
export class MoreComponent implements OnInit {

  public prev: number = 0;
  public next: number = 0;
  public total: number = 0;
  public isSearch : string = '';


  constructor(
    private gifsService : GifsService
  ) {
    this.prev = this.gifsService.count || 0;
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked():void {
    this.isSearch = localStorage.getItem('current')!;
    this.prev = this.gifsService.offset;
    this.next = this.gifsService.count;
    this.total = this.gifsService.totalCount;
  }

  buttonPrev(){
    this.gifsService.offset -= this.gifsService.count;
    this.prev = this.gifsService.offset;
    this.gifsService.buscarGifs(localStorage.getItem('current')!,this.gifsService.offset);
    localStorage.setItem('offset',this.gifsService.offset.toString());
  }

  buttonNext(){
    this.gifsService.offset += this.gifsService.count;
    this.prev = this.gifsService.offset;
    this.gifsService.buscarGifs(localStorage.getItem('current')!,this.gifsService.offset);
    localStorage.setItem('offset',this.gifsService.offset.toString());
  }

}
