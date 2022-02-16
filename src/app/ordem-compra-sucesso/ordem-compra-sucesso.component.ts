import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordem-compra-sucesso',
  templateUrl: './ordem-compra-sucesso.component.html',
  styleUrls: ['./ordem-compra-sucesso.component.css']
})
export class OrdemCompraSucessoComponent implements OnInit {

  @Input() public idPedidoCompra: number
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public novaOrdemCompra(): void {
    this.router.navigate(['/ordem-compra'])
  }
}
