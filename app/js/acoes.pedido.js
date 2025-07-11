let pedidosAberto = [];
(() => {
    document.querySelector('.politica-dados').classList.remove('d-none');
    document.querySelector('.aceitar-termos').addEventListener('click', () => {
        document.querySelector('.aceitar-termos').closest('.politica-dados').classList.add('d-none');
    })

    setInterval(() => {
        verificarPedidosPendentes();
    }, 30000);

    const modal = new MutationObserver(() => {
        document.querySelectorAll('[id-modal]').forEach(modal => {
            modal.addEventListener('click', (e) => {

                const modal_id = document.getElementById(e.target.getAttribute('id-modal'));
                if (modal_id){
                    
                    const background = modal_id.closest('.background-modal')
                    if (e.target.getAttribute('attr') === 'fechar') {
                        background.classList.add('d-none')
                    } else {
                        background.classList.remove('d-none')
                        addBotoesModal(pedidosAberto[0].acoes, e.target.getAttribute('id-pedido'))
                        preencherModal(pedidosAberto[0], e.target.getAttribute('id-pedido'))
                    }
                }


            })
        });
    })

    document.querySelector('.background-modal').addEventListener('click', (e) => {
        if (e.target.classList.contains('background-modal')) {
            e.target.classList.add('d-none')
        }
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
        carregarPedido(dados.result)
        pedidosAberto = []
        pedidosAberto.push(dados.result)

    } else {
        chamarTelaAvisos('danger', dados.result)
    }

}


async function carregarPedido(data) {

    if (data.cad_pedido.length === 0) {
        let tabela = document.getElementById('add_pedidos');
        tabela.innerHTML = '';
        document.getElementById('info-pedidos').innerHTML = `<div class="qtd-atendimentos">Qtd Pedidos Aberto: ${data.cad_pedido.length}</div>`;
        const msg = document.createElement("h2")
        msg.textContent = "Nenhum pedido ainda ..."
        tabela.appendChild(msg);
    } else {

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
            const titulo = `Total Itens ${pedido.produtos.length}\n`;
            let texto = pedido.produtos.map(produto =>
                `📦 ${produto.Qtd} x Produto: ${produto.DescricaoProduto}\n` +
                `📝 OBSERVACOES : ${produto.ObsProduto || '--'}`
            ).join('\n-------------------\n');

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
                <textarea name="itens-do-pedido" cols="15" rows="6" readonly>${titulo}${texto}</textarea>
            </div>
            <div class="card-footer">
                <div class="footer-info">
                    <p class="status-pedido">Status: <span>${pedido.DescriacaoSituacao}</span> </p>
                    <p>(${tipoEntrega})</p>
                </div>
                <div class="botao">
                    <i class="bi bi-clipboard2-pulse-fill" id-modal="modal" id-pedido=${pedido.idPedido} attr="abrir" title="Abrir Pedido"></i>
                    <i class="bi bi-printer-fill" onclick="ChamarImpressaoCozinha(${pedido.idPedido})" title="Impressão cozinha"></i> <i class="bi bi-scooter" title="Impressao Entrega" onclick="ChamarImpressaoEntrega(${pedido.idPedido})"></i>
                </div>
            </div>`;
            tabela.appendChild(card)
        });
    }
}


function addBotoesModal(acoes, id) {

    let btns = document.getElementById('btn-visualizar-pedidos');
    btns.innerHTML = "";
    const btnPedidos = acoes.filter(f => f.Tela.split(',').map(t => t.trim().toLowerCase()).includes('pedido'))
    btnPedidos.forEach(btn => {

        let btnAcoes = document.createElement("button");
        btnAcoes.classList.add('btn');
        btnAcoes.classList.add('btn-responsivo');
        btnAcoes.classList.add('bg-success');
        btnAcoes.classList.add('font-8em');
        btnAcoes.setAttribute('onclick', `mudarAcao("${btn.DescriacaoSituacao}",${id})`)
        btnAcoes.innerHTML = `<strong class="enviando d-none"></strong>${btn.DescriacaoSituacao}`
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
                            <p><strong>📝 Observações:</strong> ${produto.ObsProduto || 'Nenhuma'}</p>
                            <p><strong>🥣 Ingredientes:</strong> ${produto.Ingredientes}</p>`;
        produtos.appendChild(item);
    });

    document.querySelector('.tabela-responsiva .pedido .rodape .status').innerText = `Status: ${comandaBuscada[0].DescriacaoSituacao}`;

}

async function mudarAcao(acao, id) {
    let enviar = document.querySelector('.enviando')
    enviar.classList.remove('d-none')
    let acoes = [...pedidosAberto[0].acoes];
    const mudaAcao = acoes.find(a => a.DescriacaoSituacao == acao);
    const env = await fetch(`../../routes/api/pedidos.php?altAcao=${mudaAcao.IdSituacao}&idPedido=${id}`);
    const res = await env.json();
    if (res.status == 'ok') {
        enviar.classList.add('d-none')
        chamarTelaAvisos('success', "Pedido alterado com sucesso");
        document.querySelector('.tabela-responsiva .pedido .rodape .status').textContent = `Status: ${mudaAcao.DescriacaoSituacao}`
        buscarDados();

    } else {
        chamarTelaAvisos('danger', dados.result)
    }
}

async function ChamarImpressaoCozinha(idPedido) {
    const pedido = pedidosAberto[0].cad_pedido
    const itens = pedidosAberto[0].mv_pedido

    const produtosPorPedido = new Map();
    itens.forEach(produto => {
        if (!produtosPorPedido.has(produto.NumPedido)) {
            produtosPorPedido.set(produto.NumPedido, []);
        }
        produtosPorPedido.get(produto.NumPedido).push(produto);
    });

    const pedidosCompletos = pedido.map(pedido => {
        const produtos = produtosPorPedido.get(pedido.Controle) || [];
        return {
            ...pedido,
            produtos // lista de produtos
        };
    });

    const pedidoSelecionado = pedidosCompletos.filter(pc => pc.idPedido === idPedido)

    try {
        const response = await fetch('../../routes/api/impressaocozinha.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedidoSelecionado)
        });

        if (!response.ok) throw new Error('Erro ao gerar PDF');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'comanda-cozinha.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

    } catch (erro) {
        console.error('Erro ao requisitar a impressão:', erro);
    }
}


async function ChamarImpressaoEntrega(idPedido) {
    const pedido = pedidosAberto[0].cad_pedido
    const itens = pedidosAberto[0].mv_pedido

    const produtosPorPedido = new Map();
    itens.forEach(produto => {
        if (!produtosPorPedido.has(produto.NumPedido)) {
            produtosPorPedido.set(produto.NumPedido, []);
        }
        produtosPorPedido.get(produto.NumPedido).push(produto);
    });

    const pedidosCompletos = pedido.map(pedido => {
        const produtos = produtosPorPedido.get(pedido.Controle) || [];
        return {
            ...pedido,
            produtos // lista de produtos
        };
    });

    const pedidoSelecionado = pedidosCompletos.filter(pc => pc.idPedido === idPedido)

    try {
        const response = await fetch('../../routes/api/impressaoentrega.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedidoSelecionado)
        });

        if (!response.ok) throw new Error('Erro ao gerar PDF');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'tiket-entrega.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

    } catch (erro) {
        console.error('Erro ao requisitar a impressão:', erro);
    }
}
let pedidosRecebidos = [];
async function verificarPedidosPendentes() {
    const env = await fetch('../../routes/api/pedidos.php?verificaPedido=all');
    const res = await env.json();
    if (res.status === "ok") {
        if (res.result) {

            if (res.result.length > 0) {

                let IdPed = res.result.map(pedido => pedido.idPedido);
                const temPedidoNovo = IdPed.some(idPedido => !pedidosRecebidos.includes(idPedido));

                if (temPedidoNovo) {
                    buscarDados()
                    pedidosRecebidos = IdPed;
                }
                document.getElementById('qtd-pedido-aberto').closest('.inf').classList.remove('d-none')
                // document.getElementById('qtd-pedido-aberto').innerText = res.result.length;
                // chamarTelaAvisos('success', `Existem pedidos em aberto: ${res.result.length}`)
                document.querySelector("audio").play();
            }else{
                document.getElementById('qtd-pedido-aberto').closest('.inf').classList.add('d-none')
            }

        }
    } else {
        chamarTelaAvisos("danger", res.result)
        buscarDados()
    }
}
