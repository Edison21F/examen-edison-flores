export interface Libro {
    id: string; // Cambiado a string para ser único
    titulo: string; // Requerido, mínimo 3 caracteres
    autor: string; // Requerido, mínimo 3 caracteres
    isbn: string; // Requerido, debe seguir el formato ISBN-13
    publicado: number; // Año de publicación, entre 1900 y el año actual
    disponible: boolean; // Por defecto: true
}
