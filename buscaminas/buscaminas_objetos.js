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

        for (let fila=0; fila<this.numFilas; fila++) {
            for (let columna=0; columna<this.numColumnas; columna++) {
                this.crearListaCeldaVecino(this.listaCeldas[fila][columna]);
            }
        }
    }

    crearListaCeldaVecino(celda) {
        for (let i=-1; i<=1; i++) {
            for (let j=-1; j<=1; j++) {
                if (i==0 && j==0) {
                    continue;
                }

                if ((celda.fila+i>=0) && (celda.columna+j>=0) && (celda.fila+i<=this.numFilas-1) && (celda.columna+j<=this.numColumnas-1)){
                    celda.insertarVecino(this.listaCeldas[celda.fila+i][celda.columna+j])
                }
            }
        }
    }

    dibujar() {
        document.write(`<table>`);
        for (let i=0; i<this.numFilas; i++) {
            document.write(`<tr></tr>`);

            for (let j=0; j<this.numColumnas; j++) {
                document.write(`<td>${this.listaCeldas[i][j].getValor()}</td>`);
            }
        }
        document.write(`</table>`);
    }

    recalcular(...nuevosValores) {
        if (nuevosValores.length == 0) {
            this.crearTableroVacio();
        } else if (nuevosValores.length == 2) {
            this.numFilas = nuevosValores[0];
            this.numColumnas = nuevosValores[1];
            this.crearTableroVacio();
            
        }
    }

}

class TableroBuscaminas extends Tablero {
    constructor(numFilas, numColumnas, numMinas) {
        super(numFilas, numColumnas);
        this.numMinas = numMinas;

        this.colocarMinas();
        this.colocarNumeroMinas();
    }

    colocarMinas() {
        let contador = 0;
        let fila;
        let columna;

        do {
            fila = parseInt(Math.random() * this.numFilas);
            columna = parseInt(Math.random() * this.numColumnas);
            
            if (!this.listaCeldas[fila][columna].comprobarValor('MINA')) {
                this.listaCeldas[fila][columna].setValor('MINA');
                contador++;
            }
        } while (contador < this.numMinas);
    }

    colocarNumeroMinas() {
        for (let fila of this.listaCeldas) {
            for (let celda of fila) {
                if (celda.comprobarValor('MINA')) {
                    for (let vecino of celda.vecinos) {
                        if (!vecino.comprobarValor('MINA') && vecino.comprobarValor("")) {
                            vecino.setValor(1);
                        } else if (!vecino.comprobarValor('MINA')){
                            vecino.setValor(vecino.getValor()+1);
                        }
                    }
                }
            }
        }
    }

    recalcular(...nuevosValores) {
        if (nuevosValores.length == 0) {
            super.recalcular();
            this.colocarMinas();
            this.colocarNumeroMinas();
        } else if (nuevosValores.length == 3) {
            super.recalcular(nuevosValores[0], nuevosValores[1]);
            this.numMinas = nuevosValores[2];
            this.colocarMinas();
            this.colocarNumeroMinas();
        }
    }

}

class Celda {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
        this.contenido = "";
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

let patronTablero = /^[0-1]?[0-9]$/
    do {
        numFilas = prompt('Indica el número de filas que deseas');
    } while (!patronTablero.test(numFilas))
    
    do {
        numColumnas = prompt('Indicar el número de columna que deseas');
    } while (!patronTablero.test(numColumnas));
    
    do {
        numMinas = prompt('Indica el número de minas que deseas');
    } while (numMinas > numFilas*numColumnas);

let tableroBuscaminas = new TableroBuscaminas(numFilas, numColumnas, numMinas);
tableroBuscaminas.dibujar();
// tableroBuscaminas.recalcular(5,5,10);
// tableroBuscaminas.dibujar();