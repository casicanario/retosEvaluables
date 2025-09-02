export class Point {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // Getters
  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  // Setters
  public setX(x: number): void {
    this.x = x;
  }

  public setY(y: number): void {
    this.y = y;
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  // Métodos de la Parte 2
  public distanceToOrigin(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public calculateDistance(anotherPoint: Point): number {
    const dx = this.x - anotherPoint.getX();
    const dy = this.y - anotherPoint.getY();
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Método de la Parte 3
  public calculateQuadrant(): number {
    if (this.x === 0 || this.y === 0) {
      return 0;
    } else if (this.x > 0 && this.y > 0) {
      return 1;
    } else if (this.x < 0 && this.y > 0) {
      return 2;
    } else if (this.x < 0 && this.y < 0) {
      return 3;
    } else {
      return 4; // x > 0, y < 0
    }
  }

  // Método de la Parte 4
  public calculateNearest(points: Point[]): Point {
    if (points.length === 0) {
      throw new Error("El array de puntos no puede estar vacío.");
    }

    let nearestPoint = points[0];
    let minDistance = this.calculateDistance(nearestPoint);

    for (let i = 1; i < points.length; i++) {
      const currentDistance = this.calculateDistance(points[i]);
      if (currentDistance < minDistance) {
        minDistance = currentDistance;
        nearestPoint = points[i];
      }
    }
    return nearestPoint;
  }
}