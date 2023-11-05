document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    axios.post('/users/login', {
        email,
        password
    })
    .then(response => {
        alert('Login bem-sucedido!');
        // Redirecionamento de página
        window.location.href = '/admin.html';
    })
    .catch(error => {
        console.error(error);
        alert('Erro no login.');
    });
});
