import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './libros.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LibrosService {
  private libros: Libro[] = [
    {
      id: '1',
      titulo: 'El principito',
      autor: 'Antoine de Saint-Exupéry',
      isbn: '978-3-16-148410-0',
      publicado: 1943,
      disponible: true,
    },
    {
      id: '2',
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      isbn: '978-3-16-148410-1',
      publicado: 1967,
      disponible: false,
    },
    {
      id: '3',
      titulo: '1984',
      autor: 'George Orwell',
      isbn: '978-3-16-148410-2',
      publicado: 1949,
      disponible: true,
    }
  ];

  create(createLibroDto: CreateLibroDto) {
    try {
      // Validar que todos los campos requeridos estén presentes
      if (!createLibroDto.titulo || !createLibroDto.autor || !createLibroDto.isbn || !createLibroDto.publicado) {
        throw new BadRequestException('El libro debe tener los siguientes campos: titulo, autor, isbn y publicado');
      }

      // Validar que el título y autor tengan al menos 3 caracteres
      if (createLibroDto.titulo.length < 3) {
        throw new BadRequestException('El título debe tener al menos 3 caracteres');
      }

      if (createLibroDto.autor.length < 3) {
        throw new BadRequestException('El autor debe tener al menos 3 caracteres');
      }

      // Validar formato ISBN-13
      const isbnRegex = /^(?:\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,7}-?\d)$/;
      if (!isbnRegex.test(createLibroDto.isbn)) {
        throw new BadRequestException('El ISBN debe seguir el formato ISBN-13');
      }

      // Validar año de publicación
      const añoActual = new Date().getFullYear();
      if (createLibroDto.publicado < 1900 || createLibroDto.publicado > añoActual) {
        throw new BadRequestException(`El año de publicación debe estar entre 1900 y ${añoActual}`);
      }

      // Crear nuevo libro con ID único
      const nuevoLibro: Libro = {
        id: uuidv4(), 
        titulo: createLibroDto.titulo,
        autor: createLibroDto.autor,
        isbn: createLibroDto.isbn,
        publicado: createLibroDto.publicado,
        disponible: true, 
      };

      this.libros.push(nuevoLibro);
      return nuevoLibro;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al crear el libro: ' + error.message);
    }
  }

  findAll() {
    if (this.libros.length === 0) {
      throw new NotFoundException('No hay libros disponibles');
    }
    return this.libros;
  }

  findOne(id: string) {
    const libro = this.libros.find(libro => libro.id === id);
    if (!libro) {
      throw new NotFoundException(`Libro con id ${id} no encontrado`);
    }
    return libro;
  }

  update(id: string, updateLibroDto: UpdateLibroDto) {
    const libroIndex = this.libros.findIndex(libro => libro.id === id);
    if (libroIndex === -1) {
      throw new NotFoundException(`Libro con id ${id} no encontrado`);
    }

    const libroActual = this.libros[libroIndex];
    const libroActualizado = { ...libroActual };

    try {
      // Validar que al menos un campo sea actualizado
      if (updateLibroDto.titulo !== undefined) {
        if (updateLibroDto.titulo.length < 3) {
          throw new BadRequestException('El título debe tener al menos 3 caracteres');
        }
        libroActualizado.titulo = updateLibroDto.titulo;
      }

      if (updateLibroDto.autor !== undefined) {
        if (updateLibroDto.autor.length < 3) {
          throw new BadRequestException('El autor debe tener al menos 3 caracteres');
        }
        libroActualizado.autor = updateLibroDto.autor;
      }

      if (updateLibroDto.isbn !== undefined) {
        const isbnRegex = /^(?:\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,7}-?\d)$/;
        if (!isbnRegex.test(updateLibroDto.isbn)) {
          throw new BadRequestException('El ISBN debe seguir el formato ISBN-13');
        }
        libroActualizado.isbn = updateLibroDto.isbn;
      }

      if (updateLibroDto.publicado !== undefined) {
        const añoActual = new Date().getFullYear();
        if (updateLibroDto.publicado < 1900 || updateLibroDto.publicado > añoActual) {
          throw new BadRequestException(`El año de publicación debe estar entre 1900 y ${añoActual}`);
        }
        libroActualizado.publicado = updateLibroDto.publicado;
      }

      if (updateLibroDto.disponible !== undefined) {
        libroActualizado.disponible = updateLibroDto.disponible;
      }

      this.libros[libroIndex] = libroActualizado;
      return libroActualizado;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar el libro: ' + error.message);
    }
  }

  remove(id: string) {
    const libroIndex = this.libros.findIndex(libro => libro.id === id);
    if (libroIndex === -1) {
      throw new NotFoundException(`Libro con id ${id} no encontrado`);
    }
    this.libros.splice(libroIndex, 1);
    return { mensaje: `Libro con id ${id} eliminado correctamente` };
  }
}