import { BaseRepository } from '@/lib/core/BaseRepository';
import { BookGenreTable } from '@/db/schemas/book';

export class GenreRepository extends BaseRepository<typeof BookGenreTable> {}
