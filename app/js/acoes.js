let lista = [];
let pegaCard = null;

(() => {

    const menuCat = new MutationObserver(() => {
        document.querySelectorAll('[scroll="sim"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const destino = link.getAttribute('href');
                const elemento = document.querySelector(destino);
                if (elemento) {
                    elemento.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });

    document.addEventListener('DOMContentLoaded', async () => {
        const response = await fetch('routes/api/produtos.php?busca=all');
        if (!response.ok) {
            console.error('Erro ao carregar os produtos');
            return;
        }

        const res = await response.json();
        lista = res.result;
        carregarTabela(lista);
    });

    window.addEventListener("load", function () {
        document.querySelector(".carregando").classList.add("d-none");
        const modal = document.querySelectorAll('.close-modal');
        modal.forEach(element => {
            element.addEventListener('click', (e) => {
                const parentDiv = e.target.closest('#pedido');
                const iconeSacola = document.querySelector('.sacola-compras');
                parentDiv.classList.add('d-none');
                iconeSacola.classList.remove('d-none');
                verificarQtdPedidosNaSacola();
            });
        })

        const modalSacola = document.querySelector('.sacola-compras');
        modalSacola.addEventListener('click', () => {
            const modalPedido = document.querySelector('#pedido');
            if (modalPedido.classList.contains('d-none')) {
                modalSacola.classList.add('d-none');
            }
            modalPedido.classList.remove('d-none');
        });

    });

    const observer = new MutationObserver(() => {

        const quantidadeInput = document.getElementById('quantidade');
        if (quantidadeInput) {
            quantidadeInput.addEventListener('input', (e) => {
                atualizaValor(e);
            });
            observer.disconnect(); // Para evitar verificações desnecessárias
        }

    });

    const obj = new MutationObserver(() => {

        pegaCard = document.querySelectorAll('.card');
        if (pegaCard.length > 0) {

            pegaCard.forEach(element => {
                element.addEventListener('click', (e) => {
                    const iconeSacola = document.querySelector('.sacola-compras');
                    if (document.getElementById('pedido').classList.contains('d-none')) {
                        iconeSacola.classList.remove('d-none');
                    }
                    const produtoId = e.target.closest('.card').getAttribute('id');
                    produtoSelecionado = lista.produtos.find(p => p.IdProduto == produtoId);

                    preencherFormularioPedido(produtoSelecionado);
                    verificarQtdPedidosNaSacola();

                });
            });

            obj.disconnect(); // Para evitar verificações desnecessárias            
        }

    });

    document.querySelector('#formaPgto').addEventListener('input', () => {
        if (document.querySelector('#formaPgto').value == 'cartao') {
            
            document.querySelector('#pedido .totalizador .tx-maquininha').textContent = "2.00";
            const vr = responsavelPeloValorQuantidade()
            atualizaValorPedido(vr[0], vr[1])

        } else {

            document.querySelector('#pedido .totalizador .tx-maquininha').textContent = "0.00";
            const vr = responsavelPeloValorQuantidade()
            atualizaValorPedido(vr[0], vr[1])
        }

        if (document.getElementById('formaPgto').value == 'dinheiro'){
            document.querySelector('.troco').classList.remove('d-none')
        }else{
            document.querySelector('.troco').classList.add('d-none')
        }
    })

    document.querySelector('#troco').addEventListener('input', () => {
        if (  document.querySelector('#troco').value =='sim' ) {
            document.querySelector('.valor-troco').classList.remove('d-none')
        }else{
            document.querySelector('.valor-troco').classList.add('d-none')
        }
    });

    const escutarBtnRemover = new MutationObserver(() => {

        document.querySelectorAll(".remover-item-carrinho").forEach(btnRemover => {
            btnRemover.addEventListener("click", (e) => {
                const vr = responsavelPeloValorQuantidade()
                atualizaValorPedido(vr[0], vr[1])
            });
        });

    });

    

    document.querySelector('#entrega').addEventListener('input', () => {
        if (document.querySelector('#entrega').value == 'entregar') {

            document.querySelector('#pedido .totalizador .tx-entrega').textContent = "2.00";
            const vr = responsavelPeloValorQuantidade()
            atualizaValorPedido(vr[0], vr[1])

        } else {

            document.querySelector('#pedido .totalizador .tx-entrega').textContent = "0.00";
            const vr = responsavelPeloValorQuantidade()
            atualizaValorPedido(vr[0], vr[1])
        }
    })

    document.getElementById('entrega').addEventListener('input', () => {
        const entrega = document.getElementById('entrega').value;
        if (entrega === 'entregar') {

            document.querySelector('.detalhe-endereco').classList.remove('d-none');
        } else {

            document.querySelector('.detalhe-endereco').classList.add('d-none');
        }
    });

    document.getElementById('enviar-pedido').addEventListener('click', async (e) => {
        e.preventDefault();

        const verificaPedido = document.querySelector('.item-pedido');
        if (!verificaPedido) {
            mensagemAviso('Selecione produtos para fazer o pedido');
            return;
        }

        if (document.getElementById('formaPgto').value === '' ||
            document.getElementById('formaPgto').value === null ||
            document.getElementById('formaPgto').value === undefined) {
            mensagemAviso('Selecione uma forma de pagamento');
            return;

        }


        if (document.getElementById('entrega').value === '' ||
            document.getElementById('entrega').value === null ||
            document.getElementById('entrega').value === undefined) {
            mensagemAviso('Selecione o tipo de entrega');
            return;

        }

        if ( document.getElementById('formaPgto').value === 'dinheiro' ) {
            if ( document.getElementById('troco').value === '' ){
                mensagemAviso('Selecione o tipo de troco');
                return;
            }
        }

        if (document.querySelector('#troco').value =='sim' && document.querySelector('#valor-troco').value.length < 8) {
            mensagemAviso('Preencha o campo troco de forma correta');
            return;  
        }

        if (document.getElementById('entrega').value === 'entregar') {
            if (document.getElementById('endereco').value.length < 8) {
                mensagemAviso('Preencha o campo endereço de forma correta');
                return;
            }

        }

        if (document.getElementById('entrega').value === 'retirar'){
            document.getElementById('endereco').value = 'retirada no local.'
        }
        let precisaTroco = document.getElementById('endereco').value
        const formPedido = document.getElementById('pedidoForm');
        const itensPedido = Array.from(formPedido.querySelectorAll('.item-pedido')).map(item => {
            const produtoId = item.querySelector('.item-pedido input[type="number"]').getAttribute('id_produto');
            const quantidade = item.querySelector('.informacoes-pedido .campo-valor .qtd').textContent;
            const observacao = item.querySelector('[name="observacao"]').value;
            const formaPgto = document.getElementById('formaPgto').value;
            const enderecoEntrega = document.getElementById('endereco').value
            const VrBrutoPedido = document.querySelector('.totalizador .vr-pedido').textContent
            if ( document.getElementById('troco').value == 'sim' ){
                precisaTroco = document.getElementById('valor-troco').value
            }else{
                precisaTroco = "Não é preciso de troco"
            }

            const txEntrega = document.querySelector('.totalizador .tx-entrega').textContent.trim() === "" 
            ? 0 
            : document.querySelector('.totalizador .tx-entrega').textContent;

            const txMaquininha = document.querySelector('.totalizador .tx-maquininha').textContent.trim() === "" 
            ? 0 
            : document.querySelector('.totalizador .tx-maquininha').textContent;
            
            return {
                add: 'add',
                IdProduto: produtoId,
                Quantidade: quantidade,
                VrBrutoPedido: VrBrutoPedido,
                ObsProduto: observacao,
                formaPgto: formaPgto,
                precisaTroco: precisaTroco,
                enderecoEntrega: enderecoEntrega,
                txEntrega: txEntrega,
                txMaquininha, txMaquininha
            };
        });

        enviarPedido(itensPedido);
        limparPreencherFormularioPedido();

    });

    observer.observe(document.body, { childList: true, subtree: true });
    escutarBtnRemover.observe(document.body, { childList: true, subtree: true });
    obj.observe(document.body, { childList: true, subtree: true });
    menuCat.observe(document.body, { childList: true, subtree: true });

})();

function atualizaValor(e) {

    const quantidade = e.target.value;
    const campoValor = document.querySelector('.campo-valor');
    const produtoId = document.querySelector('.item-pedido input[type="number"]').getAttribute('id_produto');
    const produto = lista.produtos.find(p => p.IdProduto == produtoId);

    if (produto) {
        campoValor.textContent = `${quantidade} x R$ ${(produto.VrVenda * quantidade).toFixed(2)}`;
    } else {
        console.error('Produto não encontrado');
    }
}

async function carregarTabela(data) {
    let categoriaAtual = null;
    let img = null;
    if (!data || data.length === 0) {
        console.error('Nenhum produto encontrado');
        return;
    }

    let listaCategoria = document.getElementById('lista-categorias');
    let cardapio = document.getElementById('cardapio');

    listaCategoria.innerHTML = '';
    cardapio.innerHTML = '';

    let categorias = Array.from(new Set(data.categoria.map(categoria => categoria)));

    categorias.forEach(categoria => {
        let li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = `<a scroll="sim" href="#${categoria.DescricaoCategoria.toLowerCase()}">${categoria.DescricaoCategoria}</a>`;
        listaCategoria.appendChild(li);

    });

    data.produtos.forEach(produto => {
        if (produto.Imagem == null || produto.Imagem == '') {
            const categoriaEncontrada = categorias.find(categoria => categoria.IdCategoria == produto.IdCategoria);

            if (categoriaEncontrada) {
                img = categoriaEncontrada.Imagem;
                if ( img == null ) {
                    img = 'app/assets/Categoria/sem-imagem.jfif';
                }
            } else {
                img = 'app/assets/Categoria/sem-imagem.jfif';
            }

        } else {
            img = produto.Imagem;
        }

        if (categoriaAtual != produto.IdCategoria) {
            let cat = categorias.find(categoria => categoria.IdCategoria == produto.IdCategoria);
            categoriaAtual = produto.IdCategoria;
            let categoriaDiv = document.createElement('div');
            categoriaDiv.className = 'title-cardapio';
            categoriaDiv.setAttribute('id', cat.DescricaoCategoria.toLowerCase())
            categoriaDiv.innerHTML = `<h3>${cat.DescricaoCategoria}</h3>`;
            cardapio.appendChild(categoriaDiv);
        }

        let card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('id', produto.IdProduto);
        card.innerHTML = `

            <div class="sessao1">
                <img src="${img}" alt="${produto.DescricaoProduto}">
            </div>
            <div class="sessao2">
                <h2>${produto.DescricaoProduto}</h2>
                <p>${produto.Ingredientes}</p>
                <small>R$ ${produto.VrVenda.toFixed(2)}</small>
                <div class="btn-add-carrinho"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                </svg> carrinho</div>
            </div>
        `;
        cardapio.appendChild(card);
    });
}

async function preencherFormularioPedido(data) {
    document.querySelector('.totalizador .tx-entrega').textContent = '0.00';
    document.querySelector('.totalizador .tx-maquininha').textContent = '0.00';
    document.querySelector('.metodo-pagamento').classList.remove('d-none')
    document.querySelector('.entrega').classList.remove('d-none')
    document.querySelector('#enviar-pedido').classList.remove('d-none')

    if (data.Imagem == null || data.Imagem == '') {
        const categoriaEncontrada = lista.categoria.find(categoria => categoria.IdCategoria == data.IdCategoria);

        if (categoriaEncontrada) {
            img = categoriaEncontrada.Imagem;
        } else {
            img = 'app/assetes/sem_imagem.png';
        }

    } else {
        img = produto.Imagem;
    }

    let formPedido = document.getElementById('pedidoForm');
    if (!formPedido.querySelector('.item-pedido')) {
        formPedido.innerHTML = ''; // Limpa o formulário somente se não houver itens
    }
    let divPedido;
    divPedido = document.createElement('div');
    divPedido.className = 'item-pedido';
    divPedido.innerHTML = `<input type="number" id_produto="${data.IdProduto}" name="${data.IdProduto}" hidden>
                <div class="icone">
                    <img src="${img}" alt="icone pedido" title="icone do item pedido">
                </div>
                <div class="descricao">
                    <p class="Produto">${data.DescricaoProduto}</p>
                </div>
                <div class="informacoes-pedido">
                    <div class="informacoes-quantidade">
                        <div class="qtd-label"><label for="quantidade">Quantidade:</label></div>
                        <div class="qtd-input">
                            <button class="minus">-</button>
                            <input type="number" class="quantidade" name="quantidade" min="1" value="1" readonly>
                            <button class="plus">+</button>
                        </div>
                    </div>
                    <p class="campo-valor"> <small class="qtd">1</small> x R$ <small class="vr" valor="${data.VrVenda.toFixed(2)}">${data.VrVenda.toFixed(2)}</small></p>
                    <label for="observacao">Observação:</label>
                    <textarea id="observacao" name="observacao" rows="4" placeholder="Digite aqui algo que deseja retirar ou acrescentar"></textarea>
                    <button class="remover-item-carrinho" style="background-color:red" onclick="this.closest('.item-pedido').remove();">
                        Remover Item
                    </button>
                </div>`;
    formPedido.appendChild(divPedido);
    const vr = responsavelPeloValorQuantidade()
    atualizaValorPedido(vr[0], 1)
}

async function limparPreencherFormularioPedido(){

    let formPedido = document.getElementById('pedidoForm');
    formPedido.innerText = '';
    document.querySelector('.title-pedido').innerText = '';
    document.querySelector('.title-pedido').innerText = 'Pedido Enviado!';

    const formaPgto = document.getElementById('formaPgto').value = "";

    const valor_troco = document.getElementById('valor-troco');
    valor_troco.value = "";
    valor_troco.closest('.valor-troco').classList.add('d-none')

    const troco = document.getElementById('troco');
    troco.value = ""
    troco.closest('.troco').classList.add('d-none');

    const entrega = document.getElementById('entrega').value = "";

    const endereco = document.getElementById('endereco');
    endereco.value = ""
    endereco.closest('.detalhe-endereco').classList.add('d-none');

    document.querySelector('.metodo-pagamento').classList.add('d-none')
    document.querySelector('.entrega').classList.add('d-none')
    document.querySelector('#enviar-pedido').classList.add('d-none')

}

function mensagemAviso(mensagem) {
    
    const elemento = document.querySelector('.mensagem');
    document.getElementById('cardapio').classList.add('d-none');
    elemento.classList.remove('d-none')
    if (elemento) {
        elemento.style.setProperty('--texto-erro', `"${mensagem}"`)

        setTimeout(() => {
            elemento.classList.add('d-none')
            document.getElementById('cardapio').classList.remove('d-none');
        }, 4000);
    } else {
        console.error(`Elemento com ID ${elemento} não encontrado.`);
    }

}

function verificarQtdPedidosNaSacola() {
    const sacola = document.querySelectorAll('#pedidoForm .item-pedido')
    document.querySelector('.sacola-compras a').style.setProperty('--quantidade', `"${sacola.length}"`)
    responsavelPeloValorQuantidade()
}

function atualizaValorPedido(valor) {

    let cardTotalPedido = document.querySelector('.pedido .totalizador .vr-pedido');
    let cardTaxaEntrega = document.querySelector('.pedido .totalizador .tx-entrega');
    let cardTaxaMaquininha = document.querySelector('.pedido .totalizador .tx-maquininha');
    let cardValorTotal = document.querySelector('.pedido .totalizador .vr-pagar');

    let vrTotal = parseFloat(valor);
    cardTotalPedido.textContent = valor;

    let adicionais = 0;

    if (cardTaxaEntrega.textContent != "" && cardTaxaEntrega.textContent != "0.00") {
        adicionais += parseFloat(cardTaxaEntrega.textContent)
    }
    if (cardTaxaMaquininha.textContent != "" && cardTaxaMaquininha.textContent != "0.00"){
        adicionais += parseFloat(cardTaxaMaquininha.textContent)
    }
    vrTotal = vrTotal + adicionais
    cardValorTotal.textContent = vrTotal;
}

function responsavelPeloValorQuantidade() {
    let valorTotal = 0;
    let qtdProdTotal = 0;

    // Pegando todos os produtos
    const produtos = document.querySelectorAll('#pedidoForm .informacoes-pedido .campo-valor');

    produtos.forEach(produto => {
        let valorVenda = parseFloat(produto.querySelector('.vr').getAttribute('valor'));
        let qtdProd = parseFloat(produto.querySelector('.qtd').textContent);

        // Somando corretamente o valor total e a quantidade total
        valorTotal += valorVenda * qtdProd;
        qtdProdTotal += qtdProd;
    });

    // Retornando um array com os valores calculados
    return [valorTotal.toFixed(2), qtdProdTotal];
}

async function enviarPedido(data) {
    // Criando o objeto FormData
    const formData = new FormData();
    // Adicionando os valores manualmente
    data.forEach(item => {
        formData.append('add', item.add);
        formData.append('IdProduto[]', item.IdProduto);
        formData.append('Quantidade[]', item.Quantidade);
        formData.append('VrBrutoPedido', item.VrBrutoPedido);
        formData.append('ObsProduto[]', item.ObsProduto);
        formData.append('formaPgto', item.formaPgto);
        formData.append('precisaTroco', item.precisaTroco);
        formData.append('enderecoEntrega', item.enderecoEntrega);
        formData.append('txEntrega', item.txEntrega);
        formData.append('txMaquininha', item.txMaquininha);
    });

    // Enviando os dados com fetch
    const response = await fetch('routes/api/carrinho.php', {
        method: 'POST',
        body: formData,
    });

    const res = await response.json();
    if ( res.status == "success" ) {
        enviarMensagem(res.result)
    }else{
        mensagemAviso(res.result);
    }

}

async function enviarMensagem(item) {
    pedido = [];
    const cabecalho = `🌟 Pedido Confirmado! #${item[0].idPedido.UltimoPedido} 🌟
    Olá, caro cliente! 😊
    Seu pedido foi recebido com sucesso. Aqui estão os detalhes:`;
    item.forEach(item => {
        pedido.push(`
            📌 Produto: ${item.dados[0].DescricaoProduto} 
            📦 Quantidade: ${item.qtd}
            📝 Observações: ${item.dados.ObsProduto ?? "Sem observações"}
            💰 Preço unitário: R$ ${item.dados[0].VrVenda.toFixed(2)} 
            ________________________________________`);
    });
    const footer = `
    🔢 Total pedido: R$ ${item[0].valorTotal.toFixed(2)}
    💰 Troco: ${item[0].obsPedido} 
    🚚 Enderco: ${item[0].endreco}
    💰 Forma Pagamento: ${item[0].formaPgto}
    
    Agradecemos a sua compra! 💙 Qualquer dúvida, estamos à disposição.`

    const msg = [cabecalho, ...pedido, footer];
    const mensagemPedido = msg.join("\n");

    const sendTextMessage = async () => {
      try {
        const response = await fetch('https://v2-api.gzappy.com/message/send-text', {
          method: 'POST',
          headers: {
            'Authorization': TOKEN,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone: "5534999918179",
            message: mensagemPedido,
          })
        });
    
        const data = await response.json();
        console.log('Mensagem enviada com sucesso:', data);
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    };
    
    // Executar a função
    sendTextMessage();
}



