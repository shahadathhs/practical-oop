import { UpdateUserSchema } from '@/db/schemas/user';
import { FilterRuleGroup } from '@/lib/core/FilterBuilder';
import { FindOptionsSchema } from '@/lib/core/IBaseRepository';
import { UserService } from '@/services/user.service';
import { Request, Response } from 'express';

export class UserController {
	constructor(private readonly service: UserService) {}

	async findAll(req: Request, res: Response) {
		const parsedQuery = FindOptionsSchema.safeParse(req.query);
		if (!parsedQuery.success) {
			return res.status(400).json({ message: 'Invalid query' });
		}

		const users = await this.service.findAll(parsedQuery.data);
		res.json(users);
	}

	async findById(req: Request, res: Response) {
		const user = await this.service.findById(req.params.id);
		res.json(user);
	}

	async search(req: Request, res: Response) {
		const { query = '' } = req.query;
		const where: FilterRuleGroup = {
			combinator: 'or',
			rules: [
				{
					field: 'name',
					operator: 'contains',
					value: query,
				},
				{
					field: 'email',
					operator: 'contains',
					value: query,
				},
				{
					field: 'id',
					operator: '=',
					value: query,
				},
			],
		};

		const users = await this.service.findAll({ where });
		res.json(users);
	}

	async create(req: Request, res: Response) {
		const user = await this.service.create(req.body);
		res.json(user);
	}

	async update(req: Request, res: Response) {
		const parsedBody = UpdateUserSchema.safeParse(req.body);

		if (!parsedBody.success) {
			return res.status(400).json({ message: 'Invalid body' });
		}

		const user = await this.service.update(req.params.id, parsedBody.data);
		res.json(user);
	}

	async delete(req: Request, res: Response) {
		await this.service.delete(req.params.id);
		res.status(204).send();
	}
}
