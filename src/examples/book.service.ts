import { NewBook, UpdateBook } from '@/db/schemas';
import { FindOptions, BookRepository } from './book.repository';

export class BookService {
	constructor(private readonly repository: BookRepository) {}

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

	async create(data: NewBook) {
		// add some logic here
		return this.repository.create(data);
	}

	async update(id: string, data: UpdateBook) {
		// add some logic here
		return this.repository.update(id, data);
	}

	async delete(id: string) {
		// add some logic here
		return this.repository.delete(id);
	}
}
