document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const form = new FormData(document.getElementById('login-form'))
    const envio = await fetch('../routes/api/login.php',{
        method: 'POST',
        body: form,
    })
    const resp = await envio.json();

    if (resp.status == 'success'){
        window.location.assign('pedido');
    }else{
        alert('erro');
    }
    
});
