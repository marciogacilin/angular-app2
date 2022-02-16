import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Oferta } from "./shared/oferta.model"
import { environment } from "src/environments/environment"
import { ComoUsar } from "./shared/como-usar.model"
import { OndeFica } from "./shared/onde-fica.model"

@Injectable()
export class OfertasService {
    constructor(private http: HttpClient){}
    
    public getOfertas(): Observable<Oferta[]> {
        return this.http.get<Oferta[]>(`${environment.urlApi}/ofertas`)
    }

	public getOfertasPorCategoria(categoria: string): Observable<Oferta[]> {
		return this.http.get<Oferta[]>(`${environment.urlApi}/ofertas?categoria=${categoria}`)
	}

	public getOfertaPorId(id: number): Observable<Oferta> {
		return this.http.get<Oferta>(`${environment.urlApi}/ofertas?id=${id}`)
	}

	public getComoUsarPorId(id: number): Observable<ComoUsar> {
		return this.http.get<ComoUsar>(`${environment.urlApi}/como-usar?id=${id}`)
	}

	public getOndeFicaPorId(id: number): Observable<OndeFica> {
		return this.http.get<OndeFica>(`${environment.urlApi}/onde-fica?id=${id}`)
	}

	public pesquisarOfertas(termo: string): Observable<Oferta[]> {
		/*return this.http.get(`${environment.urlApi}/ofertas?descricao_oferta_like=${termo}`)
			.pipe(map((resposta: any) => resposta.json()))*/
		return this.http.get<Oferta[]>(`${environment.urlApi}/ofertas?descricao_oferta_like=${termo}`)
	}
}