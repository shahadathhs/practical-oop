import { SQLWrapper } from 'drizzle-orm';
import { PgColumn, PgTable } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { FilterRuleGroupSchema, OrderDirection } from './FilterBuilder';

export type ID = string | number;

export type OrderDirection = 'asc' | 'desc';

export type FindOptionsSQL = {
	where?: SQLWrapper;
	limit?: number;
	offset?: number;
	orderBy?: {
		column: PgColumn;
		direction: OrderDirection;
	}[];
};

export const FindOptionsSchema = z
	.object({
		where: FilterRuleGroupSchema,
		limit: z.number().default(10),
		offset: z.number().default(0),
		orderBy: z.array(
			z.object({
				column: z.string(),
				direction: z.enum(OrderDirection),
			})
		),
	})
	.partial();

export type FindOptions = z.infer<typeof FindOptionsSchema>;

export interface IBaseRepository<TTable extends PgTable & { id: SQLWrapper }> {
	// Queries
	findAll(options?: FindOptionsSQL): Promise<TTable['$inferSelect'][]>;
	findById(id: ID): Promise<TTable['$inferSelect'] | null>;
	findOne(where: SQLWrapper): Promise<TTable['$inferSelect'] | null>;
	findAndCount(
		options?: FindOptionsSQL
	): Promise<[TTable['$inferSelect'][], number]>;

	count(where?: SQLWrapper): Promise<number>;
	checkExists(where: SQLWrapper): Promise<boolean>;

	// Mutations: Create
	create(data: TTable['$inferInsert']): Promise<TTable['$inferSelect']>;
	createMany(data: TTable['$inferInsert'][]): Promise<TTable['$inferSelect'][]>;

	// Mutations: Update
	update(
		id: ID,
		data: Partial<TTable['$inferInsert']>
	): Promise<TTable['$inferSelect'] | null>;
	updateMany(
		data: (Partial<TTable['$inferInsert']> & { id: ID })[]
	): Promise<TTable['$inferSelect'][]>;

	// Mutations: Delete
	delete(id: ID): Promise<void>;
	deleteMany(ids: ID[]): Promise<void>;
}
