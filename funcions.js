let color = ["vermell", "verd", "groc", "blau", "rosa", "negre", "taronja", "lila"]; // Variables de colors
let sequencia = [];
let resposta = [];
let ronda = 0;
let bloquejat = false;
let jocEnMarxa = false;

// Funció que fa esperar un temps determinat
function esperar(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// Funció per generar la seqüència aleatòria de colors
async function Simon() {
    resposta = []; // Reiniciar la resposta abans de cada nova ronda
    let colorRandom = Math.floor(Math.random() * color.length);
    sequencia.push(color[colorRandom]); // Afegir un nou color a la seqüència
    console.log(`Ronda ${ronda + 1}:`, sequencia);
    await mostrarColor(); // Mostrar els colors de la seqüència actual
}

// Funció per traduir el nom del color en català a anglès
function traduirColor(nomColor) {
    const traduccio = {
        "vermell": "red",
        "verd": "green",
        "groc": "yellow",
        "blau": "blue",
        "rosa": "pink",
        "negre": "black",
        "taronja": "orange",
        "lila": "purple"
    };
    return traduccio[nomColor] || "white";
}

// Funció per mostrar els colors de la seqüència a la pantalla
async function mostrarColor() {
    bloquejat = true; // Bloquejar les interaccions de l'usuari mentre es mostra la seqüència
    let cuadrado = document.querySelector(".cuadrado");

    for (let color of sequencia) {
        cuadrado.style.backgroundColor = traduirColor(color); // Mostrar el color
        await esperar(1000); // Esperar 1 segon
        cuadrado.style.backgroundColor = "white"; // Tornar al color negre
        await esperar(500); // Esperar 0.5 segons
    }

    bloquejat = false; // Desbloquejar l'interacció quan s'ha acabat de mostrar la seqüència
}

// Funció per gestionar la resposta del jugador
function Botopitjat(colorUsuari) {
    if (bloquejat) return; // Evitar que el jugador faci clic mentre es mostra la seqüència

    resposta.push(colorUsuari); // Afegir el color a la resposta

    // Comprovar si la resposta actual coincideix parcialment amb la seqüència
    if (resposta.join() === sequencia.join()) {
        // Si la resposta és correcta, continuar a la següent ronda
        ronda++; // Incrementar la ronda
        if (ronda < 8) { // Comprovar si la seqüència ha arribat a 8 rondes
            setTimeout(() => {
                Simon(); // Mostrar la següent seqüència
            }, 1000);
        } else {
            setTimeout(() => {
                alert("Has acabat!");
                iniciarJoc(); // Reiniciar el joc si la seqüència es completa
            }, 1000);
        }
    } else if (resposta.join() !== sequencia.slice(0, resposta.length).join()) {
        // Si la resposta no coincideix amb la seqüència fins al moment, el jugador ha fallat
        alert("Has perdut la ronda");
        setTimeout(() => iniciarJoc(), 1000); // Reiniciar el joc
    }
}

// Funció per iniciar el joc
function iniciarJoc() {
    if (jocEnMarxa) return; // Evitar que el joc comenci si ja està en marxa

    jocEnMarxa = true; // Marcar que el joc ha començat
    sequencia = [];
    resposta = [];
    ronda = 0;
    Simon(); // Començar a generar la seqüència aleatòria
}
