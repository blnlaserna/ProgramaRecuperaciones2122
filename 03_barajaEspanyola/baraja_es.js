function dibujarMesa() {
    document.write(`<h1>Baraja española</h1>`);
    document.write(`<br>`);
    document.write(`<div>`);
    for (let i=0; i<8; i++) {
        document.write(`<div style='border:3px solid; max-width:200px; max-height: 200px; background-color:lightblue; margin:10px; padding: 30px; display:inline;'>`)
        document.write(`</div>`);
    }
    document.write(`</div>`);
}

function crearBaraja() {
    let baraja = [];
    let palo = ['oros', 'espadas', 'bastos', 'copas'];
    let sotaCaballoRey = ['sota', ' caballo', 'rey'];

    for (let i=0; i<4; i++) {
        for (let j=0; j<10; j++) {
            if (j>=7) {
                baraja.push(`${sotaCaballoRey[j-7]} de ${palo[i]}`);
            } else {
                if (j == 0) {
                    baraja.push(`As de ${palo[i]}`);
                } else {
                    baraja.push(`${j+1} de ${palo[i]}`);
                }  
            }  
        }
    }

    return baraja;
}

function barajar (baraja) {
    return baraja.sort(()=> Math.random() - 0.5);;
}

function extraerCartas(baraja, numCartas) {
    let cartas = [];
    for (let i=1; i<= numCartas; i++) {
        cartas.push(baraja.splice([baraja.length - 1], 1));
    }

    return cartas;
}

function añadirCartas(cartas){
    if (cartas.length != 0)  {
        for (let i=0; i < cartas.length; i++) {
            arrayDiv[i].innerHTML = cartas[i].toString();
        }
    }
 }

function empezar() {
    let baraja = barajar(crearBaraja());
    console.log(baraja);
    let carta = extraerCartas(baraja, 8);
    console.log(carta);
}

empezar();

