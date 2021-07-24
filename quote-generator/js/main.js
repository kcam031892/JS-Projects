const quoteEl = document.querySelector('.quote');
const btnGenerate = document.querySelector('.btn');
const loading = document.querySelector('.loading');
btnGenerate.addEventListener('click', generateQuote);
const api = new API();

async function generateQuote() {
  toggleLoading();
  toggleButton();
  try {
    const quote = await api.getQuote();
    renderQuote(quote);
    toggleLoading();
    toggleButton();
  } catch (err) {
    throw err;
  }
}

function toggleLoading() {
  if (loading.classList.contains('show')) {
    loading.classList.remove('show');
  } else {
    loading.classList.add('show');
  }
}
function toggleButton() {
  if (btnGenerate.hasAttribute('disabled')) {
    btnGenerate.removeAttribute('disabled');
  } else {
    btnGenerate.setAttribute('disabled', true);
  }
}

function renderQuote(quote) {
  quoteEl.innerHTML = '';
  const { content, author } = quote;
  // Message Element
  const messageEl = document.createElement('h1');
  messageEl.classList.add('quote__message');
  console.log(content.length);
  if (content.length > 80) {
    messageEl.classList.add('long');
  } else if (content.length > 60 && content.length < 80) {
    messageEl.classList.add('medium');
  } else {
    messageEl.classList.add('short');
  }
  messageEl.textContent = content;

  // Author Element
  const authorEl = document.createElement('h3');
  authorEl.classList.add('quote__author');
  authorEl.textContent = author;

  quoteEl.insertAdjacentElement('afterbegin', messageEl);
  quoteEl.insertAdjacentElement('beforeend', authorEl);
}

// API Class
function API() {
  this.url = 'https://api.quotable.io/random';
}
API.prototype.getQuote = async function () {
  const response = await fetch(this.url);
  const quote = await response.json();
  return quote;
};
