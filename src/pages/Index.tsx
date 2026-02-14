import {useState, useCallback, useEffect, ChangeEvent} from "react";
import confetti from "canvas-confetti";

const PUPPY_GIF = "https://media.tenor.com/PTBNHIGHS-kAAAAM/dog-smile.gif";
// const PASTA_CHOCOLATE = "https://i.ibb.co/Q7sHX7BW/20250430-195502.jpg"
const PASTA_CHOCOLATE = "https://i.ibb.co/G40gbzm1/IMG-1325.jpg"
const CELEBRATE_GIF = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWR4cjRjMGl0MWNyYTVhNGk5eTN2aGRmaDZ4cjJ3ZXRnMHAxbDdwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYt5jPR6QX5pnqM/giphy.gif";

interface StepData {
  photoFile?: File | null;
  videoFile?: File | null;
  photoPreview?: string;
  videoPreview?: string;
  title: string;
  subtitle: string;
  text: string;
}

function FloatingHearts() {
  const hearts = Array.from({length: 12}, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 6}s`,
    symbol: ["💕", "💗", "💖", "♥"][i % 4],
  }));

  return (
      <>
        {hearts.map((h) => (
            <span
                key={h.id}
                className="floating-heart"
                style={{
                  left: h.left,
                  animationDelay: h.delay,
                  animationDuration: h.duration,
                }}
            >
          {h.symbol}
        </span>
        ))}
      </>
  );
}

function FloatingRosePetals() {
  const petals = Array.from({length: 20}, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${8 + Math.random() * 8}s`,
    symbol: ["🌸", "🌺", "🌹", "💮"][i % 4],
    rotation: Math.random() * 360,
  }));

  return (
      <>
        {petals.map((p) => (
            <span
                key={`petal-${p.id}`}
                className="floating-heart"
                style={{
                  left: p.left,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                  transform: `rotate(${p.rotation}deg)`,
                  opacity: 0.6,
                }}
            >
          {p.symbol}
        </span>
        ))}
      </>
  );
}

function Sparkles() {
  const sparkles = Array.from({length: 15}, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${1.5 + Math.random() * 2}s`,
  }));

  return (
      <>
        {sparkles.map((s) => (
            <span
                key={`sparkle-${s.id}`}
                className="sparkle"
                style={{
                  left: s.left,
                  top: s.top,
                  animationDelay: s.delay,
                  animationDuration: s.duration,
                }}
            >
          ✨
        </span>
        ))}
      </>
  );
}

function fireConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;
  const colors = ["#ff69b4", "#ff1493", "#ff6b9d", "#ffc0cb", "#ff85a2"];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: {x: 0},
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: {x: 1},
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  // Heart shapes
  confetti({
    particleCount: 80,
    spread: 100,
    origin: {y: 0.6},
    colors,
    shapes: ["circle"],
    scalar: 1.5,
  });
}

export default function Index() {
  const [idf, setIdf] = useState(null);
  const [idh, setIdh] = useState(null);
  
  // Noms fixes - personnalisés
  const bf = "Dina"; // boyfriend
  const gf = "Nancia"; // girlfriend

  const [accepted, setAccepted] = useState(false);
  const [showSadCats, setShowSadCats] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noPos, setNoPos] = useState<{ top?: string; left?: string }>({});
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);

  // Images de chats tristes
  const sadCatImages = [
    "/images/question.jpg", // Photo originale
    "/images/sad-cat1.webp",
    "/images/sad-cat2.jpg",
    "/images/sad-cat3.gif",
  ];

  // Fonction pour gérer les clics sur "No"
  const handleNoClick = () => {
    const nextCount = noClickCount + 1;
    setNoClickCount(nextCount);
    
    // Après 3 clics, on affiche les chats tristes
    if (nextCount >= 3) {
      setShowSadCats(true);
    }
    
    // Animation du bouton Yes
    setYesScale((s) => Math.min(s + 0.15, 2.5));
  };

  // Messages d'amour pré-configurés
  const loveMessages = [
    "Merciiiiiiii pour ces 7 ans de toutouterie",
    "Je suis bénie de t'avoir comme compagnon de vie",
    "J'ai trouvé mon âme sœur le 28 Mai 2019",
    "Je te souhaite une vie comblée de joie et grâce de Dieu",
    "On va toujours et encore créer des moments de bonheur dans l'avenir pour qu'on aura des milliards de mémoires à raconter à nos 4 enfants",
    "J'exagère sur les 4 enfants, je dirais ...................5 enfants",
    "Je prie chaque jour pour que je sois ton mari et un mari à la hauteur de ton bonheur",
    "Je t'aime. Dinaa",
  ];

  const [stepCount, setStepCount] = useState(13);
  const [steps, setSteps] = useState<StepData[]>([
    {title: "Notre histoire commence", subtitle: "7 ans ensemble", text: loveMessages[0], photoPreview: "/images/photo1.png"},
    {title: "Une bénédiction", subtitle: "Chaque jour avec toi", text: loveMessages[1], photoPreview: "/images/photo2.png"},
    {title: "28 Mai 2019", subtitle: "Le jour où tout a changé", text: loveMessages[2], photoPreview: "/images/photo3.png"},
    {title: "Mes voeux pour toi", subtitle: "Aujourd'hui et toujours", text: loveMessages[3], photoPreview: "/images/photo4.png"},
    {title: "Notre avenir", subtitle: "Des milliers de souvenirs", text: loveMessages[4], photoPreview: "/images/photo5.png"},
    {title: "Petite correction...", subtitle: "5 enfants, pas 4!", text: loveMessages[5], photoPreview: "/images/photo6.png"},
    {title: "Ma prière quotidienne", subtitle: "Être ton mari", text: loveMessages[6], photoPreview: "/images/photo7.png"},
    {title: "Mon amour éternel", subtitle: "Pour toujours", text: loveMessages[7], photoPreview: "/images/photo8.png"},
    {title: "Nous deux", subtitle: "À l'infini", text: "Notre amour est plus fort que tout 💕", photoPreview: "/images/photo9.png"},
    {title: "Un cadeau spécial", subtitle: "Pour toi mon amour", text: "Chaque cadeau que je te donne vient du fond de mon coeur, mais le plus grand cadeau c'est ton amour 🎁", photoPreview: "/images/photo11.png"},
    {title: "Des moments précieux", subtitle: "Ensemble pour toujours", text: "Offrir mon coeur à toi est le plus beau geste que j'ai fait dans ma vie 💝", photoPreview: "/images/photo12.jpg"},
    {title: "Souvenirs inoubliables", subtitle: "Chaque photo raconte notre histoire", text: "Nos sourires, nos rires, nos moments de complicité... tout est gravé dans mon âme 📸", photoPreview: "/images/photo13.jpg"},
    {title: "Saint-Valentin éternelle", subtitle: "Tous les jours avec toi", text: "Tu es ma Valentine aujourd'hui, demain et pour toute l'éternité 💘", photoPreview: "/images/photo14.jpg"},
  ]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [configSubmitted, setConfigSubmitted] = useState(true);
  const [dragOverPhoto, setDragOverPhoto] = useState<Record<number, boolean>>({});
  const [dragOverVideo, setDragOverVideo] = useState<Record<number, boolean>>({});
  
  // États pour les boutons de navigation (comportement comme Oui/Non)
  const [prevPos, setPrevPos] = useState<{ top?: string; left?: string }>({});
  const [prevScale, setPrevScale] = useState(1);
  const [nextScale, setNextScale] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIdf(params.get('idf'));
    setIdh(params.get('idh'));

    requestAnimationFrame(() => setFadeIn(true));
  }, []);

  useEffect(() => {
    setCurrentStepIndex((i) => Math.min(i, Math.max(0, steps.length - 1)));
  }, [steps.length]);

  const handleStepCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(event.target.value) || 1);
    setStepCount(value);
    setSteps((prev) => {
      if (value === prev.length) return prev;
      if (value < prev.length) return prev.slice(0, value);
      const additional = Array.from({length: value - prev.length}, () => ({
        title: "",
        subtitle: "",
        text: "",
      }));
      return [...prev, ...additional];
    });
  };

  const handlePhotoChange = (index: number, file: File | null) => {
    setSteps((prev) => {
      const next = [...prev];
      if (next[index]?.photoPreview) {
        URL.revokeObjectURL(next[index].photoPreview);
      }
      next[index] = {
        ...next[index],
        photoFile: file,
        photoPreview: file ? URL.createObjectURL(file) : undefined,
      };
      return next;
    });
  };

  const handleVideoChange = (index: number, file: File | null) => {
    setSteps((prev) => {
      const next = [...prev];
      if (next[index]?.videoPreview) {
        URL.revokeObjectURL(next[index].videoPreview);
      }
      next[index] = {
        ...next[index],
        videoFile: file,
        videoPreview: file ? URL.createObjectURL(file) : undefined,
      };
      return next;
    });
  };

  const updateStepTitle = (index: number, value: string) => {
    setSteps((prev) => {
      const next = [...prev];
      next[index] = {...next[index], title: value};
      return next;
    });
  };

  const updateStepSubtitle = (index: number, value: string) => {
    setSteps((prev) => {
      const next = [...prev];
      next[index] = {...next[index], subtitle: value};
      return next;
    });
  };

  const updateStepText = (index: number, value: string) => {
    setSteps((prev) => {
      const next = [...prev];
      next[index] = {...next[index], text: value};
      return next;
    });
  };

  const runAwayNo = useCallback(() => {
    const top = `${10 + Math.random() * 70}%`;
    const left = `${5 + Math.random() * 80}%`;
    setNoPos({top, left});
    setNoScale((s) => Math.max(s * 0.85, 0.3));
    setYesScale((s) => Math.min(s + 0.12, 2));
  }, []);

  const runAwayPrev = useCallback(() => {
    const top = `${10 + Math.random() * 70}%`;
    const left = `${5 + Math.random() * 80}%`;
    setPrevPos({top, left});
    setPrevScale((s) => Math.max(s * 0.85, 0.3));
    setNextScale((s) => Math.min(s + 0.12, 2));
  }, []);

  const handleYes = () => {
    setAccepted(true);
    setCurrentStepIndex(0);
    fireConfetti();
  };

  const bgClass = accepted
      ? "bg-[hsl(var(--valentine-warm))]"
      : "bg-background";

  return (
      <div
          className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-1000 ${bgClass}`}
      >
        <FloatingHearts/>
        {accepted && <FloatingRosePetals/>}
        {accepted && <Sparkles/>}

        <div
            className={`relative z-10 flex flex-col items-center gap-6 px-6 text-center transition-all duration-700 ${
                fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          {!accepted ? (
              <>
                {/* Page d'introduction romantique avec la question */}
                <div className="flex flex-col items-center gap-8 animate-[scale-in_0.5s_ease-out] w-full max-w-2xl px-4">
                  {/* Photo romantique */}
                  <div className="relative w-full aspect-square max-w-md">
                    {/* Glow effect derrière */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 via-rose-400/30 to-red-400/30 rounded-3xl blur-2xl animate-pulse"></div>
                    
                    {/* Cadre principal avec bordure */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-200/50 dark:border-pink-800/50 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-2">
                      <div className="rounded-2xl overflow-hidden shadow-inner">
                        <img
                          key={noClickCount}
                          src={sadCatImages[Math.min(noClickCount, sadCatImages.length - 1)]}
                          alt="Would be my valentine?"
                          className="w-full h-full object-cover animate-[fadeIn_0.6s_ease-out]"
                        />
                      </div>
                    </div>

                    {/* Petits coeurs décoratifs aux coins */}
                    <div className="absolute -top-4 -left-4 text-4xl animate-bounce" style={{animationDelay: "0s"}}>
                      💕
                    </div>
                    <div className="absolute -top-4 -right-4 text-4xl animate-bounce" style={{animationDelay: "0.2s"}}>
                      💖
                    </div>
                    <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce" style={{animationDelay: "0.4s"}}>
                      💗
                    </div>
                    <div className="absolute -bottom-4 -right-4 text-4xl animate-bounce" style={{animationDelay: "0.6s"}}>
                      💝
                    </div>
                  </div>

                  {/* Question romantique avec message dynamique */}
                  <div className="text-center space-y-3">
                    <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent leading-tight animate-[fadeIn_0.8s_ease-out]">
                      Would you be my valentine? 💕
                    </h1>
                    {noClickCount > 0 && (
                      <p className="text-lg sm:text-xl text-pink-600 dark:text-pink-400 font-semibold animate-[fadeIn_0.5s_ease-out]">
                        {noClickCount === 1 && "Es-tu vraiment sûr(e)? 🥺"}
                        {noClickCount === 2 && "Tu me rends triste... 😿"}
                        {noClickCount >= 3 && "Mon cœur est brisé... 💔"}
                      </p>
                    )}
                  </div>

                  {/* Boutons Yes et No */}
                  <div className="flex gap-6 mt-6 relative">
                    <button
                      onClick={handleYes}
                      className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold shadow-2xl hover:shadow-pink-500/50 active:scale-95 transition-all duration-300 border-4 border-white/20"
                      style={{
                        transform: `scale(${yesScale})`,
                        padding: "1rem 3rem",
                        fontSize: "1.3rem",
                      }}
                    >
                      Yes 💕
                    </button>

                    <button
                      onClick={handleNoClick}
                      className="rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-600 dark:text-gray-300 font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 border-2 border-gray-300/50 dark:border-gray-600/50 cursor-pointer px-10 py-3"
                    >
                      No
                    </button>
                  </div>

                  {/* Affichage des chats tristes quand on clique sur "No" */}
                  {showSadCats && (
                    <div className="mt-8 w-full max-w-2xl animate-[fadeIn_0.5s_ease-out]">
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 shadow-2xl border-4 border-gray-300 dark:border-gray-700">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-gray-300 text-center mb-4">
                          Oh non... 😿
                        </h2>
                        
                        {/* Grille de photos de chats tristes */}
                        <div className="grid grid-cols-1 gap-4 mb-6">
                          {sadCatImages.map((img, index) => (
                            <div key={index} className="relative rounded-2xl overflow-hidden shadow-xl">
                              <img
                                src={img}
                                alt={`Sad cat ${index + 1}`}
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          ))}
                        </div>

                        <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-4">
                          Tu es sûr(e) de vouloir dire non? 🥺
                        </p>

                        <div className="flex flex-col gap-3">
                          <button
                            onClick={() => {
                              setShowSadCats(false);
                              handleYes();
                            }}
                            className="w-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-4 shadow-2xl hover:shadow-pink-500/50 active:scale-95 transition-all duration-300 text-lg"
                          >
                            D'accord, je change d'avis! 💕
                          </button>
                          
                          <button
                            onClick={() => {
                              setShowSadCats(false);
                              setNoClickCount(0);
                            }}
                            className="w-full rounded-full bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-700 font-semibold py-3 shadow-lg active:scale-95 transition-all duration-300"
                          >
                            Retour à la question
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* On garde le reste du formulaire de configuration caché mais disponible si besoin */}
                <div className="hidden w-full max-w-7xl mb-8 space-y-4 text-left">
                  {/* Formulaire unique BF / GF */}
                  <div className={`bg-gradient-to-br from-pink-50/80 to-rose-50/80 dark:from-pink-950/50 dark:to-rose-950/50 border-2 border-pink-200/50 dark:border-pink-800/50 rounded-2xl p-6 shadow-xl transition-opacity backdrop-blur-sm ${
                    configSubmitted ? "opacity-60" : ""
                  }`}>
                    <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent flex items-center gap-2">
                      💑 Vos prénoms
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-pink-600 dark:text-pink-400">
                          BF (celui qui demande)
                        </label>
                        <input
                          type="text"
                          value={bf}
                          disabled={configSubmitted}
                          placeholder="Ex: Thomas"
                          className="w-full rounded-xl border-2 border-pink-300 dark:border-pink-700 bg-white dark:bg-pink-950/30 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-60 placeholder:text-pink-400/40"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-pink-600 dark:text-pink-400">
                          GF (celle/celui à qui on demande)
                        </label>
                        <input
                          type="text"
                          value={gf}
                          disabled={configSubmitted}
                          placeholder="Ex: Sophie"
                          className="w-full rounded-xl border-2 border-pink-300 dark:border-pink-700 bg-white dark:bg-pink-950/30 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-60 placeholder:text-pink-400/40"
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`bg-gradient-to-br from-pink-50/80 to-rose-50/80 dark:from-pink-950/50 dark:to-rose-950/50 border-2 border-pink-200/50 dark:border-pink-800/50 rounded-2xl p-6 shadow-xl transition-opacity backdrop-blur-sm ${
                    configSubmitted ? "opacity-60" : ""
                  }`}>
                    <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent flex items-center gap-2">
                      💝 Prépare tes moments romantiques
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <label className="text-base font-semibold text-pink-700 dark:text-pink-300 shrink-0">
                        Nombre de moments :
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={stepCount}
                          disabled={configSubmitted}
                          onChange={handleStepCountChange}
                          className="w-20 h-12 rounded-xl border-2 border-pink-300 dark:border-pink-700 bg-white dark:bg-pink-950/30 px-4 text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-60"
                        />
                        <span className="text-sm text-pink-600/80">(1 à 10)</span>
                      </div>
                    </div>
                    <details className="mt-4 group">
                      <summary className="text-sm text-pink-600 dark:text-pink-400 cursor-pointer hover:text-pink-700 dark:hover:text-pink-300 list-none flex items-center gap-2">
                        <span className="group-open:rotate-90 transition-transform">▶</span>
                        💡 Astuces rapides
                      </summary>
                      <p className="mt-2 p-3 bg-pink-100/50 dark:bg-pink-900/20 rounded-lg text-xs text-pink-700 dark:text-pink-300 leading-relaxed">
                        Glisser-déposer ou cliquer sur les zones pour ajouter des photos et vidéos
                      </p>
                    </details>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        id={`moment-${index}`}
                        className={`bg-gradient-to-br from-white/90 to-pink-50/50 dark:from-pink-950/40 dark:to-rose-950/40 border-2 border-pink-200 dark:border-pink-800 rounded-2xl p-6 shadow-lg space-y-5 transition-all hover:shadow-xl ${
                          configSubmitted ? "opacity-60 pointer-events-none" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold text-lg text-pink-700 dark:text-pink-300 flex items-center gap-2">
                            {["💕", "💖", "💗", "💝", "💘", "❤️", "💓", "💞", "💟", "♥️"][index % 10]} Moment {index + 1}
                          </h2>
                          {steps.length > 1 && !configSubmitted && (
                            <button
                              type="button"
                              onClick={() => {
                                const newCount = Math.max(1, steps.length - 1);
                                setStepCount(newCount);
                                setSteps((p) => p.filter((_, i) => i !== index));
                              }}
                              className="text-xs text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 px-2 py-1 rounded"
                            >
                              Supprimer
                            </button>
                          )}
                        </div>
                        {/* Titre + Date sur une ligne sur desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-pink-600 dark:text-pink-400">
                              Titre
                            </label>
                            <input
                              type="text"
                              value={step.title}
                              disabled={configSubmitted}
                              onChange={(e) => updateStepTitle(index, e.target.value)}
                              placeholder="Ex: Notre premier baiser..."
                              className="w-full rounded-xl border-2 border-pink-300 dark:border-pink-700 bg-white dark:bg-pink-950/30 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-60 placeholder:text-pink-400/40"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-pink-600 dark:text-pink-400">
                              Date ou lieu
                            </label>
                            <input
                              type="text"
                              value={step.subtitle}
                              disabled={configSubmitted}
                              onChange={(e) => updateStepSubtitle(index, e.target.value)}
                              placeholder="Ex: 14 fév. 2024"
                              className="w-full rounded-xl border-2 border-pink-300 dark:border-pink-700 bg-white dark:bg-pink-950/30 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-60 placeholder:text-pink-400/40"
                            />
                          </div>
                        </div>

                        {/* Photo / Vidéo côte à côte sur desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                          className="space-y-3"
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDragOverPhoto({...dragOverPhoto, [index]: true});
                          }}
                          onDragEnter={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDragOverPhoto({...dragOverPhoto, [index]: true});
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDragOverPhoto({...dragOverPhoto, [index]: false});
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDragOverPhoto({...dragOverPhoto, [index]: false});
                            const file = e.dataTransfer.files?.[0];
                            if (file && file.type.startsWith("image/")) {
                              handlePhotoChange(index, file);
                            }
                          }}
                        >
                          <label className="block text-sm font-semibold text-pink-600 dark:text-pink-400">
                            📸 Photo
                          </label>
                          {/* Zone de drag & drop stylée */}
                          <label className={`relative block w-full cursor-pointer ${configSubmitted ? 'opacity-60 pointer-events-none' : ''}`}>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={configSubmitted}
                              onChange={(e) =>
                                handlePhotoChange(index, e.target.files?.[0] ?? null)
                              }
                              className="hidden"
                            />
                            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                              dragOverPhoto[index] 
                                ? 'border-pink-500 bg-pink-200/50 dark:bg-pink-800/40 scale-[1.02]' 
                                : 'border-pink-300 dark:border-pink-700 bg-pink-50/30 dark:bg-pink-950/20 hover:bg-pink-100/50 dark:hover:bg-pink-900/30 hover:border-pink-400 dark:hover:border-pink-600'
                            }`}>
                              <div className="flex flex-col items-center gap-2">
                                <svg className={`w-10 h-10 transition-colors ${dragOverPhoto[index] ? 'text-pink-600' : 'text-pink-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="text-sm font-medium text-pink-600 dark:text-pink-400">
                                  {dragOverPhoto[index] ? 'Déposez ici !' : 'Cliquer ou glisser une image'}
                                </p>
                              </div>
                            </div>
                          </label>
                          
                          {step.photoPreview && (
                            <div className="relative mt-3 inline-block">
                              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-rose-400/30 rounded-xl blur-lg"></div>
                              <img
                                src={step.photoPreview}
                                alt={`Prévisualisation moment ${index + 1}`}
                                className="relative h-40 w-auto rounded-xl object-cover border-4 border-pink-200 dark:border-pink-800 shadow-xl"
                              />
                              <button
                                onClick={() => handlePhotoChange(index, null)}
                                disabled={configSubmitted}
                                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg font-bold disabled:opacity-60"
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </div>
                        <div
                          className="space-y-3"
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDragOverVideo({...dragOverVideo, [index]: true});
                          }}
                          onDragEnter={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDragOverVideo({...dragOverVideo, [index]: true});
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDragOverVideo({...dragOverVideo, [index]: false});
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDragOverVideo({...dragOverVideo, [index]: false});
                            const file = e.dataTransfer.files?.[0];
                            if (file && file.type.startsWith("video/")) {
                              handleVideoChange(index, file);
                            }
                          }}
                        >
                          <label className="block text-sm font-semibold text-pink-600 dark:text-pink-400">
                            🎥 Vidéo <span className="font-normal text-pink-500/70">(optionnel)</span>
                          </label>
                          {/* Zone de drag & drop stylée pour vidéo */}
                          <label className={`relative block w-full cursor-pointer ${configSubmitted ? 'opacity-60 pointer-events-none' : ''}`}>
                            <input
                              type="file"
                              accept="video/*"
                              disabled={configSubmitted}
                              onChange={(e) =>
                                handleVideoChange(index, e.target.files?.[0] ?? null)
                              }
                              className="hidden"
                            />
                            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                              dragOverVideo[index] 
                                ? 'border-pink-500 bg-pink-200/50 dark:bg-pink-800/40 scale-[1.02]' 
                                : 'border-pink-300 dark:border-pink-700 bg-pink-50/30 dark:bg-pink-950/20 hover:bg-pink-100/50 dark:hover:bg-pink-900/30 hover:border-pink-400 dark:hover:border-pink-600'
                            }`}>
                              <div className="flex flex-col items-center gap-2">
                                <svg className={`w-10 h-10 transition-colors ${dragOverVideo[index] ? 'text-pink-600' : 'text-pink-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="text-sm font-medium text-pink-600 dark:text-pink-400">
                                  {dragOverVideo[index] ? 'Déposez ici !' : 'Cliquer ou glisser une vidéo'}
                                </p>
                              </div>
                            </div>
                          </label>
                          
                          {step.videoPreview && (
                            <div className="relative mt-3 inline-block">
                              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-rose-400/30 rounded-xl blur-lg"></div>
                              <video
                                src={step.videoPreview}
                                controls
                                className="relative h-40 w-auto rounded-xl border-4 border-pink-200 dark:border-pink-800 shadow-xl"
                              />
                              <button
                                onClick={() => handleVideoChange(index, null)}
                                disabled={configSubmitted}
                                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg font-bold disabled:opacity-60"
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold text-pink-600 dark:text-pink-400">
                            💌 Message <span className="font-normal text-pink-500/70">(optionnel)</span>
                          </label>
                          <textarea
                            value={step.text}
                            disabled={configSubmitted}
                            onChange={(e) => updateStepText(index, e.target.value)}
                            placeholder="Un petit mot pour ce moment..."
                            className="w-full min-h-[80px] rounded-xl border-2 border-pink-300 dark:border-pink-700 bg-white dark:bg-pink-950/30 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 resize-y disabled:opacity-60 placeholder:text-pink-400/40"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bouton Submit - Va directement vers les steps */}
                  {!configSubmitted ? (
                    <button
                      onClick={() => {
                        setConfigSubmitted(true);
                        setAccepted(true);
                        setCurrentStepIndex(0);
                        fireConfetti();
                      }}
                      className="w-full mt-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white font-bold py-4 px-8 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 text-lg flex items-center justify-center gap-3"
                    >
                      <span className="text-2xl">💝</span>
                      <span>Tout est prêt pour la grande question</span>
                      <span className="text-2xl">💝</span>
                    </button>
                  ) : (
                    <div className="mt-6 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 border-2 border-green-400/50 dark:border-green-600/50 text-green-700 dark:text-green-300 font-bold py-4 px-8 text-center flex items-center justify-center gap-3 shadow-lg">
                      <span className="text-3xl animate-bounce">✓</span>
                      <span className="text-lg">Tous les moments sont prêts ! 💚</span>
                      <button
                        onClick={() => setConfigSubmitted(false)}
                        className="ml-3 text-sm underline opacity-70 hover:opacity-100 transition-opacity font-semibold"
                      >
                        Modifier
                      </button>
                    </div>
                  )}
                </div>
              </>
          ) : (
              <div className="flex flex-col items-center gap-3 animate-[scale-in_0.5s_ease-out] w-full max-w-3xl px-4">

                {/* En-tête romantique avec le numéro d'étape */}
               

                {/* Zone centrale : photo ou vidéo de l'étape avec un cadre romantique */}
                <div className="relative w-full aspect-square max-w-md">
                  {/* Glow effect derrière */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-rose-400/20 to-red-400/20 rounded-3xl blur-2xl animate-pulse"></div>
                  
                  {/* Cadre principal avec bordure dorée */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-200/50 dark:border-pink-800/50 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-2">
                    <div className="rounded-2xl overflow-hidden shadow-inner">
                      {(() => {
                        const step = steps[currentStepIndex];
                        if (step?.photoPreview) {
                          return (
                            <img
                              key={`photo-${currentStepIndex}`}
                              src={step.photoPreview}
                              alt={`Étape ${currentStepIndex + 1}`}
                              className="w-full h-full object-cover animate-[fadeIn_0.6s_ease-out]"
                            />
                          );
                        }
                        if (step?.videoPreview) {
                          return (
                            <video
                              key={`video-${currentStepIndex}`}
                              src={step.videoPreview}
                              controls
                              className="w-full h-full object-cover animate-[fadeIn_0.6s_ease-out]"
                            />
                          );
                        }
                        return (
                          <img
                            src={CELEBRATE_GIF}
                            alt="Celebration"
                            className="w-full h-full object-cover animate-[fadeIn_0.6s_ease-out]"
                          />
                        );
                      })()}
                    </div>
                  </div>

                  {/* Petits coeurs décoratifs aux coins */}
                  <div className="absolute -top-4 -left-4 text-4xl animate-bounce" style={{animationDelay: "0s"}}>
                    💕
                  </div>
                  <div className="absolute -top-4 -right-4 text-4xl animate-bounce" style={{animationDelay: "0.2s"}}>
                    💖
                  </div>
                  <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce" style={{animationDelay: "0.4s"}}>
                    💗
                  </div>
                  <div className="absolute -bottom-4 -right-4 text-4xl animate-bounce" style={{animationDelay: "0.6s"}}>
                    💝
                  </div>
                </div>

                {/* Texte customisable avec style romantique */}
                <div className="w-full text-center space-y-2 animate-[fadeIn_0.8s_ease-out]">
                  {steps[currentStepIndex]?.title && (
                    <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent leading-tight">
                      {steps[currentStepIndex].title} 💕
                    </h1>
                  )}
                  {steps[currentStepIndex]?.subtitle && (
                    <p className="text-lg sm:text-2xl text-pink-600 dark:text-pink-400 font-semibold italic">
                      ✨ {steps[currentStepIndex].subtitle} ✨
                    </p>
                  )}
                  {steps[currentStepIndex]?.text && (
                    <div className="relative mt-3">
                      {/* Glow romantique subtil derrière le texte */}
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-rose-400/20 to-red-400/20 rounded-3xl blur-xl"></div>
                      
                      <p className="relative text-base sm:text-lg text-pink-700 dark:text-pink-200 whitespace-pre-line px-6 py-4 rounded-2xl backdrop-blur-sm max-w-2xl mx-auto leading-relaxed font-medium">
                        <span className="block relative">
                          <span className="absolute -left-3 -top-1 text-2xl opacity-30">💕</span>
                          <span className="absolute -right-3 -bottom-1 text-2xl opacity-30">💖</span>
                          {steps[currentStepIndex].text}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
                {/* Navigation Next / Previous */}
                <div className="flex gap-6 mt-6 relative">
                  <button
                    onClick={() => {
                      setCurrentStepIndex((i) => Math.max(0, i - 1));
                      fireConfetti();
                    }}
                    disabled={currentStepIndex === 0}
                    className="rounded-full bg-gradient-to-r from-pink-300 to-rose-300 hover:from-pink-400 hover:to-rose-400 text-white font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 border-2 border-white/30 disabled:opacity-30 disabled:pointer-events-none px-6 py-3 text-base"
                  >
                    ← Précédent
                  </button>
                  
                  <button
                    onClick={() => {
                      setCurrentStepIndex((i) => Math.min(steps.length - 1, i + 1));
                      fireConfetti();
                    }}
                    disabled={currentStepIndex === steps.length - 1}
                    className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold shadow-2xl hover:shadow-pink-500/50 active:scale-95 transition-all duration-300 border-4 border-white/20 disabled:opacity-30 disabled:pointer-events-none px-8 py-4 text-lg"
                  >
                    Suivant 💕 →
                  </button>
                </div>

                {/* Message final si dernière étape - VERSION SIMPLIFIÉE */}
                {currentStepIndex === steps.length - 1 && (
                  <div className="mt-4 text-center space-y-4 animate-[fadeIn_1s_ease-out] max-w-xl mx-auto">
                    {/* Message d'amour principal */}
                    <div className="space-y-2">
                      <p className="text-2xl sm:text-3xl font-bold text-pink-600 dark:text-pink-300">
                        Je t'aime {gf || idh || "mon amour"} 💕
                      </p>
                      <p className="text-sm text-pink-500 dark:text-pink-400 italic">
                        Pour toujours et à jamais... 💑
                      </p>
                    </div>

                    {/* Message du cartable */}
                    <div className="mt-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-rose-400/20 to-red-400/20 rounded-2xl blur-lg"></div>
                      <div className="relative px-8 py-5 rounded-2xl bg-gradient-to-br from-rose-100/90 via-pink-100/90 to-red-50/90 dark:from-rose-900/60 dark:via-pink-900/60 dark:to-red-900/60 border-2 border-rose-300/70 dark:border-rose-700/70 shadow-xl">
                        <p className="text-xl sm:text-2xl font-bold text-pink-700 dark:text-pink-200">
                          🎒 J'ai quelque chose pour toi dans mon cartable 🎁
                        </p>
                      </div>
                    </div>

                    {/* Signature compacte */}
                    <div className="mt-6 text-right pr-4">
                      <p className="text-lg font-serif italic text-pink-600 dark:text-pink-400">
                        {bf || "Ton amour"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
          )}
        </div>
      </div>
  );
}
