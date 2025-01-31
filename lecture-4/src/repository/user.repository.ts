import { BaseRepository } from '@/lib/core/BaseRepository';
import { UsersTable } from '@/db/schemas/user';

export class UserRepository extends BaseRepository<typeof UsersTable> {}
