let lista = [];
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

        const card = document.querySelectorAll('.card');

        if (card.length > 0) {
            card.forEach(element => {
                element.addEventListener('click', (e) => {
                    const modalPedido = document.querySelector('#pedido');
                    const iconeSacola = document.querySelector('.sacola-compras');
                    modalPedido.classList.remove('d-none');
                    iconeSacola.classList.add('d-none');
                    const produtoId = e.target.closest('.card').getAttribute('id');
                    const produto = lista.produtos.find(p => p.IdProduto == produtoId);
                    if (produto) {
                        preencherFormularioPedido(produto);
                    } else {
                        console.error('Produto não encontrado');
                    }
                })
            })
        }

    });
    observer.observe(document.body, { childList: true, subtree: true });
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
    formPedido.innerHTML = ''; // Limpa o formulário antes de adicionar o novo item
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
                    <label for="quantidade">Quantidade:</label>
                    <input type="number" id="quantidade" name="quantidade" min="1" value="1">
                    <p class="campo-valor">1 x R$ ${data.VrVenda.toFixed(2)}</p>
                    <label for="observacao">Observação:</label>
                    <textarea id="observacao" name="observacao" rows="4"></textarea>
                </div>`;
    formPedido.appendChild(divPedido);

}