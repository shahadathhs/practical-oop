import { BookGenreTable } from '@/db/schemas';
import { GenreRepository } from '@/repository/genre.repository';
import { BaseService } from '@/lib/core/BaseService';

export class GenreService extends BaseService<
	typeof BookGenreTable,
	GenreRepository
> {}
