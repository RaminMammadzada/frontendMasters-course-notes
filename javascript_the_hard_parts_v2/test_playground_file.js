// const user3 = Object.create(null);
// user3.name = 'Eva';
// user3.score = 9;
// user3.increment = function () {
// 	user3.score++;
// };

// console.log(user3);

function userCreator(name, score) {
	const newUser = Object.create(userFunctionStore);
	newUser.name = name;
	newUser.score = score;
	return newUser;
}
const userFunctionStore = {
	increment: function () {
		this.score++;
	},
	login: function () {
		console.log('Logged in');
	}
};
const user1 = userCreator('Will', 3);
console.log(user1);

const user2 = userCreator('Tim', 5);

user1.increment();
console.log(user1);
console.log(user1.__proto__);
