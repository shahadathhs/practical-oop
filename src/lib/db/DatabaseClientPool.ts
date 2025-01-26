import { Pool } from 'pg';
import {
	DatabaseConfig,
	DrizzleClient,
	IDatabaseClient,
} from './IDatabaseClient';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/db/schemas';

export class DatabaseClientPool implements IDatabaseClient {
	private readonly pool: Pool;
	private readonly client: DrizzleClient;
	private connected: boolean = false;

	constructor(config: DatabaseConfig) {
		this.pool = new Pool({
			connectionString: config.url,
			max: config.maxConnections ?? 1,
			idleTimeoutMillis: config.idleTimeout ?? 10000,
			connectionTimeoutMillis: config.connectTimeout ?? 10000,
			maxUses: config.maxUses ?? 1000,
			ssl: config.ssl ?? false,
		});
		this.client = drizzle({ client: this.pool, schema });
	}

	isConnected(): boolean {
		return this.connected;
	}

	async connect(): Promise<void> {
		if (this.connected) return;
		await this.pool.connect();
		this.connected = true;
		console.log('Database client connected');
	}

	async disconnect(): Promise<void> {
		await this.pool.end();
		this.connected = false;
		console.log('Database client disconnected');
	}

	getClient(): DrizzleClient {
		return this.client;
	}

	async executeQuery<T>(
		label: string,
		queryFn: (db: DrizzleClient) => Promise<T>
	): Promise<T> {
		const start = performance.now();
		try {
			const result = await queryFn(this.client);
			const duration = performance.now() - start;
			console.log(`[${label}] Query executed in ${duration.toFixed(3)}ms`);
			return result as T;
		} catch (error) {
			const duration = Date.now() - start;
			console.error(`[${label}] Query failed after ${duration}ms:`, error);
			throw new Error(`[${label}] Query failed after ${duration}ms: ${error}`);
		}
	}
}
