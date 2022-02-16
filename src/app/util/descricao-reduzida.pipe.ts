import { PipeTransform, Pipe } from "@angular/core"

@Pipe({ name: 'descricaoReduzida' })
export class DescricaoReduzida implements PipeTransform {
    transform(value: string, truncarEm: number) {
        if (value.length > truncarEm) {
            return `${value.substring(0, truncarEm)}...`
        }

        return value
    }
}