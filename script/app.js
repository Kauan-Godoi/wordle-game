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
        return;
    }

    if (tecla === "ENTER") {
        if (tentativaAtual.length === limiteLetras) {
            verificaPalpite();

            rowAtual++;
            tentativaAtual = "";
        } else {
            precisaDeCincoLetras();
        }
        return;
    }

    if (/^[A-Z]$/.test(tecla) && tentativaAtual.length < limiteLetras) {
        tentativaAtual += tecla;
        atualizarInterface();
        console.log("Digitou:", tentativaAtual);
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
        acertouPalavra();
        window.removeEventListener("keydown", manipularTeclado);
    }

    if (rowAtual === 5) {
        ExcedeuTentativas(palavraSorteada);
        window.removeEventListener("keydown", manipularTeclado);
        document.getElementById("btn-reiniciar").style.display = "block";
    }

}

function acertouPalavra() {
    Toastify({
        text: "Boa! Você acertou a palavra!",
        duration: 10000,
        close: true,
        gravity: "top",
        position: "center",
        style: {
            background: "linear-gradient(to right, #538D4E)"
        }
    }).showToast();
}

function precisaDeCincoLetras() {
    Toastify({
        text: "A palavra não tem 5 letras",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        style: {
            background: "linear-gradient(to right, #B59F3B)"
        }
    }).showToast();
}

function ExcedeuTentativas(palavraCerta) {
    Toastify({
        text: `Acabou as chances! A palavra correta era: ${palavraCerta}`,
        duration: 10000,
        close: true,
        gravity: "top",
        position: "center",
        style: {
            background: "linear-gradient(to right, #ff5f6d)"
        }
    }).showToast();
}

function reiniciarJogo() {
    tentativaAtual = "";
    rowAtual = 0;
    palavraSorteada = "";

    const squares = document.querySelectorAll(".square");
    squares.forEach(s => {
        s.textContent = "";
        s.classList.remove("correta", "presente", "ausente");
    });

    const botoes = document.querySelectorAll(".button");
    botoes.forEach(b => b.classList.remove("correta", "presente", "ausente"));

    window.addEventListener("keydown", manipularTeclado);

    iniciarJogo();

    Toastify({ text: "Jogo Reiniciado!" }).showToast();
}

window.addEventListener("keydown", manipularTeclado);

iniciarJogo();   
