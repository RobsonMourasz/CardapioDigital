
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
        const inputs = document.querySelectorAll('#modal-editar input, #modal-editar textarea, #modal-editar select');

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
            carregarProdutos();
            const modal = document.getElementById('modal-editar');
            modal.closest('.background-modal').classList.add('d-none');
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
        tr.classList.add('text-center');
        tr.innerHTML = `
            <td class="ocultar-responsivo"><img width="64" src="../../${categorias.find(c => c.IdCategoria === produto.IdCategoria).Imagem}" alt="${categorias.find(c => c.IdCategoria === produto.IdCategoria).DescricaoCategoria}"></td>
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
    } else {
        chamarTelaAvisos("danger", "Produto não encontrado.");
    }
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

    if (  fileProduto !== null ){
        fileProduto = null;
    }
    fileProduto = file;
}


function uploadFile(file, IdProduto) {
    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('IdProduto', IdProduto);

    fetch('../../routes/lib/upload_img_produtos.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    // .then(data => {
    //     if (data.success) {
    //         alert('Arquivo salvo com sucesso!');
    //     } else {
    //         alert('Erro: ' + data.message);
    //     }
    // })
    .catch(err => {
        console.error(err);
        alert('Erro ao enviar arquivo.');
    });
}
