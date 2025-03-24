const characterList = document.getElementById("character-list");
const nextPage = document.getElementById("next-page");
const prevPage = document.getElementById("prev-page");
const home = document.getElementById("home");

let currentPage = 1;


const getCharacters = () => {
  fetch("https://rickandmortyapi.com/api/character/?page=" + currentPage)
    .then(response => response.json())
    .then(data => {
      console.log("Datos de la API:", data); 

      let personajes = data.results;
      characterList.innerHTML = ""; 

      personajes.forEach(personaje => {
        let listItem = document.createElement("li");
        listItem.classList.add("card");

        let img = document.createElement("img");
        img.src = personaje.image;
        img.alt = personaje.name;

        let name = document.createElement("h2");
        name.textContent = personaje.name;

        let species = document.createElement("p");
        species.textContent = "Especie: " + personaje.species;

        listItem.appendChild(img);
        listItem.appendChild(name);
        listItem.appendChild(species);

        characterList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.log("Error al cargar los personajes");
      console.log(error);
    });
}


getCharacters();

nextPage.addEventListener("click", () => {
  if (currentPage < 42) {
    currentPage++;
    getCharacters();
  } else {
    console.log("Ya estás en la última página");
  }
});

prevPage.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getCharacters();
  } else {
    console.log("Ya estás en la primera página");
  }
});

//Quería probar a hacerlo de otra forma y he creado los elementos con document.createElement en vez de innerHTML. 
// pero veo que se alarga mucho el codigo con respecto al del profesor. supongo que es menos eficiente esta forma.

