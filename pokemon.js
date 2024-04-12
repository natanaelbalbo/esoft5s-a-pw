function changePageTitle(title) {
  document.title = title;
}

function generateInfoSection(sprites, pokemonName) {
  const h2 = document.createElement('h2');
  h2.id = "info-pokemon-label";
  h2.textContent = `Informações sobre ${pokemonName}`;

  const img = document.createElement('img');
  //const img = document.querySelector('img');
  img.src = sprites[0];
  img.alt = `Imagem do pokemon ${pokemonName}`;
  let currentIndex = 0;

  img.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % sprites.length;
    img.src = sprites[currentIndex];
  });

  const section = document.querySelector('#info-evolucao');
  section.appendChild(h2);
  section.appendChild(img);
}

async function getPokemonData(name) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const jsonData = await data.json();

    const spritesArray = Object.values(jsonData.sprites).filter(sprite => typeof sprite === 'string');
    generateInfoSection(spritesArray, name);
  } catch (error) {
    console.error(error);
  }
}

function getSearchParams() {

  if (!location.search) {
    return;
  }

  const urlSearchParams = new URLSearchParams(location.search);
  

  const pokemonName = urlSearchParams.get('evolucao');
  
  changePageTitle(`Pagina do ${pokemonName}`);
  getPokemonData(pokemonName);
}

function updateCounter() {
  const storageKey = 'pageVisitCount';
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  }).format(now);

  let visitData = localStorage.getItem(storageKey);
  if (visitData) {
    visitData = JSON.parse(visitData);
    visitData.count++;
    visitData.lastVisit = formattedDate;
  } else {
    visitData = { count: 1, lastVisit: formattedDate };
  }

  localStorage.setItem(storageKey, JSON.stringify(visitData));

  const footer = document.querySelector('footer');
  const visitInfoParagraph = document.createElement('p');
  visitInfoParagraph.textContent = `Esta página foi visitada ${visitData.count} vezes. A última visita foi: ${visitData.lastVisit}`;


  footer.appendChild(visitInfoParagraph);
}
document.addEventListener('DOMContentLoaded', function () {
  getSearchParams();
  updateCounter();
});