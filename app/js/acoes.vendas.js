(() => {
    window.addEventListener('load', (e) => {
        let date = new Date();
        date = date.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD
        document.querySelector('[name="datainicio"]').value = date;
        document.querySelector('[name="datafim"]').value = date;
        document.querySelector(".carregando").classList.add("d-none");
        buscarDados();
    })

    document.getElementById('btn-buscar-filtro').addEventListener('click', async()=> {
        console.log('clicou no botao buscar filtro');
        if (await buscaAvancada()){
            console.log('busca avançada realizada com sucesso');
        }
    });

})();

async function buscaAvancada() {
    
}

async function buscarDados() {
    let datainicio = new Date();
    let datafim = new Date();
    if (document.querySelector('[name="datainicio"]').value == "" || document.querySelector('[name="datafim"]').value == "") {
        datainicio = datainicio.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD
        datafim = datafim.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD

    }else{
        datainicio = document.querySelector('[name="datainicio"]').value; 
        datafim = document.querySelector('[name="datafim"]').value; 

    }
    
    
    const tipoBusca = new FormData();
    tipoBusca.append('action', 'relatorioDiario');
    tipoBusca.append('datainicio', datainicio);
    tipoBusca.append('datafinal', datafim);
    const env = await fetch('../../routes/api/vendas.php', {
        method: 'POST',
        body: tipoBusca
    })

    const res = await env.json();

    if (res.status === 'success') {

        if (res.result.QtdVendas > 0) {
            preencherTabelaDeProdutos(res.result)
        }
        return true;

    } else {
        chamarTelaAvisos('danger', res.result);
    }
}

async function preencherTabelaDeProdutos(data) {

    document.getElementById('qtd-total-venda').textContent = data.QtdVendas;
    document.getElementById('valor-total-venda').textContent = `${getConversaoParaMoeda(data.VrVendido)}`;
    document.getElementById('valor-taxa-entrega').textContent = `${getConversaoParaMoeda(data.txMaquininha)} + ${getConversaoParaMoeda(data.txEntrega)}`;

    let body = document.querySelector('.content-body');
    body.innerHTML = "";
    let tabela = document.createElement('div');
    tabela.classList.add('dados-venda');
    tabela.innerHTML = '';
    tabela.innerHTML = `
        <div class="content-button">
            <button class="btn bg-success btn-responsivo" id="btn-filtro-avancado" id-modal="modal-filtro" attr="modal" show="abrir">Filtro</button>
        </div>`;
    const vendas = await montarPedidoxProdutos(data.cadPedido, data.mvPedido);

    vendas.forEach((venda) => {
        // Criar o container principal da venda
        const divVenda = document.createElement('div');
        divVenda.classList.add('dados-venda');

        // Montar o título
        divVenda.innerHTML += `
        <div class="dados-venda-titulo">
            <div class="dados-venda-titulo-item"><p>Pedido</p></div>
            <div class="dados-venda-titulo-item ocultar-responsivo"><p>Data</p></div>
            <div class="dados-venda-titulo-item"><p>Valor</p></div>
            <div class="dados-venda-titulo-item"><p>Taxa + Entrega</p></div>
        </div>
        <div class="dados-venda-conteudo">
            <div class="dados-venda-conteudo-item"><p>#${venda.idPedido}</p></div>
            <div class="dados-venda-conteudo-item ocultar-responsivo"><p>${venda.DataPedido}</p></div>
            <div class="dados-venda-conteudo-item"><p>R$ ${getConversaoParaMoeda(venda.ValorPedido)}</p></div>
            <div class="dados-venda-conteudo-item"><p>R$ ${getConversaoParaMoeda(venda.ValorEntrega)} + ${getConversaoParaMoeda(venda.ValorAdicional)}</p></div>
        </div>
    `;

        // Criar a div de itens
        const divItens = document.createElement('div');
        divItens.classList.add('itens-venda');

        // Verificar se produtos é um array
        if (Array.isArray(venda.produtos)) {
            venda.produtos.forEach((item) => {
                const pItem = document.createElement('p');
                pItem.textContent = `${item.Qtd} x ${item.DescricaoProduto} R$ ${getConversaoParaMoeda(item.VrVenda)}`;
                divItens.appendChild(pItem);
            });
        } else {
            // Se não for array, mostra só um
            const pItem = document.createElement('p');
            pItem.textContent = `${venda.produtos.Qtd} x ${venda.produtos.DescricaoProduto} R$ ${getConversaoParaMoeda(venda.produtos.VrVenda)}`;
            divItens.appendChild(pItem);
        }

        // Adiciona a divItens dentro da divVenda
        divVenda.appendChild(divItens);

        // Adiciona toda a venda na tabela
        tabela.appendChild(divVenda);
    });

    body.appendChild(tabela);
}

async function montarPedidoxProdutos(pedido, produtos) {
    const buscarProduto = await fetch('../../routes/api/produtos.php?busca=all');
    const todosProdutos = await buscarProduto.json();
    // Criar um mapa para acesso rápido aos dados de todosProdutos por IdProduto
    const catalogoProdutos = new Map();
    todosProdutos.result.produtos.forEach(prod => {
        catalogoProdutos.set(prod.IdProduto, prod);
    });

    const Pedidos = pedido;
    const Itens = produtos;
    const produtosPorPedido = new Map();

    Itens.forEach(produto => {
        if (!produtosPorPedido.has(produto.NumPedido)) {
            produtosPorPedido.set(produto.NumPedido, []);
        }
        produtosPorPedido.get(produto.NumPedido).push(produto);
    });

    const pedidosCompletos = Pedidos.map(pedido => {
        const produtos = produtosPorPedido.get(pedido.Controle) || [];

        // Enriquecer cada produto com os dados do catálogo
        const produtosCompletos = produtos.map(item => {
            const dadosCatalogo = catalogoProdutos.get(item.IdProduto) || {};
            return {
                ...item,
                ...dadosCatalogo // adiciona os dados extras como Nome, Descricao, etc.
            };
        });

        return {
            ...pedido,
            produtos: produtosCompletos
        };
    });

    return pedidosCompletos;
}
