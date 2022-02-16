import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
//import { map } from 'rxjs/operators'
import { OfertasService } from '../ofertas.service'
import { CarrinhoService } from '../carrinho.service'
import { Oferta } from './../shared/oferta.model'


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  /*private tempoObservableSubscription: Subscription
  private meuObservableTesteSubscription: Subscription*/
  
  public oferta: Oferta
  
  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(parametro => {      
      this.ofertasService.getOfertaPorId(parametro['id'])
      .subscribe(dados => {
        this.oferta = dados[0]
      })
    })
    /*let tempo = interval(2000)
    this.tempoObservableSubscription = tempo.subscribe(value => console.log(value))

    let meuObservableTeste = new Observable((observer: Observer<string>) => {
      observer.next('Primeiro evento da stream')
      observer.next('Segundo evento da stream')
      observer.complete()
    })

    this.meuObservableTesteSubscription = meuObservableTeste.subscribe({
      next(position) { console.log(position) },
      error(msg) { console.log(msg) },
      complete() { console.log('Evento completado') }
    })*/
  }

  ngOnDestroy(): void {
      /*this.tempoObservableSubscription.unsubscribe()
      this.meuObservableTesteSubscription.unsubscribe()*/
  }

  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta)
  }
}
