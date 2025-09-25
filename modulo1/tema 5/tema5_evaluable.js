const {
    crearVector,
    sumaVector,
    productoNumeroVector,
    restaVector,
    productoVector
} = require("./libreriaVector");

// Crear vectores de prueba
let v1 = crearVector(5, 10);
let v2 = crearVector(5, 10);

console.log("Vector 1:", v1);
console.log("Vector 2:", v2);

console.log("\nSuma de vectores:", sumaVector(v1, v2));
console.log("Producto número-vector (x3):", productoNumeroVector(3, v1));
console.log("Resta de vectores:", restaVector(v1, v2));
console.log("Producto vector-vector:", productoVector(v1, v2));

// PARTE 2 - Redefiniciones


// 1. sumaVector con forEach
function sumaVectorForEach(v1, v2) {
    if (v1.length !== v2.length) return null;
    let resultado = [];
    v1.forEach((valor, i) => {
        resultado.push(valor + v2[i]);
    });
    return resultado;
}
console.log("\nSuma con forEach:", sumaVectorForEach(v1, v2));

// 2. sumaVector con map
function sumaVectorMap(v1, v2) {
    if (v1.length !== v2.length) return null;
    return v1.map((valor, i) => valor + v2[i]);
}
console.log("Suma con map:", sumaVectorMap(v1, v2));

// 3. filtrar pares usando filter
function filtraImpares(v) {
    return v.filter(num => num % 2 === 0);
}
console.log("Filtrando impares de v1 (solo pares quedan):", filtraImpares(v1));

// 4. sumatorio con reduce
function sumatorio(v) {
    return v.reduce((acum, valor) => acum + valor, 0);
}
console.log("Suma total de v1:", sumatorio(v1));
