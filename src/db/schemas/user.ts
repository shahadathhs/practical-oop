import {
	integer,
	pgEnum,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { BookTable } from './book';
import { relations } from 'drizzle-orm';

export const UserRole = pgEnum('user_roles', ['admin', 'user']);
export const UserStatus = pgEnum('user_status', ['active', 'inactive']);

export const UsersTable = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	password: varchar('password', { length: 255 }).notNull(),
	role: UserRole('role').default('user'),
	status: UserStatus('status').default('active'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type User = typeof UsersTable.$inferSelect;
export type NewUser = typeof UsersTable.$inferInsert;
export type UpdateUser = Partial<NewUser>;

export const UserRelations = relations(UsersTable, ({ many }) => ({
	books: many(BookTable),
}));
