// const msg: string = "Hello World";
// console.log(msg);

// function sum(a: number, b: number): number {
//   return a + b;
// }
// console.log(sum(2, 3));

// function consoleError(errorMsg: string): void {
//   console.log(errorMsg);
// }
// consoleError("Unexpected token!");

// function handleError(errorMsg: string): never {
//   throw new Error(errorMsg);
// }

// function createUser({
//   name,
//   isEmployeed,
// }: {
//   name: string;
//   isEmployeed: boolean;
// }): void {
//   console.log("Name:", name);
//   console.log("isEmployeed:", isEmployeed);
// }
// createUser({ name: "Ekalavya", isEmployeed: true });

// type Employee = {
//   name: string;
//   age: number;
//   isPaid: boolean;
// };
// function createEmployee(employee: Employee): Employee {
//   return employee;
// }
// const employee = createEmployee({ name: "Ekalavya", age: 21, isPaid: true });
// console.log("Name:", employee.name);
// console.log("Age:", employee.age);
// console.log("isPaid:", employee.isPaid);

// function createCourse({ name, price }: { name: string; price: number }): void {
//   console.log("Course name:", name);
//   console.log("Course price:", price);
// }
// // Weird behaviour in ts
// const courseInfo = { name: "React JS", price: 699, isFree: false };
// createCourse(courseInfo);

// type User = {
//   readonly _id: string;
//   name: string;
//   email: string;
//   isActive: boolean;
//   donation?: number;
// };
// const myUser: User = {
//   _id: "1ab2c3",
//   name: "Ekalavya",
//   email: "ekalavya@gmail.com",
//   isActive: false,
// };
// myUser.email = "ek@gmail.com";
// // myUser._id = "3c2b1a";
// console.log(myUser);

// type CardNumber = { cardNumber: string };
// type CardDate = { expDate: string };
// type CardDetails = CardNumber & CardDate & { cvv: number };
// const myCard: CardDetails = {
//   cardNumber: "0112 3445 6779 9004",
//   expDate: "02/28",
//   cvv: 404,
// };
// console.log(myCard);

// type User = {
//   name: string;
//   age: number;
// };
// const veggies: Array<string> = [];
// const fruits: string[] = [];
// const ages: number[] = [];
// const users: User[] = [];
// veggies.push("onion", "tomato");
// fruits.push("apple", "mango");
// ages.push(21, 42);
// users.push({ name: "Ekalavya", age: 21 }, { name: "Aman", age: 22 });
// console.log(veggies);
// console.log(fruits);
// console.log(ages);
// console.log(users);

// type User = {
//   id: number;
//   userName: string;
// };
// type Admin = {
//   id: number;
//   adminName: string;
// };
// let ekalavya: User | Admin;
// ekalavya = { id: 101, userName: "user101" };
// console.log(ekalavya);
// ekalavya = { id: 101, adminName: "admin101" };
// console.log(ekalavya);
// const data: (string | number)[] = [1, "2", 3, "4"];
// console.log(data);
// function getDbID(id: number | string): void {
//   if (typeof id === "string") {
//     console.log("Id is string!");
//   } else {
//     console.log("Id is number!");
//   }
// }
// getDbID(1234);
// getDbID("1234");
// let seatAllotment: "aisle" | "middle" | "window";
// seatAllotment = "aisle";
// // seatAllotment = "crew";

// type User = [number, string, boolean];
// const user: User = [101, "Ekalavya", true];
// console.log(user);
// const rgb: [number, number, number] = [255, 103, 49];
// console.log(rgb);

// const enum seats {
//   AISLE = 100,
//   MIDDLE,
//   WINDOW,
// }
// const choice = seats.WINDOW;
// console.log(choice);

interface User {
  readonly _id: number;
  email: string;
  userId: number;
  googleId?: number;
  startTrial(): string;
  getCoupon(value: number): string;
}
interface User {
  githubToken: string;
}
interface Admin extends User {
  role: "Admin" | "Principal" | "Faculty";
}
const ekalavya: Admin = {
  _id: 223,
  email: "ekalavya@gmail.com",
  userId: 1122,
  role: "Principal",
  githubToken: "github123",
  startTrial: () => "Trial started...",
  getCoupon: (value) => `${value}% Off`,
};
console.log(ekalavya.getCoupon(20));

export {};
