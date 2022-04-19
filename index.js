let currentPage = 1;
let pagArr = [];
let url = 'https://rickandmortyapi.com/api/character/?page=';
const body = document.querySelector('body');
const main = document.querySelector('main');
const pages = document.querySelectorAll('.pages');
const request = new XMLHttpRequest();
const nexPage = document.querySelector('.next');
const prevPage = document.querySelector('.back');

function createCard(obj) {
  main.innerHTML = '';
  obj.forEach((e) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h2');
    const btn = document.createElement('button');
    img.src = e.image;
    title.innerHTML = e.name;
    btn.innerHTML = 'More Info';
    div.append(img, title, btn);
    main.appendChild(div);
    btn.addEventListener('click', function () {
      window.location.href = './character.html';
      localStorage.setItem('user', e.id);
    });
  });
}

function fetchData() {
  request.open('GET', url + currentPage);
  request.send();
  request.onload = function () {
    const response = JSON.parse(request.responseText);
    createCard(response.results);
    pagination();
  };
}

function changePageNext() {
  if (currentPage !== 42) {
    currentPage++;
    console.log(currentPage);
  }
  fetchData();
}

function changePagePrevious() {
  if (currentPage !== 1) {
    currentPage--;
    console.log(currentPage);
  }
  fetchData();
}

window.addEventListener('load', fetchData);
window.addEventListener('load', pagination);
nexPage.addEventListener('click', changePageNext);
prevPage.addEventListener('click', changePagePrevious);

function pagination() {
  if (currentPage < 3) pagArr = [1, 2, 3, 4, 5];
  else if (currentPage < 41) {
    pagArr = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  } else {
    pagArr = [38, 39, 40, 41, 42];
  }
  pages.forEach((el, i) => {
    singleButton(el, i);
  });
}

function singleButton(el, i) {
  el.innerHTML = pagArr[i];
  if (el.innerHTML === currentPage.toString()) {
    el.classList.add('active');
  } else {
    el.classList.remove('active');
  }

  el.addEventListener('click', function () {
    currentPage = el.innerHTML * 1;
    console.log(currentPage);
    fetchData();
    if (el.innerHTML !== currentPage.toString()) {
      el.classList.remove('active');
      el.innerHTML = pagArr[i];
    } else {
      el.classList.add('active');
      el.innerHTML = pagArr[i];
    }
  });
}
