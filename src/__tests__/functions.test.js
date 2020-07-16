const { sum, add, subtract, multiply, divide, sayHello, fetchUser } = require('../functions')

// methods & matchers https://jestjs.io/docs/en/expect
    
// NOTE: test and describe are two "globals" that we can use without importing

// // INDIVIDUAL TESTS

// TO BE - RETURN NUMBER EXAMPLE
test('sum() should add two numbers', () => { // test method takes two arguments: the first is a description, the second is a callback storing the test logic
  
  expect(sum(1, 2)).toBe(3);
});

// TO BE A NUMBER - RETURN NUMBER EXAMPLE
test('sum() should return a number', () => {
  expect(sum(1, 2)).not.toBeNaN();
});



// REFERENCE TYPES AND TOBE VS TOEQUAL
test('Reference Types are special', () => {
  // TOBE WILL FAIL (REFERENCE TYPES ARE SPECIAL)
    // https://jestjs.io/docs/en/expect#tobevalue
  expect([12]).toEqual([12]);
});



// TO BE - RETURN STRING EXAMPLE
test('sayHello() should return hello', () => {
  expect(sayHello()).toBe('hello');
});

// NOT TO BE - RETURN STRING EXAMPLE
test('sayHello() should not return goodbye', () => {
  expect(sayHello()).not.toBe('goodbye');
});



// TO EQUAL - OBJECT ASSIGNMENT EXAMPLE
test('object assignment should add correct properties and values', () => {
  const data = { name: 'Andrew' }
  data.age = 27;
  data.favorites = { food: 'pizza' }
  expect(data).toEqual({
    name: 'Andrew',
    age: 27,
    favorites: { food: 'pizza' }
  });
});



// TO BE TRUTHY
test('True should be truthy', () => {
  expect(true).toBeTruthy();
});

// TO BE FALSY
test('False should be falsy', () => {
  expect(false).toBeFalsy();
});



// TO CONTAIN - ARRAY EXAMPLE
const names = ['Andrew', 'Brandon', 'Becca']

test('Names array should contain Becca', () => {
  expect(names).toContain('Becca');
});

// NOT TO CONTAIN - ARRAY EXAMPLE
test('Names array should not contain Preston', () => {
  expect(names).not.toContain('Preston');
});



// TEST API CALL
test("User name is Leanne", async () => {
  // Docs for assertions https://jestjs.io/docs/en/expect#expectassertionsnumber
    // Our assertion here is fetchUser()
  expect.assertions(1);
  const data = await fetchUser();
  expect(data.name).toEqual('Leanne Graham');
});



// // TEST GROUPING WITH DESCRIBE

// MATH FUNCTIONS EXAMPLE
describe("Math functions:", () => {
  test("add() should return a dynamic sum based on two number parameters.", () => {
    expect(add(1, 2)).toEqual(3);
    expect(add(5, 9)).toEqual(14);
  });

  test("subtract() should return a dynamic difference based on two number parameters.", () => {
    expect(subtract(2, 1)).toEqual(1);
    expect(subtract(9, 3)).toEqual(6);
  });

  test("multiply() should return a dynamic product based on two number parameters.", () => {
    expect(multiply(1, 2)).toEqual(2);
    expect(multiply(5, 9)).toEqual(45);
  });

  test("divide() should return a dynamic quotient based on two number parameters.", () => {
    expect(divide(2, 1)).toEqual(2);
    expect(divide(9, 3)).toEqual(3);
  });
});



// TEST OBJECT METHODS - BANK ACCOUNT EXAMPLE

// A FEW MORE GLOBALS THAT COULD BE USEFUL - more in docs
  // Reference https://jestjs.io/docs/en/api
  // We will show an example of beforeEach() and afterAll()
// Common globals
  // - beforeEach(() => {
  // -- fires before each test
  // - afterEach(() => {
  // -- fires after each test
  // - beforeAll(() => {
  // -- runs before all tests start
  // -- setup a connection to a mock db (more in jest docs)
  // -- used for dummy data for the tests
  // - afterAll(() => {
  // -- runs after all the tests are completed
  // -- shut down connection to mock db

// Let's first set up an object we'll be working with
  // We could have easily imported this object if it were exported from a js file
    // For demo purposes, we're declaring it here
let bankAccount = {
  balance: 1000,
  depositMoney(amount) {
    this.balance += amount;
  },
  withdrawMoney(amount) {
    this.balance -= amount;
  },
};

// Let's set up a test group for our tests to keep things organized and clear
describe('Bank account methods and properties', () => {
  beforeEach(() => {
    bankAccount.balance = 1000;
  });

  test('Initial balance is 1000', () => {
    expect(bankAccount.balance).toBe(1000);
  });

  test('depositMoney should correctly alter balance', () => {
    bankAccount.depositMoney(2000);
    expect(bankAccount.balance).toBe(3000);
  });

  test('withdrawMoney should correctly alter balance', () => {
    bankAccount.withdrawMoney(2000);
    expect(bankAccount.balance).toBe(-1000);
  });

  afterAll(() => {
    bankAccount.balance = 0
  })
});

// Let's see if our afterAll did the job
test('Account balance should be wiped out', () => {
  expect(bankAccount.balance).toBe(0);
})
