const baseURL = "";

function fetchCharacters() {
  fetch(baseURL)
    .then((response) => response.json())
    .then((characters) => {
      const characterBar = document.getElementById("character-bar");
      characterBar.innerHTML = "";

      characters.forEach((character) => {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.classList.add("character");
        span.dataset.id = character.id;
        characterBar.appendChild(span);
      });
    });
}

function showCharacterDetails(id) {
    fetch(`${baseURL}/${id}`)
      .then((response) => response.json())
      .then((character) => {
        const detailedInfo = document.getElementById("detailed-info");
        detailedInfo.innerHTML = `
          <h2>${character.name}</h2>
          <img src="${character.image}" alt="${character.name}" />
          <p>Votes: <span id="vote-count-display">${character.votes}</span></p>
        `;
        detailedInfo.dataset.id = character.id;
      });
  }
  
  function handleVoteFormSubmit(event) {
    event.preventDefault();
  
    const voteCount = document.getElementById("vote-count").value;
    const detailedInfo = document.getElementById("detailed-info");
    const characterId = detailedInfo.dataset.id;
  
    if (!characterId) return;
  
    fetch(`${baseURL}/${characterId}`)
      .then((response) => response.json())
      .then((character) => {
        const newVotes = character.votes + parseInt(voteCount);
        updateCharacterVotes(characterId, newVotes);
      });
  }
  
  function updateCharacterVotes(id, votes) {
    fetch(`${baseURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ votes }),
    })
      .then((response) => response.json())
      .then((updatedCharacter) => {
        document.getElementById("vote-count-display").textContent = updatedCharacter.votes;
      });
  }
  
  function resetVotes() {
    const detailedInfo = document.getElementById("detailed-info");
    const characterId = detailedInfo.dataset.id;
  
    if (!characterId) return;
  
    updateCharacterVotes(characterId, 0);
  }
  
  function handleNewCharacterForm(event) {
    event.preventDefault();
  
    const name = document.getElementById("new-character-name").value;
    const image = document.getElementById("new-character-image").value;
  
    fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image,
        votes: 0,
      }),
    })
      .then((response) => response.json())
      .then((newCharacter) => {
        const characterBar = document.getElementById("character-bar");
        const span = document.createElement("span");
        span.textContent = newCharacter.name;
        span.classList.add("character");
        span.dataset.id = newCharacter.id;
        characterBar.appendChild(span);
  
        showCharacterDetails(newCharacter.id);
      });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    fetchCharacters();
  
    document.getElementById("character-bar").addEventListener("click", (event) => {
      if (event.target.classList.contains("character")) {
        const characterId = event.target.dataset.id;
        showCharacterDetails(characterId);
      }
    });
  
    document.getElementById("votes-form").addEventListener("submit", handleVoteFormSubmit);
    document.getElementById("reset-votes").addEventListener("click", resetVotes);
    document.getElementById("character-form").addEventListener("submit", handleNewCharacterForm);
  });







