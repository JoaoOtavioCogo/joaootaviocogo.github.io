document.getElementById('addPlayerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const level = parseInt(document.getElementById('level').value);
    const goals = parseInt(document.getElementById('goals').value);
    const assists = parseInt(document.getElementById('assists').value);
    const wins = parseInt(document.getElementById('wins').value);
    const losses = parseInt(document.getElementById('losses').value);

    fetch('/players', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, level, goals, assists, wins, losses }),
    })
    .then(response => response.text())
    .then(data => {
        console.log('Sucesso:', data);
        alert('Jogador adicionado com sucesso');
        // Limpar os campos do formulário após adicionar o jogador
        document.getElementById('name').value = '';
        document.getElementById('level').value = '';
        document.getElementById('goals').value = '';
        document.getElementById('assists').value = '';
        document.getElementById('wins').value = '';
        document.getElementById('losses').value = '';
        fetchAndDisplayPlayers(); // Atualizar a lista de jogadores
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao adicionar jogador');
    });
});

function fetchAndDisplayPlayers() {
    fetch('/players')
        .then(response => response.json())
        .then(players => {
            const playersList = document.getElementById('playersList');
            playersList.innerHTML = '';

            // Classificar jogadores pelo nível em ordem decrescente
            players.sort((a, b) => b.level - a.level);

            players.forEach(player => {
                const playerItem = document.createElement('li');
                playerItem.className = 'player-item';

                const playerInfo = document.createElement('div');
                playerInfo.className = 'player-info';
                playerInfo.textContent = `${player.name} - Nível: ${player.level} - Gols: ${player.goals} - Assistências: ${player.assists} - Vitórias: ${player.wins} - Derrotas: ${player.losses}`;

                const stars = document.createElement('span');
                stars.className = 'stars';
                stars.textContent = '★'.repeat(player.level);

                const progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';

                const progress = document.createElement('div');
                progress.className = 'progress';
                progress.style.width = `${(player.level / 5) * 100}%`;

                progressBar.appendChild(progress);
                playerItem.appendChild(playerInfo);
                playerItem.appendChild(stars);
                playerItem.appendChild(progressBar);
                playersList.appendChild(playerItem);
            });
        })
        .catch((error) => {
            console.error('Erro ao buscar jogadores:', error);
        });
}

// Função para abrir uma aba e fechar as outras
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Esconder todas as abas
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remover a classe "active" de todos os botões de aba
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar a aba atual e adicionar uma classe "active" ao botão de aba
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Chamar a função para exibir jogadores ao carregar a página
fetchAndDisplayPlayers();

// Abrir a primeira aba por padrão
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.tablink').click();
});
