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

if (typeof module !== 'undefined'){

    module.exports = {
        escolherPalavraAleatoria,
        carregarDatabase
    }
}    