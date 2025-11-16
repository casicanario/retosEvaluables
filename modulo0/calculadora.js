function suma(x, y) {
    if (x !== 0 && y !== 0) {
        return x + y;
    } else {
        return -1;
    }
}

function resta(x, y) {
    if (x !== 0 && y !== 0) {
        return x - y;
    } else {
        return -1;
    }
}

function producto(x, y) {
    if (x !== 0 && y !== 0) {
        return x * y;
    } else {
        return -1;
    }
}

function division(x, y) {
    if (x !== 0 && y !== 0) {
        return x / y;
    } else {
        return -1;
    }
}

console.log(suma(4, 0));
console.log(resta(4, 2));
console.log(producto(4, 2));
console.log(division(4, 2));

console.log(resta(4, 0));
console.log(producto(4, 0));
console.log(division(4, 0));
