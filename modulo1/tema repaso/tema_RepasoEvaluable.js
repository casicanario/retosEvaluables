// Array de ejemplo con ovejas
const ovejas = [
  { nombre: "Noa", color: "rojo" },
  { nombre: "Eunice", color: "azul" },
  { nombre: "Navidad", color: "rojo" },
  { nombre: "Ki Na Ma", color: "rojo" },
  { nombre: "A n a", color: "rojo" },
  { nombre: "Paquito", color: "verde" },
  { nombre: "Anita", color: "rojo" }
];

// Función para filtrar las ovejas
function contarOvejas(listaOvejas) {
  return listaOvejas.filter(oveja => {
    const nombre = oveja.nombre.toLowerCase().replace(/\s+/g, ''); // quitamos espacios y pasamos a minúsculas
    return oveja.color === "rojo" && nombre.includes("n") && nombre.includes("a");
  });
}

// Ejecutar función y mostrar resultado
const ovejasFiltradas = contarOvejas(ovejas);
console.log("Ovejas rojas con 'n' y 'a' en el nombre:", ovejasFiltradas);
