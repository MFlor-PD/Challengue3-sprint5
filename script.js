// Elementos del DOM
const btnFetch = document.getElementById("fetchJoke");
const btnClearAll = document.getElementById("clearAll");
const jokeList = document.getElementById("jokeList");
const ENDPOINT = 'https://api.chucknorris.io/jokes/random';

// Cargar chistes al inicio
document.addEventListener('DOMContentLoaded', () => {
    getJokes().forEach(joke => renderJoke(joke));
});

// Obtener nuevo chiste
btnFetch.addEventListener('click', () => {
    fetch(ENDPOINT)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener el chiste');
            return response.json();
        })
        .then(data => {
            const joke = data.value;
            saveJoke(joke);
            renderJoke(joke);
        })
        .catch(() => alert('No se pudo obtener el chiste'));
});

// Limpiar todos los chistes
btnClearAll.addEventListener('click', () => {
    localStorage.removeItem('jokes');
    jokeList.innerHTML = '';
});

// Obtener chistes del localStorage
function getJokes() {
    return JSON.parse(localStorage.getItem('jokes')) || [];
}

// Guardar chistes en localStorage
function saveJoke(joke) {
    const jokes = getJokes();
    jokes.push(joke);
    localStorage.setItem('jokes', JSON.stringify(jokes));
}

// Eliminar chiste del localStorage
function deleteJoke(jokeText) {
    const jokes = getJokes().filter(joke => joke !== jokeText);
    localStorage.setItem('jokes', JSON.stringify(jokes));
}

// Renderizar un chiste en el DOM
function renderJoke(joke) {
    const li = document.createElement('li');
    li.innerHTML = `
        <p>${joke}</p>
        <button class="delete-btn">Eliminar</button>
    `;
    jokeList.appendChild(li);

    // Evento para eliminar el chiste
    li.querySelector('.delete-btn').addEventListener('click', () => {
        deleteJoke(joke);
        li.remove();
    });
}
