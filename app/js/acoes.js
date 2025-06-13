let lista = [];
let pegaCard = null;
(() => {

    document.addEventListener('DOMContentLoaded', async () => {

        const response = await fetch('routes/api/produtos.php?busca=all');
        if (!response.ok) {
            console.error('Erro ao carregar os produtos');
            return;
        }

        lista = await response.json();
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
            });
        })

        const modalSacola = document.querySelector('.sacola-compras');
        modalSacola.addEventListener('click', () => {
            const modalPedido = document.querySelector('#pedido');
            modalPedido.classList.remove('d-none');
            modalSacola.classList.add('d-none');
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
                    iconeSacola.classList.remove('d-none');

                    const produtoId = e.target.closest('.card').getAttribute('id');
                    produtoSelecionado = lista.produtos.find(p => p.IdProduto == produtoId);

                    preencherFormularioPedido(produtoSelecionado);
                });
            });

            obj.disconnect(); // Para evitar verificações desnecessárias            
        }

    });



    observer.observe(document.body, { childList: true, subtree: true });
    obj.observe(document.body, { childList: true, subtree: true });

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
        console.log('Enviando pedido...');

        if (document.getElementById('formaPgto').value === '' ||
            document.getElementById('formaPgto').value === null ||
            document.getElementById('formaPgto').value === undefined) {
            mensagemAviso('mensagem', 'Selecione uma forma de pagamento');
            return;

        }

        if (document.getElementById('entrega').value === '' ||
            document.getElementById('entrega').value === null ||
            document.getElementById('entrega').value === undefined) {
            mensagemAviso('mensagem', 'Selecione o tipo de entrega');
            return;

        }

        if (document.getElementById('entrega').value === 'entregar') {
            if (document.getElementById('endereco').value.length < 8) {
                mensagemAviso('mensagem', 'Preencha o campo endereço de forma correta');
                return;
            }

        }

        const formPedido = document.getElementById('pedidoForm');
        const itensPedido = Array.from(formPedido.querySelectorAll('.item-pedido')).map(item => {
            const produtoId = item.querySelector('.item-pedido input[type="number"]').getAttribute('id_produto');
            const quantidade = item.querySelector('.informacoes-pedido .campo-valor .qtd').textContent;
            const observacao = item.querySelector('[name="observacao"]').value;
            return {
                IdProduto: produtoId,
                Quantidade: quantidade,
                Observacao: observacao
            };
        });
        console.log('Itens do pedido:', itensPedido);
        console.log('Forma de pagamento:', document.getElementById('formaPgto').value)
        console.log('Endereço:', document.getElementById('endereco').value);

    });


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
        li.innerHTML = `<a href="#">${categoria.DescricaoCategoria}</a>`;
        listaCategoria.appendChild(li);

    });

    data.produtos.forEach(produto => {
        if (produto.Imagem == null || produto.Imagem == '') {
            const categoriaEncontrada = categorias.find(categoria => categoria.IdCategoria == produto.IdCategoria);

            if (categoriaEncontrada) {
                img = categoriaEncontrada.Imagem;
            } else {
                img = 'app/assetes/sem_imagem.png';
            }

        } else {
            img = produto.Imagem;
        }

        if (categoriaAtual != produto.IdCategoria) {
            let cat = categorias.find(categoria => categoria.IdCategoria == produto.IdCategoria);
            categoriaAtual = produto.IdCategoria;
            let categoriaDiv = document.createElement('div');
            categoriaDiv.className = 'title-cardapio';
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
            </div>

        `;
        cardapio.appendChild(card);
    });
}

async function preencherFormularioPedido(data) {

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
                    <button style="background-color:red" onclick="this.closest('.item-pedido').remove()">
                        Remover Item
                    </button>
                </div>`;
    formPedido.appendChild(divPedido);

}

function mensagemAviso(idElemento, mensagem) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = mensagem;
        elemento.style.color = 'red';
        elemento.classList.remove('d-none');
        setTimeout(() => {
            elemento.textContent = '';
            elemento.style.color = 'none';
            elemento.classList.add('d-none');
        }, 5000);
    } else {
        console.error(`Elemento com ID ${idElemento} não encontrado.`);
    }

}