/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
const eggSprite = document.querySelector('.eggSprite');

// eslint-disable-next-line no-unused-vars
let clicksCounter = 0;
let autoClicksCounter = 0.5;
let totalClicksCounter = 0;
let currentXP = 0;

/* On déclare le niveau courant et précédent à 10
   pour rendre plus difficile dès le début la
   progression vers le prochain niveau */
let xpOfCurrentLvl = 10;
let xpOfPreviousLvl = 10;
let userLvl = 1;

/* Sprite evolution */

// Fonction pour changer l'image en fonction du niveau
const changerImageSelonNiveau = () => {
  const spriteChange = document.querySelector('.eggSprite');

  // Vérification du niveau pour changer l'image
  switch (true) {
    case userLvl >= 1 && userLvl <= 10:
      spriteChange.src = '/assets/golden-egg.png';
      break;
    case userLvl >= 11 && userLvl <= 20:
      spriteChange.src = '/assets/cracked-egg.png';
      break;
    case userLvl >= 21 && userLvl <= 24:
      spriteChange.src = '/assets/broken-egg.png';
      spriteChange.style.height = '17rem';
      spriteChange.style.width = '15rem';
      spriteChange.style.marginTop = '4rem';
      break;
    case userLvl >= 25 && userLvl <= 27:
      spriteChange.src = '/assets/turtle-baby.png';
      spriteChange.style.height = '18rem';
      spriteChange.style.width = '15rem';
      spriteChange.style.marginTop = '4rem';
      break;
    case userLvl >= 26 && userLvl <= 30:
      spriteChange.src = '/assets/turtle-adult.png';
      spriteChange.style.height = '19rem';
      spriteChange.style.width = '17rem';
      spriteChange.style.marginTop = '4rem';
      break;
    // Ajoutez d'autres cas pour chaque niveau si nécessaire
    default:
      spriteChange.src = '/assets/turtle-adult.png'; // Image par défaut si le niveau n'est pas géré
      spriteChange.style.height = '19rem';
      spriteChange.style.width = '17rem';
      spriteChange.style.marginTop = '4rem';
      break;
  }
};

/* Progress Bar */

/* Calcule en prévision du prochain niveau grâce à la suite
   de fibonacci (Fn = Fn-1 + Fn-2) */
const fibonacci = () => {
  const xpOfNextLvl = xpOfCurrentLvl + xpOfPreviousLvl;
  return xpOfNextLvl;
};

/* Décrit le passage au niveau suivant et l'évolution
   Remaining XP permet "d'arrondir" l'XP pour qu'il corresponde à l'XP dont
   il y a besoin pour passer le niveau courant
   -> temporary est une variable temporaire qui permet de conserver le niveau courant
   et le niveau précédent pour les intervertir et simuler le passage de niveaux */
const passToNextLvl = () => {
  const remainingXP = currentXP - xpOfCurrentLvl;
  const temporary = xpOfCurrentLvl;

  xpOfCurrentLvl = fibonacci();
  xpOfPreviousLvl = temporary;
  currentXP = remainingXP;
  userLvl += 1;

  // Appel de la fonction pour changer l'image en fonction du niveau actuel
  changerImageSelonNiveau();
};

/* Simule la progression de la barre d'XP en fonction des points accumulés
   -> currentXP correspond à l'XP actuel du joueur (son nombre de clicks) */
const updateProgressBar = () => {
  const foregroundBar = document.querySelector('#foreground-bar');
  const backgroundBar = document.querySelector('#background-bar');
  const maxwidth = backgroundBar.offsetWidth;
  const progressWidth = (currentXP / xpOfCurrentLvl) * maxwidth;

  foregroundBar.style.width = `${progressWidth}px`;
};

/* Affiche le nombre d'XP à atteindre et le nombre d'XP courant
   au dessus de la barre de progression
   -> currentXP correspond à l'XP actuel du joueur (son nombre de clicks)
   -> xpOfCurrentLvl correspond à l'XP qu'il faut atteindre */
const displayXP = () => {
  const xpText = document.querySelector('#xp-text');
  xpText.textContent = `${Math.round(currentXP)}/${xpOfCurrentLvl}XP`;
};

/* Permet d'ajouter l'XP à l'XP courant
   On test le total d'XP pour voir si on passe au niveau suivant (si on passe dans le "si")
   Puis on met à jour la barre de progression, on affiche l'XP au dessus de la
   barre avec displayXP() */
const increaseXP = (value) => {
  currentXP += value;

  if (currentXP >= xpOfCurrentLvl) {
    passToNextLvl();
  }

  updateProgressBar();
  displayXP();
};

/* Auto-clicker */

function click() {
  autoClicksCounter++;
  increaseXP(totalClicksCounter);
}

function startAutoClicker() {
  setInterval(click, 250);
}

/* Clicks counter */

if (eggSprite) {
  eggSprite.addEventListener('click', () => {
    clicksCounter++;
    totalClicksCounter++;
    totalClicksCounter += autoClicksCounter;
    increaseXP(1);
  });

  startAutoClicker();

  // Animation au clic du sprite
  eggSprite.addEventListener('click', () => {
    const bouton = document.querySelector('.eggSprite');
    bouton.classList.add('clicked');

    // Retirez la classe 'clicked' après un certain délai
    // pour permettre la répétition de l'animation
    setTimeout(() => {
      bouton.classList.remove('clicked');
    }, 300); // Durée de l'animation en millisecondes (0.3s dans cet exemple)
  });
}

/* Pop-up */

// Sélection du bouton de fermeture de la popup
const chooseButton = document.getElementById('.chooseButton');
// Ajout d'un écouteur d'événement au clic sur le bouton de fermeture
document.addEventListener('click', () => {
  // Sélection de l'input d'ID 'username'
  const usernameInput = document.getElementById('#username');
  // Obtention de la valeur de l'input sans les espaces avant et après
  const usernameValue = usernameInput.value.trim();

  // Vérification si la valeur de l'input 'username' n'est pas vide
  if (usernameValue !== '') {
    localStorage.usernameValue();
    chooseButton.innerHTML = "<a href='tuto.html'>go to tuto</a>";
  }
});
