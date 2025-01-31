class UserProfile {
	firstName: string;
	lastName: string;
	name: string;
	email: string;
	password: string;

	constructor(
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.name = `${firstName} ${lastName}`;
		this.email = email;
		this.password = password;
	}

	getFullName() {
		return this.name;
	}
}

const user = new UserProfile('John', 'Doe', 'john.doe@example.com', 'password');
user.email = 'something@example.com';

const user2 = new UserProfile(
	'Jane',
	'Doe',
	'jane.doe@example.com',
	'password'
);

console.log(user.getFullName());
console.log(user2.getFullName());

export class PasswordUtility {
	/**
	 * Validate the password
	 * @param password - The password to validate
	 * @returns boolean
	 *
	 * @example
	 * const pu = new PasswordUtility();
	 * pu.validate('password');
	 */
	validate(password: string) {}

	/**
	 * Check the validity of the password
	 * @param password - The password to check
	 * @returns boolean
	 *
	 * @example
	 * const pu = new PasswordUtility();
	 * pu.checkValidity('password');
	 */
	checkValidity(password: string) {}

	/**
	 * Hash the password
	 * @param password - The password to hash
	 * @returns string
	 *
	 * @example
	 * const pu = new PasswordUtility();
	 * pu.hash('password');
	 */
	hash(password: string) {}

	/**
	 * Compare the password
	 * @param password - The password to compare
	 * @param hashedPassword - The hashed password
	 * @returns boolean
	 *
	 * @example
	 * const pu = new PasswordUtility();
	 * pu.comparePassword('password', 'hashedPassword');
	 */
	comparePassword(password: string, hashedPassword: string) {}

	/**
	 * Generate a strong password
	 * @param numberOfCharacters - The number of characters to generate
	 * @returns string
	 *
	 * @example
	 * const pu = new PasswordUtility();
	 * pu.generateStrongPassword(10);
	 */
	generateStrongPassword(numberOfCharacters: number) {}
}

class Auth {
	login(email: string, password: string) {}
	register(email: string, password: string) {}
	forgetPassword(email: string) {}
	resetPassword(email: string, password: string) {}
	logout() {}
	verification() {}
}

class Payment {
	constructor(public paymentMethod: string) {}
	pay(amount: number) {}
	refund(amount: number) {}
	cancel(amount: number) {}
}

class EmailService {
	sendEmail(email: string, subject: string, body: string) {}
	generateEmail(email: string, subject: string, body: string) {}
	htmlEmail(email: string, subject: string, body: string) {}
	textEmail(email: string, subject: string, body: string) {}
}

class Pagination {
	constructor(public page: number, public limit: number) {}
	getPage() {}
	getTotalPages() {}
	getTotalItems() {}
	getItems() {}
	nextPage() {}
	previousPage() {}
	firstPage() {}
	lastPage() {}
}
