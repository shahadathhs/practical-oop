import { FilterRuleGroup } from '@/lib/core/FilterBuilder';
import { FindOptionsSchema } from '@/lib/core/IBaseRepository';
import { BookService } from '@/services/book.service';
import { Request, Response } from 'express';
import { Logger } from '@/lib/Logger';
import { Cache } from '@/lib/Cache';

export class BookController {
	constructor(
		private readonly service: BookService,
		private readonly logger: Logger,
		private readonly cache: Cache
	) {}

	async findAll(req: Request, res: Response) {
		const parsedQuery = FindOptionsSchema.safeParse(req.query);
		if (!parsedQuery.success) {
			this.logger.error('Invalid query');
			return res.status(400).json({ message: 'Invalid query' });
		}

		if (this.cache.get('books')) {
			this.logger.log('Returning cached books');
			return res.status(200).json(this.cache.get('books'));
		}

		const books = await this.service.findAll(parsedQuery.data);
		this.logger.log(`Found ${books.length} books`);
		this.cache.set('books', books);
		res.status(200).json(books);
	}

	async findById(req: Request, res: Response) {
		const { id } = req.params;
		const book = await this.service.findById(id);
		res.status(200).json(book);
	}

	async search(req: Request, res: Response) {
		const { query = '' } = req.query;
		const where: FilterRuleGroup = {
			combinator: 'or',
			rules: [
				{
					field: 'title',
					operator: 'contains',
					value: query,
				},
				{
					field: 'summary',
					operator: 'contains',
					value: query,
				},
			],
		};

		const books = await this.service.findAll({ where: where });
		res.status(200).json(books);
	}

	async create(req: Request, res: Response) {
		const book = await this.service.create(req.body);
		res.status(201).json(book);
	}

	async update(req: Request, res: Response) {
		const book = await this.service.update(req.params.id, req.body);
		res.status(200).json(book);
	}

	async delete(req: Request, res: Response) {
		await this.service.delete(req.params.id);
		res.status(204).send();
	}
}
