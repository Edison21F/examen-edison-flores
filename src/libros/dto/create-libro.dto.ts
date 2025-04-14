export class CreateLibroDto {
    titulo: string;
    autor: string;
    isbn: string;
    publicado: number;
    disponible: boolean = true;
}
