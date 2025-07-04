let categoriasRecebidas = [];
let fileCategoriaImg = null;

(() => {

    carregarCategorias()
    window.addEventListener("load", function () {
        document.querySelector(".carregando").classList.add("d-none");
    });

    document.getElementById('btn-cad-categoria').addEventListener('click', async (e) =>{
        e.preventDefault();
        const DescricaoCategoria = document.querySelector('#modal-cadastrar .produtos [name="DescricaoCategoria"]').value;

        if (DescricaoCategoria ==""){
            chamarTelaAvisos('danger', 'Preencha a descrição da categoria');
            return;
        }

        const response = await fetch('../../routes/api/categorias.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DescricaoCategoria: DescricaoCategoria,
                acao: 'cadastrar'
            })
        });

        const resposta = await response.json();

        if ( resposta.status == 'success' ) {

            document.querySelector('#modal-cadastrar .produtos [name="DescricaoCategoria"]').value = "";
            
            if ( fileCategoriaImg !== null ) {
                const res = await uploadFile(fileCategoriaImg, resposta.IdCategoria);

                if (res){
                    chamarTelaAvisos('success', 'Categoria cadastrada com sucesso');
                    document.getElementById('modal-cadastrar').closest('.background-modal').classList.add('d-none');
                    carregarCategorias();
                }

            }else{

                chamarTelaAvisos('success', 'Categoria cadastrada com sucesso');
                document.getElementById('modal-cadastrar').closest('.background-modal').classList.add('d-none');
                carregarCategorias();
            }

        }else{
            chamarTelaAvisos('danger', 'Erro ao cadastrar categoria');
            return;
        }

    });

    document.getElementById('btn-edit-categoria').addEventListener('click', async (e) =>{
        e.preventDefault();
        const IdCategoria = document.querySelector('#modal-editar .produtos [name="IdCategoria"]').value;
        const DescricaoCategoria = document.querySelector('#modal-editar .produtos [name="DescricaoCategoria"]').value;
        if (DescricaoCategoria ==""){
            chamarTelaAvisos('danger', 'Preencha a descrição da categoria');
            return;
        }
        const response = await fetch('../../routes/api/categorias.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                IdCategoria: IdCategoria,
                DescricaoCategoria: DescricaoCategoria,
                acao: 'editar'
            })
        });

        const resposta = await response.json();

        if ( resposta.status == "success" ) {

        }else{
            chamarTelaAvisos('danger', 'Erro ao editar categoria');
            return;
        }
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
    document.querySelector('#modal-excluir .produtos [name="IdCategoria"]').value = id;
    document.querySelector('#modal-excluir .produtos [name="DescricaoCategoria"]').value = categoria[0].DescricaoCategoria;

}

const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const preview = document.getElementById('preview');
const message = document.getElementById('upload-message');

// Clique na área para abrir o seletor de arquivos
uploadArea.addEventListener('click', () => fileInput.click());

// Quando arquivo é selecionado pelo input
fileInput.addEventListener('change', handleFile);

// Arraste por cima
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

// Saiu da área de arraste
uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

// Soltou o arquivo
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) {
        showPreview(file);
    }
});

// Lida com o arquivo selecionado
function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
        showPreview(file);
    }
}

// Mostra a imagem
function showPreview(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
        message.style.display = 'none';
    };
    reader.readAsDataURL(file);

    if (  fileCategoriaImg !== null ){
        fileCategoriaImg = null;
    }

    fileCategoriaImg = file;
}


async function uploadFile(file, IdCategoria) {
    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('IdCategoria', IdCategoria);

    const envio = await fetch('../../routes/lib/upload_img_categorias.php', {
        method: 'POST',
        body: formData
    })

    const res = await envio.json();
    if ( res.status == 'success' ){
        return true;
    }

    if ( res.status == 'error' ){
        return false;
    }

}
