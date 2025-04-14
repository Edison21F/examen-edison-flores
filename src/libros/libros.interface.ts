export interface Libro {
    id: string; // Cambiado a string para ser único
    titulo: string; // Requerido, mínimo 3 caracteres
    autor: string; // Requerido, mínimo 3 caracteres
    isbn: string; // Requerido, debe seguir el formato ISBN-13
    publicado: number; // Año de publicación, entre 1900 y el año actual
    disponible: boolean; // Por defecto: true
}

// Validador para asegurar que se cumplan los requisitos
export class ValidadorLibro {
    static validar(libro: Libro): boolean {
        // Validación del título
        if (!libro.titulo || libro.titulo.length < 3) {
            throw new Error("El título es requerido y debe tener al menos 3 caracteres");
        }
        
        // Validación del autor
        if (!libro.autor || libro.autor.length < 3) {
            throw new Error("El autor es requerido y debe tener al menos 3 caracteres");
        }
        
        // Validación del ISBN (formato ISBN-13)
        const isbnRegex = /^(?:\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,7}-?\d)$/;
        if (!libro.isbn || !isbnRegex.test(libro.isbn)) {
            throw new Error("El ISBN es requerido y debe seguir el formato ISBN-13");
        }
        
        // Validación del año de publicación
        const añoActual = new Date().getFullYear();
        if (!libro.publicado || libro.publicado < 1900 || libro.publicado > añoActual) {
            throw new Error(`El año de publicación debe estar entre 1900 y ${añoActual}`);
        }
        
        return true;
    }
    
    // Función para crear un nuevo libro con valores predeterminados
    static crearLibro(datos: Omit<Libro, 'id' | 'disponible'> & { id?: string, disponible?: boolean }): Libro {
        const libro: Libro = {
            id: datos.id || crypto.randomUUID(), // Genera un ID único si no se proporciona
            titulo: datos.titulo,
            autor: datos.autor,
            isbn: datos.isbn,
            publicado: datos.publicado,
            disponible: datos.disponible !== undefined ? datos.disponible : true // Por defecto es true
        };
        
        // Validar el libro antes de devolverlo
        this.validar(libro);
        
        return libro;
    }
}