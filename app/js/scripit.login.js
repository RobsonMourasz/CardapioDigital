document.getElementById('login-form').addEventListener('submit', async function(event) {
   
    event.preventDefault();
    const formElement = document.getElementById('login-form');
    const form = new FormData()
    form.append('usuario', formElement.querySelector('[name="usuario"]').value)
    form.append('password', formElement.querySelector('[name="password"]').value)

    const envio = await fetch('../routes/api/login.php',{
        method: 'POST',
        body: form,
    })
    const resp = await envio.json();

    if (resp.status == 'success'){
        window.location.assign('pedido');
    }else{
        alert(resp.result);
    }
    
});
