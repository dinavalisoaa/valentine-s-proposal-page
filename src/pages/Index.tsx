import {useState, useCallback, useEffect} from "react";
import confetti from "canvas-confetti";
import {useParams} from "react-router-dom";

const PUPPY_GIF = "https://media.tenor.com/PTBNHIGHS-kAAAAM/dog-smile.gif";
// const PASTA_CHOCOLATE = "https://i.ibb.co/Q7sHX7BW/20250430-195502.jpg"
const PASTA_CHOCOLATE = "https://i.ibb.co/G40gbzm1/IMG-1325.jpg"
const CELEBRATE_GIF = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWR4cjRjMGl0MWNyYTVhNGk5eTN2aGRmaDZ4cjJ3ZXRnMHAxbDdwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYt5jPR6QX5pnqM/giphy.gif";

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

  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState<{ top?: string; left?: string }>({});
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIdf(params.get('idf'));
    setIdh(params.get('idh'));

    requestAnimationFrame(() => setFadeIn(true));
  }, []);

  const runAwayNo = useCallback(() => {
    const top = `${10 + Math.random() * 70}%`;
    const left = `${5 + Math.random() * 80}%`;
    setNoPos({top, left});
    setNoScale((s) => Math.max(s * 0.85, 0.3));
    setYesScale((s) => Math.min(s + 0.12, 2));
  }, []);

  const handleYes = () => {
    setAccepted(true);
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

        <div
            className={`relative z-10 flex flex-col items-center gap-6 px-6 text-center transition-all duration-700 ${
                fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          {!accepted ? (
              <>
                <img
                    src={idf==="Mendrika"? PASTA_CHOCOLATE : PUPPY_GIF}
                    alt="Cute puppy with begging eyes"
                    className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover shadow-lg"
                />
                <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground leading-tight">
                  {idf ? `Hey ${idf},` : ""}Will you be my Valentine? 💝
                </h1>
                <div className="flex gap-6 mt-4 relative">
                  <button
                      onClick={handleYes}
                      className="rounded-full bg-primary text-primary-foreground font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
                      style={{
                        transform: `scale(${yesScale})`,
                        padding: "0.75rem 2.5rem",
                        fontSize: "1.15rem",
                      }}
                  >
                    Yes! 💕
                  </button>
                </div>
                {/* No button — absolute so it can fly around */}
                <button
                    onMouseEnter={runAwayNo}
                    onTouchStart={runAwayNo}
                    className="rounded-full bg-muted text-muted-foreground font-semibold shadow transition-all duration-300 cursor-pointer"
                    style={{
                      position: noPos.top ? "fixed" : "relative",
                      top: noPos.top,
                      left: noPos.left,
                      transform: `scale(${noScale})`,
                      padding: "0.6rem 2rem",
                      fontSize: "1rem",
                      zIndex: 50,
                    }}
                >
                  No
                </button>
              </>
          ) : (
              <div className="flex flex-col items-center gap-6 animate-[scale-in_0.5s_ease-out]">
                <img
                    src={CELEBRATE_GIF}
                    alt="Celebration"
                    className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl object-cover shadow-lg"
                />
                <h1 className="text-4xl sm:text-6xl font-extrabold text-primary">
                  Yay! You said yes! 💕
                </h1>
                <p className="text-lg text-muted-foreground font-medium">
                  I knew you would! {idh? `You're little ${idh} is very happy!`: ""}🥰
                </p>
              </div>
          )}
        </div>
      </div>
  );
}
