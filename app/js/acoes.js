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

    const card = document.querySelectorAll('.card');
    card.forEach(element => {
        element.addEventListener('click', (e) =>{
            console.log(e.target.closest('.card'));
            const modalPedido = document.querySelector('#pedido');
            const iconeSacola = document.querySelector('.sacola-compras');
            modalPedido.classList.remove('d-none');
            iconeSacola.classList.add('d-none');
        })
    });

    document.addEventListener('DOMContentLoaded', async () => {
        document.querySelector(".carregando").classList.add("d-none");
        const response = await fetch('routes/api/produtos.php');
        if (!response.ok) {
            console.error('Erro ao carregar os produtos');
            return;
        }

        const produtos = await response.json();
        console.log(produtos);
    });

})()