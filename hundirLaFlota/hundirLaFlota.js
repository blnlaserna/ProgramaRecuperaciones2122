function dibujarTablero(tablero) {
    document.write(`<table>`);
    for (let i=0; i<tablero.length; i++) {
        document.write(`<tr></tr>`);

        for (let j=0; j<tablero[i].length; j++) {
            if (tablero[i][j] == 'X') {
                document.write(`<td bgcolor= "#000000" ></td>`);
            } else {
                document.write(`<td></td>`);
            }
            
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

function contieneBarco(tablero, numFila, numColumna) {
    if (tablero[numFila][numColumna] == 'X') {
        return true;
    }

    return false;
}

function esSentidoValido(tablero, fila, columna, limiteInferior, limiteSuperior, limiteIzq, limiteDcha){
    // Devuelve true si en este sentido cabe el barco cumpliendo las condiciones

    let esValido = [];
    
    for (let i=limiteSuperior; i<=limiteInferior; i++) {
        for (let j=limiteIzq; j<=limiteDcha; j++) {
            if ((fila+i >= 0) && (columna+j >= 0) && (fila+i <= tablero.length - 1) && (columna+j <= tablero[fila].length - 1)) {
                esValido.push(!contieneBarco(tablero, fila+i, columna+j));
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


function insertarBarco(tablero, numBarcos, longitudBarco) {
    let contadorBarcos = 0;
    let fila;
    let columna; 

    do {
        fila = parseInt(Math.random()*tablero.length);
        columna = parseInt(Math.random()*tablero[fila].length);

        // Comprobamos cada sentido y en el primero que sea válido se introduce el barco
        if (esSentidoValido(tablero, fila, columna, 1, -1, -longitudBarco, 1)) { // Comprobar si el sentido hacia la izquierda es válido
            for (let j=columna - (longitudBarco - 1); j<=columna; j++) {
                tablero[fila][j] = 'X';
            }
            contadorBarcos++;
        } else if (esSentidoValido(tablero, fila, columna, 1, -1, -1, longitudBarco)) { // Comprobar si el sentido hacia al derecha es válido
            for (let j=columna; j<= (columna + (longitudBarco - 1)); j++) {
                tablero[fila][j] = 'X';
            }
            contadorBarcos++;
        } else if (esSentidoValido(tablero, fila, columna, 1, -longitudBarco, -1, 1)) { // Comprobar si el sentido hacia arriba es válido
            for (let i=fila - (longitudBarco - 1); i<= fila; i++) {
                tablero[i][columna] = 'X';
            }
            contadorBarcos++;
        } else if (esSentidoValido(tablero, fila, columna, longitudBarco, -1, -1, 1)) { // Comprobar si el sentido hacia abajo es válido
            for (let i=fila; i<= fila + (longitudBarco - 1); i++) {
                tablero[i][columna] = 'X';
            }
            contadorBarcos++;
        }
    } while (contadorBarcos < numBarcos)
    
    return tablero;
}

function empezar() {
    
    let tablero = crearTableroVacio(10, 10);
    tablero = insertarBarco(tablero, 1, 4); // Insertar portaviones
    tablero = insertarBarco(tablero, 3, 3); // Insertar acorazados
    tablero = insertarBarco(tablero, 3, 2); // Insertar destructores
    tablero = insertarBarco(tablero, 2, 1); // Insertar fragatas
    dibujarTablero(tablero);
}

empezar();