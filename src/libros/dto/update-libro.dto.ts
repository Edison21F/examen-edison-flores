import { PartialType } from '@nestjs/mapped-types';
import { CreateLibroDto } from './create-libro.dto';

export class UpdateLibroDto extends PartialType(CreateLibroDto) {
    titulo?: string;
    autor?: string;
    isbn?: string;
    publicado?: number;
    disponible?: boolean;
}
