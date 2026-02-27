const carregarDatabase = async () => {

    try {
        const conexao = await fetch('/json/database.json');

        const database = await conexao.json();

        return database;
    } catch (error) {

        console.error("Erro ao carregar o banco de dados:", error);
    }

}

const escolherPalavraAleatoria = (listaDePalavras) => {
    const indiceAleatorio = Math.floor(Math.random() * listaDePalavras.length);

    return listaDePalavras[indiceAleatorio];
}

let tentativaAtual = "";
const limiteLetras = 5;
let rowAtual = 0;
let palavraSorteada = "";

async function iniciarJogo() {
    const palavras = await carregarDatabase();
    palavraSorteada = escolherPalavraAleatoria(palavras).toUpperCase();

    console.log("A palavra sorteada é: ", palavraSorteada);
}

const manipularTeclado = (evento) => {
    const tecla = evento.key.toUpperCase();

    if (tecla === "BACKSPACE") {
        tentativaAtual = tentativaAtual.slice(0, -1);
        atualizarInterface();
        console.log("Apagou: ", tentativaAtual);
        atualizarInterface();
        return;
    }

    if (tecla === "ENTER") {
        if (tentativaAtual.length === limiteLetras) {
            verificaPalpite();

            rowAtual++;
            tentativaAtual = "";
        } else {
            alert("Presisa 5 letras!")
        }
        return;
    }

    if (/^[A-Z]$/.test(tecla) && tentativaAtual.length < limiteLetras) {
        tentativaAtual += tecla;
        atualizarInterface();
        console.log("Digitou:", tentativaAtual);
        atualizarInterface();
    }

}

const atualizarInterface = () => {
    const row = document.querySelectorAll(".row");
    const squares = row[rowAtual].querySelectorAll(".square");

    squares.forEach((square, indice) => {
        if (tentativaAtual[indice]) {
            square.textContent = tentativaAtual[indice];
        } else {
            square.textContent = "";
        }

    });
};

const atualizaTeclado = (letra, classe) => {
    const botao = document.querySelectorAll(".button");

    botao.forEach((botao) => {
        if (botao.textContent.toUpperCase() === letra.toUpperCase()) {

            if (!botao.classList.contains("correta")) {
                botao.classList.add(classe);
            }

            if (classe === "correta") {
                botao.classList.remove("presente", "ausente");
                botao.classList.add("correta");
            }
        }
    });
};

const verificaPalpite = () => {
    const row = document.querySelectorAll(".row");
    const squares = row[rowAtual].querySelectorAll(".square");
    const palpiteArray = tentativaAtual.split("");
    const palavraArray = palavraSorteada.split("");

    palpiteArray.forEach((letra, i) => {
        if (letra === palavraArray[i]) {
            squares[i].classList.add("correta");
            palavraArray[i] = null;
            atualizaTeclado(letra, "correta");
        }
    });

    palpiteArray.forEach((letra, i) => {
        if (!squares[i].classList.contains("correta")) {
            if (palavraArray.includes(letra)) {
                squares[i].classList.add("presente")
                palavraArray[palavraArray.indexOf(letra)] = null;
                atualizaTeclado(letra, "presente");
            } else {
                squares[i].classList.add("ausente");
                atualizaTeclado(letra, "ausente")
            };
        };
    });

    if (tentativaAtual === palavraSorteada) {
        setTimeout(() => alert("Parabens, voce acertou!"), 100)
    }

}


window.addEventListener("keydown", manipularTeclado);

iniciarJogo();
if (typeof module !== 'undefined'){

    module.exports = {
        escolherPalavraAleatoria,
        carregarDatabase
    }
}    
