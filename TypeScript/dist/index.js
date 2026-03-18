"use strict";
// console.log("Hello World");
Object.defineProperty(exports, "__esModule", { value: true });
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
function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return (Math.PI * shape.radius ** 2).toFixed(2);
        case "square":
            return shape.side ** 2;
        case "rectangle":
            return shape.length * shape.width;
        default:
            const _defaultForShape = shape;
            return _defaultForShape;
    }
}
console.log(getArea({ kind: "circle", radius: 5 }));
console.log(getArea({ kind: "square", side: 5 }));
console.log(getArea({ kind: "rectangle", length: 5, width: 7 }));
//# sourceMappingURL=index.js.map