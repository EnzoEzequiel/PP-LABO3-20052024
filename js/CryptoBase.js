export class CryptoBase {
    constructor(nombre, simbolo, fechaCreacion, precio) {
      this.id = Math.random();
      this.nombre = nombre;
      this.simbolo = simbolo;
      this.fechaCreacion = fechaCreacion;
      this.precio = precio;
    }
  }
  
