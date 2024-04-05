document.addEventListener("DOMContentLoaded", function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const evolutionName = urlParams.get('evolucao');
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionName}`)
      .then(response => response.json())
      .then(data => {
        const evolutionImg = document.createElement("img");
        evolutionImg.src = data.sprites.front_default;
        evolutionImg.alt = evolutionName;
        evolutionImg.setAttribute("aria-label", `Imagem de ${evolutionName}`);
        document.getElementById("evolution-img-container").appendChild(evolutionImg);
        document.title = `Página do Pokémon ${evolutionName}`; // Correção aqui
    })
      .catch(error => console.error('Erro ao carregar imagem de evolução:', error));
});
