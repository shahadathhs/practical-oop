class AppConfig {
	private static instance: AppConfig;
	private constructor(public apiUrl: string) {}

	// Singleton pattern (static method)
	static getInstance(): AppConfig {
		if (!AppConfig.instance) {
			console.log('Creating a new instance');
			AppConfig.instance = new AppConfig('https://api.example.com');
		}
		console.log('Getting the old instance');
		return AppConfig.instance;
	}

	// Static utility
	static isProduction(): boolean {
		return process.env.NODE_ENV === 'production';
	}

	static isDevelopment(): boolean {
		return process.env.NODE_ENV !== 'production';
	}
}

// Usage
const config = AppConfig.getInstance();
if (AppConfig.isDevelopment()) {
	console.log('Development mode enabled');
}

const config2 = AppConfig.getInstance();
const config3 = AppConfig.getInstance();
const config4 = AppConfig.getInstance();
console.log(config2 === config3);
console.log(AppConfig.getInstance().apiUrl);
