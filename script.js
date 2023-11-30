const buttons = document.querySelectorAll("button");

let clicksCounter = 0;
let autoClicksCounter = 0;
let totalClicksCounter = 0;
let currentXP = 0;

/* On déclare le niveau courant et précédent à 10
   pour rendre plus difficile dès le début la
   progression vers le prochain niveau */
let xpOfCurrentLvl = 10;
let xpOfPreviousLvl = 10;

// Permet de parcourir les boutons de navigations et de leur appliquer ou non 
// la classe "selected" pour changer leur style
buttons.forEach(button => {
    button.addEventListener('click', () => {

        buttons.forEach(button => {
            button.classList.remove("selected");
        });

        button.classList.add("selected");
    });
});

/********************************/
/********* Clicks counter *******/
/********************************/

const eggSprite = document.querySelector(".eggSprite")

eggSprite.addEventListener('click', function () {
    clicksCounter++;
    totalClicksCounter++;
    totalClicksCounter += autoClicksCounter;
    increaseXP(autoClicksCounter + 1);
});

/********************************/
/********* Progress Bar *********/
/********************************/

/* Permet d'ajouter l'XP à l'XP courant
   On test le total d'XP pour voir si on passe au niveau suivant (si on passe dans le "si")
   Puis on met à jour la barre de progression, on affiche l'XP au dessus de la barre avec displayXP() */
const increaseXP = (value) => {
    currentXP += value;

    if (currentXP >= xpOfCurrentLvl) {
        passToNextLvl();
    }

    updateProgressBar();
    displayXP();
}

/* Décrit le passage au niveau suivant 
   Remaining XP permet "d'arondir" l'XP pour qu'il corresponde à l'XP dont 
   il y a besoin pour passer le niveau courant 
   -> temporary est une variable temporaire qui permet de conserver le niveau courant
   et le niveau précédent pour les intervertir et simuler le passage de niveaux */
const passToNextLvl = () => {
    const remainingXP = currentXP - xpOfCurrentLvl;
    const temporary = xpOfCurrentLvl;

    xpOfCurrentLvl = fibonacci();
    xpOfPreviousLvl = temporary;
    currentXP = remainingXP;
}

/* Calcule en prévision du prochain niveau grâce à la suite 
   de fibonacci (Fn = Fn-1 + Fn-2) */
const fibonacci = () => {
    const xpOfNextLvl = xpOfCurrentLvl + xpOfPreviousLvl;
    return xpOfNextLvl;
}

/* Simule la progression de la barre d'XP en fonction des points accumulés
   -> currentXP correspond à l'XP actuel du joueur (son nombre de clicks) */
const updateProgressBar = () => {

    const foregroundBar = document.querySelector('#foreground-bar');
    const backgroundBar = document.querySelector('#background-bar');
    const maxwidth = backgroundBar.offsetWidth;
    const progressWidth = (currentXP / xpOfCurrentLvl) * maxwidth;

    foregroundBar.style.width = `${progressWidth}px`;

}

/* Affiche le nombre d'XP à atteindre et le nombre d'XP courant 
   au dessus de la barre de progression
   -> currentXP correspond à l'XP actuel du joueur (son nombre de clicks)
   -> xpOfCurrentLvl correspond à l'XP qu'il faut atteindre */
const displayXP = () => {
    const xpText = document.querySelector('#xp-text');
    xpText.textContent = `${currentXP}/${xpOfCurrentLvl}XP`;
}

// Animation au clic du sprite
document.querySelector(".eggSprite").addEventListener("click", function () {
    const bouton = this;
    bouton.classList.add("clicked");

    // Retirez la classe 'clicked' après un certain délai pour permettre la répétition de l'animation
    setTimeout(function () {
        bouton.classList.remove("clicked");
    }, 300); // Durée de l'animation en millisecondes (0.3s dans cet exemple)
});
