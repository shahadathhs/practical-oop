import { PublisherTable } from '@/db/schemas';
import { PublisherRepository } from '@/repository/publisher.repository';
import { BaseService } from '@/lib/core/BaseService';

export class PublisherService extends BaseService<
	typeof PublisherTable,
	PublisherRepository
> {}
