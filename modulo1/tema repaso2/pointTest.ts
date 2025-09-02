import { Point } from './point';

// Parte 1 y 2
const myPoint = new Point(3, 4);
const anotherPoint = new Point(6, 8);

console.log("--- Parte 1: Clase Point ---");
console.log(`Coordenadas de myPoint: ${myPoint.toString()}`);
console.log(`Distancia al origen de myPoint: ${myPoint.distanceToOrigin()}`); // Debería ser 5
console.log(`Distancia entre myPoint y anotherPoint: ${myPoint.calculateDistance(anotherPoint)}`); // Debería ser 5
console.log(`Coordenadas de anotherPoint: ${anotherPoint.toString()}`);
console.log(`Coordenadas de myPoint (usando getters): x = ${myPoint.getX()}, y = ${myPoint.getY()}`);

myPoint.setX(10);
myPoint.setY(20);
console.log(`Nuevas coordenadas de myPoint (usando setters): ${myPoint.toString()}`);

console.log("\n--- Parte 3: Método Calcular Cuadrante ---");
const point1 = new Point(1, 1);
const point2 = new Point(-1, 1);
const point3 = new Point(-1, -1);
const point4 = new Point(1, -1);
const pointOrigin = new Point(0, 0);

console.log(`El punto ${point1.toString()} está en el cuadrante: ${point1.calculateQuadrant()}`); // 1
console.log(`El punto ${point2.toString()} está en el cuadrante: ${point2.calculateQuadrant()}`); // 2
console.log(`El punto ${point3.toString()} está en el cuadrante: ${point3.calculateQuadrant()}`); // 3
console.log(`El punto ${point4.toString()} está en el cuadrante: ${point4.calculateQuadrant()}`); // 4
console.log(`El punto ${pointOrigin.toString()} está en el cuadrante: ${pointOrigin.calculateQuadrant()}`); // 0

console.log("\n--- Parte 4: Calcular el Punto Más Cercano ---");
const pointsArray = [
  new Point(10, 10),
  new Point(1, 1),
  new Point(5, 5),
  new Point(20, 20)
];
const referencePoint = new Point(2, 2);
const nearest = referencePoint.calculateNearest(pointsArray);

console.log(`El punto más cercano a ${referencePoint.toString()} de la lista es: ${nearest.toString()}`); // Debería ser (1,1)