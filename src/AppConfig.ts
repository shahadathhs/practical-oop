interface DatabaseConfig {
	url: string;
	name?: string;
	poolSize?: number;
}

interface SecurityConfig {
	jwtSecret: string;
	corsOrigins: string[];
	allowedHosts?: string[];
}

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface ServerConfig {
	port: number;
	apiUrl: string;
	logLevel: LogLevel;
}

interface AppConfigOptions {
	database: DatabaseConfig;
	security: SecurityConfig;
	server: ServerConfig;
}

const requiredEnvVars = [
	'JWT_SECRET',
	'DATABASE_URL',
	'DATABASE_NAME',
	'DATABASE_POOL_SIZE',
	'PORT',
];

type Environment = 'development' | 'staging' | 'production';

export class AppConfig {
	private static instance: AppConfig;
	private readonly config: AppConfigOptions;

	private constructor() {
		this.config = this.loadOptions();
	}

	static getInstance(): AppConfig {
		if (!AppConfig.instance) {
			AppConfig.instance = new AppConfig();
		}
		return AppConfig.instance;
	}

	private loadOptions(): AppConfigOptions {
		this.validateRequiredEnvVars();
		return {
			database: {
				url: this.getEnv('DATABASE_URL', true),
				name: this.getEnv('DATABASE_NAME', true),
				poolSize: parseInt(this.getEnv('DATABASE_POOL_SIZE', true)),
			},
			security: {
				jwtSecret: this.getEnv('JWT_SECRET', true),
				corsOrigins: this.parseCorsOrigins(),
				allowedHosts: this.parseAllowedHosts(),
			},
			server: {
				port: parseInt(this.getEnv('PORT')),
				apiUrl: this.getEnv('API_URL'),
				logLevel: this.parseLogLevel(),
			},
		};
	}

	private validateRequiredEnvVars(): void {
		const missingVars = requiredEnvVars.filter(
			(varName) => !process.env[varName]
		);

		if (missingVars.length > 0) {
			throw new Error(
				`Missing required environment variables: ${missingVars.join(', ')}`
			);
		}
	}

	getEnv(name: string, required: boolean = false): string {
		const value = process.env[name];
		if (required === true && !value) {
			throw new Error(`Required environment variable ${name} is not set`);
		}
		return value || '';
	}

	private parseCorsOrigins(): string[] {
		const origins = this.getEnv('CORS_ORIGINS') || '*';
		return origins === '*'
			? ['*']
			: origins.split(',').map((origin) => origin.trim());
	}

	private parseAllowedHosts(): string[] {
		const hosts = this.getEnv('ALLOWED_HOSTS');
		return hosts ? hosts.split(',').map((host) => host.trim()) : [];
	}

	private parseLogLevel(): LogLevel {
		const level = (this.getEnv('LOG_LEVEL') || 'debug') as LogLevel;
		const validLevels = ['debug', 'info', 'warn', 'error'];

		if (!validLevels.includes(level)) {
			return 'info';
		}

		return level as LogLevel;
	}

	get environment(): Environment {
		return (this.getEnv('NODE_ENV') || 'development') as Environment;
	}

	get isDevelopment(): boolean {
		return this.environment === 'development';
	}

	get isStaging(): boolean {
		return this.environment === 'staging';
	}

	get isProduction(): boolean {
		return this.environment === 'production';
	}

	get database(): DatabaseConfig {
		return this.config.database;
	}

	get security(): SecurityConfig {
		return this.config.security;
	}

	get server(): ServerConfig {
		return this.config.server;
	}
}
