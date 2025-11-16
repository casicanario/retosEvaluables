

/**
 * Función que ordena un array de números de menor a mayor
 * @param {number[]} array - Array de números a ordenar
 * @returns {number[]} - Array ordenado de menor a mayor
 */
function ordenarArray(array) {
    return array.sort((a, b) => a - b);
}

/**
 * DOCUMENTACIÓN DEL PROCESO:
 * 
 * Sugerencia de Copilot recibida:
 * - Copilot sugirió automáticamente: return array.sort((a, b) => a - b);
 * - La sugerencia apareció casi instantáneamente después de escribir el nombre de la función
 * - También mostró alternativas como usar slice() antes del sort para no mutar el array original
 * 
 * Ajustes realizados:
 * - Acepté la sugerencia principal tal cual porque era correcta y eficiente
 * - No añadí el slice() porque las pruebas ya usan spread operator [...numeros]
 * 
 * Análisis:
 * - La sugerencia fue totalmente correcta. El método sort() con función comparadora (a, b) => a - b
 *   es la forma estándar de ordenar números en JavaScript
 * - Sin la función comparadora, sort() convertiría los números a strings y los ordenaría mal
 * - No necesitó ajustes, Copilot entendió perfectamente la intención desde el comentario JSDoc
 */


// ============================================
// PRUEBAS DE LA FUNCIÓN
// ============================================

// Datos de prueba
const numeros = [5, 2, 8, 1, 9, 3, 7, 4, 6];

console.log("Array original:", numeros);
console.log("Array ordenado:", ordenarArray([...numeros]));



/**
 * REFLEXIÓN FINAL:
 * 
 * ¿Cómo fue la experiencia usando GitHub Copilot?
 * - Fue muy fluida y rápida. La sugerencia apareció casi al instante después de escribir
 *   el comentario JSDoc. Me sorprendió lo bien que entiende la intención del código.
 * - Es como tener un compañero de programación que conoce las mejores prácticas de JavaScript.
 * 
 * ¿La sugerencia fue útil y precisa?
 * - Sí, totalmente. La función fue sugerida correctamente sin necesidad de ajustes.
 * - Copilot eligió el método más apropiado: sort() con función comparadora (a, b) => a - b
 * - El código generado sigue las convenciones modernas de JavaScript (arrow functions)
 * 
 * ¿Qué ajustes tuve que hacer?
 * - Ninguno. La función funcionó perfectamente desde la primera sugerencia.
 * - Esto demuestra que cuando los comentarios JSDoc están bien escritos, Copilot
 *   puede generar código muy preciso y listo para producción.
 * 
 * ¿Cuándo es mejor usar Copilot vs escribir el código manualmente?
 * - Copilot es ideal para:
 *   • Funciones estándar y patrones comunes (como ordenar arrays)
 *   • Acelerar el desarrollo de código repetitivo
 *   • Aprender nuevas formas de resolver problemas
 *   • Completar código basándose en el contexto
 * 

 * 
 * CONCLUSIÓN:
 * Copilot es una herramienta poderosa que aumenta la productividad, pero no reemplaza
 * el conocimiento del programador. Funciona mejor cuando sabes qué quieres hacer
 * y solo necesitas ayuda con la sintaxis o implementación. Es un asistente, no un
 * sustituto del pensamiento crítico y la comprensión del código.
 */
