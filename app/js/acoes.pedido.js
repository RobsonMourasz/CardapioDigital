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
    })
})();