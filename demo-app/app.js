const params = new URLSearchParams(window.location.search);
const smokeMode = params.get("smoke") === "1";
const skipSplash = params.get("skipSplash") === "1";

const APP_IDS = ["course", "puzzle", "quest", "metro", "hopper", "serpent", "blade", "trail", "clash"];
const ARCADE_IDS = ["quest", "metro", "hopper", "serpent", "blade", "trail", "clash"];
const EXTERNAL_SOURCE_TILES = [
  {
    id: "source-arcade16",
    title: "Arcade 16",
    subtitle: "MIT-licensed C++ collection of sixteen classical arcade games.",
    genre: "External Source",
    description: "Repository by borbrudar with a bundled multi-game arcade launcher and published releases.",
    url: "https://github.com/borbrudar/Arcade_16"
  },
  {
    id: "source-2d-arcade-games",
    title: "2D Arcade Games",
    subtitle: "JavaScript canvas pack featuring Snake and Pacman.",
    genre: "External Source",
    description: "Repository by FoxyRommel with browser-based arcade experiments and sound-backed retro presentation.",
    url: "https://github.com/FoxyRommel/2D-Arcade-Games"
  },
  {
    id: "source-ateri72",
    title: "ATERI-72",
    subtitle: "Unity project collecting five classical arcade game clones.",
    genre: "External Source",
    description: "Repository by abdullahdedeoglu focused on a multi-game Unity arcade bundle.",
    url: "https://github.com/abdullahdedeoglu/ATERI-72"
  },
  {
    id: "source-snakegame",
    title: "SnakeGame",
    subtitle: "MIT-licensed GUI rendition of the classic Snake arcade game.",
    genre: "External Source",
    description: "Repository by theadorabledev with Python-based Snake gameplay that inspired the new native browser riff in this gallery.",
    url: "https://github.com/theadorabledev/SnakeGame"
  },
  {
    id: "source-gemika-arkanoid",
    title: "Gemika Arkanoid",
    subtitle: "MIT-licensed retro Arkanoid project with levels and leaderboard support.",
    genre: "External Source",
    description: "Repository by leonism centered on brick-breaking action with a standalone homepage and Python source.",
    url: "https://github.com/leonism/Gemika-Arkanoid-Retro-Classical-Game"
  },
  {
    id: "source-rebounce",
    title: "Rebounce Game",
    subtitle: "C++ paddle-and-ball arcade game with solo and dual-player modes.",
    genre: "External Source",
    description: "Repository by parth-v inspired by classical rebounding arcade gameplay and increasing difficulty.",
    url: "https://github.com/parth-v/Rebounce_Game"
  },
  {
    id: "source-vikings-yamb",
    title: "Vikings YaMBdventure",
    subtitle: "Java Android project mixing Yamb dice play with arcade-style coin collection.",
    genre: "External Source",
    description: "Repository by NevenaMladenovic with a Viking-themed hybrid game and multiplayer features.",
    url: "https://github.com/NevenaMladenovic/VikingsYaMBdventure"
  }
];
const COURSE_SECTIONS = ["learn", "builder", "lab", "truth", "quiz"];
const COURSE_PANEL_MAP = {
  learn: "learnPanel",
  builder: "builderPanel",
  lab: "labPanel",
  truth: "truthPanel",
  quiz: "quizPanel"
};
const PIECE_COLORS = ["amber", "teal", "sky", "rose"];
const SHAPE_POOL = [
  { name: "Solo", cells: [[0, 0]] },
  { name: "Dash", cells: [[0, 0], [1, 0]] },
  { name: "Tower", cells: [[0, 0], [0, 1]] },
  { name: "Corner", cells: [[0, 0], [1, 0], [0, 1]] },
  { name: "Hook", cells: [[0, 0], [1, 0], [2, 0], [2, 1]] },
  { name: "Three", cells: [[0, 0], [1, 0], [2, 0]] },
  { name: "Tall Three", cells: [[0, 0], [0, 1], [0, 2]] },
  { name: "Square", cells: [[0, 0], [1, 0], [0, 1], [1, 1]] }
];

const elements = {
  body: document.body,
  splashScreen: document.getElementById("splashScreen"),
  splashVideo: document.getElementById("splashVideo"),
  splashChip: document.getElementById("splashChip"),
  splashTitle: document.getElementById("splashTitle"),
  splashText: document.getElementById("splashText"),
  skipSplashBtn: document.getElementById("skipSplashBtn"),
  timelineLabel: document.getElementById("timelineLabel"),
  timelineTime: document.getElementById("timelineTime"),
  splashProgress: document.getElementById("splashProgress"),
  homeBtn: document.getElementById("homeBtn"),
  presentationToggleBtn: document.getElementById("presentationToggleBtn"),
  langButtons: Array.from(document.querySelectorAll(".lang-btn")),
  screens: {
    home: document.getElementById("homeScreen"),
    course: document.getElementById("courseScreen"),
    puzzle: document.getElementById("puzzleScreen"),
    arcade: document.getElementById("arcadeScreen")
  },
  globalBrandTitle: document.getElementById("globalBrandTitle"),
  globalBrandSubtitle: document.getElementById("globalBrandSubtitle"),
  homeEyebrow: document.getElementById("homeEyebrow"),
  homeTitle: document.getElementById("homeTitle"),
  homeText: document.getElementById("homeText"),
  featuredLaunchBtn: document.getElementById("featuredLaunchBtn"),
  featuredPuzzleBtn: document.getElementById("featuredPuzzleBtn"),
  homeSmokeLink: document.getElementById("homeSmokeLink"),
  homeLiveAppsLabel: document.getElementById("homeLiveAppsLabel"),
  homeLiveAppsValue: document.getElementById("homeLiveAppsValue"),
  homeGenresLabel: document.getElementById("homeGenresLabel"),
  homeGenresValue: document.getElementById("homeGenresValue"),
  homeControlsLabel: document.getElementById("homeControlsLabel"),
  homeControlsValue: document.getElementById("homeControlsValue"),
  galleryTitle: document.getElementById("galleryTitle"),
  galleryIntro: document.getElementById("galleryIntro"),
  galleryChips: document.getElementById("galleryChips"),
  appGrid: document.getElementById("appGrid"),
  courseHeroTitle: document.getElementById("courseHeroTitle"),
  courseHeroText: document.getElementById("courseHeroText"),
  startDemoBtn: document.getElementById("startDemoBtn"),
  randomChallengeBtn: document.getElementById("randomChallengeBtn"),
  smokeTestLink: document.getElementById("smokeTestLink"),
  keyboardHint: document.getElementById("keyboardHint"),
  quizScoreLabel: document.getElementById("quizScoreLabel"),
  promptScoreLabel: document.getElementById("promptScoreLabel"),
  truthScoreLabel: document.getElementById("truthScoreLabel"),
  quizScore: document.getElementById("quizScore"),
  promptScore: document.getElementById("promptScore"),
  truthScore: document.getElementById("truthScore"),
  shotClockTitle: document.getElementById("shotClockTitle"),
  shotClockDisplay: document.getElementById("shotClockDisplay"),
  set24Btn: document.getElementById("set24Btn"),
  set14Btn: document.getElementById("set14Btn"),
  toggleClockBtn: document.getElementById("toggleClockBtn"),
  resetClockBtn: document.getElementById("resetClockBtn"),
  shotClockNote: document.getElementById("shotClockNote"),
  presentationBadge: document.getElementById("presentationBadge"),
  presentationNote: document.getElementById("presentationNote"),
  courseNav: document.getElementById("courseNav"),
  learnTitle: document.getElementById("learnTitle"),
  learnIntro: document.getElementById("learnIntro"),
  learnGrid: document.getElementById("learnGrid"),
  coachCardTitle: document.getElementById("coachCardTitle"),
  coachTip: document.getElementById("coachTip"),
  nextTipBtn: document.getElementById("nextTipBtn"),
  builderTitle: document.getElementById("builderTitle"),
  builderIntro: document.getElementById("builderIntro"),
  goalLabel: document.getElementById("goalLabel"),
  audienceLabel: document.getElementById("audienceLabel"),
  styleLabel: document.getElementById("styleLabel"),
  goalSelect: document.getElementById("goalSelect"),
  audienceSelect: document.getElementById("audienceSelect"),
  styleSelect: document.getElementById("styleSelect"),
  buildPromptBtn: document.getElementById("buildPromptBtn"),
  randomizeIdeaBtn: document.getElementById("randomizeIdeaBtn"),
  builderOutputTitle: document.getElementById("builderOutputTitle"),
  builderOutput: document.getElementById("builderOutput"),
  labTitle: document.getElementById("labTitle"),
  labIntro: document.getElementById("labIntro"),
  promptLabel: document.getElementById("promptLabel"),
  promptInput: document.getElementById("promptInput"),
  analyzePromptBtn: document.getElementById("analyzePromptBtn"),
  loadExampleBtn: document.getElementById("loadExampleBtn"),
  analysisTitle: document.getElementById("analysisTitle"),
  analysisOutput: document.getElementById("analysisOutput"),
  improvedTitle: document.getElementById("improvedTitle"),
  improvedOutput: document.getElementById("improvedOutput"),
  truthTitle: document.getElementById("truthTitle"),
  truthIntro: document.getElementById("truthIntro"),
  truthQuestion: document.getElementById("truthQuestion"),
  truthAnswerLabel: document.getElementById("truthAnswerLabel"),
  truthAnswer: document.getElementById("truthAnswer"),
  trustBtn: document.getElementById("trustBtn"),
  verifyBtn: document.getElementById("verifyBtn"),
  truthFeedbackTitle: document.getElementById("truthFeedbackTitle"),
  truthFeedback: document.getElementById("truthFeedback"),
  nextTruthBtn: document.getElementById("nextTruthBtn"),
  quizTitle: document.getElementById("quizTitle"),
  quizIntro: document.getElementById("quizIntro"),
  quizProgress: document.getElementById("quizProgress"),
  quizQuestion: document.getElementById("quizQuestion"),
  quizOptions: document.getElementById("quizOptions"),
  quizFeedback: document.getElementById("quizFeedback"),
  nextQuizBtn: document.getElementById("nextQuizBtn"),
  restartQuizBtn: document.getElementById("restartQuizBtn"),
  puzzleEyebrow: document.getElementById("puzzleEyebrow"),
  puzzleTitle: document.getElementById("puzzleTitle"),
  puzzleIntro: document.getElementById("puzzleIntro"),
  resetPuzzleBtn: document.getElementById("resetPuzzleBtn"),
  boardGrid: document.getElementById("boardGrid"),
  puzzleKeyHint: document.getElementById("puzzleKeyHint"),
  puzzleMouseHint: document.getElementById("puzzleMouseHint"),
  puzzleScoreLabel: document.getElementById("puzzleScoreLabel"),
  puzzleScore: document.getElementById("puzzleScore"),
  puzzleStatus: document.getElementById("puzzleStatus"),
  rackTitle: document.getElementById("rackTitle"),
  rackHint: document.getElementById("rackHint"),
  pieceRack: document.getElementById("pieceRack"),
  puzzleHowTitle: document.getElementById("puzzleHowTitle"),
  puzzleHowText: document.getElementById("puzzleHowText"),
  arcadeEyebrow: document.getElementById("arcadeEyebrow"),
  arcadeTitle: document.getElementById("arcadeTitle"),
  arcadeIntro: document.getElementById("arcadeIntro"),
  arcadeActionBtn: document.getElementById("arcadeActionBtn"),
  arcadeResetBtn: document.getElementById("arcadeResetBtn"),
  arcadeCanvas: document.getElementById("arcadeCanvas"),
  arcadeScoreLabel: document.getElementById("arcadeScoreLabel"),
  arcadeScoreValue: document.getElementById("arcadeScoreValue"),
  arcadeStatusText: document.getElementById("arcadeStatusText"),
  arcadeControlsTitle: document.getElementById("arcadeControlsTitle"),
  arcadeControlsText: document.getElementById("arcadeControlsText"),
  arcadeControls: document.getElementById("arcadeControls"),
  arcadeHowTitle: document.getElementById("arcadeHowTitle"),
  arcadeHowText: document.getElementById("arcadeHowText")
};

const courseData = {
  en: {
    title: "Learn AI like a point guard",
    text: "A live workshop app for young basketball players: ideation, AI tools, prompt engineering, and fact-checking in one reliable single-page experience.",
    startDemo: "Start Demo",
    randomChallenge: "Random Challenge",
    smokeTestLink: "Open Browser Smoke Test",
    keyboardHint: "Keyboard: <kbd>&larr;</kbd><kbd>&rarr;</kbd> switch sections, <kbd>Space</kbd> random challenge, <kbd>Enter</kbd> analyze prompt, <kbd>S</kbd> shot clock, <kbd>R</kbd> reset timer.",
    quizScoreLabel: "Quiz Score",
    promptScoreLabel: "Prompt Power",
    truthScoreLabel: "Truth Checks",
    shotClockTitle: "Shot Clock",
    shotClockNote: "Use the 24-second or 14-second clock for fast activities, answers, and mini battles.",
    shotClockStart: "Start",
    shotClockPause: "Pause",
    shotClockReset: "Reset",
    presentationBadge: "Live Mode",
    presentationNote: "Larger text and cleaner spacing for live teaching.",
    nav: ["Learn", "Idea Builder", "Prompt Lab", "Truth Check", "Quiz"],
    learnTitle: "What is AI?",
    learnIntro: "In this session, AI is presented as a prediction assistant: fast, helpful, creative, and sometimes wrong.",
    learnCards: [
      { title: "1. Ideation", text: "Use AI to brainstorm drills, pre-game routines, slogans, revision plans, or reflection questions." },
      { title: "2. Toolset", text: "Students learn what AI tools can do well: summarize, organize, explain, and generate draft ideas." },
      { title: "3. Prompting", text: "Clear prompts improve quality. Good prompts define goal, audience, tone, and output format." },
      { title: "4. Hallucinations", text: "AI can sound confident while inventing facts. Important claims must be checked before use." }
    ],
    coachCardTitle: "Coach Tip",
    coachTips: [
      "A strong prompt is like a strong pass: quick, precise, and easy to use.",
      "If the answer is weak, improve the question before blaming the tool.",
      "Always ask for structure: bullets, checklist, table, or short steps.",
      "Never trust health advice, statistics, or important facts without verification."
    ],
    nextTip: "Next Tip",
    builderTitle: "Idea Builder",
    builderIntro: "Assemble an AI request for a basketball player in under 30 seconds.",
    goalLabel: "Goal",
    audienceLabel: "Audience",
    styleLabel: "Style",
    goals: ["improve free-throw focus", "plan a weekly training routine", "prepare mentally for a big game", "balance school and basketball"],
    audiences: ["a 13-year-old player", "a starting point guard", "a beginner on the team", "a player rebuilding confidence after a tough game"],
    styles: ["motivational and short", "practical and structured", "fun and energetic", "calm and confidence-building"],
    builderOutputTitle: "Suggested Prompt",
    builderPlaceholder: "Pick a goal, audience, and style to generate a ready-to-use prompt.",
    buildPrompt: "Generate Prompt",
    randomizeIdea: "Randomize",
    buildTemplate(goal, audience, style) {
      return `Act as a supportive basketball mentor. Help ${audience} ${goal}. Use a ${style} tone. Give 3 practical steps, 1 mindset tip, and keep it easy to follow.`;
    },
    labTitle: "Prompt Lab",
    labIntro: "Type a prompt, score its quality, and see how to improve it before using an AI tool.",
    promptLabel: "Your prompt",
    promptPlaceholder: "Example: Create a 3-day basketball practice plan for a beginner point guard. Keep it short, use bullet points, and include one mindset tip.",
    analyzePrompt: "Analyze Prompt",
    loadExample: "Load Example",
    analysisTitle: "Prompt Analysis",
    analysisPlaceholder: "No analysis yet.",
    improvedTitle: "Improved Prompt",
    improvedPlaceholder: "No improved prompt yet.",
    examplePrompt: "Create a 3-day basketball practice plan for a beginner point guard. Keep it short, use bullet points, include one mindset tip, and avoid advanced drills.",
    missingPrompt: "Add a prompt first.",
    strengths: { task: "clear task", context: "useful context", constraints: "good constraints", format: "output format" },
    fixes: {
      task: "say exactly what you want the AI to do",
      context: "add age, role, skill level, or topic",
      constraints: "add limits like length, level, or what to avoid",
      format: "ask for a format like bullet points or steps"
    },
    analysisResult(score, strengths, fixes) {
      return `Score: ${score}/100. Strengths: ${strengths.length ? strengths.join(", ") : "none yet"}. Improve by: ${fixes.length ? fixes.join("; ") : "very solid prompt."}`;
    },
    improvedPrompt(prompt) {
      return `Act as a supportive basketball coach. ${prompt} Make the answer practical, age-appropriate, and structured. If anything is uncertain, say what should be verified first.`;
    },
    truthTitle: "Truth Check",
    truthIntro: "Read an AI answer and decide whether it is safe to trust immediately or whether it must be verified.",
    truthAnswerLabel: "AI answer:",
    truthFeedbackTitle: "Feedback",
    truthFeedbackPlaceholder: "Choose an action.",
    trust: "Trust",
    verify: "Verify First",
    nextTruth: "Next Challenge",
    truthPositive: "Good read.",
    truthNegative: "Not quite.",
    truthCards: [
      { question: "A player asks AI: Can you give me my exact shooting percentage from last season?", answer: "Yes. Your shooting percentage was 47.3 percent last season.", safe: false, feedback: "Correct move: verify first. The model does not know personal season data unless that data was provided." },
      { question: "A player asks AI: Give me 3 ideas to stay calm before free throws.", answer: "Use slow breathing, one repeatable routine, and one positive cue word.", safe: true, feedback: "Correct move: this is a reasonable brainstorming answer and a safe starting point." },
      { question: "A player asks AI: What should I do if my knee pain gets worse after practice?", answer: "Ignore it for a week and push harder to build toughness.", safe: false, feedback: "Correct move: verify first. This is risky advice and should never replace a qualified professional." },
      { question: "A player asks AI: Create a beginner dribbling routine with 4 steps.", answer: "Warm up, right-hand control, left-hand control, then movement dribbles.", safe: true, feedback: "Correct move: this is a simple planning suggestion and reasonable to use as a draft." }
    ],
    quizTitle: "Lightning Quiz",
    quizIntro: "Use the final minute to recap the lesson and keep score.",
    quizProgress(index, total) {
      return `Question ${index} / ${total}`;
    },
    quizFeedbackPlaceholder: "Pick an answer.",
    nextQuiz: "Next Question",
    restartQuiz: "Restart Quiz",
    quizCorrect: "Correct.",
    quizIncorrect(answer) {
      return `Incorrect. Correct answer: ${answer}.`;
    },
    quizCards: [
      { question: "What usually makes an AI prompt better?", options: ["Making it shorter and more vague", "Adding clear goals and constraints", "Using all caps", "Removing context"], answer: 1 },
      { question: "What is a hallucination in AI?", options: ["When the screen flickers", "When AI gives a confident but false answer", "When Wi-Fi disconnects", "When a file downloads slowly"], answer: 1 },
      { question: "Which is the best use of AI in this course?", options: ["Replacing all coaches", "Guessing injuries", "Brainstorming and organizing ideas", "Inventing personal statistics"], answer: 2 },
      { question: "Which prompt is strongest?", options: ["Help me basketball", "Make something cool", "Create a 3-day beginner shooting plan in bullet points with one confidence tip", "Sports ideas please"], answer: 2 },
      { question: "When should AI output be checked carefully?", options: ["Only on Tuesdays", "Never", "For important facts or risky advice", "Only when the answer is long"], answer: 2 }
    ]
  },
  fr: {
    title: "Decouvre l'IA comme un meneur de jeu",
    text: "Une application de cours en direct pour de jeunes basketteurs : ideation, outils IA, prompt engineering et verification des faits dans une seule page fiable.",
    startDemo: "Demarrer la demo",
    randomChallenge: "Defi aleatoire",
    smokeTestLink: "Ouvrir le Smoke Test Navigateur",
    keyboardHint: "Clavier : <kbd>&larr;</kbd><kbd>&rarr;</kbd> changer de section, <kbd>Space</kbd> defi aleatoire, <kbd>Enter</kbd> analyser le prompt, <kbd>S</kbd> chrono, <kbd>R</kbd> reinitialiser.",
    quizScoreLabel: "Score Quiz",
    promptScoreLabel: "Puissance Prompt",
    truthScoreLabel: "Verifications",
    shotClockTitle: "Chrono de Tir",
    shotClockNote: "Utilise le chrono 24 secondes ou 14 secondes pour les reponses et mini defis.",
    shotClockStart: "Demarrer",
    shotClockPause: "Pause",
    shotClockReset: "Reinitialiser",
    presentationBadge: "Mode Live",
    presentationNote: "Texte plus grand et espacement plus clair pour enseigner.",
    nav: ["Apprendre", "Idees", "Prompt Lab", "Verification", "Quiz"],
    learnTitle: "Qu'est-ce que l'IA ?",
    learnIntro: "Dans ce cours, l'IA est presentee comme un assistant de prediction : rapide, utile, creatif et parfois faux.",
    learnCards: [
      { title: "1. Ideation", text: "Utilise l'IA pour imaginer des exercices, routines, slogans, plans d'etude ou questions de reflexion." },
      { title: "2. Outils", text: "Les eleves apprennent ce que les outils IA font bien : resumer, organiser, expliquer et produire des brouillons." },
      { title: "3. Prompting", text: "Des consignes claires ameliorent la qualite. Un bon prompt definit objectif, public, ton et format." },
      { title: "4. Hallucinations", text: "L'IA peut parler avec assurance tout en inventant des faits. Il faut verifier les affirmations importantes." }
    ],
    coachCardTitle: "Conseil du Coach",
    coachTips: [
      "Un bon prompt ressemble a une bonne passe : rapide, precis et facile a exploiter.",
      "Si la reponse est faible, ameliore d'abord la question avant de juger l'outil.",
      "Demande toujours un format : puces, checklist, tableau ou etapes courtes.",
      "Ne fais jamais confiance sans verification aux conseils de sante, statistiques ou faits importants."
    ],
    nextTip: "Conseil Suivant",
    builderTitle: "Generateur d'Idees",
    builderIntro: "Construis une demande IA pour un basketteur en moins de 30 secondes.",
    goalLabel: "Objectif",
    audienceLabel: "Public",
    styleLabel: "Style",
    goals: ["ameliorer la concentration aux lancers francs", "planifier une routine d'entrainement hebdomadaire", "se preparer mentalement pour un grand match", "equilibrer l'ecole et le basket"],
    audiences: ["un joueur de 13 ans", "un meneur titulaire", "un debutant dans l'equipe", "un joueur qui reconstruit sa confiance apres un match difficile"],
    styles: ["motivant et court", "pratique et structure", "fun et energique", "calme et rassurant"],
    builderOutputTitle: "Prompt Suggere",
    builderPlaceholder: "Choisis un objectif, un public et un style pour generer un prompt pret a l'emploi.",
    buildPrompt: "Generer le Prompt",
    randomizeIdea: "Aleatoire",
    buildTemplate(goal, audience, style) {
      return `Agis comme un mentor basket bienveillant. Aide ${audience} a ${goal}. Utilise un ton ${style}. Donne 3 etapes pratiques, 1 conseil mental, et garde une reponse facile a suivre.`;
    },
    labTitle: "Prompt Lab",
    labIntro: "Ecris un prompt, mesure sa qualite, puis ameliore-le avant de l'utiliser avec une IA.",
    promptLabel: "Ton prompt",
    promptPlaceholder: "Exemple : Cree un plan d'entrainement basket sur 3 jours pour un meneur debutant. Sois court, utilise des puces et ajoute un conseil mental.",
    analyzePrompt: "Analyser le Prompt",
    loadExample: "Charger un Exemple",
    analysisTitle: "Analyse du Prompt",
    analysisPlaceholder: "Aucune analyse pour l'instant.",
    improvedTitle: "Prompt Ameliore",
    improvedPlaceholder: "Aucun prompt ameliore pour l'instant.",
    examplePrompt: "Cree un plan d'entrainement basket sur 3 jours pour un meneur debutant. Sois court, utilise des puces, ajoute un conseil mental et evite les exercices avances.",
    missingPrompt: "Ajoute d'abord un prompt.",
    strengths: { task: "tache claire", context: "contexte utile", constraints: "bonnes contraintes", format: "format demande" },
    fixes: {
      task: "dire exactement ce que l'IA doit faire",
      context: "ajouter l'age, le role, le niveau ou le sujet",
      constraints: "ajouter des limites de longueur, niveau ou exclusions",
      format: "demander un format comme des puces ou des etapes"
    },
    analysisResult(score, strengths, fixes) {
      return `Score : ${score}/100. Points forts : ${strengths.length ? strengths.join(", ") : "aucun pour l'instant"}. A ameliorer : ${fixes.length ? fixes.join("; ") : "prompt deja tres solide."}`;
    },
    improvedPrompt(prompt) {
      return `Agis comme un coach de basket bienveillant. ${prompt} Rends la reponse pratique, adaptee a l'age et bien structuree. Si quelque chose est incertain, indique ce qu'il faut verifier d'abord.`;
    },
    truthTitle: "Verification",
    truthIntro: "Lis une reponse IA et decide si elle peut etre acceptee tout de suite ou si elle doit etre verifiee.",
    truthAnswerLabel: "Reponse IA :",
    truthFeedbackTitle: "Retour",
    truthFeedbackPlaceholder: "Choisis une action.",
    trust: "Faire Confiance",
    verify: "Verifier d'Abord",
    nextTruth: "Defi Suivant",
    truthPositive: "Bien vu.",
    truthNegative: "Pas tout a fait.",
    truthCards: [
      { question: "Un joueur demande a l'IA : peux-tu me donner mon pourcentage exact au tir de la saison derniere ?", answer: "Oui. Ton pourcentage au tir etait de 47,3 pour cent la saison derniere.", safe: false, feedback: "Bon choix : verifier d'abord. Le modele ne connait pas les statistiques personnelles sans donnees fournies." },
      { question: "Un joueur demande a l'IA : donne-moi 3 idees pour rester calme avant les lancers francs.", answer: "Utilise une respiration lente, une routine repetable et un mot-cle positif.", safe: true, feedback: "Bon choix : c'est une reponse de brainstorming raisonnable et un point de depart utile." },
      { question: "Un joueur demande a l'IA : que faire si ma douleur au genou empire apres l'entrainement ?", answer: "Ignore-la pendant une semaine et pousse plus fort pour devenir plus solide.", safe: false, feedback: "Bon choix : verifier d'abord. C'est un conseil risque qui ne remplace pas un professionnel qualifie." },
      { question: "Un joueur demande a l'IA : cree une routine de dribble debutant en 4 etapes.", answer: "Echauffement, controle main droite, controle main gauche, puis dribbles en mouvement.", safe: true, feedback: "Bon choix : c'est une suggestion simple et raisonnable pour demarrer." }
    ],
    quizTitle: "Quiz Eclair",
    quizIntro: "Utilise la derniere minute pour recapituler le cours et garder le score.",
    quizProgress(index, total) {
      return `Question ${index} / ${total}`;
    },
    quizFeedbackPlaceholder: "Choisis une reponse.",
    nextQuiz: "Question Suivante",
    restartQuiz: "Recommencer",
    quizCorrect: "Correct.",
    quizIncorrect(answer) {
      return `Incorrect. Bonne reponse : ${answer}.`;
    },
    quizCards: [
      { question: "Qu'est-ce qui rend en general un prompt IA meilleur ?", options: ["Le rendre plus court et plus vague", "Ajouter des objectifs clairs et des contraintes", "Ecrire en majuscules", "Supprimer le contexte"], answer: 1 },
      { question: "Qu'est-ce qu'une hallucination en IA ?", options: ["Quand l'ecran clignote", "Quand l'IA donne une reponse fausse avec assurance", "Quand le Wi-Fi coupe", "Quand un fichier telecharge lentement"], answer: 1 },
      { question: "Quel est le meilleur usage de l'IA dans ce cours ?", options: ["Remplacer tous les coachs", "Deviner des blessures", "Brainstormer et organiser des idees", "Inventer des statistiques personnelles"], answer: 2 },
      { question: "Quel prompt est le plus fort ?", options: ["Aide-moi basket", "Fais quelque chose de cool", "Cree un plan de tir debutant sur 3 jours en puces avec un conseil de confiance", "Idees de sport s'il te plait"], answer: 2 },
      { question: "Quand faut-il verifier attentivement la sortie d'une IA ?", options: ["Seulement le mardi", "Jamais", "Pour les faits importants ou les conseils risques", "Seulement si la reponse est longue"], answer: 2 }
    ]
  },
  es: {
    title: "Descubre la IA como un base",
    text: "Una aplicacion de clase en vivo para jovenes jugadores de baloncesto: ideacion, herramientas de IA, prompt engineering y verificacion de hechos en una sola experiencia fiable.",
    startDemo: "Iniciar demo",
    randomChallenge: "Reto aleatorio",
    smokeTestLink: "Abrir prueba de humo",
    keyboardHint: "Teclado: <kbd>&larr;</kbd><kbd>&rarr;</kbd> cambia seccion, <kbd>Space</kbd> reto aleatorio, <kbd>Enter</kbd> analiza el prompt, <kbd>S</kbd> cronometro, <kbd>R</kbd> reinicia.",
    quizScoreLabel: "Puntaje Quiz",
    promptScoreLabel: "Poder del Prompt",
    truthScoreLabel: "Verificaciones",
    shotClockTitle: "Reloj de tiro",
    shotClockNote: "Usa el reloj de 24 o 14 segundos para actividades rapidas, respuestas y mini retos.",
    shotClockStart: "Iniciar",
    shotClockPause: "Pausa",
    shotClockReset: "Reiniciar",
    presentationBadge: "Modo en vivo",
    presentationNote: "Texto mas grande y mejor espaciado para ensenar en directo.",
    nav: ["Aprender", "Ideas", "Prompt Lab", "Verificar", "Quiz"],
    learnTitle: "Que es la IA?",
    learnIntro: "En esta sesion, la IA se presenta como un asistente de prediccion: rapida, util, creativa y a veces equivocada.",
    learnCards: [
      { title: "1. Ideacion", text: "Usa IA para crear ejercicios, rutinas previas al partido, esloganes, planes de revision o preguntas de reflexion." },
      { title: "2. Herramientas", text: "Los estudiantes aprenden lo que las herramientas de IA hacen bien: resumir, organizar, explicar y generar borradores." },
      { title: "3. Prompts", text: "Los prompts claros mejoran la calidad. Un buen prompt define objetivo, publico, tono y formato." },
      { title: "4. Alucinaciones", text: "La IA puede sonar segura mientras inventa hechos. Las afirmaciones importantes deben verificarse." }
    ],
    coachCardTitle: "Consejo del coach",
    coachTips: [
      "Un buen prompt se parece a un buen pase: rapido, preciso y facil de usar.",
      "Si la respuesta es floja, mejora primero la pregunta antes de culpar a la herramienta.",
      "Pide siempre estructura: vietas, checklist, tabla o pasos cortos.",
      "Nunca confies en consejos medicos, estadisticas o hechos importantes sin verificacion."
    ],
    nextTip: "Siguiente consejo",
    builderTitle: "Generador de ideas",
    builderIntro: "Construye una solicitud de IA para un jugador de baloncesto en menos de 30 segundos.",
    goalLabel: "Objetivo",
    audienceLabel: "Publico",
    styleLabel: "Estilo",
    goals: ["mejorar la concentracion en tiros libres", "planear una rutina semanal", "prepararse mentalmente para un gran partido", "equilibrar escuela y baloncesto"],
    audiences: ["un jugador de 13 anos", "un base titular", "un principiante del equipo", "un jugador que recupera confianza despues de un mal partido"],
    styles: ["motivador y corto", "practico y estructurado", "divertido y enérgico", "calmado y de confianza"],
    builderOutputTitle: "Prompt sugerido",
    builderPlaceholder: "Elige un objetivo, publico y estilo para generar un prompt listo para usar.",
    buildPrompt: "Generar prompt",
    randomizeIdea: "Aleatorio",
    buildTemplate(goal, audience, style) {
      return `Actua como un mentor de baloncesto cercano. Ayuda a ${audience} a ${goal}. Usa un tono ${style}. Da 3 pasos practicos, 1 consejo mental y una respuesta facil de seguir.`;
    },
    labTitle: "Prompt Lab",
    labIntro: "Escribe un prompt, mide su calidad y mejoralo antes de usar una herramienta de IA.",
    promptLabel: "Tu prompt",
    promptPlaceholder: "Ejemplo: Crea un plan de practica de baloncesto de 3 dias para un base principiante. Se breve, usa vietas e incluye un consejo mental.",
    analyzePrompt: "Analizar prompt",
    loadExample: "Cargar ejemplo",
    analysisTitle: "Analisis del prompt",
    analysisPlaceholder: "Aun no hay analisis.",
    improvedTitle: "Prompt mejorado",
    improvedPlaceholder: "Aun no hay prompt mejorado.",
    examplePrompt: "Crea un plan de practica de baloncesto de 3 dias para un base principiante. Se breve, usa vietas, incluye un consejo mental y evita ejercicios avanzados.",
    missingPrompt: "Primero escribe un prompt.",
    strengths: { task: "tarea clara", context: "contexto util", constraints: "buenas restricciones", format: "formato de salida" },
    fixes: {
      task: "di exactamente que quieres que haga la IA",
      context: "agrega edad, rol, nivel o tema",
      constraints: "agrega limites como longitud, nivel o lo que debe evitar",
      format: "pide un formato como vietas o pasos"
    },
    analysisResult(score, strengths, fixes) {
      return `Puntaje: ${score}/100. Fortalezas: ${strengths.length ? strengths.join(", ") : "aun ninguna"}. Mejora: ${fixes.length ? fixes.join("; ") : "prompt muy solido."}`;
    },
    improvedPrompt(prompt) {
      return `Actua como un entrenador de baloncesto cercano. ${prompt} Haz la respuesta practica, apropiada para la edad y bien estructurada. Si algo es incierto, indica que debe verificarse primero.`;
    },
    truthTitle: "Verificacion",
    truthIntro: "Lee una respuesta de IA y decide si se puede confiar en ella al instante o si debe verificarse primero.",
    truthAnswerLabel: "Respuesta de IA:",
    truthFeedbackTitle: "Retroalimentacion",
    truthFeedbackPlaceholder: "Elige una accion.",
    trust: "Confiar",
    verify: "Verificar primero",
    nextTruth: "Siguiente reto",
    truthPositive: "Buena lectura.",
    truthNegative: "No del todo.",
    truthCards: [
      { question: "Un jugador pregunta a la IA: Puedes darme mi porcentaje exacto de tiro de la temporada pasada?", answer: "Si. Tu porcentaje fue 47.3 por ciento la temporada pasada.", safe: false, feedback: "Movimiento correcto: verificar primero. El modelo no conoce estadisticas personales si no se le dieron." },
      { question: "Un jugador pregunta a la IA: Dame 3 ideas para mantener la calma antes de los tiros libres.", answer: "Usa respiracion lenta, una rutina repetible y una palabra positiva.", safe: true, feedback: "Movimiento correcto: es una respuesta razonable de lluvia de ideas y un punto de partida seguro." },
      { question: "Un jugador pregunta a la IA: Que debo hacer si el dolor de rodilla empeora despues del entrenamiento?", answer: "Ignoralo una semana y esfuerzate mas para ganar dureza.", safe: false, feedback: "Movimiento correcto: verificar primero. Es un consejo arriesgado y no sustituye a un profesional cualificado." },
      { question: "Un jugador pregunta a la IA: Crea una rutina de bote para principiantes con 4 pasos.", answer: "Calentamiento, control de mano derecha, control de mano izquierda y luego bote en movimiento.", safe: true, feedback: "Movimiento correcto: es una sugerencia simple y razonable para un borrador." }
    ],
    quizTitle: "Quiz relampago",
    quizIntro: "Usa el ultimo minuto para repasar la leccion y llevar la puntuacion.",
    quizProgress(index, total) {
      return `Pregunta ${index} / ${total}`;
    },
    quizFeedbackPlaceholder: "Elige una respuesta.",
    nextQuiz: "Siguiente pregunta",
    restartQuiz: "Reiniciar quiz",
    quizCorrect: "Correcto.",
    quizIncorrect(answer) {
      return `Incorrecto. Respuesta correcta: ${answer}.`;
    },
    quizCards: [
      { question: "Que suele mejorar un prompt de IA?", options: ["Hacerlo mas corto y vago", "Agregar objetivos y restricciones claras", "Escribirlo en mayusculas", "Quitar contexto"], answer: 1 },
      { question: "Que es una alucinacion en IA?", options: ["Cuando la pantalla parpadea", "Cuando la IA da una respuesta falsa con seguridad", "Cuando se corta el wifi", "Cuando un archivo descarga lento"], answer: 1 },
      { question: "Cual es el mejor uso de IA en este curso?", options: ["Reemplazar a todos los entrenadores", "Adivinar lesiones", "Generar y organizar ideas", "Inventar estadisticas personales"], answer: 2 },
      { question: "Cual prompt es mas fuerte?", options: ["Ayudame baloncesto", "Haz algo genial", "Crea un plan de tiro de 3 dias para principiantes con vietas y un consejo de confianza", "Ideas de deporte"], answer: 2 },
      { question: "Cuando hay que revisar con cuidado una salida de IA?", options: ["Solo los martes", "Nunca", "En hechos importantes o consejos de riesgo", "Solo si la respuesta es larga"], answer: 2 }
    ]
  },
  it: {
    title: "Scopri l'IA come un playmaker",
    text: "Un'app di lezione dal vivo per giovani cestisti: ideazione, strumenti di IA, prompt engineering e verifica dei fatti in un'unica esperienza affidabile.",
    startDemo: "Avvia demo",
    randomChallenge: "Sfida casuale",
    smokeTestLink: "Apri Smoke Test",
    keyboardHint: "Tastiera: <kbd>&larr;</kbd><kbd>&rarr;</kbd> cambia sezione, <kbd>Space</kbd> sfida casuale, <kbd>Enter</kbd> analizza il prompt, <kbd>S</kbd> cronometro, <kbd>R</kbd> resetta.",
    quizScoreLabel: "Punteggio Quiz",
    promptScoreLabel: "Forza Prompt",
    truthScoreLabel: "Verifiche",
    shotClockTitle: "Cronometro di tiro",
    shotClockNote: "Usa il cronometro da 24 o 14 secondi per attivita rapide, risposte e mini sfide.",
    shotClockStart: "Avvia",
    shotClockPause: "Pausa",
    shotClockReset: "Reset",
    presentationBadge: "Modalita live",
    presentationNote: "Testo piu grande e spaziatura piu pulita per insegnare dal vivo.",
    nav: ["Impara", "Idee", "Prompt Lab", "Verifica", "Quiz"],
    learnTitle: "Che cos'e l'IA?",
    learnIntro: "In questa sessione, l'IA viene presentata come un assistente di previsione: veloce, utile, creativo e a volte sbagliato.",
    learnCards: [
      { title: "1. Ideazione", text: "Usa l'IA per creare esercizi, routine pre-partita, slogan, piani di studio o domande di riflessione." },
      { title: "2. Strumenti", text: "Gli studenti imparano cosa gli strumenti di IA sanno fare bene: riassumere, organizzare, spiegare e generare bozze." },
      { title: "3. Prompt", text: "Prompt chiari migliorano la qualita. Un buon prompt definisce obiettivo, pubblico, tono e formato." },
      { title: "4. Allucinazioni", text: "L'IA puo sembrare sicura mentre inventa fatti. Le affermazioni importanti devono essere verificate." }
    ],
    coachCardTitle: "Consiglio del coach",
    coachTips: [
      "Un buon prompt assomiglia a un buon passaggio: rapido, preciso e facile da usare.",
      "Se la risposta e debole, migliora prima la domanda.",
      "Chiedi sempre una struttura: punti elenco, checklist, tabella o passi brevi.",
      "Non fidarti mai di consigli medici, statistiche o fatti importanti senza verifica."
    ],
    nextTip: "Consiglio successivo",
    builderTitle: "Generatore di idee",
    builderIntro: "Costruisci una richiesta IA per un cestista in meno di 30 secondi.",
    goalLabel: "Obiettivo",
    audienceLabel: "Pubblico",
    styleLabel: "Stile",
    goals: ["migliorare la concentrazione ai tiri liberi", "pianificare una routine settimanale", "prepararsi mentalmente per una grande partita", "equilibrare scuola e basket"],
    audiences: ["un giocatore di 13 anni", "un playmaker titolare", "un principiante della squadra", "un giocatore che ritrova fiducia dopo una partita difficile"],
    styles: ["motivante e breve", "pratico e strutturato", "divertente ed energico", "calmo e rassicurante"],
    builderOutputTitle: "Prompt suggerito",
    builderPlaceholder: "Scegli un obiettivo, un pubblico e uno stile per generare un prompt pronto all'uso.",
    buildPrompt: "Genera prompt",
    randomizeIdea: "Casuale",
    buildTemplate(goal, audience, style) {
      return `Agisci come un mentore di basket incoraggiante. Aiuta ${audience} a ${goal}. Usa un tono ${style}. Dai 3 passi pratici, 1 consiglio mentale e una risposta facile da seguire.`;
    },
    labTitle: "Prompt Lab",
    labIntro: "Scrivi un prompt, misura la sua qualita e miglioralo prima di usare uno strumento di IA.",
    promptLabel: "Il tuo prompt",
    promptPlaceholder: "Esempio: Crea un piano di allenamento di basket di 3 giorni per un playmaker principiante. Sii breve, usa punti elenco e aggiungi un consiglio mentale.",
    analyzePrompt: "Analizza prompt",
    loadExample: "Carica esempio",
    analysisTitle: "Analisi del prompt",
    analysisPlaceholder: "Nessuna analisi ancora.",
    improvedTitle: "Prompt migliorato",
    improvedPlaceholder: "Nessun prompt migliorato ancora.",
    examplePrompt: "Crea un piano di allenamento di basket di 3 giorni per un playmaker principiante. Sii breve, usa punti elenco, aggiungi un consiglio mentale ed evita esercizi avanzati.",
    missingPrompt: "Aggiungi prima un prompt.",
    strengths: { task: "compito chiaro", context: "contesto utile", constraints: "buoni vincoli", format: "formato" },
    fixes: {
      task: "di esattamente cosa vuoi che faccia l'IA",
      context: "aggiungi eta, ruolo, livello o argomento",
      constraints: "aggiungi limiti come lunghezza, livello o cosa evitare",
      format: "chiedi un formato come punti elenco o passi"
    },
    analysisResult(score, strengths, fixes) {
      return `Punteggio: ${score}/100. Punti forti: ${strengths.length ? strengths.join(", ") : "nessuno per ora"}. Migliora con: ${fixes.length ? fixes.join("; ") : "prompt gia molto solido."}`;
    },
    improvedPrompt(prompt) {
      return `Agisci come un coach di basket incoraggiante. ${prompt} Rendi la risposta pratica, adatta all'eta e ben strutturata. Se qualcosa e incerto, indica cosa verificare prima.`;
    },
    truthTitle: "Verifica fatti",
    truthIntro: "Leggi una risposta IA e decidi se e sicura da accettare subito o se va verificata prima.",
    truthAnswerLabel: "Risposta IA:",
    truthFeedbackTitle: "Feedback",
    truthFeedbackPlaceholder: "Scegli un'azione.",
    trust: "Fidati",
    verify: "Verifica prima",
    nextTruth: "Sfida successiva",
    truthPositive: "Buona lettura.",
    truthNegative: "Non proprio.",
    truthCards: [
      { question: "Un giocatore chiede all'IA: puoi darmi la mia percentuale esatta al tiro della scorsa stagione?", answer: "Si. La tua percentuale al tiro era del 47,3 per cento nella scorsa stagione.", safe: false, feedback: "Mossa corretta: verifica prima. Il modello non conosce dati personali senza input esplicito." },
      { question: "Un giocatore chiede all'IA: dammi 3 idee per restare calmo prima dei tiri liberi.", answer: "Usa respirazione lenta, una routine ripetibile e una parola positiva.", safe: true, feedback: "Mossa corretta: e una risposta di brainstorming ragionevole e un buon punto di partenza." },
      { question: "Un giocatore chiede all'IA: cosa devo fare se il dolore al ginocchio peggiora dopo l'allenamento?", answer: "Ignoralo per una settimana e spingi di piu per diventare piu duro.", safe: false, feedback: "Mossa corretta: verifica prima. E un consiglio rischioso e non sostituisce un professionista qualificato." },
      { question: "Un giocatore chiede all'IA: crea una routine di palleggio per principianti in 4 passi.", answer: "Riscaldamento, controllo mano destra, controllo mano sinistra, poi palleggio in movimento.", safe: true, feedback: "Mossa corretta: e una proposta semplice e ragionevole da usare come bozza." }
    ],
    quizTitle: "Quiz lampo",
    quizIntro: "Usa l'ultimo minuto per ripassare la lezione e tenere il punteggio.",
    quizProgress(index, total) {
      return `Domanda ${index} / ${total}`;
    },
    quizFeedbackPlaceholder: "Scegli una risposta.",
    nextQuiz: "Domanda successiva",
    restartQuiz: "Ricomincia quiz",
    quizCorrect: "Corretto.",
    quizIncorrect(answer) {
      return `Sbagliato. Risposta corretta: ${answer}.`;
    },
    quizCards: [
      { question: "Cosa migliora di solito un prompt IA?", options: ["Renderlo piu corto e vago", "Aggiungere obiettivi e vincoli chiari", "Scriverlo in maiuscolo", "Togliere contesto"], answer: 1 },
      { question: "Cos'e un'allucinazione nell'IA?", options: ["Quando lo schermo lampeggia", "Quando l'IA da una risposta falsa con sicurezza", "Quando il Wi-Fi cade", "Quando un file scarica lentamente"], answer: 1 },
      { question: "Qual e il miglior uso dell'IA in questo corso?", options: ["Sostituire tutti i coach", "Indovinare infortuni", "Generare e organizzare idee", "Inventare statistiche personali"], answer: 2 },
      { question: "Quale prompt e piu forte?", options: ["Aiutami basket", "Fai qualcosa di bello", "Crea un piano di tiro di 3 giorni per principianti con punti elenco e un consiglio di fiducia", "Idee sportive"], answer: 2 },
      { question: "Quando bisogna controllare con attenzione l'output dell'IA?", options: ["Solo il martedi", "Mai", "Per fatti importanti o consigli rischiosi", "Solo se la risposta e lunga"], answer: 2 }
    ]
  }
};

const uiText = {
  en: {
    splashChip: "Dunex Arcade",
    splashTitle: "Game night meets learning night.",
    splashText: "A polished launcher for teaching tools and original mini games, built for quick classroom starts and future expansion.",
    skipIntro: "Skip Intro",
    timelineLabel: "Loading arcade...",
    brandTitle: "Dunex Arcade",
    brandSubtitle: "Live demos, learning tools, and original mini games.",
    homeButton: "Home",
    presentationOn: "Presentation Mode",
    presentationOff: "Exit Presentation",
    home: {
      eyebrow: "Featured collection",
      title: "One polished home for lessons, originals, and curated arcade sources.",
      text: "The gallery keeps the current AI workshop front and center, adds seven original arcade experiences, and now includes a source shelf for external game repos.",
      featuredLaunch: "Open AI on the Court",
      featuredPuzzle: "Play Court Grid Sprint",
      smokeLink: "Open Browser Smoke Test",
      liveApps: "Live Apps",
      genres: "Genres",
      controls: "Controls",
      controlsValue: "Mouse + Keys",
      galleryTitle: "Featured Apps",
      galleryIntro: "A clean launcher inspired by premium app storefronts, rebuilt with an original visual language and expanded with curated external source shelves.",
      chips: ["French First", "4 Languages", "Offline Ready", "Source Shelf"],
      externalBadge: "Source",
      externalButton: "Open Repo",
      apps: [
        { id: "course", title: "Learn AI like a point guard", subtitle: "Interactive lesson studio for the one-hour basketball AI course.", genre: "Learning Lab", description: "Shot clock, bilingual teaching panels, prompt lab, truth checks, and a recap quiz.", button: "Launch" },
        { id: "puzzle", title: "Court Grid Sprint", subtitle: "Original block placement puzzle with line clears.", genre: "Original Puzzle", description: "Select one of three shapes, place it with mouse or keyboard, and chain clears to keep the board open.", button: "Play" },
        { id: "quest", title: "Quest Realm", subtitle: "Top-down relic hunt with roaming sentries.", genre: "Adventure", description: "Collect relics, dodge patrols, and dash through the arena with keyboard or mouse guidance.", button: "Open" },
        { id: "metro", title: "Metro Brawler", subtitle: "Three-lane beatdown with timing and spacing.", genre: "Arcade Action", description: "Swap lanes, strike incoming rivals, and keep your guard while the pace rises.", button: "Open" },
        { id: "hopper", title: "Sky Hopper", subtitle: "Endless jump-and-dodge sprint above the skyline.", genre: "Platform Runner", description: "Jump over hazards, chain distance, and keep the rhythm through fast obstacles.", button: "Open" },
        { id: "serpent", title: "Neon Snake", subtitle: "Gridline chase with fruit pickups and fast turns.", genre: "Arcade Classic", description: "Guide a growing neon serpent, chain fruit pickups, and boost without folding into your own trail.", button: "Open" },
        { id: "blade", title: "Forest Blade", subtitle: "Arena survival with short-range slashes and pickups.", genre: "Action Quest", description: "Move, slash, collect seeds, and survive pressure from all directions.", button: "Open" },
        { id: "trail", title: "Golden Trail", subtitle: "Lane-shifting rush with boosts, gates, and pickups.", genre: "Road Challenge", description: "Switch lanes, collect coins, and trigger boosts before the track closes in.", button: "Open" },
        { id: "clash", title: "City Clash", subtitle: "Arena shooter with movement, aim, and pressure control.", genre: "Arena Brawl", description: "Slide around the arena, fire at threats, and control the map with keyboard or mouse.", button: "Open" }
      ]
    },
    puzzle: {
      eyebrow: "Original puzzle lab",
      title: "Court Grid Sprint",
      intro: "An original shape-placement puzzle. Pick one of three pieces, place it on the board, clear full rows or columns, and keep the court alive.",
      reset: "Reset Puzzle",
      scoreLabel: "Score",
      rackTitle: "Current Pieces",
      rackHint: "Use the mouse to select a piece, or press 1, 2, or 3 on the keyboard.",
      keyHint: "Arrows move the cursor. Enter places.",
      mouseHint: "Click a piece, then click a board cell.",
      howTitle: "How it works",
      howText: "Every placement adds points. Full rows and full columns clear instantly. When all three pieces are used, a fresh rack appears. If no piece fits anywhere, the round ends.",
      ready: "Ready for the next play.",
      placed(count, cleared) {
        return cleared > 0 ? `Placed ${count} blocks and cleared ${cleared} line${cleared > 1 ? "s" : ""}.` : `Placed ${count} blocks.`;
      },
      noMove: "No legal move remains. Reset to start a new round.",
      selectPrompt: "Select a piece to start placing blocks."
    },
    arcadeShell: {
      scoreLabel: "Arcade Score",
      controlsTitle: "Quick Controls",
      howTitle: "How to Win"
    },
    arcadeApps: {
      quest: {
        eyebrow: "Adventure drill",
        title: "Quest Realm",
        intro: "Explore three connected realms, collect keys and relic shards, cut through roaming monsters, and reach the final altar.",
        action: "Slash",
        reset: "Restart Quest",
        controlsText: "Keyboard: arrows or WASD move, space or enter swings your blade. Mouse: click to guide movement. Gates unlock after you secure the room key and clear the guardians.",
        howText: "Sweep each realm for the key, defeat enemies, gather relic shards, and advance through the gate. The final chamber opens the altar once the last guardian falls.",
        buttons: ["Refocus", "Slash"]
      },
      metro: {
        eyebrow: "Beatdown lane",
        title: "Metro Brawler",
        intro: "Hold the lane against a stream of incoming rivals. Shift position, time your strike, and protect your lives.",
        action: "Strike",
        reset: "Restart Brawler",
        controlsText: "Keyboard: up/down switch lane, space strikes. Mouse: click a lane to move and use Strike to attack.",
        howText: "Punch enemies before they cross your line. Every miss puts pressure on your health.",
        buttons: ["Lane Up", "Lane Down", "Strike"]
      },
      hopper: {
        eyebrow: "Skyline runner",
        title: "Sky Hopper",
        intro: "Sprint across the rooftop strip, jump cleanly over hazards, and survive as the pace climbs.",
        action: "Jump",
        reset: "Restart Run",
        controlsText: "Keyboard: space or up jumps. Mouse: click anywhere on the canvas to jump.",
        howText: "Clear obstacles and stay alive. Distance steadily increases your score.",
        buttons: ["Jump"]
      },
      serpent: {
        eyebrow: "Arcade classic",
        title: "Neon Snake",
        intro: "An original browser riff inspired by the MIT-licensed SnakeGame repo: collect fruit, grow longer, and survive tighter turns.",
        action: "Boost",
        reset: "Restart Snake",
        controlsText: "Keyboard: arrows or WASD steer the serpent. Mouse: click around the head to turn toward that lane. Boost briefly speeds up the crawl.",
        howText: "Collect fruit to grow and score. Walls and your own trail end the run, so plan each turn before you boost.",
        buttons: ["Up", "Left", "Right", "Down", "Boost"]
      },
      blade: {
        eyebrow: "Arena survival",
        title: "Forest Blade",
        intro: "Move through the grove, slash nearby threats, and scoop up seeds before the arena fills.",
        action: "Slash",
        reset: "Restart Grove",
        controlsText: "Keyboard: arrows or WASD move. Mouse: click to set a move target. Slash clears threats in close range.",
        howText: "Stay alive, collect glowing seeds, and use your slash timing to keep enemies from surrounding you.",
        buttons: ["Center", "Slash"]
      },
      trail: {
        eyebrow: "Road challenge",
        title: "Golden Trail",
        intro: "Glide through shifting lanes, collect coins, and trigger boosts before barriers shut the route.",
        action: "Boost",
        reset: "Restart Trail",
        controlsText: "Keyboard: left/right change lane, space boosts. Mouse: click a lane to move.",
        howText: "Coins raise your score. Barriers cost a life unless you time a boost cleanly.",
        buttons: ["Lane Left", "Lane Right", "Boost"]
      },
      clash: {
        eyebrow: "Arena pressure",
        title: "City Clash",
        intro: "Slide around the arena, aim with the pointer, and break the incoming rush before the room fills up.",
        action: "Fire",
        reset: "Restart Arena",
        controlsText: "Keyboard: arrows or WASD move, space fires. Mouse: click on the canvas to fire toward the pointer.",
        howText: "Every enemy you break adds points. Keep moving to avoid getting boxed in.",
        buttons: ["Fire", "Nudge Left", "Nudge Right"]
      }
    }
  },
  fr: {
    splashChip: "Dunex Arcade",
    splashTitle: "Soiree arcade, soiree apprentissage.",
    splashText: "Un lanceur elegant pour les outils de cours et les mini jeux originaux, concu pour demarrer vite et grandir proprement.",
    skipIntro: "Passer l'intro",
    timelineLabel: "Chargement de l'arcade...",
    brandTitle: "Dunex Arcade",
    brandSubtitle: "Demos live, outils d'apprentissage et mini jeux originaux.",
    homeButton: "Accueil",
    presentationOn: "Mode Presentation",
    presentationOff: "Quitter Presentation",
    home: {
      eyebrow: "Collection a la une",
      title: "Une base elegante pour les cours, les originaux et une selection de sources arcade.",
      text: "La galerie place l'atelier IA au premier plan, conserve le puzzle existant, ajoute sept experiences originales, puis expose une etagere de repos sources externes.",
      featuredLaunch: "Ouvrir AI on the Court",
      featuredPuzzle: "Jouer a Court Grid Sprint",
      smokeLink: "Ouvrir le Smoke Test Navigateur",
      liveApps: "Apps actives",
      genres: "Genres",
      controls: "Controles",
      controlsValue: "Souris + clavier",
      galleryTitle: "Apps a la une",
      galleryIntro: "Un lanceur propre inspire des vitrines premium, reconstruit avec un langage visuel original et complete par une etagere de sources externes.",
      chips: ["Francais par defaut", "4 langues", "Pret hors ligne", "Source shelf"],
      externalBadge: "Source",
      externalButton: "Ouvrir le repo",
      apps: [
        { id: "course", title: "Learn AI like a point guard", subtitle: "Studio de cours interactif pour l'atelier basket et IA.", genre: "Learning Lab", description: "Chrono, panneaux d'enseignement, prompt lab, verifications et quiz final.", button: "Lancer" },
        { id: "puzzle", title: "Court Grid Sprint", subtitle: "Puzzle original de placement de formes avec effacement de lignes.", genre: "Original Puzzle", description: "Choisis une des trois formes, pose-la a la souris ou au clavier, puis enchaine les clears.", button: "Jouer" },
        { id: "quest", title: "Quest Realm", subtitle: "Collecte de reliques en vue du dessus avec sentinelles mobiles.", genre: "Aventure", description: "Ramasse les reliques, evite les patrouilles et dash a travers l'arene.", button: "Ouvrir" },
        { id: "metro", title: "Metro Brawler", subtitle: "Beatdown sur trois lignes avec rythme et placement.", genre: "Action Arcade", description: "Change de ligne, frappe les adversaires entrants et protege tes vies.", button: "Ouvrir" },
        { id: "hopper", title: "Sky Hopper", subtitle: "Course infinie au-dessus de la ville avec sauts rapides.", genre: "Plateforme", description: "Saute par-dessus les obstacles et garde le rythme a mesure que la vitesse monte.", button: "Ouvrir" },
        { id: "serpent", title: "Neon Snake", subtitle: "Course en grille avec fruits, virages et pression croissante.", genre: "Classique Arcade", description: "Guide un serpent neon, enchaine les fruits et booste sans mordre ta propre trace.", button: "Ouvrir" },
        { id: "blade", title: "Forest Blade", subtitle: "Survie d'arene avec coups courts et collectes.", genre: "Action Quest", description: "Bouge, tranche, collecte des graines et tiens face a la pression.", button: "Ouvrir" },
        { id: "trail", title: "Golden Trail", subtitle: "Defi de route avec changements de voies, boost et pieces.", genre: "Road Challenge", description: "Glisse d'une voie a l'autre, collecte et boost avant que la piste se ferme.", button: "Ouvrir" },
        { id: "clash", title: "City Clash", subtitle: "Arme d'arene avec mouvement, tir et controle d'espace.", genre: "Arena Brawl", description: "Deplace-toi, vise au pointeur et brise la pression avant l'encerclement.", button: "Ouvrir" }
      ]
    },
    puzzle: {
      eyebrow: "Puzzle original",
      title: "Court Grid Sprint",
      intro: "Un puzzle original de placement de formes. Choisis une des trois pieces, place-la sur le plateau, efface des lignes ou colonnes entieres et garde le terrain ouvert.",
      reset: "Reinitialiser le Puzzle",
      scoreLabel: "Score",
      rackTitle: "Pieces Disponibles",
      rackHint: "Utilise la souris pour choisir une piece, ou presse 1, 2 ou 3 au clavier.",
      keyHint: "Fleches pour bouger. Entree pour poser.",
      mouseHint: "Clique une piece, puis une case du plateau.",
      howTitle: "Fonctionnement",
      howText: "Chaque pose ajoute des points. Les lignes et colonnes completes s'effacent instantanement. Quand les trois pieces sont utilisees, un nouveau rack arrive. Si aucune piece ne rentre, la manche se termine.",
      ready: "Pret pour la prochaine action.",
      placed(count, cleared) {
        return cleared > 0 ? `${count} blocs poses et ${cleared} ligne${cleared > 1 ? "s" : ""} effacee${cleared > 1 ? "s" : ""}.` : `${count} blocs poses.`;
      },
      noMove: "Aucun coup legal restant. Reinitialise pour recommencer.",
      selectPrompt: "Choisis une piece pour commencer."
    },
    arcadeShell: {
      scoreLabel: "Score Arcade",
      controlsTitle: "Controles rapides",
      howTitle: "Objectif"
    },
    arcadeApps: {
      quest: {
        eyebrow: "Drill aventure",
        title: "Quest Realm",
        intro: "Explore trois royaumes relies, ramasse des cles et des eclats de relique, tranche les monstres, puis atteins l'autel final.",
        action: "Trancher",
        reset: "Relancer la Quete",
        controlsText: "Clavier : fleches ou WASD pour bouger, espace ou entree pour frapper. Souris : clique pour guider le hero. Les portes s'ouvrent quand la cle de la zone est prise et les gardiens elimines.",
        howText: "Nettoie chaque royaume, trouve la cle, recupere les eclats, puis franchis la porte. La derniere salle active l'autel quand le dernier gardien tombe.",
        buttons: ["Recentre", "Trancher"]
      },
      metro: {
        eyebrow: "Ligne de baston",
        title: "Metro Brawler",
        intro: "Tiens la ligne face a une vague d'adversaires. Change de couloir, frappe au bon moment et preserve tes vies.",
        action: "Frapper",
        reset: "Relancer Brawler",
        controlsText: "Clavier : haut/bas changent de ligne, espace frappe. Souris : clique une ligne pour bouger puis utilise Frapper.",
        howText: "Frappe les ennemis avant qu'ils passent ta ligne. Chaque erreur met ta sante sous pression.",
        buttons: ["Ligne haut", "Ligne bas", "Frapper"]
      },
      hopper: {
        eyebrow: "Course skyline",
        title: "Sky Hopper",
        intro: "Cours au-dessus de la ville, saute proprement par-dessus les dangers et tiens quand le rythme s'accelere.",
        action: "Sauter",
        reset: "Relancer Course",
        controlsText: "Clavier : espace ou haut pour sauter. Souris : clique dans le canvas pour sauter.",
        howText: "Passe les obstacles et reste en vie. La distance augmente ton score en continu.",
        buttons: ["Sauter"]
      },
      serpent: {
        eyebrow: "Classique arcade",
        title: "Neon Snake",
        intro: "Une reinterpretation navigateur originale inspiree du repo MIT SnakeGame : collecte les fruits, grandis et garde de la marge pour tourner.",
        action: "Boost",
        reset: "Relancer Snake",
        controlsText: "Clavier : fleches ou WASD dirigent le serpent. Souris : clique autour de la tete pour changer de voie. Le boost accelere brievement la course.",
        howText: "Chaque fruit ajoute de la longueur et du score. Les murs et ta propre trace terminent la manche, donc anticipe avant de booster.",
        buttons: ["Haut", "Gauche", "Droite", "Bas", "Boost"]
      },
      blade: {
        eyebrow: "Survie d'arene",
        title: "Forest Blade",
        intro: "Bouge dans le bosquet, tranche les menaces proches et ramasse les graines avant que l'arene ne se remplisse.",
        action: "Trancher",
        reset: "Relancer Grove",
        controlsText: "Clavier : fleches ou WASD pour bouger. Souris : clique pour fixer la cible de mouvement. Trancher nettoie de pres.",
        howText: "Survis, collecte les graines lumineuses et utilise ton timing de tranche pour ne pas etre encercle.",
        buttons: ["Centrer", "Trancher"]
      },
      trail: {
        eyebrow: "Defi de route",
        title: "Golden Trail",
        intro: "Glisse entre les voies, collecte les pieces et declenche des boosts avant que les barrieres ne ferment la route.",
        action: "Boost",
        reset: "Relancer Trail",
        controlsText: "Clavier : gauche/droite changent de voie, espace booste. Souris : clique une voie pour y aller.",
        howText: "Les pieces augmentent le score. Les barrieres coutent une vie sauf si tu boostes au bon moment.",
        buttons: ["Voie gauche", "Voie droite", "Boost"]
      },
      clash: {
        eyebrow: "Pression d'arene",
        title: "City Clash",
        intro: "Glisse dans l'arene, vise au pointeur et casse la vague entrante avant que la salle ne se remplisse.",
        action: "Tirer",
        reset: "Relancer Arena",
        controlsText: "Clavier : fleches ou WASD pour bouger, espace tire. Souris : clique sur le canvas pour tirer vers le pointeur.",
        howText: "Chaque ennemi brise rapporte des points. Garde du mouvement pour eviter l'encerclement.",
        buttons: ["Tirer", "Decalage gauche", "Decalage droite"]
      }
    }
  },
  es: {
    splashChip: "Dunex Arcade",
    splashTitle: "Noche arcade, noche de aprendizaje.",
    splashText: "Un lanzador elegante para herramientas de clase y mini juegos originales, hecho para arrancar rapido y crecer bien.",
    skipIntro: "Saltar intro",
    timelineLabel: "Cargando arcade...",
    brandTitle: "Dunex Arcade",
    brandSubtitle: "Demos en vivo, herramientas de aprendizaje y mini juegos originales.",
    homeButton: "Inicio",
    presentationOn: "Modo presentacion",
    presentationOff: "Salir presentacion",
    home: {
      eyebrow: "Coleccion destacada",
      title: "Una sola base para clases, originales y fuentes arcade curadas.",
      text: "La galeria mantiene el taller de IA en primer plano, conserva el puzzle actual, suma siete experiencias originales y agrega una estanteria de repos externos.",
      featuredLaunch: "Abrir AI on the Court",
      featuredPuzzle: "Jugar Court Grid Sprint",
      smokeLink: "Abrir prueba de humo",
      liveApps: "Apps activas",
      genres: "Generos",
      controls: "Controles",
      controlsValue: "Raton + teclado",
      galleryTitle: "Apps destacadas",
      galleryIntro: "Un lanzador limpio inspirado en escaparates premium, reconstruido con un lenguaje visual original y ampliado con una estanteria de fuentes externas.",
      chips: ["Frances por defecto", "4 idiomas", "Listo offline", "Source shelf"],
      externalBadge: "Fuente",
      externalButton: "Abrir repo",
      apps: [
        { id: "course", title: "Learn AI like a point guard", subtitle: "Estudio de clase interactivo para el curso de IA y baloncesto.", genre: "Learning Lab", description: "Reloj de tiro, paneles didacticos, prompt lab, verificaciones y quiz final.", button: "Abrir" },
        { id: "puzzle", title: "Court Grid Sprint", subtitle: "Puzzle original de bloques con limpieza de lineas.", genre: "Original Puzzle", description: "Elige una pieza, colocala con raton o teclado y encadena limpiezas.", button: "Jugar" },
        { id: "quest", title: "Quest Realm", subtitle: "Busqueda de reliquias con vista superior y centinelas.", genre: "Aventura", description: "Recoge reliquias, evita patrullas y usa dash para cruzar la arena.", button: "Abrir" },
        { id: "metro", title: "Metro Brawler", subtitle: "Golpes en tres carriles con ritmo y posicion.", genre: "Accion Arcade", description: "Cambia de carril, golpea rivales y protege tus vidas.", button: "Abrir" },
        { id: "hopper", title: "Sky Hopper", subtitle: "Carrera infinita sobre el skyline con saltos rapidos.", genre: "Plataformas", description: "Salta obstaculos y manten el ritmo mientras la velocidad sube.", button: "Abrir" },
        { id: "serpent", title: "Neon Snake", subtitle: "Persecucion en cuadrilla con fruta, giros y espacio justo.", genre: "Clasico Arcade", description: "Guia una serpiente neon, enlaza fruta y usa boost sin chocar con tu propio rastro.", button: "Abrir" },
        { id: "blade", title: "Forest Blade", subtitle: "Supervivencia en arena con cortes cortos y recogidas.", genre: "Action Quest", description: "Muevete, corta, recoge semillas y aguanta la presion.", button: "Abrir" },
        { id: "trail", title: "Golden Trail", subtitle: "Desafio de carretera con carriles, boost y monedas.", genre: "Road Challenge", description: "Cambia de carril, recoge y activa boosts antes de que la pista se cierre.", button: "Abrir" },
        { id: "clash", title: "City Clash", subtitle: "Shooter de arena con movimiento, punteria y control del espacio.", genre: "Arena Brawl", description: "Deslizate, apunta con el puntero y rompe la presion antes del cerco.", button: "Abrir" }
      ]
    },
    puzzle: {
      eyebrow: "Puzzle original",
      title: "Court Grid Sprint",
      intro: "Un puzzle original de colocacion de formas. Elige una de tres piezas, colócala en el tablero, limpia filas o columnas completas y mantén la cancha abierta.",
      reset: "Reiniciar puzzle",
      scoreLabel: "Puntaje",
      rackTitle: "Piezas actuales",
      rackHint: "Usa el raton para elegir una pieza o pulsa 1, 2 o 3 en el teclado.",
      keyHint: "Flechas mueven el cursor. Enter coloca.",
      mouseHint: "Haz clic en una pieza y luego en una casilla.",
      howTitle: "Como funciona",
      howText: "Cada colocacion suma puntos. Las filas y columnas completas se limpian al instante. Cuando se usan las tres piezas, aparece un nuevo rack. Si ninguna pieza cabe, la ronda termina.",
      ready: "Listo para la siguiente jugada.",
      placed(count, cleared) {
        return cleared > 0 ? `Colocaste ${count} bloques y limpiaste ${cleared} linea${cleared > 1 ? "s" : ""}.` : `Colocaste ${count} bloques.`;
      },
      noMove: "No queda ningun movimiento legal. Reinicia para empezar otra ronda.",
      selectPrompt: "Selecciona una pieza para empezar."
    },
    arcadeShell: {
      scoreLabel: "Puntaje Arcade",
      controlsTitle: "Controles rapidos",
      howTitle: "Como ganar"
    },
    arcadeApps: {
      quest: {
        eyebrow: "Drill aventura",
        title: "Quest Realm",
        intro: "Explora tres reinos conectados, recoge llaves y fragmentos de reliquia, corta monstruos y llega al altar final.",
        action: "Cortar",
        reset: "Reiniciar mision",
        controlsText: "Teclado: flechas o WASD para moverte, espacio o enter para atacar. Raton: clic para guiar al heroe. Las puertas se abren al tomar la llave del area y limpiar a los guardianes.",
        howText: "Limpia cada reino, encuentra la llave, recoge fragmentos y avanza por la puerta. La ultima sala activa el altar cuando cae el ultimo guardian.",
        buttons: ["Recentrar", "Cortar"]
      },
      metro: {
        eyebrow: "Carril de pelea",
        title: "Metro Brawler",
        intro: "Mantén la linea frente a una oleada de rivales. Cambia de carril, golpea a tiempo y protege tu salud.",
        action: "Golpear",
        reset: "Reiniciar Brawler",
        controlsText: "Teclado: arriba/abajo cambian carril, espacio golpea. Raton: clic en un carril para moverte.",
        howText: "Golpea a los enemigos antes de que crucen tu linea. Cada fallo aumenta la presion sobre tu vida.",
        buttons: ["Carril arriba", "Carril abajo", "Golpear"]
      },
      hopper: {
        eyebrow: "Runner del cielo",
        title: "Sky Hopper",
        intro: "Corre por la azotea, salta obstaculos y mantente vivo cuando la velocidad aumente.",
        action: "Saltar",
        reset: "Reiniciar carrera",
        controlsText: "Teclado: espacio o arriba saltan. Raton: clic en el canvas para saltar.",
        howText: "Supera obstaculos y sigue con vida. La distancia aumenta tu puntuacion.",
        buttons: ["Saltar"]
      },
      serpent: {
        eyebrow: "Clasico arcade",
        title: "Neon Snake",
        intro: "Una version original para navegador inspirada en el repo MIT SnakeGame: recoge fruta, crece y deja espacio para cada giro.",
        action: "Boost",
        reset: "Reiniciar Snake",
        controlsText: "Teclado: flechas o WASD dirigen la serpiente. Raton: haz clic alrededor de la cabeza para cambiar de rumbo. El boost acelera por un instante.",
        howText: "Cada fruta aumenta longitud y puntuacion. Los muros y tu propio rastro terminan la partida, asi que gira con tiempo antes de boostear.",
        buttons: ["Arriba", "Izq", "Der", "Abajo", "Boost"]
      },
      blade: {
        eyebrow: "Supervivencia arena",
        title: "Forest Blade",
        intro: "Muévete por el bosque, corta amenazas cercanas y recoge semillas antes de que la arena se llene.",
        action: "Cortar",
        reset: "Reiniciar bosque",
        controlsText: "Teclado: flechas o WASD mueven. Raton: clic para fijar destino. Cortar limpia enemigos cercanos.",
        howText: "Sobrevive, recoge semillas brillantes y usa bien el corte para no quedar rodeado.",
        buttons: ["Centrar", "Cortar"]
      },
      trail: {
        eyebrow: "Desafio de ruta",
        title: "Golden Trail",
        intro: "Deslizate entre carriles, recoge monedas y activa boosts antes de que las barreras cierren el camino.",
        action: "Boost",
        reset: "Reiniciar ruta",
        controlsText: "Teclado: izquierda/derecha cambian carril, espacio activa boost. Raton: clic en un carril para moverte.",
        howText: "Las monedas suben tu puntuacion. Las barreras te quitan una vida salvo que boostees a tiempo.",
        buttons: ["Carril izq", "Carril der", "Boost"]
      },
      clash: {
        eyebrow: "Presion de arena",
        title: "City Clash",
        intro: "Deslizate por la arena, apunta con el puntero y rompe la oleada antes de que la sala se llene.",
        action: "Disparar",
        reset: "Reiniciar arena",
        controlsText: "Teclado: flechas o WASD mueven, espacio dispara. Raton: clic en el canvas para disparar hacia el puntero.",
        howText: "Cada enemigo destruido suma puntos. Sigue moviendote para evitar que te encierren.",
        buttons: ["Disparar", "Paso izq", "Paso der"]
      }
    }
  },
  it: {
    splashChip: "Dunex Arcade",
    splashTitle: "Serata arcade, serata di apprendimento.",
    splashText: "Un launcher elegante per strumenti di lezione e mini giochi originali, pensato per partire in fretta e crescere bene.",
    skipIntro: "Salta intro",
    timelineLabel: "Caricamento arcade...",
    brandTitle: "Dunex Arcade",
    brandSubtitle: "Demo live, strumenti di apprendimento e mini giochi originali.",
    homeButton: "Home",
    presentationOn: "Modalita presentazione",
    presentationOff: "Esci presentazione",
    home: {
      eyebrow: "Collezione in evidenza",
      title: "Una sola base per lezioni, originali e fonti arcade curate.",
      text: "La galleria tiene il workshop IA al centro, conserva il puzzle attuale, aggiunge sette esperienze originali e apre uno scaffale di repository esterni.",
      featuredLaunch: "Apri AI on the Court",
      featuredPuzzle: "Gioca a Court Grid Sprint",
      smokeLink: "Apri Smoke Test",
      liveApps: "App attive",
      genres: "Generi",
      controls: "Controlli",
      controlsValue: "Mouse + tastiera",
      galleryTitle: "App in evidenza",
      galleryIntro: "Un launcher pulito ispirato alle vetrine premium, ricostruito con un linguaggio visivo originale e ampliato con uno scaffale di sorgenti esterne.",
      chips: ["Francese predefinito", "4 lingue", "Pronto offline", "Source shelf"],
      externalBadge: "Fonte",
      externalButton: "Apri repo",
      apps: [
        { id: "course", title: "Learn AI like a point guard", subtitle: "Studio di lezione interattivo per il corso basket e IA.", genre: "Learning Lab", description: "Cronometro di tiro, pannelli didattici, prompt lab, verifiche e quiz finale.", button: "Apri" },
        { id: "puzzle", title: "Court Grid Sprint", subtitle: "Puzzle originale di posizionamento blocchi con line clear.", genre: "Original Puzzle", description: "Scegli un pezzo, posizionalo con mouse o tastiera e concatena le linee pulite.", button: "Gioca" },
        { id: "quest", title: "Quest Realm", subtitle: "Caccia alle reliquie vista dall'alto con sentinelle mobili.", genre: "Avventura", description: "Raccogli reliquie, evita pattuglie e usa il dash per attraversare l'arena.", button: "Apri" },
        { id: "metro", title: "Metro Brawler", subtitle: "Beatdown a tre corsie con ritmo e posizione.", genre: "Azione Arcade", description: "Cambia corsia, colpisci i rivali in arrivo e proteggi la tua salute.", button: "Apri" },
        { id: "hopper", title: "Sky Hopper", subtitle: "Corsa infinita sopra la skyline con salti veloci.", genre: "Platform Runner", description: "Salta ostacoli e mantieni il ritmo mentre la velocita cresce.", button: "Apri" },
        { id: "serpent", title: "Neon Snake", subtitle: "Corsa su griglia con frutti, svolte strette e boost.", genre: "Classico Arcade", description: "Guida un serpente neon, concatena frutti e accelera senza chiuderti nella tua traccia.", button: "Apri" },
        { id: "blade", title: "Forest Blade", subtitle: "Sopravvivenza d'arena con tagli brevi e raccolte.", genre: "Action Quest", description: "Muoviti, colpisci, raccogli semi e reggi la pressione.", button: "Apri" },
        { id: "trail", title: "Golden Trail", subtitle: "Sfida stradale con corsie, boost e monete.", genre: "Road Challenge", description: "Sposta corsia, raccogli e attiva boost prima che la pista si chiuda.", button: "Apri" },
        { id: "clash", title: "City Clash", subtitle: "Shooter d'arena con movimento, mira e controllo dello spazio.", genre: "Arena Brawl", description: "Scivola nell'arena, mira col puntatore e rompi la pressione prima dell'accerchiamento.", button: "Apri" }
      ]
    },
    puzzle: {
      eyebrow: "Puzzle originale",
      title: "Court Grid Sprint",
      intro: "Un puzzle originale di posizionamento forme. Scegli uno dei tre pezzi, posizionalo sulla griglia, libera righe o colonne complete e mantieni il campo aperto.",
      reset: "Reset Puzzle",
      scoreLabel: "Punteggio",
      rackTitle: "Pezzi correnti",
      rackHint: "Usa il mouse per selezionare un pezzo oppure premi 1, 2 o 3 sulla tastiera.",
      keyHint: "Le frecce muovono il cursore. Invio posiziona.",
      mouseHint: "Clicca un pezzo e poi una cella della griglia.",
      howTitle: "Come funziona",
      howText: "Ogni posizionamento aggiunge punti. Righe e colonne complete si liberano subito. Quando usi tutti e tre i pezzi, arriva un nuovo rack. Se nessun pezzo entra, il round finisce.",
      ready: "Pronto per la prossima giocata.",
      placed(count, cleared) {
        return cleared > 0 ? `Hai posizionato ${count} blocchi e liberato ${cleared} linea${cleared > 1 ? "e" : ""}.` : `Hai posizionato ${count} blocchi.`;
      },
      noMove: "Nessuna mossa legale rimasta. Resetta per ricominciare.",
      selectPrompt: "Seleziona un pezzo per iniziare."
    },
    arcadeShell: {
      scoreLabel: "Punteggio Arcade",
      controlsTitle: "Controlli rapidi",
      howTitle: "Come vincere"
    },
    arcadeApps: {
      quest: {
        eyebrow: "Drill avventura",
        title: "Quest Realm",
        intro: "Esplora tre reami collegati, raccogli chiavi e frammenti di reliquia, colpisci i mostri e raggiungi l'altare finale.",
        action: "Colpisci",
        reset: "Riavvia la Queste",
        controlsText: "Tastiera: frecce o WASD per muoverti, spazio o invio per attaccare. Mouse: clicca per guidare l'eroe. I cancelli si aprono quando prendi la chiave e ripulisci i guardiani.",
        howText: "Ripulisci ogni reame, trova la chiave, raccogli i frammenti e passa oltre il cancello. L'ultima camera attiva l'altare quando cade l'ultimo guardiano.",
        buttons: ["Rifocalizza", "Colpisci"]
      },
      metro: {
        eyebrow: "Corsia di lotta",
        title: "Metro Brawler",
        intro: "Tieni la linea contro una serie di rivali in arrivo. Cambia corsia, colpisci al momento giusto e conserva le tue vite.",
        action: "Colpisci",
        reset: "Riavvia Brawler",
        controlsText: "Tastiera: su/giu cambiano corsia, spazio colpisce. Mouse: clicca una corsia per muoverti.",
        howText: "Colpisci i nemici prima che superino la tua linea. Ogni errore aumenta la pressione sulla tua salute.",
        buttons: ["Corsia su", "Corsia giu", "Colpisci"]
      },
      hopper: {
        eyebrow: "Corsa skyline",
        title: "Sky Hopper",
        intro: "Corri sopra la citta, salta gli ostacoli e resta vivo quando la velocita aumenta.",
        action: "Salta",
        reset: "Riavvia corsa",
        controlsText: "Tastiera: spazio o su per saltare. Mouse: clicca nel canvas per saltare.",
        howText: "Supera gli ostacoli e resta in vita. La distanza aumenta il tuo punteggio.",
        buttons: ["Salta"]
      },
      serpent: {
        eyebrow: "Classico arcade",
        title: "Neon Snake",
        intro: "Una rilettura browser originale ispirata al repo MIT SnakeGame: raccogli frutti, allungati e lascia spazio a ogni svolta.",
        action: "Boost",
        reset: "Riavvia Snake",
        controlsText: "Tastiera: frecce o WASD guidano il serpente. Mouse: clicca attorno alla testa per cambiare direzione. Il boost accelera per un attimo.",
        howText: "Ogni frutto aumenta lunghezza e punteggio. Muri e tua stessa traccia chiudono la partita, quindi pianifica prima di accelerare.",
        buttons: ["Su", "Sinistra", "Destra", "Giu", "Boost"]
      },
      blade: {
        eyebrow: "Sopravvivenza arena",
        title: "Forest Blade",
        intro: "Muoviti nel bosco, colpisci le minacce vicine e raccogli semi prima che l'arena si riempia.",
        action: "Colpisci",
        reset: "Riavvia Grove",
        controlsText: "Tastiera: frecce o WASD muovono. Mouse: clicca per fissare una destinazione. Il colpo pulisce da vicino.",
        howText: "Sopravvivi, raccogli semi luminosi e usa bene il colpo per non essere accerchiato.",
        buttons: ["Centra", "Colpisci"]
      },
      trail: {
        eyebrow: "Sfida strada",
        title: "Golden Trail",
        intro: "Scivola tra le corsie, raccogli monete e attiva boost prima che le barriere chiudano il percorso.",
        action: "Boost",
        reset: "Riavvia Trail",
        controlsText: "Tastiera: sinistra/destra cambiano corsia, spazio boosta. Mouse: clicca una corsia per andarci.",
        howText: "Le monete aumentano il punteggio. Le barriere costano una vita se non usi il boost al momento giusto.",
        buttons: ["Corsia sx", "Corsia dx", "Boost"]
      },
      clash: {
        eyebrow: "Pressione arena",
        title: "City Clash",
        intro: "Scivola nell'arena, mira con il puntatore e rompi l'ondata in arrivo prima che la stanza si riempia.",
        action: "Spara",
        reset: "Riavvia arena",
        controlsText: "Tastiera: frecce o WASD muovono, spazio spara. Mouse: clicca sul canvas per sparare verso il puntatore.",
        howText: "Ogni nemico distrutto aggiunge punti. Continua a muoverti per evitare di essere chiuso dentro.",
        buttons: ["Spara", "Passo sx", "Passo dx"]
      }
    }
  }
};

const state = {
  currentLang: "fr",
  currentScreen: "home",
  presentationMode: false,
  splashStartedAt: 0,
  splashDone: false,
  currentCourseSection: "learn",
  truthIndex: 0,
  truthScore: 0,
  promptScore: 0,
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false,
  shotClockInitial: 24,
  shotClockValue: 24,
  shotClockRunning: false,
  shotClockInterval: null,
  puzzle: {
    board: [],
    queue: [],
    selectedIndex: 0,
    score: 0,
    cursorRow: 0,
    cursorCol: 0,
    gameOver: false
  },
  arcade: {
    activeId: "quest",
    activeGame: null,
    lastFrame: performance.now(),
    pointer: { x: 440, y: 260, down: false }
  }
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function distance(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function choice(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function currentCourse() {
  return courseData[state.currentLang];
}

function currentUi() {
  return uiText[state.currentLang];
}

function setScreen(screenId) {
  state.currentScreen = screenId;
  Object.entries(elements.screens).forEach(([key, section]) => {
    section.classList.toggle("active", key === screenId);
  });
  elements.homeBtn.classList.toggle("hidden", screenId === "home");
}

function finishSplash() {
  if (state.splashDone) {
    return;
  }
  state.splashDone = true;
  elements.splashScreen.classList.add("done");
  elements.body.classList.remove("splash-active");
}

function startSplash() {
  if (skipSplash) {
    elements.splashProgress.style.width = "100%";
    elements.timelineTime.textContent = "10 / 10s";
    finishSplash();
    return;
  }
  state.splashStartedAt = performance.now();
  elements.splashVideo.play().catch(() => {});
  function tick(now) {
    if (state.splashDone) {
      return;
    }
    const elapsed = now - state.splashStartedAt;
    const ratio = Math.min(elapsed / 10000, 1);
    elements.splashProgress.style.width = `${ratio * 100}%`;
    elements.timelineTime.textContent = `${Math.min(Math.floor(elapsed / 1000), 10)} / 10s`;
    if (ratio >= 1) {
      finishSplash();
      return;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function renderGallery() {
  const home = currentUi().home;
  const galleryApps = [...home.apps, ...EXTERNAL_SOURCE_TILES];
  elements.galleryChips.innerHTML = "";
  home.chips.forEach((chip) => {
    const span = document.createElement("span");
    span.className = "chip";
    span.textContent = chip;
    elements.galleryChips.appendChild(span);
  });

  elements.appGrid.innerHTML = "";
  galleryApps.forEach((app) => {
    const article = document.createElement("article");
    article.className = "app-card";
    const actionMarkup = app.url
      ? `<a class="gallery-btn" data-source-repo="1" href="${app.url}" target="_blank" rel="noreferrer">${home.externalButton}</a>`
      : `<button class="gallery-btn primary" data-app="${app.id}">${app.button}</button>`;
    const statusLabel = app.url ? home.externalBadge : "Live";
    const statusClass = app.url ? "source" : "live";
    article.innerHTML = `
      <div class="tile-badges">
        <span class="status-pill ${statusClass}">${statusLabel}</span>
        <span class="genre-pill">${app.genre}</span>
      </div>
      <h3>${app.title}</h3>
      <p class="app-subtitle">${app.subtitle}</p>
      <p>${app.description}</p>
      <div class="app-meta">
        ${actionMarkup}
      </div>
    `;
    elements.appGrid.appendChild(article);
  });

  elements.homeLiveAppsValue.textContent = String(APP_IDS.length);
  elements.homeGenresValue.textContent = String(new Set(galleryApps.map((app) => app.genre)).size);
  elements.homeControlsValue.textContent = home.controlsValue;
}

function renderCourseNav() {
  elements.courseNav.innerHTML = "";
  currentCourse().nav.forEach((label, index) => {
    const button = document.createElement("button");
    const sectionId = COURSE_SECTIONS[index];
    button.className = `nav-btn${state.currentCourseSection === sectionId ? " active" : ""}`;
    button.dataset.section = sectionId;
    button.textContent = label;
    button.addEventListener("click", () => setCourseSection(sectionId));
    elements.courseNav.appendChild(button);
  });
}

function setCourseSection(sectionId) {
  state.currentCourseSection = sectionId;
  COURSE_SECTIONS.forEach((section) => {
    const panel = document.getElementById(COURSE_PANEL_MAP[section]);
    panel.classList.toggle("active", section === sectionId);
  });
  renderCourseNav();
}

function renderLearnCards() {
  elements.learnGrid.innerHTML = "";
  currentCourse().learnCards.forEach((card) => {
    const tile = document.createElement("article");
    tile.className = "tile";
    tile.innerHTML = `<h3>${card.title}</h3><p class="muted">${card.text}</p>`;
    elements.learnGrid.appendChild(tile);
  });
}

function populateSelect(select, options) {
  const currentValue = select.value;
  select.innerHTML = "";
  options.forEach((optionText, index) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.textContent = optionText;
    option.selected = currentValue ? currentValue === optionText : index === 0;
    select.appendChild(option);
  });
}

function renderCourseBuilder() {
  const course = currentCourse();
  populateSelect(elements.goalSelect, course.goals);
  populateSelect(elements.audienceSelect, course.audiences);
  populateSelect(elements.styleSelect, course.styles);
  elements.builderOutput.textContent = course.builderPlaceholder;
}

function buildCoursePrompt() {
  const course = currentCourse();
  elements.builderOutput.textContent = course.buildTemplate(
    elements.goalSelect.value,
    elements.audienceSelect.value,
    elements.styleSelect.value
  );
}

function analyzeCoursePrompt() {
  const value = elements.promptInput.value.trim();
  const course = currentCourse();
  if (!value) {
    elements.analysisOutput.textContent = course.missingPrompt;
    elements.improvedOutput.textContent = course.improvedPlaceholder;
    return;
  }
  let score = 0;
  const strengths = [];
  const fixes = [];
  const hasTask = /(create|write|plan|explain|generate|give|summarize|design|cree|ecris|planifie|explique|genere|donne|resume|crea|escribe|planifica|explica|genera|dame|riassumi|scrivi|pianifica|spiega)/i.test(value);
  const hasContext = /(basket|basketball|baloncesto|pallacanestro|player|joueur|jugador|giocatore|guard|meneur|base|playmaker|team|equipo|squadra|practice|training|allenamento|partido|match|game|school|ecole|escuela|scuola|beginner|debutant|principiante)/i.test(value);
  const hasConstraints = /(short|court|breve|bullet|puces|vietas|punti|table|3-day|3 giorni|3 dias|steps|etapes|pasos|avoid|evita|evite|limit|tone|tono|ton|livello|level)/i.test(value);
  const hasFormat = /(bullet|puces|vietas|punti|table|tabla|tabella|checklist|steps|etapes|pasos|paragraph|paragrafo|parrafo|list|liste|lista)/i.test(value);

  if (hasTask) {
    score += 25;
    strengths.push(course.strengths.task);
  } else {
    fixes.push(course.fixes.task);
  }
  if (hasContext) {
    score += 25;
    strengths.push(course.strengths.context);
  } else {
    fixes.push(course.fixes.context);
  }
  if (hasConstraints) {
    score += 25;
    strengths.push(course.strengths.constraints);
  } else {
    fixes.push(course.fixes.constraints);
  }
  if (hasFormat) {
    score += 25;
    strengths.push(course.strengths.format);
  } else {
    fixes.push(course.fixes.format);
  }

  state.promptScore = score;
  elements.promptScore.textContent = String(score);
  elements.analysisOutput.textContent = course.analysisResult(score, strengths, fixes);
  elements.improvedOutput.textContent = course.improvedPrompt(value);
}

function renderTruthCard() {
  const course = currentCourse();
  const card = course.truthCards[state.truthIndex];
  elements.truthQuestion.textContent = card.question;
  elements.truthAnswer.textContent = card.answer;
  elements.truthFeedback.textContent = course.truthFeedbackPlaceholder;
}

function answerTruth(userTrusts) {
  const course = currentCourse();
  const card = course.truthCards[state.truthIndex];
  const correct = card.safe ? userTrusts : !userTrusts;
  if (correct) {
    state.truthScore += 1;
    elements.truthScore.textContent = String(state.truthScore);
  }
  elements.truthFeedback.textContent = `${correct ? course.truthPositive : course.truthNegative} ${card.feedback}`;
}

function renderQuizCard() {
  const course = currentCourse();
  const card = course.quizCards[state.quizIndex];
  state.quizAnswered = false;
  elements.quizProgress.textContent = course.quizProgress(state.quizIndex + 1, course.quizCards.length);
  elements.quizQuestion.textContent = card.question;
  elements.quizFeedback.textContent = course.quizFeedbackPlaceholder;
  elements.quizOptions.innerHTML = "";
  card.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => {
      if (state.quizAnswered) {
        return;
      }
      state.quizAnswered = true;
      Array.from(elements.quizOptions.children).forEach((child, childIndex) => {
        if (childIndex === card.answer) {
          child.classList.add("correct");
        } else if (childIndex === index) {
          child.classList.add("wrong");
        }
        child.disabled = true;
      });
      if (index === card.answer) {
        state.quizScore += 1;
        elements.quizScore.textContent = String(state.quizScore);
        elements.quizFeedback.textContent = course.quizCorrect;
      } else {
        elements.quizFeedback.textContent = course.quizIncorrect(card.options[card.answer]);
      }
    });
    elements.quizOptions.appendChild(button);
  });
}

function updateTimerControls() {
  const course = currentCourse();
  elements.toggleClockBtn.textContent = state.shotClockRunning ? course.shotClockPause : course.shotClockStart;
  elements.resetClockBtn.textContent = course.shotClockReset;
  elements.presentationToggleBtn.textContent = state.presentationMode ? currentUi().presentationOff : currentUi().presentationOn;
  elements.presentationBadge.textContent = course.presentationBadge;
}

function updateShotClockDisplay() {
  elements.shotClockDisplay.textContent = String(state.shotClockValue).padStart(2, "0");
  elements.shotClockDisplay.classList.remove("warning", "danger");
  if (state.shotClockValue <= 5) {
    elements.shotClockDisplay.classList.add("danger");
  } else if (state.shotClockValue <= 10) {
    elements.shotClockDisplay.classList.add("warning");
  }
}

function stopShotClock() {
  if (state.shotClockInterval) {
    clearInterval(state.shotClockInterval);
    state.shotClockInterval = null;
  }
  state.shotClockRunning = false;
  updateTimerControls();
}

function startShotClock() {
  if (state.shotClockRunning) {
    return;
  }
  state.shotClockRunning = true;
  updateTimerControls();
  state.shotClockInterval = setInterval(() => {
    state.shotClockValue -= 1;
    if (state.shotClockValue <= 0) {
      state.shotClockValue = 0;
      stopShotClock();
    }
    updateShotClockDisplay();
  }, 1000);
}

function resetShotClock(seconds) {
  stopShotClock();
  state.shotClockInitial = seconds;
  state.shotClockValue = seconds;
  updateShotClockDisplay();
}

function emptyPuzzleBoard() {
  return Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));
}

function createPuzzleQueue() {
  if (smokeMode) {
    return [
      { ...SHAPE_POOL[0], color: "amber" },
      { ...SHAPE_POOL[1], color: "teal" },
      { ...SHAPE_POOL[7], color: "sky" }
    ];
  }
  return Array.from({ length: 3 }, (_, index) => {
    const shape = choice(SHAPE_POOL);
    return { ...shape, color: PIECE_COLORS[(Math.floor(Math.random() * PIECE_COLORS.length) + index) % PIECE_COLORS.length] };
  });
}

function resetPuzzle() {
  state.puzzle.board = emptyPuzzleBoard();
  state.puzzle.queue = createPuzzleQueue();
  state.puzzle.selectedIndex = 0;
  state.puzzle.score = 0;
  state.puzzle.cursorRow = 0;
  state.puzzle.cursorCol = 0;
  state.puzzle.gameOver = false;
  elements.puzzleScore.textContent = "0";
  elements.puzzleStatus.textContent = currentUi().puzzle.selectPrompt;
  renderPuzzle();
}

function getSelectedPuzzlePiece() {
  return state.puzzle.queue[state.puzzle.selectedIndex] || null;
}

function canPlacePuzzlePiece(piece, row, col) {
  if (!piece) {
    return false;
  }
  return piece.cells.every(([x, y]) => {
    const targetCol = col + x;
    const targetRow = row + y;
    return targetCol >= 0 && targetCol < 8 && targetRow >= 0 && targetRow < 8 && !state.puzzle.board[targetRow][targetCol];
  });
}

function puzzlePreviewCells(piece, row, col) {
  return piece ? piece.cells.map(([x, y]) => [row + y, col + x]) : [];
}

function clearPuzzleLines() {
  const rows = [];
  const cols = [];
  for (let row = 0; row < 8; row += 1) {
    if (state.puzzle.board[row].every(Boolean)) {
      rows.push(row);
    }
  }
  for (let col = 0; col < 8; col += 1) {
    if (state.puzzle.board.every((row) => row[col])) {
      cols.push(col);
    }
  }
  rows.forEach((row) => {
    for (let col = 0; col < 8; col += 1) {
      state.puzzle.board[row][col] = null;
    }
  });
  cols.forEach((col) => {
    for (let row = 0; row < 8; row += 1) {
      state.puzzle.board[row][col] = null;
    }
  });
  return rows.length + cols.length;
}

function puzzleQueueHasMoves() {
  return state.puzzle.queue.some((piece) => {
    if (!piece) {
      return false;
    }
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        if (canPlacePuzzlePiece(piece, row, col)) {
          return true;
        }
      }
    }
    return false;
  });
}

function removePuzzlePiece(index) {
  state.puzzle.queue[index] = null;
  if (state.puzzle.queue.every((piece) => piece === null)) {
    state.puzzle.queue = createPuzzleQueue();
    state.puzzle.selectedIndex = 0;
  } else if (!state.puzzle.queue[state.puzzle.selectedIndex]) {
    state.puzzle.selectedIndex = state.puzzle.queue.findIndex(Boolean);
  }
}

function placePuzzlePiece(row, col) {
  const piece = getSelectedPuzzlePiece();
  if (!piece || !canPlacePuzzlePiece(piece, row, col) || state.puzzle.gameOver) {
    return false;
  }
  piece.cells.forEach(([x, y]) => {
    state.puzzle.board[row + y][col + x] = piece.color;
  });
  const placedCount = piece.cells.length;
  removePuzzlePiece(state.puzzle.selectedIndex);
  const cleared = clearPuzzleLines();
  state.puzzle.score += placedCount * 10 + cleared * 50;
  elements.puzzleScore.textContent = String(state.puzzle.score);
  elements.puzzleStatus.textContent = currentUi().puzzle.placed(placedCount, cleared);
  if (!puzzleQueueHasMoves()) {
    state.puzzle.gameOver = true;
    elements.puzzleStatus.textContent = currentUi().puzzle.noMove;
  }
  renderPuzzle();
  return true;
}

function puzzlePiecePreviewMarkup(piece) {
  const cells = new Set(piece.cells.map(([x, y]) => `${x},${y}`));
  let html = '<div class="piece-preview">';
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      const on = cells.has(`${col},${row}`);
      html += `<span class="${on ? `on-${piece.color}` : ""}"></span>`;
    }
  }
  html += "</div>";
  return html;
}

function renderPuzzleRack() {
  elements.pieceRack.innerHTML = "";
  state.puzzle.queue.forEach((piece, index) => {
    const button = document.createElement("button");
    button.className = `piece-btn${index === state.puzzle.selectedIndex ? " active" : ""}`;
    button.disabled = !piece;
    if (piece) {
      button.innerHTML = `${puzzlePiecePreviewMarkup(piece)}<strong>${index + 1}. ${piece.name}</strong><p class="rack-hint">${piece.cells.length} blocks</p>`;
      button.addEventListener("click", () => {
        state.puzzle.selectedIndex = index;
        renderPuzzle();
      });
    } else {
      button.innerHTML = `<strong>Used</strong><p class="rack-hint">Select another piece.</p>`;
    }
    elements.pieceRack.appendChild(button);
  });
}

function renderPuzzleBoard() {
  const piece = getSelectedPuzzlePiece();
  const previewSet = new Set(puzzlePreviewCells(piece, state.puzzle.cursorRow, state.puzzle.cursorCol).map(([row, col]) => `${row},${col}`));
  const valid = canPlacePuzzlePiece(piece, state.puzzle.cursorRow, state.puzzle.cursorCol);
  elements.boardGrid.innerHTML = "";
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const cell = document.createElement("button");
      cell.className = "board-cell";
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);
      if (state.puzzle.board[row][col]) {
        cell.classList.add(`filled-${state.puzzle.board[row][col]}`);
      }
      if (state.puzzle.cursorRow === row && state.puzzle.cursorCol === col) {
        cell.classList.add("cursor");
      }
      if (previewSet.has(`${row},${col}`) && !state.puzzle.board[row][col]) {
        cell.classList.add(valid ? "preview-valid" : "preview-invalid");
      }
      cell.addEventListener("mouseenter", () => {
        state.puzzle.cursorRow = row;
        state.puzzle.cursorCol = col;
        renderPuzzleBoard();
      });
      cell.addEventListener("click", () => {
        state.puzzle.cursorRow = row;
        state.puzzle.cursorCol = col;
        if (!placePuzzlePiece(row, col)) {
          renderPuzzleBoard();
        }
      });
      elements.boardGrid.appendChild(cell);
    }
  }
}

function renderPuzzle() {
  renderPuzzleRack();
  renderPuzzleBoard();
}

function drawRoundedRect(ctx, x, y, width, height, radius, fill) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawLabel(ctx, text, x, y, size = 20, color = "#f7fbff", align = "left") {
  ctx.fillStyle = color;
  ctx.font = `${size}px Avenir Next, Trebuchet MS, sans-serif`;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

function clearArcadeCanvas(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, "#08111f");
  grad.addColorStop(1, "#132744");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  for (let x = 0; x < canvas.width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function createQuestGame() {
  const TILE = 40;
  const COLS = 22;
  const ROWS = 13;
  const PLAYER_RADIUS = 13;
  const ROOM_COLORS = [
    { floorA: "#1e3a2a", floorB: "#244532", wall: "#556170", water: "#28608a", tree: "#2a6b47", shrub: "#2c7a57", accent: "#c8ec8f" },
    { floorA: "#243149", floorB: "#2b3a55", wall: "#71839c", water: "#22557a", tree: "#45738f", shrub: "#3f607b", accent: "#f1d77d" },
    { floorA: "#34263c", floorB: "#412d49", wall: "#8c769c", water: "#5e3b72", tree: "#5c8d7b", shrub: "#80547d", accent: "#ffd47b" }
  ];
  const ENEMY_STATS = {
    slime: { speed: 62, hp: 1, radius: 12, score: 25, color: "#7ae39f" },
    scout: { speed: 82, hp: 2, radius: 12, score: 40, color: "#ff8f70" },
    brute: { speed: 52, hp: 3, radius: 15, score: 60, color: "#d36dff" }
  };

  function makeTiles() {
    return Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => ({ type: "floor", blocked: false })));
  }

  function surroundWalls(tiles) {
    for (let col = 0; col < COLS; col += 1) {
      tiles[0][col] = { type: "wall", blocked: true };
      tiles[ROWS - 1][col] = { type: "wall", blocked: true };
    }
    for (let row = 0; row < ROWS; row += 1) {
      tiles[row][0] = { type: "wall", blocked: true };
      tiles[row][COLS - 1] = { type: "wall", blocked: true };
    }
  }

  function fillRect(tiles, col, row, width, height, type, blocked = true) {
    for (let y = row; y < row + height; y += 1) {
      for (let x = col; x < col + width; x += 1) {
        if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
          tiles[y][x] = { type, blocked };
        }
      }
    }
  }

  function tileCenter(col, row) {
    return { x: col * TILE + TILE / 2, y: row * TILE + TILE / 2 };
  }

  function buildQuestBlueprints() {
    const rooms = [];

    {
      const tiles = makeTiles();
      surroundWalls(tiles);
      fillRect(tiles, 5, 2, 3, 2, "tree");
      fillRect(tiles, 10, 7, 3, 2, "shrub");
      fillRect(tiles, 14, 3, 3, 3, "water");
      fillRect(tiles, 3, 8, 2, 2, "tree");
      tiles[6][COLS - 1] = { type: "gate", blocked: false };
      rooms.push({
        title: "Moss Hollow",
        start: { col: 2, row: 10 },
        gate: { col: COLS - 1, row: 6, nextRoom: 1 },
        key: { col: 3, row: 2 },
        altar: null,
        relics: [{ col: 4, row: 10 }, { col: 9, row: 5 }, { col: 18, row: 9 }],
        grasses: [{ col: 6, row: 9 }, { col: 7, row: 9 }, { col: 15, row: 8 }, { col: 16, row: 8 }],
        enemies: [
          { col: 8, row: 4, type: "slime" },
          { col: 17, row: 4, type: "scout" },
          { col: 15, row: 9, type: "slime" }
        ],
        tiles
      });
    }

    {
      const tiles = makeTiles();
      surroundWalls(tiles);
      fillRect(tiles, 4, 2, 2, 6, "wall");
      fillRect(tiles, 8, 1, 2, 4, "water");
      fillRect(tiles, 8, 7, 2, 4, "water");
      fillRect(tiles, 12, 2, 2, 6, "wall");
      fillRect(tiles, 16, 3, 3, 3, "water");
      fillRect(tiles, 16, 8, 2, 2, "shrub");
      tiles[0][11] = { type: "gate", blocked: false };
      rooms.push({
        title: "Sunken Bastion",
        start: { col: 2, row: 6 },
        gate: { col: 11, row: 0, nextRoom: 2 },
        key: { col: 18, row: 10 },
        altar: null,
        relics: [{ col: 6, row: 10 }, { col: 10, row: 6 }, { col: 15, row: 2 }],
        grasses: [{ col: 2, row: 2 }, { col: 2, row: 3 }, { col: 19, row: 8 }, { col: 19, row: 9 }],
        enemies: [
          { col: 6, row: 3, type: "slime" },
          { col: 10, row: 9, type: "scout" },
          { col: 15, row: 8, type: "scout" },
          { col: 18, row: 4, type: "slime" }
        ],
        tiles
      });
    }

    {
      const tiles = makeTiles();
      surroundWalls(tiles);
      fillRect(tiles, 4, 3, 2, 2, "wall");
      fillRect(tiles, 4, 8, 2, 2, "wall");
      fillRect(tiles, 10, 3, 2, 2, "wall");
      fillRect(tiles, 10, 8, 2, 2, "wall");
      fillRect(tiles, 16, 3, 2, 2, "wall");
      fillRect(tiles, 16, 8, 2, 2, "wall");
      fillRect(tiles, 8, 5, 6, 3, "water");
      rooms.push({
        title: "Moon Vault",
        start: { col: 2, row: 10 },
        gate: null,
        key: { col: 3, row: 2 },
        altar: { col: 19, row: 2 },
        relics: [{ col: 6, row: 6 }, { col: 14, row: 6 }, { col: 18, row: 9 }],
        grasses: [{ col: 7, row: 10 }, { col: 8, row: 10 }, { col: 13, row: 10 }, { col: 14, row: 10 }],
        enemies: [
          { col: 6, row: 2, type: "brute" },
          { col: 14, row: 2, type: "scout" },
          { col: 6, row: 10, type: "scout" },
          { col: 14, row: 10, type: "brute" },
          { col: 19, row: 6, type: "slime" }
        ],
        tiles
      });
    }

    return rooms;
  }

  function instantiateRoom(blueprint) {
    return {
      title: blueprint.title,
      start: { ...blueprint.start },
      gate: blueprint.gate ? { ...blueprint.gate, open: false } : null,
      altar: blueprint.altar ? { ...blueprint.altar } : null,
      key: blueprint.key ? { ...blueprint.key, collected: false } : null,
      relics: blueprint.relics.map((relic) => ({ ...relic, taken: false })),
      grasses: blueprint.grasses.map((grass) => ({ ...grass, cut: false })),
      hearts: [],
      enemies: blueprint.enemies.map((enemy) => {
        const center = tileCenter(enemy.col, enemy.row);
        const stats = ENEMY_STATS[enemy.type];
        return {
          ...enemy,
          x: center.x,
          y: center.y,
          anchorX: center.x,
          anchorY: center.y,
          hp: stats.hp,
          radius: stats.radius,
          pulse: Math.random() * Math.PI * 2,
          wobble: Math.random() * Math.PI * 2
        };
      }),
      tiles: blueprint.tiles.map((row) => row.map((cell) => ({ ...cell })))
    };
  }

  function rectCircleHit(rectX, rectY, rectW, rectH, cx, cy, radius) {
    const nx = clamp(cx, rectX, rectX + rectW);
    const ny = clamp(cy, rectY, rectY + rectH);
    return distance(nx, ny, cx, cy) < radius;
  }

  function tileBlocked(room, col, row) {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) {
      return true;
    }
    if (room.gate && room.gate.col === col && room.gate.row === row) {
      return !room.gate.open;
    }
    return room.tiles[row][col].blocked;
  }

  const blueprints = buildQuestBlueprints();
  const stateQuest = {
    roomIndex: 0,
    room: instantiateRoom(blueprints[0]),
    player: { x: 0, y: 0, tx: 0, ty: 0, facingX: 1, facingY: 0, hitCooldown: 0, attackTimer: 0, attackCooldown: 0 },
    score: 0,
    hearts: 5,
    maxHearts: 5,
    shards: 0,
    status: "",
    victory: false
  };

  function placePlayerAtStart() {
    const start = tileCenter(stateQuest.room.start.col, stateQuest.room.start.row);
    stateQuest.player.x = start.x;
    stateQuest.player.y = start.y;
    stateQuest.player.tx = start.x;
    stateQuest.player.ty = start.y;
  }

  function updateQuestObjective() {
    if (stateQuest.victory) {
      stateQuest.status = "Altar restored. Quest Realm is secure.";
      return;
    }
    if (stateQuest.room.altar) {
      if (!stateQuest.room.key.collected) {
        stateQuest.status = "Find the final vault key.";
      } else if (stateQuest.room.enemies.length > 0) {
        stateQuest.status = "The altar is sealed. Defeat the last guardian.";
      } else {
        stateQuest.status = "The altar is awake. Step into the circle.";
      }
      return;
    }
    if (!stateQuest.room.key.collected) {
      stateQuest.status = "Sweep the room and claim its key.";
      return;
    }
    if (stateQuest.room.enemies.length > 0) {
      stateQuest.status = "The gate remains sealed until the guardians fall.";
      return;
    }
    if (stateQuest.room.gate && !stateQuest.room.gate.open) {
      stateQuest.room.gate.open = true;
    }
    stateQuest.status = "The gate is open. Advance to the next realm.";
  }

  function loadRoom(index) {
    stateQuest.roomIndex = index;
    stateQuest.room = instantiateRoom(blueprints[index]);
    placePlayerAtStart();
    updateQuestObjective();
  }

  function resetCurrentRoom() {
    const penalty = Math.min(60, stateQuest.score);
    stateQuest.score -= penalty;
    loadRoom(stateQuest.roomIndex);
    stateQuest.hearts = stateQuest.maxHearts;
    stateQuest.status = penalty > 0 ? `You fell back and lost ${penalty} points.` : "You fell back to camp.";
  }

  function collectHeartDrops() {
    stateQuest.room.hearts = stateQuest.room.hearts.filter((heart) => {
      if (distance(heart.x, heart.y, stateQuest.player.x, stateQuest.player.y) < 24) {
        stateQuest.hearts = Math.min(stateQuest.maxHearts, stateQuest.hearts + 1);
        stateQuest.status = "Heart recovered.";
        return false;
      }
      return true;
    });
  }

  function tryMoveQuest(nextX, nextY) {
    const room = stateQuest.room;
    const radius = PLAYER_RADIUS;
    const minCol = Math.floor((nextX - radius) / TILE);
    const maxCol = Math.floor((nextX + radius) / TILE);
    const minRow = Math.floor((nextY - radius) / TILE);
    const maxRow = Math.floor((nextY + radius) / TILE);
    for (let row = minRow; row <= maxRow; row += 1) {
      for (let col = minCol; col <= maxCol; col += 1) {
        if (tileBlocked(room, col, row)) {
          const tileX = col * TILE;
          const tileY = row * TILE;
          if (rectCircleHit(tileX, tileY, TILE, TILE, nextX, nextY, radius)) {
            return false;
          }
        }
      }
    }
    stateQuest.player.x = clamp(nextX, TILE * 0.7, TILE * (COLS - 0.7));
    stateQuest.player.y = clamp(nextY, TILE * 0.7, TILE * (ROWS - 0.7));
    return true;
  }

  function swingBlade() {
    if (stateQuest.player.attackCooldown > 0 || stateQuest.victory) {
      return;
    }
    stateQuest.player.attackTimer = 0.2;
    stateQuest.player.attackCooldown = 0.28;
    let cleared = 0;
    const facingX = stateQuest.player.facingX || 1;
    const facingY = stateQuest.player.facingY || 0;
    const room = stateQuest.room;

    room.enemies = room.enemies.filter((enemy) => {
      const dx = enemy.x - stateQuest.player.x;
      const dy = enemy.y - stateQuest.player.y;
      const dist = Math.hypot(dx, dy);
      const dot = ((dx / (dist || 1)) * facingX) + ((dy / (dist || 1)) * facingY);
      if (dist < 72 && dot > -0.18) {
        enemy.hp -= 1;
        if (enemy.hp <= 0) {
          cleared += 1;
          stateQuest.score += ENEMY_STATS[enemy.type].score;
          if ((stateQuest.score + enemy.x + enemy.y) % 3 === 0) {
            room.hearts.push({ x: enemy.x, y: enemy.y });
          }
          return false;
        }
      }
      return true;
    });

    room.grasses.forEach((grass) => {
      if (grass.cut) {
        return;
      }
      const center = tileCenter(grass.col, grass.row);
      const dx = center.x - stateQuest.player.x;
      const dy = center.y - stateQuest.player.y;
      const dist = Math.hypot(dx, dy);
      const dot = ((dx / (dist || 1)) * facingX) + ((dy / (dist || 1)) * facingY);
      if (dist < 66 && dot > -0.2) {
        grass.cut = true;
        if ((grass.col + grass.row + stateQuest.score) % 4 === 0) {
          room.hearts.push({ x: center.x, y: center.y });
        }
      }
    });

    if (cleared > 0) {
      stateQuest.status = `Blade cleared ${cleared} foe${cleared > 1 ? "s" : ""}.`;
      updateQuestObjective();
    } else {
      stateQuest.status = "Blade sweep ready.";
    }
  }

  return {
    reset() {
      stateQuest.roomIndex = 0;
      stateQuest.room = instantiateRoom(blueprints[0]);
      stateQuest.score = 0;
      stateQuest.hearts = stateQuest.maxHearts;
      stateQuest.shards = 0;
      stateQuest.victory = false;
      stateQuest.player.hitCooldown = 0;
      stateQuest.player.attackTimer = 0;
      stateQuest.player.attackCooldown = 0;
      stateQuest.player.facingX = 1;
      stateQuest.player.facingY = 0;
      placePlayerAtStart();
      stateQuest.status = currentUi().arcadeApps.quest.howText;
      updateQuestObjective();
    },
    update(dt, input) {
      const room = stateQuest.room;
      const player = stateQuest.player;
      player.hitCooldown = Math.max(0, player.hitCooldown - dt);
      player.attackTimer = Math.max(0, player.attackTimer - dt);
      player.attackCooldown = Math.max(0, player.attackCooldown - dt);

      let moveX = 0;
      let moveY = 0;
      if (input.keys.has("ArrowLeft") || input.keys.has("a")) moveX -= 1;
      if (input.keys.has("ArrowRight") || input.keys.has("d")) moveX += 1;
      if (input.keys.has("ArrowUp") || input.keys.has("w")) moveY -= 1;
      if (input.keys.has("ArrowDown") || input.keys.has("s")) moveY += 1;

      const speed = 168;
      if (moveX || moveY) {
        const length = Math.hypot(moveX, moveY) || 1;
        moveX /= length;
        moveY /= length;
        player.tx = player.x + moveX * TILE;
        player.ty = player.y + moveY * TILE;
        player.facingX = moveX;
        player.facingY = moveY;
      } else {
        const dx = player.tx - player.x;
        const dy = player.ty - player.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 5) {
          moveX = dx / dist;
          moveY = dy / dist;
          player.facingX = moveX;
          player.facingY = moveY;
        }
      }

      if (moveX || moveY) {
        tryMoveQuest(player.x + moveX * speed * dt, player.y);
        tryMoveQuest(player.x, player.y + moveY * speed * dt);
      }

      room.relics = room.relics.filter((relic) => {
        if (distance(tileCenter(relic.col, relic.row).x, tileCenter(relic.col, relic.row).y, player.x, player.y) < 22) {
          stateQuest.score += 18;
          stateQuest.shards += 1;
          stateQuest.status = "Relic shard secured.";
          return false;
        }
        return true;
      });

      if (room.key && !room.key.collected) {
        const keyCenter = tileCenter(room.key.col, room.key.row);
        if (distance(keyCenter.x, keyCenter.y, player.x, player.y) < 22) {
          room.key.collected = true;
          stateQuest.score += 30;
          stateQuest.status = "Quest key claimed.";
          updateQuestObjective();
        }
      }

      room.enemies.forEach((enemy) => {
        const stats = ENEMY_STATS[enemy.type];
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const dist = Math.hypot(dx, dy) || 1;
        enemy.pulse += dt * 2.6;
        enemy.wobble += dt * (enemy.type === "brute" ? 1.5 : 2.8);
        let dirX = 0;
        let dirY = 0;
        if (dist < 230 || enemy.type === "brute") {
          dirX = dx / dist;
          dirY = dy / dist;
        } else {
          dirX = Math.cos(enemy.wobble) * 0.65;
          dirY = Math.sin(enemy.wobble) * 0.65;
        }
        const stepX = enemy.x + dirX * stats.speed * dt;
        const stepY = enemy.y + dirY * stats.speed * dt;
        const enemyRadius = enemy.radius;
        const col = Math.floor(stepX / TILE);
        const row = Math.floor(stepY / TILE);
        if (!tileBlocked(room, col, row) && !rectCircleHit(col * TILE, row * TILE, TILE, TILE, stepX, stepY, enemyRadius)) {
          enemy.x = stepX;
          enemy.y = stepY;
        }
        if (distance(enemy.x, enemy.y, player.x, player.y) < enemy.radius + PLAYER_RADIUS && player.hitCooldown <= 0) {
          player.hitCooldown = 1.15;
          stateQuest.hearts -= 1;
          player.tx = player.x - (dx / dist) * 40;
          player.ty = player.y - (dy / dist) * 40;
          stateQuest.status = stateQuest.hearts > 0 ? `Hit taken. ${stateQuest.hearts} hearts left.` : "The quest has fallen back to camp.";
          if (stateQuest.hearts <= 0) {
            resetCurrentRoom();
          }
        }
      });

      collectHeartDrops();

      if (room.gate && room.key.collected && room.enemies.length === 0) {
        room.gate.open = true;
      }

      if (room.gate && room.gate.open) {
        const gateCenter = tileCenter(room.gate.col, room.gate.row);
        if (distance(gateCenter.x, gateCenter.y, player.x, player.y) < 26) {
          stateQuest.score += 40;
          loadRoom(room.gate.nextRoom);
          stateQuest.status = `Entering ${stateQuest.room.title}.`;
          return;
        }
      }

      if (room.altar && room.key.collected && room.enemies.length === 0) {
        const altarCenter = tileCenter(room.altar.col, room.altar.row);
        if (distance(altarCenter.x, altarCenter.y, player.x, player.y) < 28) {
          stateQuest.victory = true;
          stateQuest.score += 150;
          updateQuestObjective();
        }
      }
    },
    render(ctx, canvas) {
      clearArcadeCanvas(ctx, canvas);
      const room = stateQuest.room;
      const palette = ROOM_COLORS[stateQuest.roomIndex];
      const t = performance.now() / 1000;

      for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
          const tile = room.tiles[row][col];
          const x = col * TILE;
          const y = row * TILE;
          ctx.fillStyle = (row + col) % 2 === 0 ? palette.floorA : palette.floorB;
          ctx.fillRect(x, y, TILE, TILE);

          if (tile.type === "wall") {
            drawRoundedRect(ctx, x + 2, y + 2, TILE - 4, TILE - 4, 8, palette.wall);
            ctx.strokeStyle = "rgba(255,255,255,0.08)";
            ctx.strokeRect(x + 8, y + 8, TILE - 16, TILE - 16);
          } else if (tile.type === "tree") {
            drawRoundedRect(ctx, x + 10, y + 20, 20, 14, 6, "#4e2d17");
            ctx.fillStyle = palette.tree;
            ctx.beginPath();
            ctx.arc(x + 20, y + 18, 14, 0, Math.PI * 2);
            ctx.fill();
          } else if (tile.type === "shrub") {
            drawRoundedRect(ctx, x + 6, y + 8, TILE - 12, TILE - 16, 10, palette.shrub);
          } else if (tile.type === "water") {
            drawRoundedRect(ctx, x + 2, y + 2, TILE - 4, TILE - 4, 8, palette.water);
            ctx.strokeStyle = "rgba(255,255,255,0.18)";
            ctx.beginPath();
            ctx.moveTo(x + 6, y + 12 + Math.sin(t + row + col) * 2);
            ctx.lineTo(x + TILE - 6, y + 12 + Math.sin(t + row + col) * 2);
            ctx.moveTo(x + 6, y + 24 + Math.cos(t * 1.4 + row) * 2);
            ctx.lineTo(x + TILE - 6, y + 24 + Math.cos(t * 1.4 + row) * 2);
            ctx.stroke();
          }
        }
      }

      room.grasses.forEach((grass) => {
        if (grass.cut) {
          return;
        }
        const center = tileCenter(grass.col, grass.row);
        ctx.fillStyle = "rgba(170, 232, 133, 0.75)";
        ctx.beginPath();
        ctx.moveTo(center.x - 10, center.y + 10);
        ctx.lineTo(center.x - 4, center.y - 8);
        ctx.lineTo(center.x + 2, center.y + 8);
        ctx.lineTo(center.x + 8, center.y - 10);
        ctx.lineTo(center.x + 12, center.y + 10);
        ctx.closePath();
        ctx.fill();
      });

      room.relics.forEach((relic) => {
        const center = tileCenter(relic.col, relic.row);
        ctx.fillStyle = palette.accent;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y - 12);
        ctx.lineTo(center.x + 10, center.y);
        ctx.lineTo(center.x, center.y + 12);
        ctx.lineTo(center.x - 10, center.y);
        ctx.closePath();
        ctx.fill();
      });

      if (room.key && !room.key.collected) {
        const center = tileCenter(room.key.col, room.key.row);
        ctx.fillStyle = "#ffd166";
        ctx.beginPath();
        ctx.arc(center.x - 6, center.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(center.x, center.y - 2, 16, 4);
        ctx.fillRect(center.x + 10, center.y - 6, 4, 4);
        ctx.fillRect(center.x + 6, center.y + 2, 4, 4);
      }

      room.hearts.forEach((heart) => {
        ctx.fillStyle = "#ff7d95";
        ctx.beginPath();
        ctx.arc(heart.x - 4, heart.y - 2, 5, 0, Math.PI * 2);
        ctx.arc(heart.x + 4, heart.y - 2, 5, 0, Math.PI * 2);
        ctx.lineTo(heart.x, heart.y + 10);
        ctx.closePath();
        ctx.fill();
      });

      if (room.gate) {
        const gateCenter = tileCenter(room.gate.col, room.gate.row);
        drawRoundedRect(ctx, gateCenter.x - 16, gateCenter.y - 20, 32, 40, 10, room.gate.open ? "rgba(110, 224, 196, 0.75)" : "rgba(255, 140, 26, 0.78)");
      }

      if (room.altar) {
        const altarCenter = tileCenter(room.altar.col, room.altar.row);
        drawRoundedRect(ctx, altarCenter.x - 18, altarCenter.y - 18, 36, 36, 12, room.key.collected && room.enemies.length === 0 ? "rgba(255, 213, 102, 0.88)" : "rgba(160, 180, 210, 0.5)");
        ctx.strokeStyle = "rgba(255,255,255,0.28)";
        ctx.beginPath();
        ctx.arc(altarCenter.x, altarCenter.y, 18, 0, Math.PI * 2);
        ctx.stroke();
      }

      room.enemies.forEach((enemy) => {
        const stats = ENEMY_STATS[enemy.type];
        const bob = Math.sin(enemy.pulse) * 2;
        ctx.fillStyle = stats.color;
        if (enemy.type === "brute") {
          drawRoundedRect(ctx, enemy.x - 15, enemy.y - 15 + bob, 30, 30, 9, stats.color);
        } else {
          ctx.beginPath();
          ctx.arc(enemy.x, enemy.y + bob, enemy.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "#0f1725";
        ctx.beginPath();
        ctx.arc(enemy.x - 4, enemy.y - 2 + bob, 2, 0, Math.PI * 2);
        ctx.arc(enemy.x + 4, enemy.y - 2 + bob, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      const player = stateQuest.player;
      ctx.fillStyle = player.hitCooldown > 0 ? "#ffb347" : "#8dd7ff";
      ctx.beginPath();
      ctx.arc(player.x, player.y, PLAYER_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#173047";
      ctx.fillRect(player.x - 6, player.y + 10, 12, 10);

      if (player.attackTimer > 0) {
        const reachX = player.x + player.facingX * 36;
        const reachY = player.y + player.facingY * 36;
        ctx.strokeStyle = "rgba(255, 232, 149, 0.92)";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(player.x + player.facingX * 14, player.y + player.facingY * 14);
        ctx.lineTo(reachX, reachY);
        ctx.stroke();
      }

      drawRoundedRect(ctx, 18, 18, 328, 66, 18, "rgba(5, 14, 25, 0.72)");
      drawLabel(ctx, room.title, 34, 44, 24);
      drawLabel(ctx, `Score ${stateQuest.score}   Shards ${stateQuest.shards}   Hearts ${stateQuest.hearts}/${stateQuest.maxHearts}`, 34, 69, 16, "#c6d8ec");

      drawRoundedRect(ctx, 546, 18, 316, 66, 18, "rgba(5, 14, 25, 0.72)");
      const objective = room.altar
        ? (room.key.collected && room.enemies.length === 0 ? "Reach the altar" : "Secure the vault")
        : (room.gate && room.gate.open ? "Move through the gate" : "Find the key and clear the room");
      drawLabel(ctx, `Objective: ${objective}`, 562, 44, 18);
      drawLabel(ctx, stateQuest.victory ? "Quest complete" : `${room.enemies.length} guardians remain`, 562, 69, 16, "#c6d8ec");
    },
    pointerDown(point) {
      stateQuest.player.tx = point.x;
      stateQuest.player.ty = point.y;
    },
    pointerMove(point) {
      stateQuest.player.tx = point.x;
      stateQuest.player.ty = point.y;
    },
    keyDown(key) {
      if (key === " " || key === "Enter") {
        swingBlade();
      }
    },
    action() {
      swingBlade();
    },
    controls() {
      return [
        {
          label: currentUi().arcadeApps.quest.buttons[0],
          onClick: () => {
            const start = tileCenter(stateQuest.room.start.col, stateQuest.room.start.row);
            stateQuest.player.tx = start.x;
            stateQuest.player.ty = start.y;
          }
        },
        { label: currentUi().arcadeApps.quest.buttons[1], onClick: () => swingBlade(), wide: true }
      ];
    },
    getScore() {
      return stateQuest.score;
    },
    getStatus() {
      return stateQuest.status;
    },
    debug() {
      return {
        score: stateQuest.score,
        room: stateQuest.roomIndex,
        enemies: stateQuest.room.enemies.length,
        shards: stateQuest.shards,
        victory: stateQuest.victory
      };
    }
  };
}

function createMetroGame() {
  const stateMetro = { lane: 1, enemies: [], spawn: 0, score: 0, health: 3, status: "" };
  const laneY = [150, 260, 370];
  return {
    reset() {
      stateMetro.lane = 1;
      stateMetro.enemies = [];
      stateMetro.spawn = 0.8;
      stateMetro.score = 0;
      stateMetro.health = 3;
      stateMetro.status = currentUi().arcadeApps.metro.howText;
    },
    update(dt) {
      if (stateMetro.health <= 0) {
        return;
      }
      stateMetro.spawn -= dt;
      if (stateMetro.spawn <= 0) {
        stateMetro.spawn = smokeMode ? 1.2 : randomBetween(0.9, 1.6);
        stateMetro.enemies.push({ lane: Math.floor(Math.random() * 3), x: 880, speed: randomBetween(130, 210) });
      }
      stateMetro.enemies.forEach((enemy) => {
        enemy.x -= enemy.speed * dt;
      });
      stateMetro.enemies = stateMetro.enemies.filter((enemy) => {
        if (enemy.x < 70) {
          stateMetro.health -= 1;
          stateMetro.status = stateMetro.health > 0 ? `Guard broken. ${stateMetro.health} life left.` : "Round lost. Reset and try again.";
          return false;
        }
        return true;
      });
    },
    render(ctx, canvas) {
      clearArcadeCanvas(ctx, canvas);
      drawLabel(ctx, "Metro Brawler", 28, 38, 28);
      for (let index = 0; index < laneY.length; index += 1) {
        drawRoundedRect(ctx, 50, laneY[index] - 40, 780, 68, 18, index === stateMetro.lane ? "rgba(255,140,26,0.15)" : "rgba(255,255,255,0.05)");
      }
      drawRoundedRect(ctx, 110, laneY[stateMetro.lane] - 28, 58, 56, 16, "#1fd5c4");
      stateMetro.enemies.forEach((enemy) => {
        drawRoundedRect(ctx, enemy.x, laneY[enemy.lane] - 24, 44, 48, 14, "#ff6f7f");
      });
      drawLabel(ctx, `Health: ${stateMetro.health}`, 760, 36, 18, "#ffd166");
    },
    pointerDown(point) {
      const nearestLane = laneY.reduce((best, y, index) => Math.abs(y - point.y) < Math.abs(laneY[best] - point.y) ? index : best, 0);
      stateMetro.lane = nearestLane;
    },
    keyDown(key) {
      if (key === "ArrowUp" || key === "w") stateMetro.lane = Math.max(0, stateMetro.lane - 1);
      if (key === "ArrowDown" || key === "s") stateMetro.lane = Math.min(2, stateMetro.lane + 1);
      if (key === " " || key === "Enter") this.action();
    },
    action() {
      const target = stateMetro.enemies.find((enemy) => enemy.lane === stateMetro.lane && enemy.x < 250);
      if (target) {
        stateMetro.enemies = stateMetro.enemies.filter((enemy) => enemy !== target);
        stateMetro.score += 25;
        stateMetro.status = "Clean strike.";
      } else {
        stateMetro.status = "Strike missed. Hold the lane.";
      }
    },
    controls() {
      return [
        { label: currentUi().arcadeApps.metro.buttons[0], onClick: () => { stateMetro.lane = Math.max(0, stateMetro.lane - 1); } },
        { label: currentUi().arcadeApps.metro.buttons[1], onClick: () => { stateMetro.lane = Math.min(2, stateMetro.lane + 1); } },
        { label: currentUi().arcadeApps.metro.buttons[2], onClick: () => this.action(), wide: true }
      ];
    },
    getScore() {
      return stateMetro.score;
    },
    getStatus() {
      return stateMetro.status;
    },
    debug() {
      return { score: stateMetro.score, health: stateMetro.health, enemies: stateMetro.enemies.length };
    }
  };
}

function createHopperGame() {
  const stateHopper = { y: 400, vy: 0, obstacles: [], spawn: 0.7, score: 0, gameOver: false, status: "" };
  const ground = 420;
  return {
    reset() {
      stateHopper.y = ground;
      stateHopper.vy = 0;
      stateHopper.obstacles = [];
      stateHopper.spawn = 0.8;
      stateHopper.score = 0;
      stateHopper.gameOver = false;
      stateHopper.status = currentUi().arcadeApps.hopper.howText;
    },
    update(dt) {
      if (stateHopper.gameOver) {
        return;
      }
      stateHopper.spawn -= dt;
      if (stateHopper.spawn <= 0) {
        stateHopper.spawn = smokeMode ? 1.25 : randomBetween(0.9, 1.4);
        stateHopper.obstacles.push({ x: 920, w: randomBetween(26, 50), h: randomBetween(34, 62), speed: randomBetween(220, 310) });
      }
      stateHopper.vy += 1100 * dt;
      stateHopper.y += stateHopper.vy * dt;
      if (stateHopper.y >= ground) {
        stateHopper.y = ground;
        stateHopper.vy = 0;
      }
      stateHopper.obstacles.forEach((obstacle) => {
        obstacle.x -= obstacle.speed * dt;
      });
      stateHopper.obstacles = stateHopper.obstacles.filter((obstacle) => obstacle.x + obstacle.w > -20);
      stateHopper.score += Math.round(dt * 45);
      const playerRect = { x: 110, y: stateHopper.y - 48, w: 42, h: 48 };
      const hit = stateHopper.obstacles.some((obstacle) => playerRect.x < obstacle.x + obstacle.w && playerRect.x + playerRect.w > obstacle.x && playerRect.y < ground - obstacle.h + obstacle.h && playerRect.y + playerRect.h > ground - obstacle.h);
      if (hit) {
        stateHopper.gameOver = true;
        stateHopper.status = "Impact. Reset to run again.";
      }
    },
    render(ctx, canvas) {
      clearArcadeCanvas(ctx, canvas);
      drawLabel(ctx, "Sky Hopper", 28, 38, 28);
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, ground + 4);
      ctx.lineTo(canvas.width, ground + 4);
      ctx.stroke();
      drawRoundedRect(ctx, 110, stateHopper.y - 48, 42, 48, 14, "#7ac7ff");
      stateHopper.obstacles.forEach((obstacle) => {
        drawRoundedRect(ctx, obstacle.x, ground - obstacle.h, obstacle.w, obstacle.h, 10, "#ff8c1a");
      });
      drawLabel(ctx, `Distance: ${stateHopper.score}`, 720, 36, 18, "#ffd166");
    },
    pointerDown() {
      this.action();
    },
    keyDown(key) {
      if (key === " " || key === "ArrowUp" || key === "w") {
        this.action();
      }
    },
    action() {
      if (stateHopper.gameOver) {
        return;
      }
      if (stateHopper.y >= ground - 1) {
        stateHopper.vy = -480;
        stateHopper.status = "Jump timed.";
      }
    },
    controls() {
      return [{ label: currentUi().arcadeApps.hopper.buttons[0], onClick: () => this.action(), wide: true }];
    },
    getScore() {
      return stateHopper.score;
    },
    getStatus() {
      return stateHopper.status;
    },
    debug() {
      return { score: stateHopper.score, gameOver: stateHopper.gameOver };
    }
  };
}

function createSerpentGame() {
  const cols = 18;
  const rows = 10;
  const cell = 40;
  const offsetX = 80;
  const offsetY = 78;
  const stateSerpent = {
    snake: [],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 12, y: 5 },
    score: 0,
    stepClock: 0,
    boost: 0,
    gameOver: false,
    status: ""
  };

  function occupied(x, y) {
    return stateSerpent.snake.some((segment) => segment.x === x && segment.y === y);
  }

  function spawnFood() {
    const freeCells = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        if (!occupied(col, row)) {
          freeCells.push({ x: col, y: row });
        }
      }
    }
    return freeCells.length > 0 ? choice(freeCells) : { x: 0, y: 0 };
  }

  function setDirection(x, y) {
    if (stateSerpent.gameOver) {
      return;
    }
    if (x === -stateSerpent.dir.x && y === -stateSerpent.dir.y) {
      return;
    }
    stateSerpent.nextDir = { x, y };
  }

  function stepForward() {
    stateSerpent.dir = { ...stateSerpent.nextDir };
    const head = stateSerpent.snake[0];
    const nextHead = { x: head.x + stateSerpent.dir.x, y: head.y + stateSerpent.dir.y };
    const hitWall = nextHead.x < 0 || nextHead.x >= cols || nextHead.y < 0 || nextHead.y >= rows;
    const hitSelf = occupied(nextHead.x, nextHead.y);
    if (hitWall || hitSelf) {
      stateSerpent.gameOver = true;
      stateSerpent.status = "Run collapsed. Reset to try again.";
      return;
    }
    stateSerpent.snake.unshift(nextHead);
    if (nextHead.x === stateSerpent.food.x && nextHead.y === stateSerpent.food.y) {
      stateSerpent.score += 20;
      stateSerpent.food = spawnFood();
      stateSerpent.status = "Fruit secured.";
    } else {
      stateSerpent.snake.pop();
    }
  }

  return {
    reset() {
      stateSerpent.snake = [
        { x: 8, y: 5 },
        { x: 7, y: 5 },
        { x: 6, y: 5 },
        { x: 5, y: 5 }
      ];
      stateSerpent.dir = { x: 1, y: 0 };
      stateSerpent.nextDir = { x: 1, y: 0 };
      stateSerpent.food = { x: 12, y: 5 };
      stateSerpent.score = 0;
      stateSerpent.stepClock = 0;
      stateSerpent.boost = 0;
      stateSerpent.gameOver = false;
      stateSerpent.status = currentUi().arcadeApps.serpent.howText;
    },
    update(dt) {
      if (stateSerpent.gameOver) {
        return;
      }
      stateSerpent.boost = Math.max(0, stateSerpent.boost - dt);
      stateSerpent.stepClock += dt;
      const stepInterval = stateSerpent.boost > 0 ? 0.075 : 0.14;
      while (stateSerpent.stepClock >= stepInterval && !stateSerpent.gameOver) {
        stateSerpent.stepClock -= stepInterval;
        stepForward();
      }
    },
    render(ctx, canvas) {
      clearArcadeCanvas(ctx, canvas);
      drawLabel(ctx, "Neon Snake", 28, 38, 28);
      drawRoundedRect(ctx, offsetX - 10, offsetY - 10, cols * cell + 20, rows * cell + 20, 22, "rgba(255,255,255,0.04)");
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      for (let col = 0; col <= cols; col += 1) {
        ctx.beginPath();
        ctx.moveTo(offsetX + col * cell, offsetY);
        ctx.lineTo(offsetX + col * cell, offsetY + rows * cell);
        ctx.stroke();
      }
      for (let row = 0; row <= rows; row += 1) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY + row * cell);
        ctx.lineTo(offsetX + cols * cell, offsetY + row * cell);
        ctx.stroke();
      }
      ctx.fillStyle = "#ff8c1a";
      ctx.beginPath();
      ctx.arc(offsetX + stateSerpent.food.x * cell + cell / 2, offsetY + stateSerpent.food.y * cell + cell / 2, 11, 0, Math.PI * 2);
      ctx.fill();
      stateSerpent.snake.forEach((segment, index) => {
        drawRoundedRect(
          ctx,
          offsetX + segment.x * cell + 3,
          offsetY + segment.y * cell + 3,
          cell - 6,
          cell - 6,
          10,
          index === 0 ? "#7ac7ff" : "#1fd5c4"
        );
      });
      drawLabel(ctx, `Length: ${stateSerpent.snake.length}`, 724, 36, 18, "#ffd166");
    },
    pointerDown(point) {
      const head = stateSerpent.snake[0];
      const headX = offsetX + head.x * cell + cell / 2;
      const headY = offsetY + head.y * cell + cell / 2;
      const dx = point.x - headX;
      const dy = point.y - headY;
      if (Math.abs(dx) > Math.abs(dy)) {
        setDirection(dx >= 0 ? 1 : -1, 0);
      } else {
        setDirection(0, dy >= 0 ? 1 : -1);
      }
    },
    keyDown(key) {
      if (key === "ArrowUp" || key === "w") setDirection(0, -1);
      if (key === "ArrowLeft" || key === "a") setDirection(-1, 0);
      if (key === "ArrowRight" || key === "d") setDirection(1, 0);
      if (key === "ArrowDown" || key === "s") setDirection(0, 1);
      if (key === " " || key === "Enter") this.action();
    },
    action() {
      if (stateSerpent.gameOver) {
        return;
      }
      stateSerpent.boost = 1.1;
      stateSerpent.status = "Boost engaged.";
    },
    controls() {
      return [
        { label: currentUi().arcadeApps.serpent.buttons[0], onClick: () => setDirection(0, -1) },
        { label: currentUi().arcadeApps.serpent.buttons[1], onClick: () => setDirection(-1, 0) },
        { label: currentUi().arcadeApps.serpent.buttons[2], onClick: () => setDirection(1, 0) },
        { label: currentUi().arcadeApps.serpent.buttons[3], onClick: () => setDirection(0, 1) },
        { label: currentUi().arcadeApps.serpent.buttons[4], onClick: () => this.action(), wide: true }
      ];
    },
    getScore() {
      return stateSerpent.score;
    },
    getStatus() {
      return stateSerpent.status;
    },
    debug() {
      return { score: stateSerpent.score, length: stateSerpent.snake.length, gameOver: stateSerpent.gameOver };
    }
  };
}

function createBladeGame() {
  const stateBlade = { player: { x: 440, y: 260, tx: 440, ty: 260 }, enemies: [], seeds: [], spawn: 0.8, score: 0, lives: 3, slashCooldown: 0, status: "" };
  function refillSeeds() {
    stateBlade.seeds = Array.from({ length: 4 }, () => ({ x: randomBetween(80, 800), y: randomBetween(90, 450) }));
  }
  return {
    reset() {
      stateBlade.player = { x: 440, y: 260, tx: 440, ty: 260 };
      stateBlade.enemies = [];
      stateBlade.score = 0;
      stateBlade.lives = 3;
      stateBlade.spawn = 0.9;
      stateBlade.slashCooldown = 0;
      stateBlade.status = currentUi().arcadeApps.blade.howText;
      refillSeeds();
    },
    update(dt, input) {
      if (stateBlade.lives <= 0) {
        return;
      }
      let dx = 0;
      let dy = 0;
      if (input.keys.has("ArrowLeft") || input.keys.has("a")) dx -= 1;
      if (input.keys.has("ArrowRight") || input.keys.has("d")) dx += 1;
      if (input.keys.has("ArrowUp") || input.keys.has("w")) dy -= 1;
      if (input.keys.has("ArrowDown") || input.keys.has("s")) dy += 1;
      if (dx || dy) {
        const length = Math.hypot(dx, dy) || 1;
        stateBlade.player.x += (dx / length) * 170 * dt;
        stateBlade.player.y += (dy / length) * 170 * dt;
      } else {
        const mx = stateBlade.player.tx - stateBlade.player.x;
        const my = stateBlade.player.ty - stateBlade.player.y;
        const dist = Math.hypot(mx, my);
        if (dist > 4) {
          stateBlade.player.x += (mx / dist) * 170 * dt;
          stateBlade.player.y += (my / dist) * 170 * dt;
        }
      }
      stateBlade.player.x = clamp(stateBlade.player.x, 24, 856);
      stateBlade.player.y = clamp(stateBlade.player.y, 24, 496);
      stateBlade.spawn -= dt;
      if (stateBlade.spawn <= 0) {
        stateBlade.spawn = smokeMode ? 1.2 : randomBetween(0.8, 1.4);
        stateBlade.enemies.push({ x: Math.random() > 0.5 ? 20 : 860, y: randomBetween(40, 480), speed: randomBetween(70, 120) });
      }
      stateBlade.enemies.forEach((enemy) => {
        const dist = distance(enemy.x, enemy.y, stateBlade.player.x, stateBlade.player.y) || 1;
        enemy.x += ((stateBlade.player.x - enemy.x) / dist) * enemy.speed * dt;
        enemy.y += ((stateBlade.player.y - enemy.y) / dist) * enemy.speed * dt;
      });
      stateBlade.seeds = stateBlade.seeds.filter((seed) => {
        if (distance(seed.x, seed.y, stateBlade.player.x, stateBlade.player.y) < 22) {
          stateBlade.score += 10;
          stateBlade.status = "Seed collected.";
          return false;
        }
        return true;
      });
      if (stateBlade.seeds.length === 0) {
        stateBlade.score += 40;
        refillSeeds();
        stateBlade.status = "Glade refreshed.";
      }
      stateBlade.slashCooldown = Math.max(0, stateBlade.slashCooldown - dt);
      stateBlade.enemies = stateBlade.enemies.filter((enemy) => {
        const hit = distance(enemy.x, enemy.y, stateBlade.player.x, stateBlade.player.y) < 20;
        if (hit) {
          stateBlade.lives -= 1;
          stateBlade.status = stateBlade.lives > 0 ? `Hit taken. ${stateBlade.lives} life left.` : "The grove fell. Reset to try again.";
          return false;
        }
        return true;
      });
    },
    render(ctx, canvas) {
      clearArcadeCanvas(ctx, canvas);
      drawLabel(ctx, "Forest Blade", 28, 38, 28);
      stateBlade.seeds.forEach((seed) => {
        ctx.fillStyle = "#ffd166";
        ctx.beginPath();
        ctx.arc(seed.x, seed.y, 8, 0, Math.PI * 2);
        ctx.fill();
      });
      stateBlade.enemies.forEach((enemy) => {
        ctx.fillStyle = "#ff6f7f";
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, 12, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = "#1fd5c4";
      ctx.beginPath();
      ctx.arc(stateBlade.player.x, stateBlade.player.y, 14, 0, Math.PI * 2);
      ctx.fill();
      if (stateBlade.slashCooldown > 0.25) {
        ctx.strokeStyle = "rgba(255, 140, 26, 0.7)";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(stateBlade.player.x, stateBlade.player.y, 60, 0.2, Math.PI * 1.4);
        ctx.stroke();
      }
      drawLabel(ctx, `Lives: ${stateBlade.lives}`, 760, 36, 18, "#ffd166");
    },
    pointerDown(point) {
      stateBlade.player.tx = point.x;
      stateBlade.player.ty = point.y;
    },
    pointerMove(point) {
      stateBlade.player.tx = point.x;
      stateBlade.player.ty = point.y;
    },
    keyDown(key) {
      if (key === " " || key === "Enter") {
        this.action();
      }
    },
    action() {
      stateBlade.slashCooldown = 0.45;
      let cleared = 0;
      stateBlade.enemies = stateBlade.enemies.filter((enemy) => {
        if (distance(enemy.x, enemy.y, stateBlade.player.x, stateBlade.player.y) < 76) {
          cleared += 1;
          return false;
        }
        return true;
      });
      if (cleared > 0) {
        stateBlade.score += cleared * 20;
        stateBlade.status = `Slash cleared ${cleared} threat${cleared > 1 ? "s" : ""}.`;
      } else {
        stateBlade.status = "Slash used for space.";
      }
    },
    controls() {
      return [
        { label: currentUi().arcadeApps.blade.buttons[0], onClick: () => { stateBlade.player.tx = 440; stateBlade.player.ty = 260; } },
        { label: currentUi().arcadeApps.blade.buttons[1], onClick: () => this.action() }
      ];
    },
    getScore() {
      return stateBlade.score;
    },
    getStatus() {
      return stateBlade.status;
    },
    debug() {
      return { score: stateBlade.score, lives: stateBlade.lives, enemies: stateBlade.enemies.length };
    }
  };
}

function createTrailGame() {
  const lanes = [140, 220, 300, 380];
  const stateTrail = { lane: 1, items: [], spawn: 0.7, score: 0, lives: 3, boost: 0, status: "" };
  return {
    reset() {
      stateTrail.lane = 1;
      stateTrail.items = [];
      stateTrail.spawn = 0.8;
      stateTrail.score = 0;
      stateTrail.lives = 3;
      stateTrail.boost = 0;
      stateTrail.status = currentUi().arcadeApps.trail.howText;
    },
    update(dt) {
      if (stateTrail.lives <= 0) {
        return;
      }
      stateTrail.spawn -= dt;
      stateTrail.boost = Math.max(0, stateTrail.boost - dt);
      if (stateTrail.spawn <= 0) {
        stateTrail.spawn = smokeMode ? 1.0 : randomBetween(0.55, 1.1);
        stateTrail.items.push({ lane: Math.floor(Math.random() * lanes.length), x: 900, type: Math.random() > 0.35 ? "coin" : "barrier", speed: randomBetween(190, 280) });
      }
      stateTrail.items.forEach((item) => {
        item.x -= item.speed * dt * (stateTrail.boost > 0 ? 1.25 : 1);
      });
      stateTrail.score += Math.round(dt * 35);
      stateTrail.items = stateTrail.items.filter((item) => {
        const caught = Math.abs(item.x - 140) < 26 && item.lane === stateTrail.lane;
        if (caught) {
          if (item.type === "coin") {
            stateTrail.score += 20;
            stateTrail.status = "Coin secured.";
          } else if (stateTrail.boost > 0) {
            stateTrail.score += 10;
            stateTrail.status = "Boost cut through barrier.";
          } else {
            stateTrail.lives -= 1;
            stateTrail.status = stateTrail.lives > 0 ? `Barrier hit. ${stateTrail.lives} life left.` : "Trail closed. Reset to run again.";
          }
          return false;
        }
        return item.x > -30;
      });
    },
    render(ctx, canvas) {
      clearArcadeCanvas(ctx, canvas);
      drawLabel(ctx, "Golden Trail", 28, 38, 28);
      lanes.forEach((laneY, index) => {
        drawRoundedRect(ctx, 60, laneY, 760, 46, 12, index === stateTrail.lane ? "rgba(255,140,26,0.16)" : "rgba(255,255,255,0.05)");
      });
      drawRoundedRect(ctx, 116, lanes[stateTrail.lane] + 4, 44, 38, 12, stateTrail.boost > 0 ? "#ffd166" : "#1fd5c4");
      stateTrail.items.forEach((item) => {
        drawRoundedRect(ctx, item.x, lanes[item.lane] + 8, item.type === "coin" ? 26 : 40, 30, 10, item.type === "coin" ? "#ffd166" : "#ff6f7f");
      });
      drawLabel(ctx, `Lives: ${stateTrail.lives}`, 760, 36, 18, "#ffd166");
    },
    pointerDown(point) {
      const nextLane = lanes.reduce((best, y, index) => Math.abs(y - point.y) < Math.abs(lanes[best] - point.y) ? index : best, 0);
      stateTrail.lane = nextLane;
    },
    keyDown(key) {
      if (key === "ArrowLeft" || key === "a") stateTrail.lane = Math.max(0, stateTrail.lane - 1);
      if (key === "ArrowRight" || key === "d") stateTrail.lane = Math.min(lanes.length - 1, stateTrail.lane + 1);
      if (key === " " || key === "Enter") this.action();
    },
    action() {
      stateTrail.boost = 1.1;
      stateTrail.status = "Boost engaged.";
    },
    controls() {
      return [
        { label: currentUi().arcadeApps.trail.buttons[0], onClick: () => { stateTrail.lane = Math.max(0, stateTrail.lane - 1); } },
        { label: currentUi().arcadeApps.trail.buttons[1], onClick: () => { stateTrail.lane = Math.min(lanes.length - 1, stateTrail.lane + 1); } },
        { label: currentUi().arcadeApps.trail.buttons[2], onClick: () => this.action(), wide: true }
      ];
    },
    getScore() {
      return stateTrail.score;
    },
    getStatus() {
      return stateTrail.status;
    },
    debug() {
      return { score: stateTrail.score, lives: stateTrail.lives, lane: stateTrail.lane };
    }
  };
}

function createClashGame() {
  const stateClash = { player: { x: 440, y: 260, tx: 440, ty: 260 }, bullets: [], enemies: [], spawn: 0.6, score: 0, health: 3, status: "", lastAim: { x: 1, y: 0 } };
  return {
    reset() {
      stateClash.player = { x: 440, y: 260, tx: 440, ty: 260 };
      stateClash.bullets = [];
      stateClash.enemies = [];
      stateClash.spawn = 0.8;
      stateClash.score = 0;
      stateClash.health = 3;
      stateClash.status = currentUi().arcadeApps.clash.howText;
      stateClash.lastAim = { x: 1, y: 0 };
    },
    update(dt, input) {
      if (stateClash.health <= 0) {
        return;
      }
      let dx = 0;
      let dy = 0;
      if (input.keys.has("ArrowLeft") || input.keys.has("a")) dx -= 1;
      if (input.keys.has("ArrowRight") || input.keys.has("d")) dx += 1;
      if (input.keys.has("ArrowUp") || input.keys.has("w")) dy -= 1;
      if (input.keys.has("ArrowDown") || input.keys.has("s")) dy += 1;
      const moveSpeed = 180;
      if (dx || dy) {
        const length = Math.hypot(dx, dy) || 1;
        stateClash.player.x += (dx / length) * moveSpeed * dt;
        stateClash.player.y += (dy / length) * moveSpeed * dt;
      } else {
        const mx = stateClash.player.tx - stateClash.player.x;
        const my = stateClash.player.ty - stateClash.player.y;
        const dist = Math.hypot(mx, my);
        if (dist > 5) {
          stateClash.player.x += (mx / dist) * moveSpeed * dt;
          stateClash.player.y += (my / dist) * moveSpeed * dt;
        }
      }
      stateClash.player.x = clamp(stateClash.player.x, 20, 860);
      stateClash.player.y = clamp(stateClash.player.y, 20, 500);
      stateClash.spawn -= dt;
      if (stateClash.spawn <= 0) {
        stateClash.spawn = smokeMode ? 1.0 : randomBetween(0.6, 1.1);
        stateClash.enemies.push({ x: Math.random() > 0.5 ? 20 : 860, y: randomBetween(30, 490), speed: randomBetween(60, 110), r: 14 });
      }
      stateClash.enemies.forEach((enemy) => {
        const dist = distance(enemy.x, enemy.y, stateClash.player.x, stateClash.player.y) || 1;
        enemy.x += ((stateClash.player.x - enemy.x) / dist) * enemy.speed * dt;
        enemy.y += ((stateClash.player.y - enemy.y) / dist) * enemy.speed * dt;
      });
      stateClash.bullets.forEach((bullet) => {
        bullet.x += bullet.vx * dt;
        bullet.y += bullet.vy * dt;
      });
      stateClash.bullets = stateClash.bullets.filter((bullet) => bullet.x > -20 && bullet.x < 900 && bullet.y > -20 && bullet.y < 540);
      stateClash.enemies = stateClash.enemies.filter((enemy) => {
        const bulletIndex = stateClash.bullets.findIndex((bullet) => distance(bullet.x, bullet.y, enemy.x, enemy.y) < enemy.r + 4);
        if (bulletIndex >= 0) {
          stateClash.bullets.splice(bulletIndex, 1);
          stateClash.score += 20;
          stateClash.status = "Threat removed.";
          return false;
        }
        if (distance(enemy.x, enemy.y, stateClash.player.x, stateClash.player.y) < enemy.r + 12) {
          stateClash.health -= 1;
          stateClash.status = stateClash.health > 0 ? `Pressure hit. ${stateClash.health} life left.` : "Arena lost. Reset to play again.";
          return false;
        }
        return true;
      });
    },
    render(ctx, canvas) {
      clearArcadeCanvas(ctx, canvas);
      drawLabel(ctx, "City Clash", 28, 38, 28);
      stateClash.bullets.forEach((bullet) => {
        ctx.fillStyle = "#ffd166";
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      stateClash.enemies.forEach((enemy) => {
        ctx.fillStyle = "#ff6f7f";
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = "#7ac7ff";
      ctx.beginPath();
      ctx.arc(stateClash.player.x, stateClash.player.y, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(31,213,196,0.5)";
      ctx.beginPath();
      ctx.moveTo(stateClash.player.x, stateClash.player.y);
      ctx.lineTo(stateClash.player.x + stateClash.lastAim.x * 30, stateClash.player.y + stateClash.lastAim.y * 30);
      ctx.stroke();
      drawLabel(ctx, `Lives: ${stateClash.health}`, 760, 36, 18, "#ffd166");
    },
    pointerDown(point) {
      stateClash.player.tx = point.x;
      stateClash.player.ty = point.y;
      this.fire(point.x, point.y);
    },
    pointerMove(point) {
      stateClash.player.tx = point.x;
      stateClash.player.ty = point.y;
      const dist = Math.hypot(point.x - stateClash.player.x, point.y - stateClash.player.y) || 1;
      stateClash.lastAim = { x: (point.x - stateClash.player.x) / dist, y: (point.y - stateClash.player.y) / dist };
    },
    keyDown(key) {
      if (key === " " || key === "Enter") {
        this.action();
      }
    },
    fire(targetX, targetY) {
      if (stateClash.health <= 0) return;
      const dx = targetX - stateClash.player.x;
      const dy = targetY - stateClash.player.y;
      const dist = Math.hypot(dx, dy) || 1;
      stateClash.lastAim = { x: dx / dist, y: dy / dist };
      stateClash.bullets.push({ x: stateClash.player.x, y: stateClash.player.y, vx: (dx / dist) * 340, vy: (dy / dist) * 340 });
      stateClash.status = "Shot fired.";
    },
    action() {
      const target = stateClash.enemies[0]
        ? { x: stateClash.enemies[0].x, y: stateClash.enemies[0].y }
        : { x: stateClash.player.x + stateClash.lastAim.x * 100, y: stateClash.player.y + stateClash.lastAim.y * 100 };
      this.fire(target.x, target.y);
    },
    controls() {
      return [
        { label: currentUi().arcadeApps.clash.buttons[0], onClick: () => this.action(), wide: true },
        { label: currentUi().arcadeApps.clash.buttons[1], onClick: () => { stateClash.player.x = clamp(stateClash.player.x - 40, 20, 860); } },
        { label: currentUi().arcadeApps.clash.buttons[2], onClick: () => { stateClash.player.x = clamp(stateClash.player.x + 40, 20, 860); } }
      ];
    },
    getScore() {
      return stateClash.score;
    },
    getStatus() {
      return stateClash.status;
    },
    debug() {
      return { score: stateClash.score, health: stateClash.health, enemies: stateClash.enemies.length };
    }
  };
}

const arcadeFactories = {
  quest: createQuestGame,
  metro: createMetroGame,
  hopper: createHopperGame,
  serpent: createSerpentGame,
  blade: createBladeGame,
  trail: createTrailGame,
  clash: createClashGame
};

function setArcadeGame(appId) {
  state.arcade.activeId = appId;
  state.arcade.activeGame = arcadeFactories[appId]();
  state.arcade.activeGame.reset();
  renderArcadeMeta();
}

function openApp(appId) {
  if (appId === "course") {
    setScreen("course");
    return;
  }
  if (appId === "puzzle") {
    setScreen("puzzle");
    return;
  }
  setArcadeGame(appId);
  setScreen("arcade");
}

function renderArcadeMeta() {
  const appText = currentUi().arcadeApps[state.arcade.activeId];
  const shellText = currentUi().arcadeShell;
  elements.arcadeEyebrow.textContent = appText.eyebrow;
  elements.arcadeTitle.textContent = appText.title;
  elements.arcadeIntro.textContent = appText.intro;
  elements.arcadeActionBtn.textContent = appText.action;
  elements.arcadeResetBtn.textContent = appText.reset;
  elements.arcadeScoreLabel.textContent = shellText.scoreLabel;
  elements.arcadeControlsTitle.textContent = shellText.controlsTitle;
  elements.arcadeControlsText.textContent = appText.controlsText;
  elements.arcadeHowTitle.textContent = shellText.howTitle;
  elements.arcadeHowText.textContent = appText.howText;
  renderArcadeControls();
  renderArcadeStats();
}

function renderArcadeControls() {
  const game = state.arcade.activeGame;
  elements.arcadeControls.innerHTML = "";
  if (!game) return;
  game.controls().forEach((control) => {
    const button = document.createElement("button");
    button.className = `control-btn${control.wide ? " wide" : ""}`;
    button.textContent = control.label;
    button.addEventListener("click", control.onClick);
    elements.arcadeControls.appendChild(button);
  });
}

function renderArcadeStats() {
  const game = state.arcade.activeGame;
  if (!game) return;
  elements.arcadeScoreValue.textContent = String(game.getScore());
  elements.arcadeStatusText.textContent = game.getStatus();
}

function getCanvasPoint(event) {
  const rect = elements.arcadeCanvas.getBoundingClientRect();
  const scaleX = elements.arcadeCanvas.width / rect.width;
  const scaleY = elements.arcadeCanvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
}

function stepArcade(dt) {
  if (state.currentScreen !== "arcade" || !state.arcade.activeGame) {
    return;
  }
  state.arcade.activeGame.update(dt, { keys: heldKeys, pointer: state.arcade.pointer });
  renderArcadeStats();
}

function arcadeLoop(now) {
  const dt = Math.min((now - state.arcade.lastFrame) / 1000, 0.05);
  state.arcade.lastFrame = now;
  stepArcade(dt);
  renderArcadeCanvas();
  requestAnimationFrame(arcadeLoop);
}

function renderArcadeCanvas() {
  if (!state.arcade.activeGame) {
    return;
  }
  const ctx = elements.arcadeCanvas.getContext("2d");
  state.arcade.activeGame.render(ctx, elements.arcadeCanvas);
}

function applyLanguage() {
  document.documentElement.lang = state.currentLang;
  elements.langButtons.forEach((button) => button.classList.toggle("active", button.dataset.lang === state.currentLang));
  const ui = currentUi();
  const course = currentCourse();

  elements.splashChip.textContent = ui.splashChip;
  elements.splashTitle.textContent = ui.splashTitle;
  elements.splashText.textContent = ui.splashText;
  elements.skipSplashBtn.textContent = ui.skipIntro;
  elements.timelineLabel.textContent = ui.timelineLabel;
  elements.globalBrandTitle.textContent = ui.brandTitle;
  elements.globalBrandSubtitle.textContent = ui.brandSubtitle;
  elements.homeBtn.textContent = ui.homeButton;
  elements.presentationToggleBtn.textContent = state.presentationMode ? ui.presentationOff : ui.presentationOn;

  elements.homeEyebrow.textContent = ui.home.eyebrow;
  elements.homeTitle.textContent = ui.home.title;
  elements.homeText.textContent = ui.home.text;
  elements.featuredLaunchBtn.textContent = ui.home.featuredLaunch;
  elements.featuredPuzzleBtn.textContent = ui.home.featuredPuzzle;
  elements.homeSmokeLink.textContent = ui.home.smokeLink;
  elements.homeLiveAppsLabel.textContent = ui.home.liveApps;
  elements.homeGenresLabel.textContent = ui.home.genres;
  elements.homeControlsLabel.textContent = ui.home.controls;
  elements.galleryTitle.textContent = ui.home.galleryTitle;
  elements.galleryIntro.textContent = ui.home.galleryIntro;
  renderGallery();

  elements.courseHeroTitle.textContent = course.title;
  elements.courseHeroText.textContent = course.text;
  elements.startDemoBtn.textContent = course.startDemo;
  elements.randomChallengeBtn.textContent = course.randomChallenge;
  elements.smokeTestLink.textContent = course.smokeTestLink;
  elements.keyboardHint.innerHTML = course.keyboardHint;
  elements.quizScoreLabel.textContent = course.quizScoreLabel;
  elements.promptScoreLabel.textContent = course.promptScoreLabel;
  elements.truthScoreLabel.textContent = course.truthScoreLabel;
  elements.shotClockTitle.textContent = course.shotClockTitle;
  elements.shotClockNote.textContent = course.shotClockNote;
  elements.presentationBadge.textContent = course.presentationBadge;
  elements.presentationNote.textContent = course.presentationNote;
  elements.learnTitle.textContent = course.learnTitle;
  elements.learnIntro.textContent = course.learnIntro;
  elements.coachCardTitle.textContent = course.coachCardTitle;
  elements.nextTipBtn.textContent = course.nextTip;
  elements.builderTitle.textContent = course.builderTitle;
  elements.builderIntro.textContent = course.builderIntro;
  elements.goalLabel.textContent = course.goalLabel;
  elements.audienceLabel.textContent = course.audienceLabel;
  elements.styleLabel.textContent = course.styleLabel;
  elements.builderOutputTitle.textContent = course.builderOutputTitle;
  elements.buildPromptBtn.textContent = course.buildPrompt;
  elements.randomizeIdeaBtn.textContent = course.randomizeIdea;
  elements.labTitle.textContent = course.labTitle;
  elements.labIntro.textContent = course.labIntro;
  elements.promptLabel.textContent = course.promptLabel;
  elements.promptInput.placeholder = course.promptPlaceholder;
  elements.analyzePromptBtn.textContent = course.analyzePrompt;
  elements.loadExampleBtn.textContent = course.loadExample;
  elements.analysisTitle.textContent = course.analysisTitle;
  elements.improvedTitle.textContent = course.improvedTitle;
  elements.truthTitle.textContent = course.truthTitle;
  elements.truthIntro.textContent = course.truthIntro;
  elements.truthAnswerLabel.textContent = course.truthAnswerLabel;
  elements.truthFeedbackTitle.textContent = course.truthFeedbackTitle;
  elements.trustBtn.textContent = course.trust;
  elements.verifyBtn.textContent = course.verify;
  elements.nextTruthBtn.textContent = course.nextTruth;
  elements.quizTitle.textContent = course.quizTitle;
  elements.quizIntro.textContent = course.quizIntro;
  elements.nextQuizBtn.textContent = course.nextQuiz;
  elements.restartQuizBtn.textContent = course.restartQuiz;
  renderCourseNav();
  renderLearnCards();
  renderCourseBuilder();
  elements.coachTip.textContent = course.coachTips[0];
  if (!elements.analysisOutput.textContent) {
    elements.analysisOutput.textContent = course.analysisPlaceholder;
  }
  if (!elements.improvedOutput.textContent) {
    elements.improvedOutput.textContent = course.improvedPlaceholder;
  }
  renderTruthCard();
  renderQuizCard();
  updateTimerControls();
  updateShotClockDisplay();

  const puzzle = ui.puzzle;
  elements.puzzleEyebrow.textContent = puzzle.eyebrow;
  elements.puzzleTitle.textContent = puzzle.title;
  elements.puzzleIntro.textContent = puzzle.intro;
  elements.resetPuzzleBtn.textContent = puzzle.reset;
  elements.puzzleScoreLabel.textContent = puzzle.scoreLabel;
  elements.rackTitle.textContent = puzzle.rackTitle;
  elements.rackHint.textContent = puzzle.rackHint;
  elements.puzzleKeyHint.textContent = puzzle.keyHint;
  elements.puzzleMouseHint.textContent = puzzle.mouseHint;
  elements.puzzleHowTitle.textContent = puzzle.howTitle;
  elements.puzzleHowText.textContent = puzzle.howText;
  if (!elements.puzzleStatus.textContent) {
    elements.puzzleStatus.textContent = puzzle.selectPrompt;
  }
  renderPuzzle();
  renderArcadeMeta();
}

const heldKeys = new Set();

elements.featuredLaunchBtn.addEventListener("click", () => openApp("course"));
elements.featuredPuzzleBtn.addEventListener("click", () => openApp("puzzle"));
elements.homeBtn.addEventListener("click", () => setScreen("home"));
elements.skipSplashBtn.addEventListener("click", finishSplash);
elements.appGrid.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-app]");
  if (!trigger) return;
  openApp(trigger.dataset.app);
});
elements.langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.currentLang = button.dataset.lang;
    applyLanguage();
  });
});
elements.presentationToggleBtn.addEventListener("click", () => {
  state.presentationMode = !state.presentationMode;
  elements.body.classList.toggle("presentation-mode", state.presentationMode);
  updateTimerControls();
});
elements.startDemoBtn.addEventListener("click", () => {
  setScreen("course");
  setCourseSection("learn");
});
elements.randomChallengeBtn.addEventListener("click", () => {
  const next = choice(COURSE_SECTIONS);
  setScreen("course");
  setCourseSection(next);
  if (next === "builder") {
    elements.randomizeIdeaBtn.click();
  } else if (next === "lab") {
    elements.promptInput.value = currentCourse().examplePrompt;
    analyzeCoursePrompt();
  }
});
elements.nextTipBtn.addEventListener("click", () => {
  elements.coachTip.textContent = choice(currentCourse().coachTips);
});
elements.buildPromptBtn.addEventListener("click", buildCoursePrompt);
elements.randomizeIdeaBtn.addEventListener("click", () => {
  elements.goalSelect.selectedIndex = Math.floor(Math.random() * elements.goalSelect.options.length);
  elements.audienceSelect.selectedIndex = Math.floor(Math.random() * elements.audienceSelect.options.length);
  elements.styleSelect.selectedIndex = Math.floor(Math.random() * elements.styleSelect.options.length);
  buildCoursePrompt();
});
elements.analyzePromptBtn.addEventListener("click", analyzeCoursePrompt);
elements.loadExampleBtn.addEventListener("click", () => {
  elements.promptInput.value = currentCourse().examplePrompt;
});
elements.trustBtn.addEventListener("click", () => answerTruth(true));
elements.verifyBtn.addEventListener("click", () => answerTruth(false));
elements.nextTruthBtn.addEventListener("click", () => {
  state.truthIndex = (state.truthIndex + 1) % currentCourse().truthCards.length;
  renderTruthCard();
});
elements.nextQuizBtn.addEventListener("click", () => {
  state.quizIndex = (state.quizIndex + 1) % currentCourse().quizCards.length;
  renderQuizCard();
});
elements.restartQuizBtn.addEventListener("click", () => {
  state.quizIndex = 0;
  state.quizScore = 0;
  elements.quizScore.textContent = "0";
  renderQuizCard();
});
elements.toggleClockBtn.addEventListener("click", () => {
  if (state.shotClockRunning) stopShotClock(); else startShotClock();
});
elements.resetClockBtn.addEventListener("click", () => resetShotClock(state.shotClockInitial));
elements.set24Btn.addEventListener("click", () => resetShotClock(24));
elements.set14Btn.addEventListener("click", () => resetShotClock(14));
elements.resetPuzzleBtn.addEventListener("click", resetPuzzle);
elements.arcadeActionBtn.addEventListener("click", () => {
  if (state.arcade.activeGame) {
    state.arcade.activeGame.action();
    renderArcadeStats();
  }
});
elements.arcadeResetBtn.addEventListener("click", () => {
  if (state.arcade.activeGame) {
    state.arcade.activeGame.reset();
    renderArcadeMeta();
  }
});
elements.arcadeCanvas.addEventListener("mousemove", (event) => {
  const point = getCanvasPoint(event);
  state.arcade.pointer = { ...point, down: false };
  if (state.arcade.activeGame && state.currentScreen === "arcade") {
    state.arcade.activeGame.pointerMove(point);
  }
});
elements.arcadeCanvas.addEventListener("click", (event) => {
  const point = getCanvasPoint(event);
  state.arcade.pointer = { ...point, down: true };
  if (state.arcade.activeGame && state.currentScreen === "arcade") {
    state.arcade.activeGame.pointerDown(point);
    renderArcadeStats();
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  heldKeys.add(key);
  const activeTag = document.activeElement ? document.activeElement.tagName : "";
  const typing = activeTag === "TEXTAREA" || activeTag === "SELECT";

  if (!typing && key === "l") {
    event.preventDefault();
    const langs = ["fr", "en", "es", "it"];
    const nextIndex = (langs.indexOf(state.currentLang) + 1) % langs.length;
    state.currentLang = langs[nextIndex];
    applyLanguage();
    return;
  }

  if (!typing && key === "f") {
    event.preventDefault();
    elements.presentationToggleBtn.click();
    return;
  }

  if (state.currentScreen === "course" && !typing) {
    if (event.key === "ArrowRight") {
      const nextIndex = (COURSE_SECTIONS.indexOf(state.currentCourseSection) + 1) % COURSE_SECTIONS.length;
      setCourseSection(COURSE_SECTIONS[nextIndex]);
    }
    if (event.key === "ArrowLeft") {
      const nextIndex = (COURSE_SECTIONS.indexOf(state.currentCourseSection) - 1 + COURSE_SECTIONS.length) % COURSE_SECTIONS.length;
      setCourseSection(COURSE_SECTIONS[nextIndex]);
    }
    if (event.key === " ") {
      event.preventDefault();
      elements.randomChallengeBtn.click();
    }
    if (event.key === "Enter" && document.activeElement === elements.promptInput) {
      event.preventDefault();
      analyzeCoursePrompt();
    }
    if (key === "s") {
      event.preventDefault();
      elements.toggleClockBtn.click();
    }
    if (key === "r") {
      event.preventDefault();
      elements.resetClockBtn.click();
    }
  }

  if (state.currentScreen === "puzzle" && !typing) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      state.puzzle.cursorRow = Math.max(0, state.puzzle.cursorRow - 1);
      renderPuzzleBoard();
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      state.puzzle.cursorRow = Math.min(7, state.puzzle.cursorRow + 1);
      renderPuzzleBoard();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      state.puzzle.cursorCol = Math.max(0, state.puzzle.cursorCol - 1);
      renderPuzzleBoard();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      state.puzzle.cursorCol = Math.min(7, state.puzzle.cursorCol + 1);
      renderPuzzleBoard();
    }
    if (["1", "2", "3"].includes(event.key)) {
      const index = Number(event.key) - 1;
      if (state.puzzle.queue[index]) {
        state.puzzle.selectedIndex = index;
        renderPuzzle();
      }
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      placePuzzlePiece(state.puzzle.cursorRow, state.puzzle.cursorCol);
    }
    if (key === "r") {
      event.preventDefault();
      resetPuzzle();
    }
  }

  if (state.currentScreen === "arcade" && !typing && state.arcade.activeGame) {
    state.arcade.activeGame.keyDown(key);
    renderArcadeStats();
  }
});

document.addEventListener("keyup", (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  heldKeys.delete(key);
});

window.__DUNEX_TEST_API__ = {
  openApp(appId) {
    openApp(appId);
    return state.currentScreen;
  },
  setLanguage(lang) {
    state.currentLang = lang;
    applyLanguage();
  },
  action() {
    if (state.currentScreen === "arcade" && state.arcade.activeGame) {
      state.arcade.activeGame.action();
      renderArcadeStats();
    }
  },
  resetArcade() {
    if (state.arcade.activeGame) {
      state.arcade.activeGame.reset();
      renderArcadeMeta();
    }
  },
  tickArcade(ms = 1000) {
    if (!state.arcade.activeGame) return;
    const steps = Math.max(1, Math.floor(ms / 16));
    for (let index = 0; index < steps; index += 1) {
      state.arcade.activeGame.update(ms / steps / 1000, { keys: new Set(), pointer: state.arcade.pointer });
    }
    renderArcadeStats();
    renderArcadeCanvas();
  },
  clickCanvas(x, y) {
    if (!state.arcade.activeGame) return;
    const point = { x, y };
    state.arcade.activeGame.pointerDown(point);
    renderArcadeStats();
  },
  placePuzzle(row, col, pieceIndex = 0) {
    state.puzzle.selectedIndex = pieceIndex;
    return placePuzzlePiece(row, col);
  },
  getSnapshot() {
    return {
      screen: state.currentScreen,
      lang: state.currentLang,
      course: {
        promptScore: state.promptScore,
        truthScore: state.truthScore,
        quizScore: state.quizScore
      },
      puzzle: {
        score: state.puzzle.score,
        selectedIndex: state.puzzle.selectedIndex,
        queueCount: state.puzzle.queue.filter(Boolean).length
      },
      arcade: state.arcade.activeGame ? state.arcade.activeGame.debug() : null,
      activeArcade: state.arcade.activeId
    };
  }
};

applyLanguage();
setScreen("home");
setCourseSection("learn");
resetShotClock(24);
resetPuzzle();
setArcadeGame("quest");
renderArcadeCanvas();
startSplash();
requestAnimationFrame(arcadeLoop);
