import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model'

export class CarrinhoService {
    public itens: ItemCarrinho[] = []

    public getItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta: Oferta): void {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )

        let itemEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if (itemEncontrado) {
            itemEncontrado.quantidade += 1
        } else {
            this.itens.push(itemCarrinho)
        }
    }

    public totalCarrinhoCompra(): number {
        let total: number = 0
        this.itens.map((item: ItemCarrinho) => {
            total += (item.valor * item.quantidade)
        })

        return total
    }

    public adicionarQuantidade(id: number): void {
        this.alterarQuantidade(id, '+')
    }

    public diminuirQuantidade(id: number): void {
        this.alterarQuantidade(id, '-')
    }

    public limparCarrinho(): void {
        this.itens = []
    }

    private alterarQuantidade(id: number, operacao: string): void {
        let itemEncontrado = this.itens.find((item: ItemCarrinho) => item.id === id)
        if (operacao === '+') {
            itemEncontrado.quantidade += 1
        } else if (itemEncontrado.quantidade > 0) {
            itemEncontrado.quantidade -= 1
            if (itemEncontrado.quantidade === 0) {
                this.itens.splice(this.itens.indexOf(this.itens.find((item: ItemCarrinho) => item.id === id)), 1)
            }
        }
    }
}