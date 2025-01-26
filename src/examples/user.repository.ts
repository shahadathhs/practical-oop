import { NewUser, UpdateUser, UsersTable } from '@/db/schemas';
import db from '../db/connect';
import { PgColumn } from 'drizzle-orm/pg-core';
import { asc, Column, desc, eq, ilike, or } from 'drizzle-orm';

export type FindOptions = {
	page?: number;
	limit?: number;
	orderBy?: string;
	orderDirection?: 'asc' | 'desc';
};

export class UserRepository {
	private readonly db = db;
	private readonly table = UsersTable;

	findAll(options?: FindOptions) {
		const page = options?.page ?? 1;
		const limit = options?.limit ?? 10;
		const orderBy = options?.orderBy ?? 'createdAt';
		const orderDirection = options?.orderDirection ?? 'desc';

		const orderByColumn = this.table[
			orderBy as keyof typeof this.table
		] as PgColumn;

		if (!orderByColumn) {
			throw new Error(`Invalid order by column: ${orderBy}`);
		}

		const users = this.db.query.UsersTable.findMany({
			limit,
			offset: (page - 1) * limit,
			orderBy:
				orderDirection === 'asc' ? asc(orderByColumn) : desc(orderByColumn),
		});

		return users;
	}

	findById(id: string) {
		return this.db.query.UsersTable.findFirst({
			where: eq(this.table.id, id),
		});
	}

	findByEmail(email: string) {
		return this.db.query.UsersTable.findFirst({
			where: eq(this.table.email, email),
		});
	}

	search(options: FindOptions & { query: string }) {
		const page = options?.page ?? 1;
		const limit = options?.limit ?? 10;
		const orderBy = options?.orderBy ?? 'createdAt';
		const orderDirection = options?.orderDirection ?? 'desc';

		const orderByColumn = this.table[
			orderBy as keyof typeof this.table
		] as PgColumn;

		const users = this.db.query.UsersTable.findMany({
			where: or(
				ilike(this.table.email, `%${options.query}%`),
				ilike(this.table.name, `%${options.query}%`)
			),
			limit,
			offset: (page - 1) * limit,
			orderBy:
				orderDirection === 'asc' ? asc(orderByColumn) : desc(orderByColumn),
		});

		return users;
	}

	create(data: NewUser) {
		return this.db.insert(this.table).values(data);
	}

	update(id: string, data: UpdateUser) {
		return this.db.update(this.table).set(data).where(eq(this.table.id, id));
	}

	delete(id: string) {
		return this.db.delete(this.table).where(eq(this.table.id, id));
	}
}
