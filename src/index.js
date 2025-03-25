document.addEventListener("DOMContentLoaded", () => {
    const characters = [
        {
            "id": 1,
            "name": "Mr. Cute",
            "image": "https://thumbs.gfycat.com/EquatorialIckyCat-max-1mb.gif",
            "votes": 0
        },


        {
            "id": 2,
            "name": "Mx. Monkey",
            "image": "https://thumbs.gfycat.com/FatalInnocentAmericanshorthair-max-1mb.gif",
            "votes": 0
        },


        {
            "id": 3,
            "name": "Ms. Zebra",
            "image": "https://media2.giphy.com/media/20G9uNqE3K4dRjCppA/source.gif",
            "votes": 0
        },


        {
            "id": 4,
            "name": "Dr. Lion",
            "image": "http://bestanimations.com/Animals/Mammals/Cats/Lions/animated-lion-gif-11.gif",
            "votes": 0
        },


        {
            "id": 5,
            "name": "Mme. Panda",
            "image": "https://media.giphy.com/media/ALalVMOVR8Qw/giphy.gif",
            "votes": 0
        }
    ];

    const baseUrl = "http://localhost:3000/characters";


    const characterBar = document.getElementById("character-bar");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");

    characters.forEach(character => {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.style.cursor = "pointer";
        span.addEventListener("click", () => displayCharacter(character));
        characterBar.appendChild(span);
    });

    if (characters.length > 0) {
        displayCharacter(characters[0]);
    }

    function displayCharacter(character) {
        characterName.textContent = character.name;
        characterImage.src = character.image;
        voteCount.textContent = character.votes;
    }

    voteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const votesToAdd = parseInt(voteInput.value) || 0;
        const currentVotes = parseInt(voteCount.textContent);
        voteCount.textContent = currentVotes + votesToAdd;
        voteInput.value = "";
    });

    resetButton.addEventListener("click", () => {
        voteCount.textContent = "0";
    });
});




