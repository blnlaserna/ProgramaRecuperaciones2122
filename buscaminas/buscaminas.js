function dibujarTablero(tablero) {
    document.write(`<table>`);
    for (let i=0; i<tablero.length; i++) {
        document.write(`<tr></tr>`);

        for (let j=0; j<tablero[i].length; j++) {
            document.write(`<td>${tablero[i][j]}</td>`);
        }
    }
    document.write(`</table>`);
}

function crearTableroVacio(numFilas, numColumnas) {
    let tableroVirtual = new Array();

    for (let i=0; i<numFilas; i++) {
        tableroVirtual[i] = new Array();

        for (let j=0; j<numColumnas; j++) {
            tableroVirtual[i][j] = "";
        }
    }

    return tableroVirtual;
}


function colocarMinasTablero(tablero, numMinas) {
    let contador = 0;

    do {
        fila = parseInt(Math.random()*tablero.length);
        columna = parseInt(Math.random()*tablero.length);

        if (tablero[fila][columna] != 'MINA') {
            tablero[fila][columna] = 'MINA';
            contador++;
        }

    } while (contador < numMinas);

    return tablero;
} 

function colocarNumeroMinas(tablero) {
    for (let fila=0; fila<tablero.length; fila++) {
        for (let columna=0; columna<tablero[fila].length; columna++) {
            if (tablero[fila][columna] == 'MINA') {
                if (fila == 0) {
                    if (columna == 0) {
                        comprobarEsquinaSuperiorIzq(tablero, fila, columna); 
                    } else if (columna == tablero[fila].length-1) {
                        comprobarEsquinaSuperiorDcha(tablero, fila, columna);
                    } else {
                        comprobarBordeSuperior(tablero, fila, columna);
                    }
                } else if (fila == tablero.length-1) {
                    if (columna == 0) {
                        comprobarEsquinaInferiorIzq(tablero, fila, columna);
                    } else if (columna == tablero[fila].length-1) {
                        comprobarEsquinaInferiorDcha(tablero, fila, columna);
                    } else {
                        comprobarBordeInferior(tablero, fila, columna);
                    }
                 } else {
                    if (columna == 0) {
                        comprobarBordeIzq(tablero, fila, columna);
                    } else if (columna == tablero[fila].length-1) {
                        comprobarBordeDcho(tablero, fila, columna);
                    } else {
                        comprobarInterior(tablero, fila, columna);
                    }
                }
            }
        }
    }
    return tablero
}

function comprobarCeldasTablero(tablero, numFila, numColumna) {
    if (tablero[numFila][numColumna] != 'MINA') {
        if (tablero[numFila][numColumna] == "") {
            tablero[numFila][numColumna] = 1;
        } else {
            tablero[numFila][numColumna] = tablero[numFila][numColumna] + 1;
        }
        
    }
}

function comprobarEsquinaSuperiorIzq(tablero, fila, columna) {
    comprobarCeldasTablero(tablero, fila + 1, columna);
    comprobarCeldasTablero(tablero, fila + 1, columna+1);
    comprobarCeldasTablero(tablero, fila, columna + 1);
}

function comprobarEsquinaSuperiorDcha(tablero, fila, columna) {
    comprobarCeldasTablero(tablero, fila, columna-1);
    comprobarCeldasTablero(tablero, fila+1, columna-1);
    comprobarCeldasTablero(tablero, fila+1, columna);
}

function comprobarBordeSuperior(tablero, fila, columna) {
    comprobarCeldasTablero(tablero, fila, columna-1);
    comprobarCeldasTablero(tablero, fila+1, columna-1);
    comprobarCeldasTablero(tablero, fila+1, columna);
    comprobarCeldasTablero(tablero, fila+1, columna+1);
    comprobarCeldasTablero(tablero, fila, columna+1);
}

function comprobarEsquinaInferiorIzq(tablero, fila, columna) {
    comprobarCeldasTablero(tablero, fila-1, columna);
    comprobarCeldasTablero(tablero, fila-1, columna+1);
    comprobarCeldasTablero(tablero, fila, columna+1);
}

function comprobarEsquinaInferiorDcha(tablero, fila, columna) {
    comprobarCeldasTablero(tablero, fila-1, columna-1);
    comprobarCeldasTablero(tablero, fila-1, columna);
    comprobarCeldasTablero(tablero, fila, columna-1);
}

function comprobarBordeInferior(tablero, fila, columna) {
    comprobarCeldasTablero(tablero, fila, columna-1);
    comprobarCeldasTablero(tablero, fila-1, columna-1);
    comprobarCeldasTablero(tablero, fila-1, columna);
    comprobarCeldasTablero(tablero, fila-1, columna+1);
    comprobarCeldasTablero(tablero, fila, columna+1);
}

function comprobarBordeIzq(tablero, fila, columna) {
    comprobarCeldasTablero(tablero, fila-1, columna);
    comprobarCeldasTablero(tablero, fila-1, columna+1);
    comprobarCeldasTablero(tablero, fila, columna+1);
    comprobarCeldasTablero(tablero, fila+1, columna+1);
    comprobarCeldasTablero(tablero, fila+1, columna);
}

function comprobarBordeDcho(tablero, fila, columna) {
    comprobarCeldasTablero(tablero, fila-1, columna);
    comprobarCeldasTablero(tablero, fila-1, columna-1);
    comprobarCeldasTablero(tablero, fila, columna-1);
    comprobarCeldasTablero(tablero, fila+1, columna-1);
    comprobarCeldasTablero(tablero, fila+1, columna);
}

function comprobarInterior(tablero, fila, columna) {
    comprobarCeldasTablero(tablero, fila-1, columna-1);
    comprobarCeldasTablero(tablero, fila-1, columna);
    comprobarCeldasTablero(tablero, fila-1, columna+1);
    comprobarCeldasTablero(tablero, fila, columna-1);
    comprobarCeldasTablero(tablero, fila, columna+1);
    comprobarCeldasTablero(tablero, fila+1, columna-1);
    comprobarCeldasTablero(tablero, fila+1, columna);
    comprobarCeldasTablero(tablero, fila+1, columna+1);
}

function empezar() {
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
    
    let tablero = crearTableroVacio(numFilas, numColumnas);
    tablero = colocarMinasTablero(tablero, numMinas);
    tablero = colocarNumeroMinas(tablero);
    dibujarTablero(tablero);
}

empezar();