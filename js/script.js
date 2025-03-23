const btn = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');

// Cargar los chistes desde localStorage al iniciar la página
function loadJokes() {
  const jokes = JSON.parse(localStorage.getItem('jokes')) || []; // Obtener chistes del localStorage
  jokes.forEach((joke, index) => {
    const jokeHTML = `
      <li data-index="${index}">
        <p>${joke}</p>
        <button class="delete-btn">Eliminar</button>
      </li>
    `;
    jokeList.innerHTML += jokeHTML;
  });

 
// Obtener un chiste de la API
function fetchJoke() {
  fetch('https://api.chucknorris.io/jokes/random')
    .then(response => {
      if (!response.ok) {
        throw new Error('Su solicitud no ha sido exitosa');
      }
      return response.json();
    })
    .then(data => {
      const jokeHTML = `
        <li>
          <p>${data.value}</p>
          <button class="delete-btn">Eliminar</button>
        </li>
      `;
      jokeList.innerHTML += jokeHTML;

      // Guardar el chiste en localStorage
      const jokes = JSON.parse(localStorage.getItem('jokes')) || [];
      jokes.push(data.value);
      localStorage.setItem('jokes', JSON.stringify(jokes));

      // Agregar manejador de eliminación para el nuevo chiste
      const deleteButton = jokeList.querySelector('li:last-child .delete-btn');
      deleteButton.addEventListener('click', (event) => {
        const jokeItem = event.target.parentElement;
        const index = jokeItem.getAttribute('data-index'); // Obtener el índice del chiste a eliminar
        jokeItem.remove(); // Eliminar el <li> correspondiente del DOM
        removeJokeFromLocalStorage(index); // Eliminar el chiste de localStorage
      });
    })
    .catch(error => {
      const errorItem = document.createElement('li');
      errorItem.innerText = 'Error: no se pudo obtener el chiste';
      jokeList.appendChild(errorItem);
      console.error('Error:', error);
    });
}

// Eliminar un chiste del localStorage
function removeJokeFromLocalStorage(index) {
  const jokes = JSON.parse(localStorage.getItem('jokes')) || [];
  jokes.splice(index, 1); // Eliminar el chiste del array usando el índice
  localStorage.setItem('jokes', JSON.stringify(jokes)); // Guardar el array actualizado en localStorage
}

// Event Listener
btn.addEventListener('click', fetchJoke);

// Cargar los chistes desde localStorage cuando se carga la página
loadJokes();