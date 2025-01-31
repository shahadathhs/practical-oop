import { DateTimeHelper } from './DateTimeHelper';

// Abstraction
interface LogTransport {
	log(message: string): void;
}

// Concrete Implementations
export class ConsoleTransport implements LogTransport {
	log(message: string) {
		console.log(message);
	}
}

export class FileTransport implements LogTransport {
	constructor(private filePath: string) {}

	log(message: string) {
		// Simulated file write
		console.log(`[File] Writing to ${this.filePath}: ${message}`);
	}
}

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

// Main Logger Class
export class Logger {
	private transports: LogTransport[] = [];
	private logLevel: LogLevel = 'info';

	constructor(private context: string) {}

	addTransport(transport: LogTransport): void {
		this.transports.push(transport);
	}

	setLogLevel(level: 'info' | 'warn' | 'error'): void {
		this.logLevel = level;
	}

	private shouldLog(level: LogLevel): boolean {
		const levels = ['error', 'debug', 'warn', 'info'];
		return levels.indexOf(level) <= levels.indexOf(this.logLevel);
	}

	private formatMessage(level: string, message: string): string {
		const dateTimeHelper = new DateTimeHelper();
		const formattedDate = dateTimeHelper.format('YYYY-MM-DD HH:mm:ss');

		return `[${formattedDate}] [${this.context}] [${level}] ${message}`;
	}

	info(message: string): void {
		if (this.shouldLog('info')) {
			const formatted = this.formatMessage('INFO', message);
			this.transports.forEach((t) => t.log(formatted));
		}
	}

	error(message: string): void {
		if (this.shouldLog('error')) {
			const formatted = this.formatMessage('ERROR', message);
			this.transports.forEach((t) => t.log(formatted));
		}
	}
}
