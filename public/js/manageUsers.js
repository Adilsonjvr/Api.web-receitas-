// manageUsers.js

// Função para adicionar um novo usuário
async function addUser(userData) {
    try {
        const response = await axios.post('/users/register', userData);
        if (response.status === 201) {
            alert('Usuário registrado com sucesso!');
            fetchAndDisplayUsers(); 
        }
    } catch (error) {
        console.error('Ocorreu um erro ao registrar o usuário: ', error);
        alert('Erro ao registrar o usuário: ' + error.response.data.error);
    }
}

// Função para buscar e exibir a lista de usuários
async function fetchAndDisplayUsers() {
    try {
        const response = await axios.get('/users');
        if (response.status === 200) {
            const users = response.data;
            const usersTable = document.getElementById('usersTableBody');
            usersTable.innerHTML = '';

            // Preencher a tabela com os usuários
            users.forEach(user => {
                const row = usersTable.insertRow();
                row.insertCell(0).textContent = user.username;
                row.insertCell(1).textContent = user.email;

                const actionCell = row.insertCell();
                actionCell.innerHTML = `<button onclick="editUser('${user._id}')">Editar</button>
                                        <button onclick="deleteUser('${user._id}')">Excluir</button>`;
            });
        }
    } catch (error) {
        console.error('Erro ao buscar usuários: ', error);
        if (error.response) {
            console.log(error.response); // Diagnosticar o erro de rede
            alert('Erro ao buscar usuários: ' + error.response.data.error);
        } else {
            alert('Erro ao buscar usuários. Por favor, verifique sua conexão de rede.');
        }
    }
}

// Função para editar um usuário
function editUser(userId) {
    const username = prompt("Digite o novo nome de usuário:", "");
    const email = prompt("Digite o novo e-mail:", "");

    if (username && email) {
        axios.put(`/users/${userId}`, {
            username,
            email
        })
        .then(response => {
            alert('Usuário atualizado com sucesso!');
            fetchAndDisplayUsers(); // Para atualizar a lista de usuários após a edição
        })
        .catch(error => {
            console.error(error);
            alert('Ocorreu um erro ao atualizar o usuário.');
        });
    }
}
  
// Função para excluir um usuário
function deleteUser(userId) {
    if (confirm('Tem certeza de que deseja excluir este usuário?')) {
        axios.delete(`/users/${userId}`)
        .then(response => {
            alert('Usuário excluído com sucesso!');
            fetchAndDisplayUsers(); // Atualiza a lista de usuários após a exclusão
        })
        .catch(error => {
            console.error(error);
            alert('Ocorreu um erro ao excluir o usuário.');
        });
    }
}

// Event listener para o formulário de registro
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obter os dados do formulário
    const userData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Chamar a função para adicionar o usuário
    addUser(userData);
});

// Chamar a função quando a página for carregada
document.addEventListener('DOMContentLoaded', fetchAndDisplayUsers);