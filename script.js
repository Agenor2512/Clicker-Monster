const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener('click', () => {

        buttons.forEach(button => {
            button.classList.remove("selected");
        });

        button.classList.add("selected");
    });
});

// récupère la valeur
// utilisation du local storage pour stocker le nom du joueur //

const input = document.querySelector("input");
const choose = document.querySelector("#choose");
choose.addEventListener('click', () => {
    const username = input.value
    console.log(username);
});

//==========================================================/