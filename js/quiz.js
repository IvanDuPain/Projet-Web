const quizData = [
  {
    category: "Musique",
    question: "Quel album contient le titre « One More Time » ?",
    options: ["Homework", "Discovery", "Human After All", "Random Access Memories"],
    answer: 1,
    explanation: "« One More Time » est le morceau d'ouverture emblématique de l'album Discovery, sorti en 2001.",
    linkText: "Relire la page Musique →",
    linkHref: "projets-musicaux.html"
  },
  {
    category: "Musique",
    question: "En quelle année sort l'album Random Access Memories ?",
    options: ["2005", "2010", "2013", "2016"],
    answer: 2,
    explanation: "Sorti en 2013, Random Access Memories marque un retour aux sonorités disco et funk enregistrées en studio analogique.",
    linkText: "Relire la page Musique →",
    linkHref: "projets-musicaux.html"
  },
  {
    category: "Membres",
    question: "Qui porte le casque doré ?",
    options: ["Thomas Bangalter", "Guy-Manuel de Homem-Christo", "Pharrell Williams", "Kanye West"],
    answer: 1,
    explanation: "Guy-Manuel de Homem-Christo porte le casque or (fondateur de Crydamoure), tandis que Thomas Bangalter porte le casque argenté.",
    linkText: "Relire la page Membres →",
    linkHref: "projets-membres.html"
  },
  {
    category: "Divers",
    question: "Quel film d'animation a été imaginé avec Leiji Matsumoto ?",
    options: ["Electroma", "Interstella 5555", "Tron : L'Héritage", "Eden"],
    answer: 1,
    explanation: "Sorti en 2003, Interstella 5555 est une odyssée animée et muette qui illustre l'intégralité des pistes de Discovery.",
    linkText: "Relire la page Divers →",
    linkHref: "projets-divers.html"
  },
  {
    category: "Divers",
    question: "Où a été enregistré l'album live de la tournée Alive 2006/2007 ?",
    options: ["Coachella", "Paris-Bercy", "Madison Square Garden", "Tokyo Dome"],
    answer: 1,
    explanation: "Le concert légendaire au sommet de la pyramide de LED a été enregistré à Paris-Bercy et a remporté un Grammy Award en 2009.",
    linkText: "Relire la page Divers →",
    linkHref: "projets-divers.html"
  }
];

const letters = ["A", "B", "C", "D"];
let currentIndex = 0;
let userAnswers = new Array(quizData.length).fill(null);

const elActive = document.getElementById("quiz-active");
const elResults = document.getElementById("quiz-results");
const elProgress = document.getElementById("quiz-progress");
const elCategory = document.getElementById("quiz-category");
const elLiveScore = document.getElementById("live-score");
const elQuestion = document.getElementById("quiz-question");
const elOptions = document.getElementById("quiz-options");
const elFeedback = document.getElementById("quiz-feedback");
const elExplanation = document.getElementById("quiz-explanation");
const elPageLink = document.getElementById("quiz-page-link");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnRestart = document.getElementById("btn-restart");

function getScore() {
  return quizData.reduce((total, item, idx) => {
    return total + (userAnswers[idx] === item.answer ? 1 : 0);
  }, 0);
}

function updateLiveScore() {
  if (elLiveScore) {
    elLiveScore.textContent = `Score : ${getScore()} / ${quizData.length}`;
  }
}

function renderQuestion() {
  if (!elQuestion) return;

  const item = quizData[currentIndex];
  const selected = userAnswers[currentIndex];
  const isAnswered = selected !== null;

  elProgress.textContent = `Question ${currentIndex + 1} / ${quizData.length}`;
  elCategory.textContent = `Catégorie : ${item.category}`;
  elQuestion.textContent = item.question;
  updateLiveScore();

  elOptions.innerHTML = "";
  item.options.forEach((optText, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";

    const spanLetter = document.createElement("span");
    spanLetter.textContent = `${letters[idx]}.`;

    const strongText = document.createElement("strong");
    strongText.textContent = optText;

    const spanStatus = document.createElement("span");

    if (isAnswered) {
      btn.disabled = true;
      if (idx === item.answer) {
        spanStatus.textContent = "✔ Bonne réponse";
      } else if (idx === selected) {
        spanStatus.textContent = "✖ Votre choix";
      }
    } else {
      btn.addEventListener("click", () => {
        userAnswers[currentIndex] = idx;
        renderQuestion();
      });
    }

    btn.append(spanLetter, strongText, spanStatus);
    elOptions.appendChild(btn);
  });

  if (isAnswered) {
    elExplanation.textContent = item.explanation;
    elPageLink.textContent = item.linkText;
    elPageLink.href = item.linkHref;
    elFeedback.hidden = false;
    btnNext.disabled = false;
  } else {
    elFeedback.hidden = true;
    btnNext.disabled = true;
  }

  btnPrev.disabled = currentIndex === 0;
  btnNext.textContent = currentIndex === quizData.length - 1 ? "Voir le résultat →" : "Question suivante →";
}

function showResults() {
  elActive.hidden = true;
  elResults.hidden = false;

  const score = getScore();
  const total = quizData.length;
  const recapList = document.getElementById("recap-list");

  recapList.innerHTML = "";
  const title = document.createElement("small");
  title.textContent = "Récapitulatif des réponses";
  recapList.appendChild(title);

  quizData.forEach((item, idx) => {
    const isCorrect = userAnswers[idx] === item.answer;
    const row = document.createElement("span");

    const icon = document.createElement("i");
    icon.textContent = isCorrect ? "✔" : "✖";

    const questionSpan = document.createElement("span");
    questionSpan.textContent = item.question;

    const status = document.createElement("i");
    if (isCorrect) {
      status.textContent = "OK";
    } else {
      const link = document.createElement("a");
      link.href = item.linkHref;
      link.textContent = `→ à relire (page ${item.category})`;
      status.appendChild(link);
    }

    row.append(icon, questionSpan, status);
    recapList.appendChild(row);
  });

  document.getElementById("final-score").textContent = `${score}/${total}`;

  const msgEl = document.getElementById("score-message");
  if (score === total) {
    msgEl.textContent = "Parfait. Vous maîtrisez l'archive sur le bout des doigts. Human After All.";
  } else if (score >= Math.ceil(total / 2)) {
    msgEl.textContent = "Belle performance ! Quelques détails vous ont échappé, n'hésitez pas à relire les chapitres indiqués.";
  } else {
    msgEl.textContent = "Initialisation incomplète. Parcourez les archives du duo avant de retenter l'expérience.";
  }
}

if (btnPrev) {
  btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  });
}

if (btnNext) {
  btnNext.addEventListener("click", () => {
    if (currentIndex < quizData.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      showResults();
    }
  });
}

if (btnRestart) {
  btnRestart.addEventListener("click", () => {
    currentIndex = 0;
    userAnswers.fill(null);
    elResults.hidden = true;
    elActive.hidden = false;
    renderQuestion();
  });
}

renderQuestion();