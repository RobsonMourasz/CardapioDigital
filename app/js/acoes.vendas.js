(() =>{
    window.addEventListener('load', (e) => {
        document.querySelector(".carregando").classList.add("d-none");
        buscarDados();
    })

})();

async function buscarDados() {
    const tipoBusca = new FormData();
    tipoBusca.append('action','relatorioDiario');
    const env = await fetch('../../routes/api/vendas.php',{
        method: 'POST',
        body: tipoBusca
    })

    const res = await env.json();

    if (res.status === 'success'){
        chamarTelaAvisos('success', res.result);
    }else{
        chamarTelaAvisos('danger', res.result);
    }
}