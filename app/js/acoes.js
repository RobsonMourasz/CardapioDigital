(() => {

    document.addEventListener('DOMContentLoaded', async () => {

        const response = await fetch('routes/api/produtos.php?busca=all');
        if (!response.ok) {
            console.error('Erro ao carregar os produtos');
            return;
        }

        const produtos = await response.json();
        carregarTabela(produtos);
    });

    document.addEventListener('load', async () => {
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
    
        const card = document.querySelectorAll('.card');
        console.log(card);
        card.forEach(element => {
            element.addEventListener('click', (e) => {
                console.log(e.target.closest('.card'));
                const modalPedido = document.querySelector('#pedido');
                const iconeSacola = document.querySelector('.sacola-compras');
                modalPedido.classList.remove('d-none');
                iconeSacola.classList.add('d-none');
            })
        });
    })

})();

async function carregarTabela(data) {
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

    let DescricaoProduto = new Set(data.produtos.map(produtos => produtos));

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

        }else{
            img = produto.Imagem;
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