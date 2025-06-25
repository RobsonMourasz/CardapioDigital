(() => {

    document.querySelectorAll('[id-modal="modal"]').forEach(modal => {
        modal.addEventListener('click', (e) => {
            const modal_id = document.getElementById(e.target.getAttribute('id-modal'))
            const background = modal_id.closest('.background-modal')
            if (e.target.getAttribute('attr') === 'fechar') {
                background.classList.add('d-none')
            } else {
                background.classList.remove('d-none')
            }

        })
    });

    window.addEventListener('DOMContentLoaded', buscarDados())
    window.addEventListener('load', () => {
        document.querySelector('.carregando').classList.add('d-none')
    })

})();

async function buscarDados() {

    const response = await fetch('../../routes/api/pedidos.php?busca=all');
    const dados = await response.json();
    if (dados.status == 'ok') {
        chamarTelaAvisos('success', dados.status);
        carregarPedido(dados.result)
    } else {
        chamarTelaAvisos('danger', dados.result)
    }
}


async function carregarPedido(data) {
    let tabela = document.getElementById('add_pedidos');
    tabela.innerHTML = '';
    document.getElementById('info-pedidos').innerHTML = `<div class="qtd-atendimentos">Qtd Pedidos Aberto: ${data.cad_pedido.length}</div>`;

    const produtos = new Map(data.mv_pedido.map(p => [p.NumPedido, p]));
    const pedidosCompletos = data.cad_pedido.map(pedido => {
        const mv = produtos.get(pedido.Controle); // Supondo que 'controle' esteja presente no cad_pedido
        return {
            ...pedido,
            ...mv // isso inclui os campos de mv_pedido ao objeto final
        };
    });
    
    pedidosCompletos.forEach(pedido => {
        let texto =
        `📦 Produto: ${pedido.DescricaoProduto}\n` +
        `📦 Quantidade: ${pedido.Qtd}\n` +
        `💰 Valor: R$ ${pedido.VrVenda.toFixed(2)}\n` +
        `📝 ==== OBSERVACOES ====: ${pedido.ObsProduto || 'Nenhuma'} ==== FIM OBSERVACOES ====\n` +
        `🥣 Ingredientes: ${pedido.Ingredientes}\n`;

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
                    <i class="btn bi bi-clipboard2-pulse-fill" id-modal="modal" attr="abrir"></i>
                </div>
            </div>`;
        tabela.appendChild(card)
    });
}
