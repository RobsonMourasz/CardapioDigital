(()=>{
    document.querySelector('.toggle-menu .bi-list').addEventListener('click', ()=>{
        document.querySelector('nav').classList.toggle('ocultar-toggle')
    })

    window.addEventListener('resize', ()=>{
        const width = window.innerWidth;
        if ( width <= 501 ) {
            document.querySelector('nav').classList.add('ocultar-toggle')
        }
    })

    const width = window.innerWidth;
    if ( width <= 501 ) {
        document.querySelector('nav').classList.add('ocultar-toggle')
    }


    window.addEventListener('load', (e)=>{
        e.preventDefault();
    });

    const modal = new MutationObserver(() => {
        document.querySelectorAll('[id-modal="modal"]').forEach(modal => {
            modal.addEventListener('click', (e) => {

                const modal_id = document.getElementById(e.target.getAttribute('id-modal'))
                const background = modal_id.closest('.background-modal')
                if (e.target.getAttribute('attr') === 'fechar') {
                    background.classList.add('d-none')
                } else {
                    background.classList.remove('d-none')
                }

            })
        });

        document.querySelector('.background-modal').addEventListener('click', (e) => {
            if (e.target.classList.contains('background-modal')) {
                e.target.classList.add('d-none')
            }
        })
    })

    modal.observe(document.body, { childList: true, subtree: true });
    
})();

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
            telaAviso.style.setProperty('--text-avisos', "");
            telaAviso.style.setProperty('--color-avisos', "");
        },2000);

        
    }, 5000);
    
}

function getConversaoParaMoeda(string) {

    if (typeof(string) === 'number'){
        return string.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }else if (typeof(string) === 'string'){
        const valor = parseFloat(string.replace(/[^0-9,-]+/g, '').replace(',', '.'));
        if (isNaN(valor)) {
            return "Valor inválido";
        }
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }else{
        return "R$ 0,00";
    }
    
}
