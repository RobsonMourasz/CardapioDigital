(() => {
    window.addEventListener('load', (e) => {
        document.querySelector(".carregando").classList.add("d-none");
        buscarDados();
    })

})();

async function buscarDados() {
    let date = new Date();
    date = date.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD
    const tipoBusca = new FormData();
    tipoBusca.append('action', 'relatorioDiario');
    tipoBusca.append('datainicio', date);
    tipoBusca.append('datafinal', date);
    const env = await fetch('../../routes/api/vendas.php', {
        method: 'POST',
        body: tipoBusca
    })

    const res = await env.json();

    if (res.status === 'success') {

        if (res.result.QtdVendas > 0) {
            document.getElementById('msg-sem-dados').textContent = 'Vendas encontradas';
            document.getElementById('qtd-total-venda').textContent = res.result.QtdVendas;
            document.getElementById('valor-total-venda').textContent = `R$ ${res.result.VrVendido.toFixed(2).replace('.', ',')}`;
            document.getElementById('valor-taxa-entrega').textContent = `R$ ${res.result.txMaquininha.toFixed(2).replace('.', ',')} + ${res.result.txEntrega.toFixed(2).replace('.', ',')}`;
            preencherTabelaDeProdutos(res.result)
        }

    } else {
        chamarTelaAvisos('danger', res.result);
    }
}

async function preencherTabelaDeProdutos(data) {
    let body = document.querySelector('.content-body');
    body.innerHTML = "";
    let tabela = document.createElement('div');
    tabela.classList.add('dados-venda');
    tabela.innerHTML = '';
    const vendas = await montarPedidoxProdutos(data.cadPedido, data.mvPedido);
    console.log(vendas)
    vendas.forEach((venda) => {
        // Criar o container principal da venda
        const divVenda = document.createElement('div');
        divVenda.classList.add('dados-venda');

        // Montar o título
        divVenda.innerHTML = `
        <div class="dados-venda-titulo">
            <div class="dados-venda-titulo-item"><p>Pedido</p></div>
            <div class="dados-venda-titulo-item"><p>Data</p></div>
            <div class="dados-venda-titulo-item"><p>Valor</p></div>
            <div class="dados-venda-titulo-item"><p>Taxa + Entrega</p></div>
        </div>
        <div class="dados-venda-conteudo">
            <div class="dados-venda-conteudo-item"><p>#${venda.idPedido}</p></div>
            <div class="dados-venda-conteudo-item"><p>${venda.DataPedido}</p></div>
            <div class="dados-venda-conteudo-item"><p>R$ ${venda.ValorPedido}</p></div>
            <div class="dados-venda-conteudo-item"><p>R$ ${venda.ValorEntrega} + ${venda.ValorAdicional}</p></div>
        </div>
    `;

        // Criar a div de itens
        const divItens = document.createElement('div');
        divItens.classList.add('itens-venda');

        // Verificar se produtos é um array
        if (Array.isArray(venda.produtos)) {
            venda.produtos.forEach((item) => {
                const pItem = document.createElement('p');
                pItem.textContent = `${item.Qtd} x ${item.DescricaoProduto} R$ ${item.VrVenda}`;
                divItens.appendChild(pItem);
            });
        } else {
            // Se não for array, mostra só um
            const pItem = document.createElement('p');
            pItem.textContent = `${venda.produtos.Qtd} x ${venda.produtos.DescricaoProduto} R$ ${venda.produtos.VrVenda}`;
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
