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