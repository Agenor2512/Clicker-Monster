/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
const eggSprite = document.querySelector('.eggSprite');
const clicksPerMinutesParagraph = document.querySelector('.clicksPerMinute');

const username = 'Agenor';
const nextButton = document.querySelector('#next');
const tutoText = document.querySelector('#instructions');

const instructions = [
  {
    message: `Welcome in Clicker Monster ${username} ! 
        I'm Mister Tuto and I'm here to teach you 
        the rules !`,
  },

  {
    message: `You know for sure that this game consists in 
        clicking on an egg and earn some XP to pass levels ! Maybe
        you'll discover something interesting in the egg ?`,

  },

  {
    message: `Now we are clear on your goal in this game, let's talk about
        how to play and how to move on the site ! See, here it's the Player button, allow you to
        access to your profile and others informations !`,

    target: document.querySelector('#player'),
  },

  {
    message: 'In Stats you can see... I let you guess. Yeah, your statistics !',

    target: document.querySelector('#statistics'),
  },

  {
    message: `And the star of this show... The Home page ! You'll find your new
        creature here, even if it's not really yet a creature... You just have to click 
        to rectify it !`,

    target: document.querySelector('#home'),
  },

  {
    message: `Good game ${username} !`,
  },
];

// eslint-disable-next-line no-unused-vars
let clicksCounter = 0;
let clicksStatistics = 0;
let previousClicksNumber = 0;
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

/* Clicks per minute */

const calculateClicsPerMinutes = () => {
  clicksStatistics = clicksCounter - previousClicksNumber;
  previousClicksNumber = clicksCounter;

  clicksPerMinutesParagraph.textContent = `Clicks per minute : ${clicksStatistics * 60}`;
};

const startClickPerMinutes = () => {
  setInterval(calculateClicsPerMinutes, 1000);
};

/* Clicks counter */

if (eggSprite) {
  eggSprite.addEventListener('click', () => {
    clicksCounter++;
    totalClicksCounter++;
    totalClicksCounter += autoClicksCounter;
    increaseXP(1);
  });

  startAutoClicker();
  startClickPerMinutes();

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
// const chooseButton = document.querySelector('.chooseButton');
// Ajout d'un écouteur d'événement au clic sur le bouton de fermeture
document.addEventListener('click', () => {
  // Sélection de l'input d'ID 'username'
  const usernameInput = document.querySelector('#username');
  // Obtention de la valeur de l'input sans les espaces avant et après
  const usernameValue = usernameInput.value.trim();
  localStorage.setItem('usernameValue', usernameValue);
  // Vérification si la valeur de l'input 'username' n'est pas vide
  if (usernameValue !== '') {
    localStorage.usernameValue();
  }
});

// Local Storage Username
function displayUsername() {
  const storedUsername = localStorage.getItem('usernameValue');
  const usernameElement = document.querySelector('.usernameChosen');
  if (storedUsername) {
    // Affichage du nom d'utilisateur dans l'élément avec la classe 'usernameChosen'
    usernameElement.innerText = storedUsername;
  } else {
    // Si aucun nom d'utilisateur n'est stocké
    usernameElement.innerText = 'Who are u ?!';
  }
}
// Local Storage Avatars

// Fonction pour sélectionner un avatar et l'enregistrer dans le localStorage
// eslint-disable-next-line no-unused-vars
function selectAvatar(avatarPath) {
  // Stockage du chemin de l'avatar sélectionné dans le localStorage
  localStorage.setItem('selectedAvatar', avatarPath);
}
// selectAvatar();

// Fonction pour afficher l'avatar sélectionné depuis le localStorage
function displaySelectedAvatar() {
  const storedAvatarPath = localStorage.getItem('selectedAvatar');
  const selectedAvatar = document.querySelector('.selectedAvatar');

  if (storedAvatarPath) {
    // Affichage de l'avatar sélectionné dans l'élément avec la classe 'selectedAvatar'
    selectedAvatar.innerHTML = `<img src="${storedAvatarPath}" alt="Selected Avatar">`;

    // Cocher l'input correspondant à l'avatar sélectionné
    const avatarInputs = document.querySelectorAll('input[name="avatar"]');
    avatarInputs.forEach((input) => {
      if (input.value === storedAvatarPath) {
        // eslint-disable-next-line no-param-reassign
        input.checked = true;
      }
    });
  } else {
    // Si aucun avatar n'est sélectionné
    selectedAvatar.innerHTML = 'No avatar';
  }
}
if (window.location.href.match(/\b(player)\b/g)) {
  displayUsername();
  displaySelectedAvatar();
}
/* MisterTuto */

tutoText.textContent = instructions.shift().message;

const toggleTutoHand = (target) => {
  const tutoHand = document.querySelector('#tuto-hand');
  tutoHand.style.visibility = 'hidden';

  if (target) {
    const topPosition = target.offsetTop - tutoHand.offsetHeight - 16;
    const leftPosition = target.offsetLeft + (target.offsetWidth / 2) - (tutoHand.offsetWidth / 2);

    tutoHand.style.top = `${topPosition}px`;
    tutoHand.style.left = `${leftPosition}px`;
    tutoHand.style.visibility = 'visible';
  }
};

const handleTutoButtonClicks = () => {
  if (instructions.length > 0) {
    const currentInstruction = instructions.shift();
    tutoText.textContent = currentInstruction.message;

    toggleTutoHand(currentInstruction.target);
  } else {
    nextButton.innerHTML = "<a href='index.html'>Finish</a>";
  }
};

nextButton.addEventListener('click', handleTutoButtonClicks);
