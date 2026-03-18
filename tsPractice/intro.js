"use strict";
// const msg: string = "Hello World";
// console.log(msg);
Object.defineProperty(exports, "__esModule", { value: true });
var ekalavya = {
    _id: 223,
    email: "ekalavya@gmail.com",
    userId: 1122,
    startTrial: function () { return "Trial started..."; },
    getCoupon: function (value) { return "".concat(value, "% Off"); },
};
console.log(ekalavya.getCoupon(20));
