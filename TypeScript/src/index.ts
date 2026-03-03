const add = (a: number, b: number): number => {
  return a + b;
};

console.log(add(2, 3));

const person1: {
  name: string;
  age: number;
  jobTitle: string;
  address: { street: string; city: string };
} = {
  name: "John Doe",
  age: 23,
  jobTitle: "Engineer",
  address: {
    street: "123 Main St",
    city: "London",
  },
};

console.log(person1);

const calculateArea = (length: number, width: number): number => {
  return length * width;
};

console.log(`Area of rectangle: ${calculateArea(5, 3)}`);

function optionalGreet(name: string, age?: number): void {
  if (age) {
    console.log(`Hello ${name}! You're ${age} years old.`);
  } else {
    console.log(`Hello ${name}`);
  }
}

optionalGreet("John");
optionalGreet("John", 23);

function defualtGreet(name: string, age = 23): void {
  if (age) {
    console.log(`Hello ${name}! You're ${age} years old.`);
  } else {
    console.log(`Hello ${name}`);
  }
}

defualtGreet("John");
defualtGreet("John", 33);

function addNums(...nums: number[]): number {
  let result = 0;

  for (const num of nums) {
    result += num;
  }

  return result;
}

console.log(`Sum: ${addNums(10, 20, 30, 40, +true)}`);

function throwError(message: string): never {
  throw new Error(message);
}

// Union Types
let myVar: string | number;

myVar = "Hello";
console.log(myVar);

myVar = 20;
console.log(myVar);

// Literal Types
function setColor(color: "red" | "green" | "blue"): void {
  console.log(color);
}
setColor("blue");

// Nullable Types
function nullableGreet(username: string, age: number | null): void {
  if (age) {
    console.log(`Hello ${username}! You're ${age} years old.`);
  } else {
    console.log(`Hello ${username}`);
  }
}

nullableGreet("John", null);
nullableGreet("John", 23);

// Type Alias
type MyString = string;
type MyStringOrNumber = string | number;
type Employee = {
  name: string;
  age: number;
  email?: string;
};

let myName: MyString = "John";
let myVal: MyStringOrNumber = 23;
console.log(`Hello ${myName}! You're ${myVal} years old.`);

const alice: Employee = {
  name: "Alice ",
  age: 30,
  email: "alice@gmail.com",
};
console.log(alice);

const bob: Employee = {
  name: "Bob ",
  age: 25,
};
console.log(bob);

// Intersection Types
type FirstType = {
  name: string;
  age: number;
};

type SecondType = {
  address: string;
  phone: string;
};

type CombinedType = FirstType & SecondType;

const person2: CombinedType = {
  name: "John Doe",
  age: 23,
  address: "123 Main St",
  phone: "012-345-6789",
};

console.log(person2);

const fruits: string[] = ["apple", "mango", "banana", "cherry"];

for (const fruit of fruits) {
  console.log(fruit.toUpperCase());
}

const numArr: number[] = [1, 2, 3, 4, 5];
const strArr: string[] = ["apple", "mango", "banana", "cherry"];
const mixArr: (number | string)[] = [1, "apple", "banana", 4];

console.log(mixArr);

const article: readonly [number, string, boolean] = [11, "Title-One", true];

const [id, title, published] = article;
console.log(id, title, published ? "Published" : "Not Published");

enum Days {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

const today: Days = Days.Tuesday;
console.log(`Today is ${Days[today]}`);
