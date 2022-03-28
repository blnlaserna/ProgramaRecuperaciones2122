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
}


function empezar() {
    let baraja1 = new Baraja();
    console.log(baraja1.toString());
    baraja1.barajar();
    console.log(baraja1.toString());
};

empezar();
