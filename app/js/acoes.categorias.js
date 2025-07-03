(() =>{

    window.addEventListener("load", function () {
        document.querySelector(".carregando").classList.add("d-none");
    });

    carregarCategorias()
})();

async function carregarCategorias() {

    const response = await fetch("../../routes/api/categorias.php?busca=all");
    const resposta = await response.json();

    if ( resposta.status == "success" ) {
        
    }else{
        chamarTelaAvisos('danger', 'Erro ao carregar categorias')
    }

}

async function preencherCategorias(data) {
    
}