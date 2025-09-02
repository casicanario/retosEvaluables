//crear la clase Vectorcon la siguiente estructura.
//atributo privad:
//elements:array of numbers.
//el constructor debe contener los siguientes parametros:
//n:number. Longitud del vector.
//k:number. Maximo valor de los elementos del vector.
//el constructor tiene que crear el atributo elements formado por n numeros aleatorios entre 0 y k.
//metodos publicos:
//print():void. Imprime por consola el vector.
//add(v1:Vector):Vector. Suma elements con v1.
//sub(v1:Vector):Vector. Resta elements con v1.
//mult(v1:Vector):Vector. Multiplica elements con v1.
//multNumber(n:number):Vector. Multiplica elements por n.
export class Vector {
  private elements: number[];
    constructor(n: number, k: number) {
        this.elements = [];
        for (let i = 0; i < n; i++) {
            this.elements.push(Math.floor(Math.random() * (k + 1)));
        }
    }

    public print(): void {
        console.log(this.elements);
    }
    public add(v1: Vector): Vector {
        if (this.elements.length !== v1.elements.length) {
            throw new Error("Los vectores deben tener la misma longitud");
        }
        const result = new Vector(0, 0);
        result.elements = this.elements.map((value, index) => value + v1.elements[index]);
        return result;
    }
    public sub(v1: Vector): Vector {
        if (this.elements.length !== v1.elements.length) {
            throw new Error("Los vectores deben tener la misma longitud");
        }
        const result = new Vector(0, 0);
        result.elements = this.elements.map((value, index) => value - v1.elements[index]);
        return result;
    }
    public mult(v1: Vector): Vector {
        if (this.elements.length !== v1.elements.length) {
            throw new Error("Los vectores deben tener la misma longitud");
        }
        const result = new Vector(0, 0);
        result.elements = this.elements.map((value, index) => value * v1.elements[index]);
        return result;
    }
    public multNumber(n: number): Vector {
        const result = new Vector(0, 0);
        result.elements = this.elements.map((value) => value * n);
        return result;
    }
}

//modificar ese fichero para exportar la clase.
//importar la clase en otro fichero llamado vectorTest.ts


