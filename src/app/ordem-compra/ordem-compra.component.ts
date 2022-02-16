import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { OrdermCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { CarrinhoService } from '../carrinho.service'
import { ItemCarrinho } from '../shared/item-carrinho.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdermCompraService ]
})
export class OrdemCompraComponent implements OnInit {
  
  public idPedidoCompra: number

  public itensCarrinho: ItemCarrinho[] = []
  
  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })
  
  constructor(
    private ordemCompraService: OrdermCompraService,
    public carrinhoService: CarrinhoService
    ) { }

  ngOnInit() { 
    this.itensCarrinho = this.carrinhoService.getItens()
  }

  public confirmarCompra(): void {
    if (this.carrinhoService.getItens().length === 0) {
      alert('Você não selecionou nenhum item!')
    } else {
      let pedido: Pedido = new Pedido()
      pedido.endereco = this.formulario.value.endereco
      pedido.complemento = this.formulario.value.complemento
      pedido.numero = this.formulario.value.numero
      pedido.formaPagamento = this.formulario.value.formaPagamento
      pedido.itens = this.carrinhoService.getItens()

      this.ordemCompraService.efetivarCompra(pedido)
        .subscribe(retorno => {
          this.idPedidoCompra = retorno.id
          this.carrinhoService.limparCarrinho()
        })
    }
  }

  public adicionar(id: number): void {
    this.carrinhoService.adicionarQuantidade(id)
  }

  public diminuir(id: number): void {
    this.carrinhoService.diminuirQuantidade(id)
  }
}
