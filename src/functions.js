const axios = require('axios');

// some functions to work with in functions.test.js
// typically you import functions from around your app into functions.test.js, or whatever you're naming the file
  // these functions need to have the export keyword in front of them in order to import elsewhere

module.exports = {
  add: ( num1, num2 ) => num1 + num2,
  subtract: ( num1, num2 ) => num1 - num2,
  multiply: ( num1, num2 ) => num1 * num2,
  divide: ( num1, num2 ) => num1 / num2,
  sayHello: () => 'hello',
  fetchUser: async () => {
    const user = await axios.get('https://jsonplaceholder.typicode.com/users/1')
      .catch(err => console.log(err))
    return user.data
  }
}
