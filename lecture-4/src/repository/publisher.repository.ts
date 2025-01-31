import { BaseRepository } from '@/lib/core/BaseRepository';
import { PublisherTable } from '@/db/schemas/book';

export class PublisherRepository extends BaseRepository<
	typeof PublisherTable
> {}
