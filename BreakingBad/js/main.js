import API from './API.js';
const characterList = document.querySelector('.character-list');
const searchResult = document.querySelector('.search-result');
const searchInput = document.querySelector('#search-input');
const favoriteListContent = document.querySelector('.favorite-list');
const btnFavorites = document.querySelector('.btn-favorites');
const favoriteList = document.querySelector('.list');
const searchAddFavorite = document.querySelector('.add-to-favorite')

const api = new API();


document.addEventListener('DOMContentLoaded', () => {
  // Display Characters.
  displayCharacter();
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchCharacter(e.target.value);
  }
});

searchResult.addEventListener('click', e => {
  if(e.target.classList.contains('add-to-favorite')) {
    e.preventDefault();
    const id = e.target.parentElement.parentElement.getAttribute('data-id');
    addCharToFavorite(id);
  }
})
btnFavorites.addEventListener('click', toggleFavoriteListContent);

characterList.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-favorite')) {
    e.preventDefault();
    const characterCard = e.target.parentElement.parentElement;
    const charId = characterCard.getAttribute('data-id');
    addCharToFavorite(charId);
  }
});
function displayCharacter() {
  const characters = api.getCharacters();
  let loader =
    '<div class="flex justify-content-center"><h1>Loading...</h1></div>';
  characterList.innerHTML = loader;
  characters.then((res) => {
    let result = '';
    res.forEach((character) => {
      const div = document.createElement('div');
      div.classList = 'character-card';
      let occupationTemplate = '';
      character.occupation.forEach((occupation) => {
        occupationTemplate += `
          <li>${occupation}</li>
        `;
      });
      result += `
        <div class="character-card" data-id="${character.char_id}">
          <img
          src="${character.img}"
          alt="">
          <div class="character-description">
            <h1>${character.name}</h1>
            <p>${character.nickname}</p>
            <div class="occupation">
              <div>
                <h4>Jobs:</h4>
                <ul class="occupation-list">
                  ${occupationTemplate}
                </ul>
              </div>
            </div>
          </div>
          <div class="flex justify-content-center">
            <a href="#" class="add-to-favorite">Add to my favorite</a>
          </div>
        </div>
      `;
    });
    characterList.innerHTML = result;
  });
}

function searchCharacter(name) {
  const loading =
    '<div class="flex justify-content-center my-2"><h1>Loading...</h1></div>';
  searchResult.innerHTML = loading;
  if (name === '') {
    searchResult.innerHTML = '';
  } else {
    api.getCharacterByName(name).then((res) => {
      if (res.length > 0) {
        const character = res[0];
        let occupations = '';
        character.occupation.forEach((occupation) => {
          occupations += `<li>${occupation}</li>`;
        });
        const result = `
        <div class="character-card" data-id="${character.char_id}">
          <img
          src="${character.img}"
          alt="">
          <div class="character-description">
            <h1>${character.name}</h1>
            <p>${character.nickname}</p>
            <div class="occupation">
              <div>
                <h4>Jobs:</h4>
                <ul class="occupation-list">
                  ${occupations}
                </ul>
        
              </div>
        
            </div>
        
          </div>
          <div class="flex justify-content-center">
            <a href="#" class="add-to-favorite">Add to my favorite</a>
        
          </div>
        <div>
        `;
        searchResult.innerHTML = result;
      } else {
        const resultNotFound =
          '<div class="flex justify-content-center my-2"><h1>Character Not Found</h1></div>';
        searchResult.innerHTML = resultNotFound;
      }
    });
  }
}

function addCharToFavorite(id) {
  api.getCharacterById(id).then((res) => {
    if (!isIdInTheList(id)) {
      const char = res[0];
      const div = document.createElement('div');
      div.setAttribute('data_id', char.char_id);
      div.className = 'item';
      div.innerHTML = `
          <img src="${char.img}" alt="">
          <h1>${char.name}</h1>
      `;
      favoriteList.appendChild(div);
    }
  });
}

function isIdInTheList(id) {
  const list = favoriteList.querySelectorAll('.item');
  const listArr = [...list];
  const ids = listArr.map((id) => id.getAttribute('data_id'));
  return ids.includes(id);
}

function toggleFavoriteListContent(e) {
  e.preventDefault();

  if (favoriteListContent.style.display === 'none') {
    favoriteListContent.style.display = 'block';
  } else {
    favoriteListContent.style.display = 'none';
  }
}
