import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { OfertasService } from 'src/app/ofertas.service'

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = ''
  
  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe(parametro => {
      this.ofertasService.getComoUsarPorId(parametro['id'])
      .subscribe((objeto) => {
        this.comoUsar = objeto[0].descricao
      })
    })
  }

}
