let situacaoPedido = [];
let formaPgto = [];
const permissao = JSON.parse(localStorage.getItem('permissoes'));
(() => {
    window.addEventListener('load', async (e) => {
        e.preventDefault();
        const envSituacao = await fetch('../../routes/api/situacao.php?busca=all');
        const resSituacaoPedido = await envSituacao.json();
        situacaoPedido = resSituacaoPedido.result.filter(p => p.Tela.includes('Pedido'));
        if (resSituacaoPedido.status === 'success') {
            const select = document.querySelector('[name="situacao"]');

            situacaoPedido.forEach(situacao => {
                let options = document.createElement('option');
                options.value = situacao.IdSituacao;
                options.textContent = situacao.DescriacaoSituacao;
                if (situacao.DescriacaoSituacao === 'Concluido') {
                    options.selected = true;
                }
                select.appendChild(options);
            });

        }
        const envFormaPgto = await fetch('../../routes/api/formapgto.php?busca=all');
        const resFormaPgto = await envFormaPgto.json();
        if (resFormaPgto.status === 'success') {

            formaPgto.push(...resFormaPgto.result)
            const select = document.querySelector('[name="formapgto"]');
            select.innerHTML = '<option value="">Todas</option>';
            formaPgto.forEach(pagamento => {
                let options = document.createElement('option');
                options.value = pagamento.DescricaoPagamento.toLowerCase();
                options.textContent = pagamento.DescricaoPagamento;
                select.appendChild(options);
            });

        } else {

        }


        let date = new Date();
        date = date.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD
        document.querySelector('[name="datainicio"]').value = date;
        document.querySelector('[name="datafim"]').value = date;
        const removeCarregando = await buscarDados();

        if (removeCarregando) {
            document.querySelector(".carregando").classList.add("d-none");
        } else {
            chamarTelaAvisos('danger', 'Erro ao buscar dados, tente novamente mais tarde ou entre em contato com o suporte.');
        }



    })

    document.getElementById('btn-buscar-filtro').addEventListener('click', async () => {

        if (await buscarDados()) {
            document.getElementById('modal-filtro').closest('.background-modal').classList.add('d-none');
            console.log('busca avançada realizada com sucesso');
        }
    });

})();

async function buscarDados() {
    let datainicio = new Date();
    let datafim = new Date();
    if (document.querySelector('[name="datainicio"]').value == "" || document.querySelector('[name="datafim"]').value == "") {
        datainicio = datainicio.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD
        datafim = datafim.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD

    } else {
        datainicio = document.querySelector('[name="datainicio"]').value;
        datafim = document.querySelector('[name="datafim"]').value;

    }
    const situacao = document.querySelector('[name="situacao"]').value;
    const formapgtoinput = document.querySelector('[name="formapgto"]').value;


    const tipoBusca = new FormData();
    tipoBusca.append('action', 'relatorioDiario');
    tipoBusca.append('datainicio', datainicio);
    tipoBusca.append('datafinal', datafim);
    tipoBusca.append('situacao', situacao);
    tipoBusca.append('formapgto', formapgtoinput);
    const env = await fetch('../../routes/api/vendas.php', {
        method: 'POST',
        body: tipoBusca
    })

    const res = await env.json();

    if (res.status === 'success') {

        if (res.result.QtdVendas > 0) {
            preencherTabelaDeProdutos(res.result)
        } else {
            preencherTabelaDeProdutosVazio();
        }
        return true;

    } else {
        chamarTelaAvisos('danger', res.result);
        return false;
    }
}

async function preencherTabelaDeProdutos(data) {

    document.getElementById('qtd-total-venda').textContent = data.QtdVendas;
    document.getElementById('valor-total-venda').textContent = `${getConversaoParaMoeda(data.VrVendido)}`;
    document.getElementById('valor-taxa-entrega').textContent = `${getConversaoParaMoeda(data.txMaquininha)} + ${getConversaoParaMoeda(data.txEntrega)}`;
    const btnFilterAtivo = permissao.find(venda => venda.Tela == 'Venda' && venda.Componente == 'Filtro')?.Liberado
    console.log('btnFilterAtivo', btnFilterAtivo)

    let body = document.querySelector('.content-body');
    body.innerHTML = "";
    let tabela = document.createElement('div');
    tabela.classList.add('dados-venda');
    tabela.innerHTML = '';
    if (btnFilterAtivo == 'S') {
        tabela.innerHTML = `
        <div class="content-button">
            <button class="btn bg-success btn-responsivo" id="btn-filtro-avancado" id-modal="modal-filtro" attr="modal" show="abrir">Filtro</button>
        </div>`;
    }else{
        tabela.innerHTML = `
        <div class="content-button">
            <button class="btn btn-responsivo" id="btn-filtro-avancado" disabled>Filtro</button>
        </div>`;
    }

    const vendas = await montarPedidoxProdutos(data.cadPedido, data.mvPedido);

    vendas.forEach((venda) => {
        let total = "";
        total = parseFloat(venda.ValorPedido) + parseFloat(venda.ValorEntrega) + parseFloat(venda.ValorAdicional);
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
            <div class="dados-venda-titulo-item"><p>Total Pedido</p></div>
            <div class="dados-venda-titulo-item"><p>Forma Pagamento</p></div>
        </div>
        <div class="dados-venda-conteudo">
            <div class="dados-venda-conteudo-item"><p>#${venda.idPedido}</p></div>
            <div class="dados-venda-conteudo-item ocultar-responsivo"><p>${venda.DataPedido}</p></div>
            <div class="dados-venda-conteudo-item"><p>R$ ${getConversaoParaMoeda(venda.ValorPedido)}</p></div>
            <div class="dados-venda-conteudo-item"><p>R$ ${getConversaoParaMoeda(venda.ValorAdicional)} + ${getConversaoParaMoeda(venda.ValorEntrega)}</p></div>
            <div class="dados-venda-conteudo-item"><p>R$ ${getConversaoParaMoeda(total)}</p></div>
            <div class="dados-venda-conteudo-item"><p>${capitalizeFirstLetter(venda.FormaPagamento)}</p></div>
        </div>
    `;

        // Criar a div de itens
        const divItens = document.createElement('div');
        divItens.classList.add('itens-venda');

        // Verificar se produtos é um array
        if (Array.isArray(venda.produtos)) {
            venda.produtos.forEach((item) => {
                const pItem = document.createElement('p');
                pItem.textContent = `${item.Qtd} x ( ${item.DescricaoProduto} ) R$ ${getConversaoParaMoeda(item.VrVenda)}`;
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

function preencherTabelaDeProdutosVazio() {
    const btnFilterAtivo = permissao.find(venda => venda.Tela == 'Venda' && venda.Componente == 'Filtro')?.Liberado
    document.getElementById('qtd-total-venda').textContent = '0';
    document.getElementById('valor-total-venda').textContent = `${getConversaoParaMoeda(0)}`;
    document.getElementById('valor-taxa-entrega').textContent = `${getConversaoParaMoeda(0)} + ${getConversaoParaMoeda(0)}`;
    let body = document.querySelector('.content-body');
    body.innerHTML = "";
    let tabela = document.createElement('div');
    tabela.classList.add('dados-venda');

    if (btnFilterAtivo == 'S') {
        tabela.innerHTML = `
        <div class="content-button">
            <button class="btn bg-success btn-responsivo" id="btn-filtro-avancado" id-modal="modal-filtro" attr="modal" show="abrir">Filtro</button>
        </div>
        <p id="msg-sem-dados">Nenhuma venda encontrada nesse periodo.</p>`;
    }else{
        tabela.innerHTML = `
        <div class="content-button">
            <button class="btn btn-responsivo" id="btn-filtro-avancado" disabled>Filtro</button>
        </div>
        <p id="msg-sem-dados">Nenhuma venda encontrada nesse periodo.</p>`;
    }
    body.appendChild(tabela);

}

async function montarPedidoxProdutos(pedido, produtos) {
    const buscarProduto = await fetch('../../routes/api/produtos.php?busca=all');
    const todosProdutos = await buscarProduto.json();
    if (todosProdutos.status == 'success') {
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

    } else {
        return false
    }

}


