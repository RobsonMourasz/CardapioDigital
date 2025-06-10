(()=>{
    const modal = document.querySelectorAll('.close-modal');
    modal.forEach(element =>{
        element.addEventListener('click', (e) => {
            const parentDiv = e.target.closest('#pedido');
            const iconeSacola = document.querySelector('.sacola-compras');
            parentDiv.classList.add('d-none');
            iconeSacola.classList.remove('d-none');
        });
    })

    const modalSacola = document.querySelector('.sacola-compras');
    modalSacola.addEventListener('click', () => {
        const modalPedido = document.querySelector('#pedido');
        modalPedido.classList.remove('d-none');
        modalSacola.classList.add('d-none');
    });
})()