import { Point } from './point';
import { Triangle } from './triangle';

// Creamos los puntos que serán los vértices del triángulo
const vertexA = new Point(0, 0);
const vertexB = new Point(3, 0);
const vertexC = new Point(0, 4);

// Creamos un nuevo objeto de la clase Triangle
const myTriangle = new Triangle(vertexA, vertexB, vertexC);

// Probamos el método calculateLengthSides()
const sides = myTriangle.calculateLengthSides();

console.log("--- Parte 5: Clase Triangle ---");
console.log(`Lado 1 (A-B): ${sides[0]}`); // Debería ser 3
console.log(`Lado 2 (B-C): ${sides[1]}`); // Debería ser 5
console.log(`Lado 3 (C-A): ${sides[2]}`); // Debería ser 4
console.log(`Longitudes de los lados del triángulo: [${sides.join(', ')}]`);