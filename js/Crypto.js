import { CryptoBase,  } from "./CryptoBase.js";

class Crypto extends CryptoBase {
  constructor(nombre, simbolo, fechaCreacion, precio, consenso, circulacion, algoritmo, sitioWeb) {
    super(nombre, simbolo, fechaCreacion, precio);
    this.consenso = consenso;
    this.circulacion = circulacion;
    this.algoritmo = algoritmo;
    this.sitioWeb = sitioWeb;
  }
}
export { Crypto };
