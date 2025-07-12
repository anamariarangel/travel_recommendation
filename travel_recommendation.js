var searchField = document.getElementById('search-input');
var heroResults = document.querySelector('.hero-results');
var closeIcon = document.querySelector('.close-icon');
var menuHome = document.getElementById('home-menu');
var menuNav = document.querySelector('.menu');
var searchContainer = document.querySelector('.header-search');
var aboutSection = document.querySelector('.about-content');

// Esconde o search quando clica no menu (mantido como está)
menuNav.addEventListener('click', function () {
    searchContainer.style.display = 'none';
});

// Mostra o search ao clicar em "home"
menuHome.addEventListener('click', function () {
    if (searchContainer.style.display === 'none') {
        searchContainer.style.display = 'flex';
    }
});

// Monitorar o scroll
window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;

    // Quando passar de 500px de rolagem, esconde o search
    if (scrollTop > 500) {
        searchContainer.style.display = 'none';
    }
    // Quando estiver no topo, mostra o search
    else if (scrollTop <= 50) {
        searchContainer.style.display = 'flex';
    }
});

searchField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o envio do formulário
        toggleResults();
    }
});

document.getElementById('search-btn').addEventListener('click', function () {
    toggleResults();
});

document.getElementById('clear-btn').addEventListener('click', function () {
    clearSearch()
});

document.querySelector('.close-icon').addEventListener('click', function () {
    clearSearch();
});

function clearSearch() {
    searchField.value = '';
    heroResults.innerHTML = '';
    closeIcon.style.display = 'none';
    searchField.focus();
}


function toggleResults() {

    var query = searchField.value.toLowerCase();
    var results = ''
    closeIcon.style.display = 'block';

    if (query.includes('beach')) {
        fetchresults().then(function (data) {
            var results = data.beaches;
            displayResults(results);
        });
    }
    else if (query.includes('temple')) {
        fetchresults().then(function (data) {
            var results = data.temples;
            displayResults(results);
        });
    }
    else if (query.includes('australia')) {
        fetchresults().then(function (data) {
            var country = data.countries[0];
            var results = country.cities;
            displayResults(results);
        });
    }
    else if (query.includes('japan')) {
        fetchresults().then(function (data) {
            var country = data.countries[1];
            var results = country.cities;
            displayResults(results);
        });
    }
    else if (query.includes('brazil')) {
        fetchresults().then(function (data) {
            var country = data.countries[2];
            var results = country.cities;
            displayResults(results);
        });
    }
}
function fetchresults() {
    return axios.get('travel_recommendation_api.json')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error('Erro ao buscar dados:', error);
            return {};
        });
}

function getLocalTime(timeZone) {
    const options = {
        timeZone: timeZone,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return new Date().toLocaleTimeString('en-US', options);
}


function displayResults(results) {
    heroResults.innerHTML = ''; // Limpa resultados anteriores

    // Mapeamento das localidades com seus respectivos timezones
    const timeZoneMap = {
        'Australia': 'Australia/Sydney',
        'Japan': 'Asia/Tokyo',
        'Brazil': 'America/Sao_Paulo',
        'India': 'Asia/Kolkata',
        'Cambodia': 'Asia/Phnom_Penh',
        'French Polynesia': 'Pacific/Tahiti'
    };

    results.forEach(function (item) {
        // Verifica se algum termo do mapa está contido no nome
        let matchedZone = null;
        for (let location in timeZoneMap) {
            if (item.name.includes(location)) {
                matchedZone = timeZoneMap[location];
                break;
            }
        }

        // Mostra o horário local se encontrou o timezone
        const timeInfo = matchedZone
            ? `<p><strong>Local time:</strong> ${getLocalTime(matchedZone)}</p>`
            : '';

        // Exibe o resultado
        heroResults.insertAdjacentHTML('beforeend',
            '<div class="hero-results-item">' +
                '<img src="' + item.imageUrl + '" alt="' + item.name + '">' +
                '<div class="hero-results-item-content">' +
                    '<h2>' + item.name + '</h2>' +
                    timeInfo +
                    '<p>' + item.description + '</p>' +
                '</div>' +
            '</div>'
        );
    });
}


//form functionality

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!email.includes('@') || !email.includes('.')) {
            alert("Please, inform a valid email address.");
            return;
        }
        else {
            alert(
                `Success! \n\n` +
                `Nome: ${name}\n` +
                `Email: ${email}\n` +
                `Mensagem: ${message}`
            );
        }

        form.reset();
    });
});
