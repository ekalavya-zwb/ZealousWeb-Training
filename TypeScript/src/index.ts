// console.log("Hello World");

// class User {
//   name: string;
//   private email: string;
//   readonly city: string = "Vadodara";
//   constructor(name: string, email: string) {
//     this.email = email;
//     this.name = name;
//   }
// }
// const ekalavya = new User("Ekalavya", "ekalavya@gmail.com");
// // console.log(ekalavya.email);
// // ekalavya.city = "Ahmedabad";
// console.log(ekalavya);

// class User {
//   protected _courseCount = 1;
//   constructor(
//     private id: number,
//     public name: string,
//     public readonly email: string,
//   ) {}
//   get getEmail(): string {
//     return this.email;
//   }
//   private deleteToken() {
//     console.log("Token deleted");
//   }
//   get courseCount(): number {
//     return this._courseCount;
//   }
//   set courseCount(count: number) {
//     if (count <= 1) {
//       console.log("Course count should be more than 1");
//     }
//     this._courseCount = count;
//   }
// }
// class SubUser extends User {
//   isFamily: boolean = true;
//   changeCourseCount(count: number) {
//     this._courseCount = count;
//   }
// }
// const ekalavya = new SubUser(101, "Ekalavya", "ekalavya@gmail.com");
// ekalavya.courseCount = 5;
// ekalavya.changeCourseCount(10);
// console.log(ekalavya);

// interface TakePhoto {
//   cameraMode: string;
//   filter: string;
//   burst: number;
// }
// interface Story {
//   createStory(): void;
// }
// class Instagram implements TakePhoto {
//   constructor(
//     public cameraMode: string,
//     public filter: string,
//     public burst: number,
//   ) {}
// }
// class YouTube implements TakePhoto, Story {
//   constructor(
//     public cameraMode: string,
//     public filter: string,
//     public burst: number,
//     public short: string,
//   ) {}
//   createStory(): void {
//     console.log("Story created");
//   }
// }

// abstract class Screenshot {
//   constructor(
//     public cameraMode: string,
//     public filter: string,
//   ) {}
//   abstract getImageCount(): number;
// }
// class WhatsApp extends Screenshot {
//   constructor(
//     public cameraMode: string,
//     public filter: string,
//     public burst: number,
//   ) {
//     super(cameraMode, filter);
//   }
//   getImageCount(): number {
//     return 12;
//   }
// }
// const camera = new WhatsApp("portrait", "original", 5);
// console.log(camera.getImageCount());

// function identity<Type>(value: Type): Type {
//   return value;
// }
// console.log("Hello");
// console.log(10);
// interface Car {
//   brand: string;
//   model: string;
//   color: string;
// }
// console.log(identity<Car>({ brand: "Ford", model: "Mustang", color: "Black" }));

// function getfruits<T>(fruits: T[]): T | undefined {
//   return fruits[3];
// }
// console.log(getfruits(["apple", "banana", "mango", "strawberry"]));

// const getfruits = <T>(fruits: T[]): T | undefined => {
//   return fruits[3];
// };
// console.log(getfruits(["apple", "banana", "mango", "strawberry"]));

// function genericFunction<T, U>(val1: T, val2: U): object {
//   return { val1, val2 };
// }
// console.log(genericFunction(1, "5"));
// function genericFunction<T, U extends number>(val1: T, val2: U): object {
//   return { val1, val2 };
// }
// console.log(genericFunction(1, 5));
// interface Database {
//   username: string;
//   password: string;
// }
// function genericFunction<T, D extends Database>(val1: T, val2: D): object {
//   return { val1, val2 };
// }
// console.log(genericFunction(1, { username: "root", password: "root@123" }));

// interface Quiz {
//   name: string;
//   subject: string;
// }
// interface Course {
//   name: string;
//   author: string;
// }
// class sellable<T> {
//   cart: T[] = [];

//   addToCart(product: T) {
//     this.cart.push(product);
//   }
// }
// const product = new sellable<Course>();
// product.addToCart({ name: "Python", author: "Ekalavya" });
// console.log(product.cart);

// function detectType(value: number | string) {
//   if (typeof value === "string") {
//     return value.toLowerCase();
//   }
//   return value.toFixed(2);
// }
// console.log(detectType("Hello"));
// console.log(detectType(10));

// function provideId(id: number | null) {
//   if (!id) {
//     console.log("Please provide ID");
//     return;
//   }
//   console.log("ID:", id);
// }
// provideId(100);

// function printAll(strs: string | string[] | null) {
//   if (strs) {
//     if (typeof strs === "object") {
//       for (const s of strs) {
//         console.log(s);
//       }
//     } else if (typeof strs === "string") {
//       console.log(strs);
//     }
//   }
// }
// printAll(["a", "b", "c", "d"]);
// printAll("e");
// printAll("");

// interface User {
//   name: string;
//   email: string;
// }
// interface Admin {
//   name: string;
//   email: string;
//   isAdmin: boolean;
// }
// function checkAdmin(account: User | Admin) {
//   if ("isAdmin" in account) {
//     return "Welcome admin";
//   }
//   return "You're not authorized";
// }
// console.log(checkAdmin({ name: "user", email: "user@gmail.com" }));
// console.log(
//   checkAdmin({ name: "admin", email: "admin@gmail.com", isAdmin: true }),
// );

// function logValue(x: Date | string) {
//   if (x instanceof Date) {
//     console.log(x.toLocaleString());
//   } else {
//     console.log(x.toUpperCase());
//   }
// }
// const x = new Date();
// logValue(x);

// type Fish = { swim: () => void };
// type Bird = { fly: () => void };
// function isFish(pet: Fish | Bird): pet is Fish {
//   return (pet as Fish).swim !== undefined;
// }
// function getFood(pet: Fish | Bird) {
//   return isFish(pet) ? "Fish food" : "Bird food";
// }
// const fish: Fish = { swim: () => {} };
// const bird: Bird = { fly: () => {} };
// console.log(getFood(fish));
// console.log(getFood(bird));

// interface Circle {
//   kind: "circle";
//   radius: number;
// }
// interface Square {
//   kind: "square";
//   side: number;
// }
// interface Rectangle {
//   kind: "rectangle";
//   length: number;
//   width: number;
// }
// type Shape = Circle | Square | Rectangle;
// function getArea(shape: Shape) {
//   if (shape.kind === "circle") {
//     return (Math.PI * shape.radius ** 2).toFixed(2);
//   } else if (shape.kind === "rectangle") {
//     return shape.length * shape.width;
//   } else {
//     return shape.side ** 2;
//   }
// }
// console.log(getArea({ kind: "circle", radius: 5 }));
// console.log(getArea({ kind: "square", side: 5 }));
// console.log(getArea({ kind: "rectangle", length: 5, width: 7 }));
// function getArea(shape: Shape) {
//   switch (shape.kind) {
//     case "circle":
//       return (Math.PI * shape.radius ** 2).toFixed(2);
//     case "square":
//       return shape.side ** 2;
//     case "rectangle":
//       return shape.length * shape.width;
//     default:
//       const _defaultForShape: never = shape;
//       return _defaultForShape;
//   }
// }
// console.log(getArea({ kind: "circle", radius: 5 }));
// console.log(getArea({ kind: "square", side: 5 }));
// console.log(getArea({ kind: "rectangle", length: 5, width: 7 }));

// TypeScript Practice Questions

// function sum(a: unknown, b: unknown): number {
//   if (typeof a === "number" && typeof b === "number") {
//     return a + b;
//   }
//   throw new Error("Invalid input");
// }
// console.log(sum(5, 8));

// type User = {
//   id: number;
//   name: string;
//   email?: string;
//   isActive: boolean;
// };

// function getUserInfo(user: User) {
//   const email = user.email ?? "No email provided";

//   console.log(`
//     ID: ${user.id}
//     Name: ${user.name}
//     Email: ${email}
//     isActive: ${user.isActive}
//     `);
// }

// getUserInfo({
//   id: 123,
//   name: "Ekalavya",
//   email: "ek123@gmail.com",
//   isActive: true,
// });

// function formatInput(input: string | number) {
//   if (typeof input === "number") {
//     return input ** 2;
//   } else if (typeof input === "string") {
//     return input.toUpperCase();
//   } else {
//     throw new Error("Invalid input");
//   }
// }

// console.log(formatInput(4));

// function getFirstElement<T>(arr: T[]): T | undefined {
//   return arr[2];
// }
// console.log(getFirstElement(["apple", "banana", "mango", "strawberry"]));

// type ApiResponse<T> = {
//   success: boolean;
//   data: T;
//   error?: string;
// };

// function getUser<T>(user: ApiResponse<T>): T | string {
//   return user.success ? user.data : (user.error ?? "Failed to fetch data");
// }

// console.log(
//   getUser({
//     success: false,
//     data: ["apple", "banana", "mango", "strawberry"],
//   }),
// );

// class AppError extends Error {
//   statusCode: number;
//   errorType: "Operational" | "Programming";

//   constructor(
//     message: string,
//     statusCode: number,
//     errorType: "Operational" | "Programming",
//   ) {
//     super(message);

//     this.statusCode = statusCode;
//     this.errorType = errorType;

//     Object.setPrototypeOf(this, AppError.prototype);
//   }
// }

// function getUser(id: number) {
//   if (id <= 0) {
//     throw new AppError("Invalid user ID", 400, "Programming");
//   }
//   return { id, name: "Ekalavya" };
// }

// try {
//   const user = getUser(0);
//   console.log(user);
// } catch (error) {
//   if (error instanceof AppError) {
//     console.log("Error:", error.message);
//     console.log("Status:", error.statusCode);
//     console.log("Type:", error.errorType);
//   } else {
//     console.log("Unknown error");
//   }
// }

// type User = {
//   name: string;
// };

// function getUser(user: User) {
//   return "Hello " + user.name;
// }

// console.log(getUser({ name: "Ekalavya" }));

// type Company = { company: string; employees: string[] };

// function getEmployees(emp: Company) {
//   return `
//   Company: ${emp.company}
//   Employees: ${emp.employees}
//   `;
// }

// console.log(
//   getEmployees({
//     company: "ZealousWeb",
//     employees: ["Ekalavya", "Utkarsh", "Shubham", "Divya"],
//   }),
// );

// function identity<T>(value: T): T {
//   return value;
// }

// console.log(identity("Hello"));
// console.log(identity(10));
// console.log(identity(["apple", "banana", "mango", "strawberry"]));
// console.log(identity({ brand: "Ford", model: "Mustang", color: "Black" }));

// function getFirstElement<T>(value: T[]): T[] {
//   return value;
// }

// console.log(getFirstElement(["apple", "banana", "mango", "strawberry"]));
// console.log(getFirstElement([1, 2, 3, 4, 5]));
// console.log(
//   getFirstElement([
//     { id: 1, name: "Ekalavya" },
//     { id: 2, name: "Aman" },
//   ]),
// );

// type Response = {
//   status: "success" | "error";
//   data: {
//     id: number;
//     name: string;
//   };
// };

// function getResponse(res: Response) {
//   if (res.status === "success") {
//     return res.data;
//   } else if (res.status === "error") {
//     return "Failed to fetch data";
//   } else {
//     return "Unknown error";
//   }
// }

// console.log(
//   getResponse({ status: "success", data: { id: 101, name: "Ekalavya" } }),
// );
// console.log(
//   getResponse({ status: "error", data: { id: 101, name: "Ekalavya" } }),
// );
// console.log(
//   getResponse({ status: "random", data: { id: 101, name: "Ekalavya" } }),
// );

// enum Role {
//   Admin,
//   User,
//   Guest,
// }

// function checkAccess(myRole: Role) {
//   if (myRole === Role.Admin) {
//     console.log("Admin priviledges will be provided");
//   } else if (myRole === Role.User) {
//     console.log("User priviledges will be provided");
//   } else {
//     console.log("No priviledges will be provided");
//   }
// }

// checkAccess(Role.Admin);

// type Todo = {
//   id: number;
//   title: string;
//   isCompleted: boolean;
// };

// class TodoManager {
//   private todos: Todo[] = [];
//   private id: number = 1;

//   addTodo(title: string): void {
//     const newTodo: Todo = {
//       id: this.id++,
//       title,
//       isCompleted: false,
//     };
//     this.todos.push(newTodo);
//   }

//   deleteTodo(id: number): void {
//     this.todos = this.todos.filter((todo) => todo.id !== id);
//   }

//   editTodo(id: number, newTitle: string): void {
//     const todo = this.todos.find((todo) => todo.id === id);
//     if (todo) {
//       todo.title = newTitle;
//     } else {
//       console.log("Todo does not exist");
//     }
//   }

//   toggleTodo(id: number): void {
//     const todo = this.todos.find((todo) => todo.id === id);
//     if (todo) {
//       todo.isCompleted = !todo.isCompleted;
//     } else {
//       console.log("Todo does not exist");
//     }
//   }

//   displayTodos(): void {
//     this.todos.forEach((todo) => {
//       console.log(
//         `${todo.id}. ${todo.title} [${todo.isCompleted ? "✔" : "❌"}]`,
//       );
//     });
//   }
// }

// const manager = new TodoManager();

// manager.addTodo("Walk the dog");
// manager.addTodo("Make breakfast");
// manager.addTodo("Clean room");

// manager.displayTodos();

// manager.toggleTodo(1);
// manager.deleteTodo(2);
// manager.editTodo(3, "Clean room and make bed");

// console.log("\nAfter updates:");
// manager.displayTodos();

// type Product = {
//   id: number;
//   name: string;
//   stock: number;
// };

// class ProductManager {
//   private products: Product[] = [];
//   private id: number = 1;

//   addProduct(name: string, stock: number): void {
//     const product: Product = {
//       id: this.id++,
//       name,
//       stock,
//     };
//     this.products.push(product);
//   }

//   updateStock(id: number, stock: number): void {
//     const product = this.products.find((item) => item.id === id);
//     if (product) {
//       product.stock = stock;
//     } else {
//       console.log("Product does not exist");
//     }
//   }

//   displayInventory(): void {
//     this.products.forEach((product) => {
//       console.log(`${product.id}. ${product.name} - ${product.stock} pcs`);
//     });
//   }
// }

// const manager = new ProductManager();

// manager.addProduct("Dell Laptops", 10);
// manager.addProduct("Dell Monitors", 25);
// manager.addProduct("Mechanical Keyboards", 20);
// manager.addProduct("Razor gaming mouse", 15);

// manager.displayInventory();

// manager.updateStock(3, 15);

// console.log("\nAfter update:");
// manager.displayInventory();

// type User = {
//   id: number;
//   name: string;
//   email: string;
// };

// type FetchResultType<T> = {
//   data: T | null;
//   error: string | null;
// };

// async function fetchData<T>(url: string): Promise<FetchResultType<T>> {
//   try {
//     const res: Response = await fetch(url);

//     if (!res.ok) {
//       return {
//         data: null,
//         error: "Failed to fetch API",
//       };
//     }

//     const data: T = await res.json();

//     return {
//       data,
//       error: null,
//     };
//   } catch (error) {
//     return {
//       data: null,
//       error: "Something went wrong",
//     };
//   }
// }

// async function getUsers(url: string) {
//   const result = await fetchData<User[]>(url);

//   if (result.error) {
//     console.error(result.error);
//     return;
//   }

//   if (result.data) {
//     result.data.forEach((user) => {
//       console.log(`
//       Id: ${user.id}
//       Name: ${user.name}
//       Email: ${user.email}
//       `);
//     });
//   }
// }

// async function getUser(url: string) {
//   const result = await fetchData<User>(url);

//   if (result.error) {
//     console.error(result.error);
//     return;
//   }

//   if (result.data) {
//     console.log(`
//       Id: ${result.data.id}
//       Name: ${result.data.name}
//       Email: ${result.data.email}
//       `);
//   }
// }

// getUsers("https://jsonplaceholder.typicode.com/users");
// getUser("https://jsonplaceholder.typicode.com/users/10");

// function pair<T, U>(a: T, b: U): [T, U] {
//   return [a, b];
// }

// console.log(pair<string, number>("Ekalavya", 21));

// function wrapInArray<T>(value: T): T[] {
//   return [value];
// }

// console.log(wrapInArray({ name: "Ekalavya", age: 21 }));

// function reverseArray<T>(array: T[]): T[] {
//   const result: T[] = [];
//   for (let i = array.length - 1; i >= 0; i--) {
//     const item = array[i];
//     if (item !== undefined) {
//       result.push(item);
//     }
//   }
//   return result;
// }

// function reverseArray<T>(array: T[]): T[] {
//   return [...array].reverse();
// }

// console.log(reverseArray([1, 2, 3, 4, 5]));
// console.log(reverseArray(["a", "b", "c"]));
// console.log(reverseArray([true, false, true]));

// Problem: 1
// Task: Define a strict AppConfig interface and apply it so the compiler flags invalid property access.

// interface AppConfig {
//   host: string;
//   port: number;
//   ssl: boolean;
// }

// const config: AppConfig = {
//   host: "localhost",
//   port: 8080,
//   ssl: true,
// };

// console.log(config.hostt);

// Problem: 2
// Task: Use optional properties correctly in the interface, and write a safe formatter function using optional chaining or nullish coalescing.

// interface UserProfile {
//   id: string;
//   username: string;
//   phoneNumber?: string;
//   bio?: string;
// }

// function getFormattedPhone(user: UserProfile): string {
//   return user.phoneNumber?.trim() ?? "No phone number provided";
// }

// Problem: 3
// Task: Implement a discriminated union so that you cannot access transactionId if the response status is 'FAILED'.

// type SuccessResponse = {
//   status: "SUCCESS";
//   transactionId: string;
//   amount: number;
// };

// type FailedResponse = {
//   status: "FAILED";
//   message: string;
//   errorCode: number;
// };

// type PaymentResponse = SuccessResponse | FailedResponse;

// function handlePayment(response: PaymentResponse) {
//   if (response.status === "SUCCESS") {
//     // Should compile perfectly
//     console.log(`Success! ID: ${response.transactionId}`);
//   } else {
//     // Should flag a compiler error if you try to read response.transactionId here
//     console.log(`Failed! Error: ${response.message}`);
//   }
// }

// Problem: 4
// Task: Enforce immutability on these specific properties at compilation level using TypeScript modifiers.

// interface UserTransaction {
//   readonly id: string;
//   readonly userId: string;
//   amount: number;
//   readonly createdAt: Date;
// }

// const tx: UserTransaction = {
//   id: "tx_123",
//   userId: "u_99",
//   amount: 50,
//   createdAt: new Date(),
// };
// tx.id = "tx_456";
