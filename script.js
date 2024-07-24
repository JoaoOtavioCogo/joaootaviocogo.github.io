document.getElementById('addPlayerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const goals = parseInt(document.getElementById('goals').value);
    const assists = parseInt(document.getElementById('assists').value);
    const wins = parseInt(document.getElementById('wins').value);
    const losses = parseInt(document.getElementById('losses').value);

    const level = wins * 20 - losses * 20 + 250;

    fetch('http://localhost:3000/players', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: Date.now().toString(), name, level, goals, assists, wins, losses }),
    })
    .then(response => response.text())
    .then(data => {
        console.log('Sucesso:', data);
        alert('Jogador adicionado com sucesso');
        document.getElementById('name').value = '';
        document.getElementById('goals').value = '';
        document.getElementById('assists').value = '';
        document.getElementById('wins').value = '';
        document.getElementById('losses').value = '';
        fetchAndDisplayPlayers();
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao adicionar jogador');
    });
});

function fetchAndDisplayPlayers() {
    fetch('http://localhost:3000/players')
        .then(response => response.json())
        .then(players => {
            const playersList1Star = document.getElementById('playersList-1-star');
            const playersList2Star = document.getElementById('playersList-2-star');
            const playersList3Star = document.getElementById('playersList-3-star');
            const playersList4Star = document.getElementById('playersList-4-star');
            const playersList5Star = document.getElementById('playersList-5-star');

            playersList1Star.innerHTML = '';
            playersList2Star.innerHTML = '';
            playersList3Star.innerHTML = '';
            playersList4Star.innerHTML = '';
            playersList5Star.innerHTML = '';

            players.sort((a, b) => b.level - a.level);

            players.forEach(player => {
                const playerItem = document.createElement('li');
                playerItem.className = 'player-item';

                const playerInfo = document.createElement('div');
                playerInfo.className = 'player-info';
                playerInfo.textContent = `${player.name} - Gols: ${player.goals} - Assistências: ${player.assists} - Vitórias: ${player.wins} - Derrotas: ${player.losses}`;

                const stars = document.createElement('span');
                stars.className = 'stars';
                stars.textContent = '★'.repeat(Math.floor(player.level / 100) + 1);  // Lógica atualizada para estrelas

                const progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';
                const progress = document.createElement('div');
                progress.className = 'progress';
                progress.style.width = `${(player.level % 100)}%`;
                progressBar.appendChild(progress);

                playerItem.appendChild(playerInfo);
                playerItem.appendChild(stars);
                playerItem.appendChild(progressBar);

                if (player.level >= 0 && player.level < 100) {
                    playersList1Star.appendChild(playerItem);
                } else if (player.level >= 100 && player.level < 200) {
                    playersList2Star.appendChild(playerItem);
                } else if (player.level >= 200 && player.level < 300) {
                    playersList3Star.appendChild(playerItem);
                } else if (player.level >= 300 && player.level < 400) {
                    playersList4Star.appendChild(playerItem);
                } else if (player.level >= 400) {
                    playersList5Star.appendChild(playerItem);
                }
            });
        })
        .catch(error => console.error('Erro ao buscar jogadores:', error));
}

function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    const tablinks = document.getElementsByClassName('tablink');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';

    if (tabName === 'rankingTab') {
        fetchAndDisplayPlayers();
    }
}

function openSubTab(evt, subTabName) {
    const subtabcontent = document.getElementsByClassName('subtabcontent');
    for (let i = 0; i < subtabcontent.length; i++) {
        subtabcontent[i].style.display = 'none';
    }

    const subtablinks = document.getElementsByClassName('tablink');
    for (let i = 0; i < subtablinks.length; i++) {
        subtablinks[i].className = subtablinks[i].className.replace(' active', '');
    }

    document.getElementById(subTabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

// Carrega a primeira aba por padrão
document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName('tablink')[0].click();
});
