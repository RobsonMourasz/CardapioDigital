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
    window.addEventListener('load', ()=>{
        document.querySelector('.carregando').classList.add('d-none')
    })

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

