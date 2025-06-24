(()=>{

    document.querySelectorAll('[id-modal="modal"]').forEach(modal=>{
        modal.addEventListener('click', (e)=>{
            const modal_id = document.getElementById(e.target.getAttribute('id-modal'))
            const background = modal_id.closest('.background-modal')
            if (e.target.getAttribute('attr') === 'fechar') {
                background.classList.add('d-none')
            }else{
                background.classList.remove('d-none')
            }
            
        })
    });

    window.addEventListener('DOMContentLoaded', buscarDados())


})();

async function buscarDados() {

    const response = await fetch('../../routes/api/pedidos.php?busca=all');
    const dados = await response.json();
    if (dados.status == 'ok'){
        chamarTelaAvisos('success',dados.result);
    }else{
        chamarTelaAvisos('danger',dados.result)
    }
}

function chamarTelaAvisos(tipo,mensagem){
    const telaAviso = document.getElementById('avisos');
    const status = tipo.toLowerCase();
    if (status == 'success'){
        telaAviso.style.setProperty('--color-avisos', "#3b9a56");
    }else if (status == 'danger'){
        telaAviso.style.setProperty('--color-avisos', "#ff0c00");
    }else{
        telaAviso.style.setProperty('--color-avisos', "#22a0de");
    }
    telaAviso.classList.remove('d-none');
    telaAviso.style.setProperty('--text-avisos', `"${mensagem}"`);
    telaAviso.classList.remove('fade-out');
    telaAviso.classList.add('fade-in')
    setTimeout(() => {
        telaAviso.classList.remove('fade-in')
        telaAviso.classList.add('fade-out');

        setTimeout(() =>{
            telaAviso.classList.add('d-none');
            estilo.style.setProperty('--text-avisos', "");
            telaAviso.style.setProperty('--color-avisos', "");
        },2000);

        
    }, 5000);
    
}