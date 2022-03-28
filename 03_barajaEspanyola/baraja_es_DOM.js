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

        for (let i=1; i<= 4; i++) {
            for (let j=1; j<= 10; j++) {
                this.cartas.push(new Carta(i, j));
            }
        }
    }

    barajar() {
         this.cartas.sort(()=> Math.random() - 0.5);
         
     }

     toString() {
         let baraja= []
         for (let i=0; i < 40; i++) {
            baraja.push(this.cartas[i].toString());
         }
         return baraja.join();
     }

     extraerCartas(numCartas) {
        let mano = [];
        for (let i=1; i<=numCartas; i++) {
            mano.push(this.cartas.splice(this.cartas[this.cartas.length - 1],1))
        }
    
        return mano;
    }
}

var baraja1 = new Baraja();
baraja1.barajar();

function repartir(baraja) {

    let arrayDiv = document.getElementsByTagName('div');

    if (baraja.cartas.length != 0)  {
        let cartas = baraja.extraerCartas(8);
        
        for (let i=0; i < cartas.length; i++) {
            arrayDiv[i].innerHTML = cartas[i].toString();
        }
    }
}
