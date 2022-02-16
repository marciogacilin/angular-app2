import { Oferta } from './../shared/oferta.model'
import { Component, OnInit } from '@angular/core'
import { Subject, Observable, of } from 'rxjs'
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'
import { OfertasService } from '../ofertas.service'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  private subjectPesquisa: Subject<string> = new Subject<string>()
  public ofertas: Observable<Oferta[]>
  
  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa  
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        if (termo.trim() === '') {
          return of<Oferta[]>([])
        }
        return this.ofertasService.pesquisarOfertas(termo) 
      }),
      catchError((err: any) => {
        return of<Oferta[]>([])
      })
    )

    /*this.ofertasObservable.subscribe((ofertas: Oferta[]) => {
      this.ofertas = ofertas
    })*/
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limparPesquisa(): void {
    this.subjectPesquisa.next('')
  }
}
