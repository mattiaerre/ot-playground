export module Core {
	export class Person {
		fullName: string;

		constructor(public firstName, public lastName) {
			this.fullName = firstName + ' ' + lastName;
		}
	}
}