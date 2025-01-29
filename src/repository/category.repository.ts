import { BaseRepository } from '@/lib/core/BaseRepository';
import { CategoryTable } from '@/db/schemas/category';

export class CategoryRepository extends BaseRepository<typeof CategoryTable> {}
