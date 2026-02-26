const { escolherPalavraAleatoria, carregarDatabase } = require('./app');
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(['MOCK1', 'MOCK2']),
  })
);



describe('Teste 1 - Wordle', () => {

    test('Deve escolher uma palavra que exista na lista enviada', () => {
        const listaFake = ['CASA', 'BOLA', 'DADO'];
        const resultado = escolherPalavraAleatoria(listaFake);
    
        expect(listaFake).toContain(resultado);
    });

    test('Deve carregar o banco de dados (Mock)', async () => {
        const dados = await carregarDatabase();
        expect(dados).toEqual(['MOCK1', 'MOCK2']);
        expect(fetch).toHaveBeenCalled();
    });
});