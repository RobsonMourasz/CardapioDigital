let categoriasRecebidas = [];

(() => {

    carregarCategorias()
    window.addEventListener("load", function () {
        document.querySelector(".carregando").classList.add("d-none");
    });


    document.getElementById('btn-exc-categoria').addEventListener('click', async (e)=>{
        e.preventDefault();
        const id = document.querySelector('#modal-excluir .produtos [name="IdCategoria"]').value
        const response = await fetch('../../routes/api/categorias.php?acao=delete&id='+id);
        const res = await response.json();
    
        if ( res.status == "success"){
            chamarTelaAvisos('success', 'Categoria deletada com sucesso');
            carregarCategorias();
            document.getElementById('modal-excluir').closest('.background-modal').classList.add('d-none')
        }else{
            chamarTelaAvisos('danger', 'Erro ao deletar categoria');
        }
    })


})();

async function carregarCategorias() {

    const response = await fetch("../../routes/api/categorias.php?busca=all");
    const resposta = await response.json();

    if (resposta.status == "success") {
        categoriasRecebidas = [];
        categoriasRecebidas.push(...resposta.result[0]);
        preencherCategorias(resposta.result[0]);
    } else {
        chamarTelaAvisos('danger', 'Erro ao carregar categorias')
    }

}

async function preencherCategorias(data) {
    let bodyCategoria = document.getElementById('tbody-categoria');
    bodyCategoria.innerHTML = "";
    data.forEach(categoria => {
        let trCategoria = document.createElement('tr');
        trCategoria.innerHTML = `<td class="ocultar-responsivo" ><img width="62" src="../../${categoria.Imagem}" alt="${categoria.DescricaoCategoria}"></td>
                <td>${categoria.DescricaoCategoria}</td>
                <td class="text-center">
                    <button class="btn btn-danger btn-sm" onclick="deletarCategoria(${categoria.IdCategoria})" id-modal="modal-excluir" attr="modal" show="abrir">Deletar</button>
                    <button class="btn btn-primary btn-sm" onclick="editarCategoria(${categoria.IdCategoria})" id-modal="modal-editar" attr="modal" show="abrir">Editar</button>
                </td>`;
        bodyCategoria.appendChild(trCategoria);
    });
}

async function editarCategoria(id) {
    const categoria = categoriasRecebidas.filter( cat => cat.IdCategoria == id)
    document.querySelector('#modal-editar .produtos [name="IdCategoria"]').value = id;
    document.querySelector('#modal-editar .produtos [name="DescricaoCategoria"]').value = categoria[0].DescricaoCategoria;
}

async function deletarCategoria(id) {
    const categoria = categoriasRecebidas.filter( cat => cat.IdCategoria == id)
    console.log("id: ", id)
    console.log("cat: ", categoria)

    document.querySelector('#modal-excluir .produtos [name="IdCategoria"]').value = id;
    document.querySelector('#modal-excluir .produtos [name="DescricaoCategoria"]').value = categoria[0].DescricaoCategoria;

}