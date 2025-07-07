
let produtosCarregados = [];
let categorias = [];
let fileProduto = null;
(() => {
    window.addEventListener('load', (e) => {
        carregarProdutos();
    })

    document.getElementById('btn-novo-produto').addEventListener('click', (e) => {
        let cat = document.getElementById('cad-categoria');
        cat.innerHTML = "";
        cat.innerHTML = `<option value="" selected disabled>Selecione uma categoria</option>`;
        categorias[0].forEach(categoria => {
            let option = document.createElement('option');
            option.value = categoria.IdCategoria;
            option.textContent = categoria.DescricaoCategoria;
            cat.appendChild(option);
        });
        setupUploadArea(document.querySelector('#modal-cadastrar'));
    })

    document.getElementById('btn-cad-prod').addEventListener('click', async (e) => {
        e.preventDefault();
        let erros = false;
        const form = document.getElementById('modal-cadastrar');
        const inputs = form.querySelectorAll('input, textarea, select');
        const produto = {};
        inputs.forEach(input => {
            if (input.name === 'IdCategoria') {
                if (input.value == "") { chamarTelaAvisos('danger', 'Selecione uma categoria.'); erros = true; return }
                produto[input.name] = parseInt(input.value);
            } else if (input.name === 'VrVenda') {
                produto[input.name] = input.value;
            } else {
                if (input.name == 'DescricaoProduto' && input.value.trim() == '') { chamarTelaAvisos('danger', 'Campo descrição não pode ser vazio.'); erros = true; return }
                produto[input.name] = input.value;
                produto['method'] = 'cadastrar';
            }
        });
        if (erros) return;

        const response = await fetch('../../routes/api/produtos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });
        const resposta = await response.json();

        if (resposta.status == 'success') {

            chamarTelaAvisos("success", resposta.result);
            inputs.forEach(input => {
                input.value = '';
            });

            carregarProdutos();
            if (fileProduto !== null) {
                uploadFile(fileProduto, resposta.IdProduto);
            }
            const modal = document.getElementById('modal-cadastrar');
            modal.closest('.background-modal').classList.add('d-none');
        }

    });

    document.getElementById('btn-editar-produto').addEventListener('click', async (e) => {
        e.preventDefault();
        let erros = false;
        const inputs = document.querySelectorAll('#modal-editar input, #modal-editar textarea, #modal-editar select, #modal-editar .file-input');
        const produto = {};
        inputs.forEach(input => {
            if (input.name === 'IdCategoria') {
                if (input.value == "") { chamarTelaAvisos('danger', 'Selecione uma categoria.'); erros = true; return }
                produto[input.name] = parseInt(input.value);
            } else if (input.name === 'VrVenda') {
                const valorLimpo = parseFloat(
                    input.value.replace('R$', '').replace(/\s/g, '').replace('.', '').replace(',', '.')
                );
                produto[input.name] = valorLimpo;
            } else {
                if (input.name == 'DescricaoProduto' && input.value.trim() == '') { chamarTelaAvisos('danger', 'Campo descrição não pode ser vazio.'); erros = true; return }
                produto[input.name] = input.value;
                produto['file'] = fileProduto.size;
                produto['method'] = 'editar';
            }
        });

        if (erros) return;

        const response = await fetch('../../routes/api/produtos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });

        const resposta = await response.json();
        if (resposta.status == 'success') {
            chamarTelaAvisos("success", resposta.result);
            inputs.forEach(input => {
                input.value = '';
            });

            const modal = document.getElementById('modal-editar');

            if ( fileProduto !== null ) {
                const res = await uploadFile(fileProduto, resposta.IdProduto);

                if (res){
                    modal.closest('.background-modal').classList.add('d-none');
                    carregarProdutos();
                }

            }else{

                chamarTelaAvisos('success', 'Categoria cadastrada com sucesso');
                modal.closest('.background-modal').classList.add('d-none');
                carregarProdutos();

            }

           
            
        }
    });

    document.getElementById('btn-excluir-item').addEventListener('click', async (e) => {
        e.preventDefault();
        const id = document.querySelector('#modal-excluir input[name="IdProduto"]').value;
        const response = await fetch('../../routes/api/produtos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ IdProduto: id, method: 'excluir' })
        });

        const resposta = await response.json();
        if (resposta.status == 'success') {

            chamarTelaAvisos('success', resposta.result);
            carregarProdutos();
            const modal = document.getElementById('modal-excluir');
            modal.closest('.background-modal').classList.add('d-none');

        } else {
            chamarTelaAvisos('danger', resposta.result);
        }
    })

})();

async function carregarProdutos() {
    document.querySelector(".carregando").classList.add("d-none");
    const produtos = await fetch('../../routes/api/produtos.php?busca=all');
    const recProdutos = await produtos.json();
    if (recProdutos.status == 'success') {
        carregarTabelaProdutos(recProdutos.result);
        produtosCarregados = [];
        categorias = [];
        produtosCarregados.push(recProdutos.result.produtos);
        categorias.push(recProdutos.result.categoria);
    } else {
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
        let img = ""
        if (produto.Imagem == null || produto.Imagem == ""){
            img = categorias.find(c => c.IdCategoria === produto.IdCategoria).Imagem;
        }else{
            img = produto.Imagem;
        }
        tr.classList.add('text-center');
        tr.innerHTML = `
            <td class="ocultar-responsivo"><img width="64" src="../../${img}" alt="${produto.DescricaoProduto}"></td>
            <td>${produto.DescricaoProduto}</td>
            <td>${categorias.find(c => c.IdCategoria === produto.IdCategoria).DescricaoCategoria}</td>
            <td>${getConversaoParaMoeda(produto.VrVenda)}</td>
            <td>
                <button attr="modal" id-modal="modal-editar" show="abrir" class="btn btn-primary btn-sm" onclick="editarProduto(${produto.IdProduto})">Editar</button>
                <button attr="modal" id-modal="modal-excluir" show="abrir" class="btn btn-danger btn-sm" onclick="excluirProduto(${produto.IdProduto})">Excluir</button>
            </td>
        `;
        tabelaProdutos.appendChild(tr);
    });

}

function editarProduto(id) {

    const itens = produtosCarregados[0].filter(prod => prod.IdProduto === id);

    const cat = categorias[0];
    let select = document.getElementById('edt-categoria')
    if (select) {
        select.innerHTML = "";
        cat.forEach(categoria => {

            let option = document.createElement('option');
            option.value = categoria.IdCategoria;
            option.textContent = categoria.DescricaoCategoria;
            select.appendChild(option);

        })
    } else { console.error("Select de categoria não encontrado.") }

    if (itens) {
        const modalEditar = document.getElementById('modal-editar');
        let inputs = modalEditar.querySelectorAll('input ,textarea, select');
        inputs.forEach(input => {
            if (input.name === 'IdProduto') {
                input.value = itens[0].IdProduto;
            } else if (input.name === 'DescricaoProduto') {
                input.value = itens[0].DescricaoProduto;
            } else if (input.name === 'VrVenda') {
                input.value = getConversaoParaMoeda(itens[0].VrVenda);
            } else if (input.name === 'Estoque') {
                input.value = itens[0].Estoque;
            } else if (input.name === 'Ingredientes') {
                input.value = itens[0].Ingredientes;
            } else if (input.name === 'IdCategoria') {
                input.value = itens[0].IdCategoria;
            }
        })
        setupUploadArea(document.querySelector('#modal-editar'));
    } else {
        chamarTelaAvisos("danger", "Produto não encontrado.");
    }
};

function excluirProduto(id) {
    const itens = produtosCarregados[0].filter(prod => prod.IdProduto === id);
    if (itens.length > 0) {
        const modalExcluir = document.getElementById('modal-excluir');
        let inputs = modalExcluir.querySelectorAll('input');
        inputs.forEach(input => {
            if (input.name === 'IdProduto') {
                input.value = itens[0].IdProduto;
            } else if (input.name === 'DescricaoProduto') {
                input.value = itens[0].DescricaoProduto;
            }
        });
        setupUploadArea(document.querySelector('#modal-excluir'));
    } else {
        chamarTelaAvisos("danger", "Produto não encontrado.");
    }
}

function setupUploadArea(modalElement) {
    const uploadArea = modalElement.querySelector('.upload-area');
    const fileInput = modalElement.querySelector('.file-input');
    const preview = modalElement.querySelector('.preview');
    const message = modalElement.querySelector('.upload-message');

    uploadArea.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => handleFile(e, preview, message));

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) {
            showPreview(file, preview, message);
        }
    });
}

function handleFile(e, preview, message) {
    const file = e.target.files[0];
    if (file) {
        showPreview(file, preview, message);
    }
}

function showPreview(file, preview, message) {
    const reader = new FileReader();
    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
        message.style.display = 'none';
    };
    reader.readAsDataURL(file);

    if (fileProduto !== null) {
        fileProduto = null;
    }
    fileProduto = file;
}



async function uploadFile(file, IdProduto) {
    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('IdProduto', IdProduto);

    const envio = await fetch('../../routes/lib/upload_img_produtos.php', {
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
