const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener('click', () => {

        buttons.forEach(button => {
            button.classList.remove("selected");
        });

        button.classList.add("selected");
    });
});


const form = document.querySelector("#form");
const username = document.querySelector("#username");

//permets de ne pas rafraichir la page

// form.onsubmit = function (event) {
//     console.log("Hello");
// }
//utilisation .addEventListener au click ouvrir l'index.html

// utilisation du local storage pour stocker le nom du joueur //

choose.onclick = () => {
    localStorage.setItem("username", username.value)
}

if (localStorage.getItem("username") != null)
    h2test.textContent = `Hello ${localStorage.getItem("username")} !`
