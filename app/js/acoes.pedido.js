let pedidosAberto = [];

(() => {

    const modal = new MutationObserver(() => {
        document.querySelectorAll('[id-modal="modal"]').forEach(modal => {
            modal.addEventListener('click', (e) => {

                const modal_id = document.getElementById(e.target.getAttribute('id-modal'))
                const background = modal_id.closest('.background-modal')
                if (e.target.getAttribute('attr') === 'fechar') {
                    background.classList.add('d-none')
                } else {
                    background.classList.remove('d-none')
                    addBotoesModal(pedidosAberto[0].acoes)
                    preencherModal(pedidosAberto[0], e.target.getAttribute('id-pedido'))
                }

            })
        });
    })

    window.addEventListener('DOMContentLoaded', buscarDados())
    window.addEventListener('load', () => {
        document.querySelector('.carregando').classList.add('d-none')
    })
    modal.observe(document.body, { childList: true, subtree: true });
})();

async function buscarDados() {

    const response = await fetch('../../routes/api/pedidos.php?busca=all');
    const dados = await response.json();
    if (dados.status == 'ok') {
        chamarTelaAvisos('success', dados.status);
        carregarPedido(dados.result)
        pedidosAberto.push(dados.result)

    } else {
        chamarTelaAvisos('danger', dados.result)
    }

}


async function carregarPedido(data) {
    let tabela = document.getElementById('add_pedidos');
    tabela.innerHTML = '';
    document.getElementById('info-pedidos').innerHTML = `<div class="qtd-atendimentos">Qtd Pedidos Aberto: ${data.cad_pedido.length}</div>`;

    const produtosPorPedido = new Map();
    data.mv_pedido.forEach(produto => {
        if (!produtosPorPedido.has(produto.NumPedido)) {
            produtosPorPedido.set(produto.NumPedido, []);
        }
        produtosPorPedido.get(produto.NumPedido).push(produto);
    });

    const pedidosCompletos = data.cad_pedido.map(pedido => {
        const produtos = produtosPorPedido.get(pedido.Controle) || [];
        return {
            ...pedido,
            produtos // lista de produtos
        };
    });

    pedidosCompletos.forEach(pedido => {
        let texto = pedido.produtos.map(produto =>
            `📦 Produto: ${produto.DescricaoProduto}\n` +
            `📦 Quantidade: ${produto.Qtd}\n` +
            `💰 Valor: R$ ${produto.VrVenda}\n` +
            `📝 ==== OBSERVACOES ====: ${produto.ObsProduto || 'Nenhuma'} ==== FIM OBSERVACOES ====\n` +
            `🥣 Ingredientes: ${produto.Ingredientes}\n`
        ).join('\n-----------------------------\n');

        let tipoEntrega = '';
        if (pedido.EnderecoEntrega == 'retirada no local.') { tipoEntrega = 'Retirada' } else { tipoEntrega = 'Delivery' }

        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('pedido', pedido.idPedido);
        card.innerHTML = `
            <div class="card-header">
                <h3 class="title-pedido">Comanda: <span>Pedido:${pedido.idPedido}</span></h3>
            </div>
            
            <div class="card-body">
                <textarea name="itens-do-pedido" cols="22" rows="5" readonly>${texto}</textarea>
            </div>
            <div class="card-footer">
                <div class="footer-info">
                    <p class="status-pedido">Status: <span>${pedido.DescriacaoSituacao}</span> </p>
                    <p>(${tipoEntrega})</p>
                </div>
                <div class="botao">
                    <i class="btn bi bi-clipboard2-pulse-fill" id-modal="modal" id-pedido=${pedido.idPedido} attr="abrir"></i>
                </div>
            </div>`;
        tabela.appendChild(card)
    });
}


function addBotoesModal(acoes) {

    let btns = document.getElementById('btn-visualizar-pedidos');
    btns.innerHTML = "";
    //pedidosAberto

    acoes.forEach(btn => {
        let btnAcoes = document.createElement("a");
        btnAcoes.classList.add('btn');
        btnAcoes.classList.add('btn-responsivo');
        btnAcoes.classList.add('bg-success');
        btnAcoes.classList.add('font-8em');
        btnAcoes.href = `?mudarAcao=${btn.DescriacaoSituacao}`;
        btnAcoes.innerText = `${btn.DescriacaoSituacao}`;
        btns.appendChild(btnAcoes);
    });

}

function preencherModal(data, idPedido) {

    let tipoEntrega = '';

    const produtosPorPedido = new Map();
    data.mv_pedido.forEach(produto => {
        if (!produtosPorPedido.has(produto.NumPedido)) {
            produtosPorPedido.set(produto.NumPedido, []);
        }
        produtosPorPedido.get(produto.NumPedido).push(produto);
    });

    const pedidosCompletos = data.cad_pedido.map(pedido => {
        const produtos = produtosPorPedido.get(pedido.Controle) || [];
        return {
            ...pedido,
            produtos // lista de produtos
        };
    });

    const comandaBuscada = pedidosCompletos.filter(item => item.idPedido == idPedido)
    if (comandaBuscada[0].EnderecoEntrega == 'retirada no local.') { tipoEntrega = 'Retirada' } else { tipoEntrega = 'Delivery' }
    let produtos = document.querySelector('.tabela-responsiva .pedido .produtos');
    const cabecalho = document.querySelector('.tabela-responsiva .pedido .cabecalho');
    cabecalho.querySelector('.comanda').innerText = `Pedido: ${comandaBuscada[0].idPedido}`;
    cabecalho.querySelector('.tipo-entrega').innerText = `${tipoEntrega}`;

    produtos.innerHTML = ``;
    comandaBuscada[0].produtos.forEach(produto => {
        let item = document.createElement('div');
        item.classList.add('produto');
        item.innerHTML = `<p><strong>📦 Produto:</strong> ${produto.DescricaoProduto}</p>
                            <p><strong>📦 Quantidade:</strong> ${produto.Qtd}</p>
                            <p><strong>💰 Valor:</strong> R$ ${produto.VrVenda}</p>
                            <p><strong>📝 Observações:</strong> ${produto.ObsProduto || 'Nenhuma'}</p>
                            <p><strong>🥣 Ingredientes:</strong> ${produto.Ingredientes}</p>`;
        produtos.appendChild(item);
    });

    const rodape = document.querySelector('.tabela-responsiva .pedido .rodape .status').innerText = `Status: ${comandaBuscada[0].DescriacaoSituacao}`;

}