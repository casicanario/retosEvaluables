function calcularIMC() {
    // Pedir peso y altura al usuario
    const peso = prompt("Ingrese su peso en kg.:");
    const altura = prompt("Ingrese su altura en m.:");

    // Validar que los valores sean numéricos y positivos
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert("Por favor, ingrese valores válidos para peso y altura.");
        return;
    }

    // Calcular el IMC
    const imc = peso / (altura * altura);

    // Determinar la clasificación según el IMC
    let clasificacion = "";
    if (imc < 18.5) {
        clasificacion = "Bajo Peso";
    } else if (imc < 25) {
        clasificacion = "Adecuado";
    } else if (imc < 30) {
        clasificacion = "Obesidad grado I";
    } else if (imc < 35) {
        clasificacion = "Obesidad grado II";
    } else if (imc < 40) {
        clasificacion = "Obesidad grado III";
    } else {
        clasificacion = "Obesidad grado III";
    }

    // Mostrar el resultado en un cuadro de diálogo
    alert(`Su IMC es: ${imc.toFixed(2)}\nClasificación: ${clasificacion}`);
    
}


