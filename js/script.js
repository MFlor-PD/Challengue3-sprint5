const btn = document.getElementById("fetchJoke");
const deleteBtn = document.getElementById("delete-btn");
const ulJokeList = document.getElementById("jokeList");
const ENDPOINT = 'https://api.chucknorris.io/jokes/random';


  
btn.addEventListener('click', () => { 
    return fetch(ENDPOINT)
    .then((response) => {
    if(!response.ok) {
        throw new Error('Su solicitud no ha sido exitosa');
      } 
        return response.json()
    }
  )

  .then((data) => {
    const result = data.value;
    renderJoke(result);
  })

  .catch((error) => {
    ulJokeList.innerText = 'Error: no se pudo obtener la broma';
  });
});

    function template(value) {
      return`<li>
      <p>${value}</p>
      <button id="delete-btn" class="Eliminar">Eliminar</button>
       </li>`;
    }
    
    function getJoke () {
      return JSON.parse(localStorage.getItem('jokes')) || [];
    }

    function saveJoke(jokes) {
      localStorage.setItem('jokes', JSON.stringify(jokes));
    }
    
    function renderJoke(joke) {
      ulJokeList.innerHTML += template(joke);
      let jokes = getJoke()
      jokes.push(joke);
      saveJoke(jokes);
    }
    /*deleteBtn.addEventListener ('click', () => {
      localStorage.removeItem(joke);
    });*/
    