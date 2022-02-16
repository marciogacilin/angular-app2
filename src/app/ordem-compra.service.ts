import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"
import { Pedido } from "./shared/pedido.model"

@Injectable()
export class OrdermCompraService {
    constructor(private http: HttpClient) {}
    
    public efetivarCompra(pedido: Pedido): Observable<any> {
        let headers = new HttpHeaders()
        headers.append('Content-type','application/json')
        let options = {
            headers: headers
        }
        return this.http.post(
            `${environment.urlApi}/pedidos`,
            pedido,
            options
        )
    }
}