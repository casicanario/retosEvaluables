import { Professional } from './professional';

const professional1 = new Professional("Tom Hanks", 65, 80, 1.83, false, "estadounidense", 2, "actor");
const professional2 = new Professional("Quentin Tarantino", 58, 90, 1.85, false, "estadounidense", 2, "director");

professional1.showProfessionalData();
console.log("\n"); // Para separar las impresiones
professional2.showProfessionalData();
