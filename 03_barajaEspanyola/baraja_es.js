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
        baraja[i] = [];
        for (let j=0; j<10; j++) {
            if (j>=7) {
                baraja[i][j] = `${sotaCaballoRey[j-7]} de ${palo[i]}`
            } else {
                if (j == 0) {
                    baraja[i][j] = `As de ${palo[i]}`
                } else {
                    baraja[i][j] = `${j+1} de ${palo[i]}`;
                }  
            }  
        }
    }

    return baraja;
}

function barajar (baraja) {
   let palo1;
   let palo2;
   let cartaPalo1;
   let cartaPalo2;
   let numeroVueltas = 500;

    for (let i = 1; i <= numeroVueltas; i++) {
        palo1 = parseInt(Math.random()*baraja.length);
        palo2 = parseInt(Math.random()*baraja.length);
        
        cartaPalo1 = parseInt(Math.random() * baraja[0].length);
        cartaPalo2 = parseInt(Math.random() * baraja[0].length);
            
        [baraja[palo1][cartaPalo1], baraja[palo2][cartaPalo2]] = [baraja[palo2][cartaPalo2], baraja[palo1][cartaPalo1]];
        
    }
    return baraja;
}


