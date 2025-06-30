(() => {
    window.addEventListener('load', (e)=>{
        carregarProdutos();
    })
})();

async function carregarProdutos() {
    document.querySelector(".carregando").classList.add("d-none");
    const produtos = await fetch('../../routes/api/produtos.php?busca=all');
    const recProdutos = await produtos.json();
    if ( recProdutos.status == 'success'){
        carregarTabelaProdutos(recProdutos.result);
    }else{
        chamarTelaAvisos("danger", "res.result")
    }
}

async function carregarTabelaProdutos(data) {
    const produtos = data.produtos;
    const categorias = data.categoria;

    let tabelaProdutos = document.getElementById('tbody-produtos');
    tabelaProdutos.innerHTML = '';

    produtos.forEach((produto) => {
        let tr = document.createElement('tr');
        tr.classList.add('text-center');
        tr.innerHTML = `
            <td><img src="${categorias.find(c => c.IdCategoria === produto.IdCategoria).Imagem}" alt="${categorias.find(c => c.IdCategoria === produto.IdCategoria).DescricaoCategoria}"></td>
            <td>${produto.DescricaoProduto}</td>
            <td>${categorias.find(c => c.IdCategoria === produto.IdCategoria).DescricaoCategoria}</td>
            <td>${produto.VrVenda}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editarProduto(${produto.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="excluirProduto(${produto.id})">Excluir</button>
            </td>
        `;
        tabelaProdutos.appendChild(tr);
    });

}