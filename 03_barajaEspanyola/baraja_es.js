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

