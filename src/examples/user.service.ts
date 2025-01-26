import { UpdateUser } from '@/db/schemas';
import { NewUser } from '@/db/schemas';
import { FindOptions, UserRepository } from './user.repository';

export class UserService {
	constructor(private readonly repository: UserRepository) {}

	async findAll(options?: FindOptions) {
		// add some logic here
		return this.repository.findAll(options);
	}

	async findById(id: string) {
		// add some logic here
		return this.repository.findById(id);
	}

	async search(options: FindOptions & { query: string }) {
		// add some logic here
		return this.repository.search(options);
	}

	async create(data: NewUser) {
		// add some logic here
		return this.repository.create(data);
	}

	async update(id: string, data: UpdateUser) {
		// add some logic here
		return this.repository.update(id, data);
	}

	async delete(id: string) {
		// add some logic here
		return this.repository.delete(id);
	}
}
