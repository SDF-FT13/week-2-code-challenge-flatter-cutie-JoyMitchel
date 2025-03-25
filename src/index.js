document.addEventListener("DOMContentLoaded", () => {

    const baseUrl = "https://vercel.com/new/joymitchels-projects/success?developer-id=&external-id=&redirect-url=&branch=main&deploymentUrl=week-2-code-challenge-flatter-cutie-joy-mitchel-y2x5-gxhkcxqb6.vercel.app&projectName=week-2-code-challenge-flatter-cutie-joy-mitchel-y2x5&s=https%3A%2F%2Fgithub.com%2FJoyMitchel%2Fweek-2-code-challenge-flatter-cutie-JoyMitchel&gitOrgLimit=&hasTrialAvailable=1&totalProjects=1";
    const characterBar = document.getElementById("character-bar");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");
    const errorMessage = document.getElementById("error-message");

    const characters = [
        { id: 1, name: "Mr. Cute", image: "https://thumbs.gfycat.com/EquatorialIckyCat-max-1mb.gif", votes: 0 },
        { id: 2, name: "Mx. Monkey", image: "https://thumbs.gfycat.com/FatalInnocentAmericanshorthair-max-1mb.gif", votes: 0 },
        { id: 3, name: "Ms. Zebra", image: "https://media2.giphy.com/media/20G9uNqE3K4dRjCppA/source.gif", votes: 0 },
        { id: 4, name: "Dr. Lion", image: "http://bestanimations.com/Animals/Mammals/Cats/Lions/animated-lion-gif-11.gif", votes: 0 },
        { id: 5, name: "Mme. Panda", image: "https://media.giphy.com/media/ALalVMOVR8Qw/giphy.gif", votes: 0 }
    ];

   
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

  
    voteForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        
        const votesToAdd = parseInt(voteInput.value);

        
        if (isNaN(votesToAdd) || votesToAdd <= 0) {
            errorMessage.textContent = "Please enter a valid positive number of votes.";
            return;
        }

        errorMessage.textContent = "";

        const currentVotes = parseInt(voteCount.textContent);
        const updatedVotes = currentVotes + votesToAdd;

       
        voteCount.textContent = updatedVotes;

      
        voteInput.value = "";

       
        const characterId = characters.find(character => character.name === characterName.textContent).id;

       
        try {
            const response = await fetch(`${baseUrl}/characters/${characterId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    votes: updatedVotes
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update vote count');
            }

            const data = await response.json();
            console.log('Vote count updated:', data);

        } catch (error) {
            console.error('Error updating vote count:', error);
        }
    });


    resetButton.addEventListener("click", () => {
        voteCount.textContent = "0";
    });
});







