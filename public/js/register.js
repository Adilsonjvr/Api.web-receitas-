document.addEventListener('DOMContentLoaded', function() {
    var registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value, 
            username: document.getElementById('username').value, 
        };

        
        console.log('Dados do formulário:', formData);

        axios.post('http://localhost:3000/users/register', formData)
            .then(function(response) {
                console.log('Resposta do servidor:', response);

                alert("Cadastro realizado com sucesso!");
                window.location.href = 'login.html';
            })
            .catch(function(error) {
                console.log('Erro ao realizar cadastro:', error);

                alert("Ocorreu um erro ao realizar o cadastro.");
            });
    });
});
