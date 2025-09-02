//Importar la clase Vector
import { Vector } from "./vector";

//crear un objeto de la clase Vector y probar todos sus metodos.
const vector1 = new Vector(5, 10);
const vector2 = new Vector(5, 10);
console.log("Vector 1:");
vector1.print();
console.log("Vector 2:");
vector2.print();   
console.log("Suma de Vector 1 y Vector 2:");
const vectorSum = vector1.add(vector2);
vectorSum.print();
console.log("Resta de Vector 1 y Vector 2:");
const vectorSub = vector1.sub(vector2);
vectorSub.print();
console.log("Multiplicacion de Vector 1 y Vector 2:");
const vectorMult = vector1.mult(vector2);
vectorMult.print();
console.log("Multiplicacion de Vector 1 por un numero (2):");
const vectorMultNumber = vector1.multNumber(2);
vectorMultNumber.print();

//comparar los resultados con los calculos hechos a mano.
