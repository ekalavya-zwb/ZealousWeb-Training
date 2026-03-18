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

interface Circle {
  kind: "circle";
  radius: number;
}
interface Square {
  kind: "square";
  side: number;
}
interface Rectangle {
  kind: "rectangle";
  length: number;
  width: number;
}
type Shape = Circle | Square | Rectangle;
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
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return (Math.PI * shape.radius ** 2).toFixed(2);
    case "square":
      return shape.side ** 2;
    case "rectangle":
      return shape.length * shape.width;
    default:
      const _defaultForShape: never = shape;
      return _defaultForShape;
  }
}
console.log(getArea({ kind: "circle", radius: 5 }));
console.log(getArea({ kind: "square", side: 5 }));
console.log(getArea({ kind: "rectangle", length: 5, width: 7 }));
