import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string [] = [];
  private apiKey: string = 'NVD2uuS7VqbrvqQ1928IWOkAv4nJa5jF';
  private _url: string = 'https://api.giphy.com/v1/gifs';
  private _count: number = 5;
  private _offset : number = 0;
  private _totalCount: number = 0;

  public resultados: Gif[]= [];

  set url(value:string){
    this._url=value;
  }

  get historial(){
    return [...this._historial];
  }

  get totalCount(){
    return this._totalCount;
  }

  set totalCount(value:number){
    this._totalCount=value
  }

  get count(){
    return this._count;
  }

  set count(value:number){
    this._count=value
  }

  get offset(){
    return this._offset;
  }

  set offset(value:number){
    this._offset = value;
  }

  constructor (
    private http : HttpClient
  ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    if (localStorage.getItem('offset')){
      this._offset = (localStorage.getItem('offset') ? parseInt(localStorage.getItem('offset')!) : 0);
      this._count = (localStorage.getItem('count') ? parseInt(localStorage.getItem('count')!) : 5);
    }
  }

  buscarGifs( query: string, offset: number ){

    //Controlar que la nueva busqueda no exista
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit', this._count.toString())
      .set('offset',  offset.toLocaleString())
      .set('q',query)
    this.http.get<SearchGifsResponse>(`${this._url}/search`,{ params })
      .subscribe( resp => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
        localStorage.setItem('current', query);
        localStorage.setItem('offset', offset.toString());

        if (offset === 0) {
          this._count = resp.pagination.count;
          this._totalCount = resp.pagination.total_count;
          this._offset = resp.pagination.offset;
        }
        localStorage.setItem('count', this._count.toString());
    })
  }
}
