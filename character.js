const loadCharacter = localStorage.getItem('user');
const url = `https://rickandmortyapi.com/api/character/${loadCharacter}`;
let currentPage = 1;
const request = new XMLHttpRequest();
const main = document.querySelector('main');

function createCard(obj) {
  const div = document.createElement('div');
  const img = document.createElement('img');
  const title = document.createElement('h2');
  const title1 = document.createElement('h3');
  const title2 = document.createElement('h4');
  const location = document.createElement('p');
  const href = document.createElement('a');
  location.innerHTML = ` location: ${obj.location.name}`;
  href.innerHTML = `episodes:`;
  href.className = 'episodes';
  obj.episode.forEach((element, index, arr) => {
    if (arr.length < 5) href.innerHTML += `<br>${element}`;
    else {
      href.innerHTML += `<br>${element}`;
      href.className = 'scroll';
    }
  });
  href.addEventListener('click', function () {
    href.innerHTML = 'episodes';
    obj.episode.forEach((element, index) => {
      href.innerHTML += `<br>${element}`;
      href.classList.remove('scroll');
    });
  });
  img.src = obj.image;
  title.innerHTML = obj.name;
  title1.innerHTML = obj.gender;
  title2.innerHTML = obj.species;

  div.append(img, title, title1, title2, location, href);
  main.appendChild(div);
}

function fetchData() {
  request.open('GET', url);
  request.send();
  request.onload = function () {
    const response = JSON.parse(request.responseText);
    console.log(response);
    createCard(response);
  };
}

window.addEventListener('load', fetchData);
