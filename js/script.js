// Array para armazenar os pedidos
var pedidos = [];

// Função para adicionar um novo pedido
function adicionarPedido() {
    var nome = document.getElementById('nome').value;
    var item = document.getElementById('item').value;
    var quantidade = document.getElementById('quantidade').value;
    var obs = document.getElementById('obs').value;  // Adicionei a captura de observações
    var telefone = document.getElementById('telefone').value;

    // Validar dados do formulário (adicionar lógica de validação conforme necessário)

    // Criar um objeto para representar o pedido
    var novoPedido = {
        nome: nome,
        item: item,
        quantidade: quantidade,
        obs: obs,
        telefone: telefone,
        total: calcularTotalPedido(item, quantidade),
        hora: new Date() // Adiciona a hora atual ao pedido
    };

    // Adicionar o pedido ao array
    pedidos.push(novoPedido);

    // Atualizar a lista de pedidos na interface
    atualizarListaPedidos();

    // Limpar os campos do formulário
    limparCamposFormulario();

    // Calcular o total geral dos pedidos
    calcularTotal();
}

// Função para calcular o total de um pedido com base no item e quantidade
function calcularTotalPedido(item, quantidade) {
    // Definir os valores dos itens conforme necessário
    var valores = {
        'X Salada': 22.00,
        'X Egg': 23.00,
        'X Bacon': 25.00,
        'X Frango Catupiry': 26.00,
        'X Tudo': 27.00,
        'Double Cheddar': 30.00,
        'Chicken Burguer Supremo': 31.00,
        'Burguer Costela Bovina': 33.00,
        'Burguer Goiano': 29.00,
        'Triplo Cheese': 32.00,
        'X-Burguer Salada': 24.00,
        'X-Burguer': 18.00,
        'Combo Double': 40.00,
        'Combo Triplo': 42.00,
        'Combo X-Burguer': 30.00,
        'Combo X-Burguer Salada': 32.00,
        'Barca Especial': 65.00,
        'Porção Batata': 22.00,
        'Porção Batata com Cheddar e Bacon': 25.00,
        'Porção Mista': 45.00,
        'Porção Calabresa': 20.00,
        'Porção Filé Frango': 25.00,
        'Água': 2.50,
        'Dellvale': 6.00,
        'Fanta Lata': 5.00,
        'Coca Lata': 5.00,
        'Coca Zero': 5.00,
        'Sprite': 8.00,
        'Brahma Lata': 4.50,
        'Skol Lata': 4.50,
        'Crystal Lata': 3.50,
        'Coca 2L': 12.00,
        'Poty Guarana': 8.00,
        'Roller': 8.00,
        'Sukita': 8.00,
        'Energético': 10.00,
        'H2O Limoneto': 6.00,
    };

    return quantidade * valores[item];
}


// Função para limpar a lista de pedidos na interface
function limparListaPedidos() {
    var listaPedidos = document.getElementById('pedidoList');
    listaPedidos.innerHTML = ''; // Limpar a lista
}

// Função para limpar todos os campos do formulário, a lista de pedidos, o total do pedido e o horário
function limparTodosCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('item').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('obs').value = '';
    document.getElementById('telefone').value = '';

    // Limpar a lista de pedidos
    limparListaPedidos();

    // Limpar o total do pedido e o horário
    document.getElementById('totalPedido').innerText = '0.00';
    document.getElementById('horaPedido').innerText = '';

    // Limpar o array de pedidos
    pedidos = [];
}


// Função para limpar os campos do formulário
function limparCamposFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('item').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('obs').value = '';  // Limpar campo de observações
    document.getElementById('telefone').value = '';
}

// Função para atualizar a lista de pedidos na interface
function atualizarListaPedidos() {
    var listaPedidos = document.getElementById('pedidoList');
    listaPedidos.innerHTML = ''; // Limpar a lista antes de atualizar

    // Adicionar cada pedido à lista
    for (var i = 0; i < pedidos.length; i++) {
        var pedidoAtual = pedidos[i];
        var novoItemLista = document.createElement('li');
        novoItemLista.textContent = `${pedidoAtual.quantidade} ${pedidoAtual.item}(s) para ${pedidoAtual.nome}, Obs: ${pedidoAtual.obs}, Telefone: ${pedidoAtual.telefone}, Total: R$ ${pedidoAtual.total.toFixed(2)}, Horário: ${obterHoraFormatada(pedidoAtual.hora)}`;
        listaPedidos.appendChild(novoItemLista);
    }

    // Calcular o total geral e atualizar na interface
    calcularTotal();
}


// Função para calcular o total geral dos pedidos e exibir na interface
function calcularTotal() {
    var totalGeral = 0;

    // Calcular o total de todos os pedidos na lista
    for (var i = 0; i < pedidos.length; i++) {
        totalGeral += pedidos[i].total;
    }

    // Exibir o total geral na interface
    document.getElementById('totalPedido').innerText = totalGeral.toFixed(2);

    // Atualizar a hora do pedido
    atualizarHoraPedido();
}

// Função auxiliar para obter a hora atual formatada
function obterHoraFormatada(data) {
    var hora = data.getHours();
    var minutos = data.getMinutes();
    return hora + ':' + (minutos < 10 ? '0' : '') + minutos;
}

// Função para atualizar a hora do pedido
function atualizarHoraPedido() {
    // Obter a hora atual
    var data = new Date();
    var hora = data.getHours();
    var minutos = data.getMinutes();

    // Exibir a hora do pedido
    document.getElementById('horaPedido').innerText = hora + ':' + (minutos < 10 ? '0' : '') + minutos;
}

// Função para imprimir a lista de pedidos com horários e totais
function imprimirEtiquetaLista() {
    // Verificar se há pelo menos um pedido na lista
    if (pedidos.length > 0) {
        var conteudoImpressao = '<h2>Lista de Pedidos</h2>';

        for (var i = 0; i < pedidos.length; i++) {
            var pedidoAtual = pedidos[i];
            conteudoImpressao += `
                <p><strong>Nome:</strong> ${pedidoAtual.nome}</p>
                <p><strong>Item do Menu:</strong> ${pedidoAtual.item}</p>
                <p><strong>Quantidade:</strong> ${pedidoAtual.quantidade}</p>
                <p><strong>Observações:</strong> ${pedidoAtual.obs}</p>
                <p><strong>Telefone:</strong> ${pedidoAtual.telefone}</p>
                <p><strong>Total do Pedido:</strong> R$ ${pedidoAtual.total.toFixed(2)}</p>
                <p><strong>Horário do Pedido:</strong> ${obterHoraFormatada(pedidoAtual.hora)}</p>
                <hr>
            `;
        }

        var janelaImpressao = window.open('', '_blank');
        janelaImpressao.document.write('<html><head><title>Lista de Pedidos</title></head><body>');
        janelaImpressao.document.write(conteudoImpressao);
        janelaImpressao.document.write('</body></html>');
        janelaImpressao.document.close();
        janelaImpressao.print();
    } else {
        alert('Não há pedidos para imprimir.');
    }
}
