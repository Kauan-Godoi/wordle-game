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

async function iniciarJogo() {
    const palavras = await carregarDatabase();
    const palavraSorteada = escolherPalavraAleatoria(palavras);

    console.log("A palavra sorteada é: ", palavraSorteada);
}

let tentativaAtual = "";
const limiteLetras = 5;
let rowAtual = 0;

const manipularTeclado = (evento) => {
    const tecla = evento.key.toUpperCase();

		
    if (tecla === "BACKSPACE") {
        tentativaAtual = tentativaAtual.slice(0, -1);
        atualizarInterface();
        console.log("Apagou: ", tentativaAtual);
        atualizarInterface();
        return;
    }

    if (tecla === "ENTER"){
        if (tentativaAtual.length === limiteLetras) {
            console.log("Tentativa enviado: ", tentativaAtual);
            
            rowAtual ++;
            tentativaAtual = "";
        }else{
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
	const square = row[rowAtual].querySelectorAll(".square");
	
	square.forEach((square, indice) => {
		if (tentativaAtual[indice]) {
			square.textContent = tentativaAtual[indice];
		}else{
			square.textContent = "";
		}

	});
};

window.addEventListener("keydown", manipularTeclado);
if (typeof module !== 'undefined'){

    module.exports = {
        escolherPalavraAleatoria,
        carregarDatabase
    }
}    
