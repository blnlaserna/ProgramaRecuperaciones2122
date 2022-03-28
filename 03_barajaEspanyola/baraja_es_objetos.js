class Carta {

    constructor(palo, valor) {
        this.darValor(palo, valor);
    }

    darValor(palo, valor) {
        if (palo >= 1 && palo <= 4 && valor >= 1 && valor <=10) {
            this.palo = palo;
            this.valor = valor;
        }
    }

    toString() {
        let arrayPalos = ['oros', 'espadas', 'bastos', 'copas'];
        let sotaCaballoRey = ['sota', ' caballo', 'rey'];

        if (this.valor  >= 8) {
            return `${sotaCaballoRey[this.valor - 8]} de ${arrayPalos[this.palo - 1]}`
        } else {
            if (this.valor == 1) {
                return `As de ${arrayPalos[this.palo - 1]}`
            } else {
                return `${this.valor} de ${arrayPalos[this.palo - 1]}`;
            }  
        }  

    }

}

class Baraja {
    constructor() {
        this.cartas = [];

        for (let i=0; i< 4; i++) {
            this.cartas[i] = [];
            for (let j=0; j<10; j++) {
                this.cartas[i][j] = new Carta(i+1, j+1);
            }
        }
    }

    barajar() {
        let palo1;
        let palo2;
        let cartaPalo1;
        let cartaPalo2;
        let numeroVueltas = 500;
     
         for (let i = 1; i <= numeroVueltas; i++) {
             palo1 = parseInt(Math.random()*this.cartas.length);
             palo2 = parseInt(Math.random()*this.cartas.length);
             
             cartaPalo1 = parseInt(Math.random() * this.cartas[0].length);
             cartaPalo2 = parseInt(Math.random() * this.cartas[0].length);
                 
             [this.cartas[palo1][cartaPalo1], this.cartas[palo2][cartaPalo2]] = [this.cartas[palo2][cartaPalo2], this.cartas[palo1][cartaPalo1]]; 
         }
     }

     toString() {
         let baraja = [];
         for (let i = 0; i < this.cartas.length; i++) {
             baraja[i] = [];
             for (let j = 0; j < this.cartas[i].length; j++) {
                 baraja[i][j] = this.cartas[i][j].toString();
             }
         }

         return baraja.join();
     }
}


function empezar() {
    let baraja1 = new Baraja();
    console.log(baraja1.toString());
    baraja1.barajar();
    console.log(baraja1.toString());
};

empezar();
