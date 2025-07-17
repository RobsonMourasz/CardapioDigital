let fileEmpresaImg
(()=>{
    window.addEventListener("load", function (e) {
        e.preventDefault();
        document.querySelector(".carregando").classList.add("d-none");

    });

    document.getElementById('btn-editar-dados').addEventListener('click', setupUploadArea(document.querySelector('#modal-editar')));

})();


function setupUploadArea(modalElement) {
    const uploadArea = modalElement.querySelector('.upload-area');
    const fileInput = modalElement.querySelector('.file-input');
    const preview = modalElement.querySelector('.preview');
    const message = modalElement.querySelector('.upload-message');
    const removeButton = modalElement.querySelector('.remove-image-button');

    uploadArea.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => handleFile(e, preview, message));

    removeButton.addEventListener('click', () => {
        clearImage(preview, message, fileInput, removeButton);
    });

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
    const button = document.querySelector('.remove-image-button');
    button.style.display = 'block';
    const reader = new FileReader();
    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
        message.style.display = 'none';
    };
    reader.readAsDataURL(file);

    if (fileEmpresaImg !== null) {
        fileEmpresaImg = null;
    }
    fileEmpresaImg = file;
}



async function uploadFile(file, IdCategoria) {
    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('IdCategoria', IdCategoria);

    const envio = await fetch('../../routes/lib/upload_img_empresa.php', {
        method: 'POST',
        body: formData
    })

    const res = await envio.json();
    if (res.status == 'success') {
        return true;
    }

    if (res.status == 'error') {
        return false;
    }

}

function clearImage(preview, message, fileInput, removeButton) {
    preview.src = '';
    preview.style.display = 'none';
    message.style.display = 'block';
    fileInput.value = ''; // limpa o campo de input
    fileEmpresaImg = null; // zera a variável do arquivo
    removeButton.style.display = 'none';
}

async function enviarAlteracaoDados() {
    const dados = document.querySelectorAll('.produtos input[type="text"], .produtos input[type="number"]');
    const form = new FormData;
    dados.forEach(inputDados => {
        form.append(inputDados.name, inputDados.value)
    });

    const envDadosAlterados = await fetch('../../routes/api/empresa.php',{
        method: 'POST',
        body: form
    })

    const recDadosAlterados = await envDadosAlterados.json();

    if (recDadosAlterados.status === 'success') {

    }else{
        alert()
    }
    
}