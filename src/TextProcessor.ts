import { ConsoleTransport, FileTransport, Logger } from './Logger';

export class TextProcessor {
	constructor(private text: string) {}

	// Instance method: Truncate with ellipsis
	truncate(maxLength: number): TextProcessor {
		this.text =
			this.text.length > maxLength
				? `${this.text.substring(0, maxLength - 3)}...`
				: this.text;
		return this;
	}

	// Instance method: Sanitize HTML
	sanitizeHTML(): TextProcessor {
		this.text = this.text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return this;
	}

	// Instance method: Capitalize first letter of each word
	capitalizeWords(): TextProcessor {
		this.text = this.text.replace(/\b\w/g, (char) => char.toUpperCase());
		return this;
	}

	// Instance method: Remove extra whitespace
	normalizeWhitespace(): TextProcessor {
		this.text = this.text.replace(/\s+/g, ' ').trim();
		return this;
	}

	// Get the final processed value
	value(): string {
		return this.text;
	}

	// Static method: Count words
	static wordCount(text: string): number {
		return text.trim().split(/\s+/).length;
	}

	// Static method: Validate email format
	static isValidEmail(email: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	// Static method: Extract hashtags
	static extractHashtags(text: string): string[] {
		const matches = text.match(/#[a-zA-Z0-9_]+/g);
		return matches ? matches : [];
	}

	// Static method: Extract mentions
	static extractMentions(text: string): string[] {
		const matches = text.match(/@[a-zA-Z0-9_]+/g);
		return matches ? matches : [];
	}

	// Static method: Generate URL slug
	static toSlug(text: string): string {
		return text
			.toLowerCase()
			.replace(/[^a-z0-9]/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '');
	}

	// Static method: Validate URL format
	static isValidURL(url: string): boolean {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	}

	// Static method: Generate random string
	static generateRandomString(length: number): string {
		const chars =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		return Array.from(
			{ length },
			() => chars[Math.floor(Math.random() * chars.length)]
		).join('');
	}
}

// Usage
const comment =
	'<script>alert("hi")</script>Too long comment here #example #test @user';
const textProcessor = new TextProcessor(comment);

// const text = textProcessor
// 	.sanitizeHTML()
// 	.normalizeWhitespace()
// 	.truncate(30)
// 	.capitalizeWords()
// 	.value();

// console.log(text);

const logger = new Logger('TextProcessor');
logger.addTransport(new ConsoleTransport());
logger.addTransport(new FileTransport('logs.txt'));

logger.info(TextProcessor.extractHashtags(comment).toString());
logger.info(TextProcessor.extractMentions(comment).toString());
logger.info(TextProcessor.toSlug('Practical OOP - Build Your Own Library'));
logger.info(TextProcessor.isValidURL('https://stacklearner.com').toString());
logger.info(TextProcessor.wordCount(comment).toString());
logger.info(TextProcessor.isValidEmail('test@example.com').toString());

const title = new TextProcessor('practical OOP - build your own Framework     ')
	.normalizeWhitespace()
	.capitalizeWords()
	.value();
console.log(title, TextProcessor.wordCount(title));
console.log('Slug: ', TextProcessor.toSlug(title));
