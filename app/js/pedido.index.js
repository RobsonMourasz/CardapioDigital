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