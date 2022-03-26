class Tablero {
    constructor(numFilas, numColumnas) {
        this.numFilas = numFilas;
        this.numColumnas = numColumnas;

        this.crearTableroVacio();
    }

    crearTableroVacio(){
        this.listaCeldas = [];
        for (let fila=0; fila<this.numFilas; fila++) {
            this.listaCeldas[fila] = [];
    
            for (let columna=0; columna<this.numColumnas; columna++) {
                this.listaCeldas[fila][columna] = new Celda(fila, columna);
            }
        }
    }


    dibujar() {
        document.write(`<table>`);
        for (let i=0; i<this.numFilas; i++) {
            document.write(`<tr></tr>`);

            for (let j=0; j<this.numColumnas; j++) {
                if (this.listaCeldas[i][j].getValor()) {
                    document.write(`<td bgcolor= "#000000" ></td>`);
                } else {
                    document.write(`<td></td>`);
                }
            }
        }
        document.write(`</table>`);
    }


}

class TableroHundirFlota extends Tablero {
    constructor(numFilas, numColumnas) {
        super(numFilas, numColumnas);

        this.colocarBarco(new Barco('portaviones'), 1);
        this.colocarBarco(new Barco('acorazado'), 3);
        this.colocarBarco(new Barco('destructor'), 3);
        this.colocarBarco(new Barco('fragata'), 2);
    }

    contieneBarco(fila, columna) {
        if (this.listaCeldas[fila][columna].contenido == true) {
            return true;
        }
    
        return false;
    }
    
    esSentidoValido(fila, columna, limiteInferior, limiteSuperior, limiteIzq, limiteDcha){
        // Devuelve true si en este sentido cabe el barco cumpliendo las condiciones
    
        let esValido = [];
        
        for (let i=limiteSuperior; i<=limiteInferior; i++) {
            for (let j=limiteIzq; j<=limiteDcha; j++) {
                if ((fila+i >= 0) && (columna+j >= 0) && (fila+i <= this.listaCeldas.length - 1) && (columna+j <= this.listaCeldas[fila].length - 1)) {
                    esValido.push(!this.contieneBarco(fila+i, columna+j));
                    if (!esValido[esValido.length - 1]) {
                        break;
                    }
                } else {
                    esValido.push(false)
                    break;
                }
            }
    
        }
        
        return (!esValido.includes(false));
    }
    
    
    colocarBarco(barco, numBarcos) {
        let contadorBarcos = 0;
        let fila;
        let columna; 
    
        do {
            fila = parseInt(Math.random()*this.numFilas);
            columna = parseInt(Math.random()*this.numColumnas);
    
            // Comprobamos cada sentido y en el primero que sea válido se introduce el barco
            if (this.esSentidoValido(fila, columna, 1, -1, -barco.longitud, 1)) { // Comprobar si el sentido hacia la izquierda es válido
                for (let j=columna - (barco.longitud - 1); j<=columna; j++) {
                    this.listaCeldas[fila][j].setValor(true);
                }
                contadorBarcos++;
            } else if (this.esSentidoValido(fila, columna, 1, -1, -1, barco.longitud)) { // Comprobar si el sentido hacia al derecha es válido
                for (let j=columna; j<= (columna + (barco.longitud - 1)); j++) {
                    this.listaCeldas[fila][j].setValor(true);
                }
                contadorBarcos++;
            } else if (this.esSentidoValido(fila, columna, 1, -barco.longitud, -1, 1)) { // Comprobar si el sentido hacia arriba es válido
                for (let i=fila - (barco.longitud - 1); i<= fila; i++) {
                    this.listaCeldas[i][columna].setValor(true);
                }
                contadorBarcos++;
            } else if (this.esSentidoValido(fila, columna, barco.longitud, -1, -1, 1)) { // Comprobar si el sentido hacia abajo es válido
                for (let i=fila; i<= fila + (barco.longitud - 1); i++) {
                    this.listaCeldas[i][columna].setValor(true);
                }
                contadorBarcos++;
            }
        } while (contadorBarcos < numBarcos)
        
        return this.listaCeldas;
    }



}

class Celda {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
        this.contenido = false;
        this.vecinos = [];
    }

    setValor(contenido) {
        this.contenido = contenido;
    }

    getValor() {
        return this.contenido;
    }

    comprobarValor(valor) {
        if (this.contenido == valor) {
            return true;
        }
         return false;
    }

    insertarVecino(vecino) {
        this.vecinos.push(vecino);
    }

}

class Barco {
    constructor(tipoBarco) {
        if (tipoBarco == 'portaviones') {
            this.longitud = 4;
        } else if (tipoBarco == 'acorazado') {
            this.longitud = 3;
        } else if (tipoBarco == 'destructor') {
            this.longitud = 2;
        } else if (tipoBarco == 'fragata') {
            this.longitud = 1;
        }
    }

}

let tablero = new TableroHundirFlota(10, 10);
tablero.dibujar();
