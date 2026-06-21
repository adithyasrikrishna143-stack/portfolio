import { memo, useCallback, useEffect, useMemo, useState } from "react";

// Renders only when the host markup (#gameBoard) is present in the DOM,
// matching the original script.js no-op behaviour. Pure React state — no
// innerHTML, no createElement, no querySelector after mount.
const SYMBOLS = ["🌟", "💻", "🎬", "⚡", "🧠", "🎧", "🖌️", "🚀"];
const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);

function MemoryGame() {
  const [hasHost, setHasHost] = useState(false);
  useEffect(() => { setHasHost(!!document.getElementById("gameBoard")); }, []);

  const [deck, setDeck] = useState(() => shuffle([...SYMBOLS, ...SYMBOLS]));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [lock, setLock] = useState(false);

  const reset = useCallback(() => {
    setDeck(shuffle([...SYMBOLS, ...SYMBOLS]));
    setFlipped([]); setMatched([]); setScore(0); setLock(false);
  }, []);

  const onCard = useCallback((idx) => {
    if (lock || flipped.includes(idx) || matched.includes(idx)) return;
    const next = [...flipped, idx];
    setFlipped(next);
    if (next.length === 2) {
      const [a, b] = next;
      if (deck[a] === deck[b]) {
        setMatched((m) => [...m, a, b]);
        setScore((s) => s + 10);
        setFlipped([]);
      } else {
        setLock(true);
        setScore((s) => Math.max(0, s - 1));
        const t = setTimeout(() => { setFlipped([]); setLock(false); }, 700);
        return () => clearTimeout(t);
      }
    }
  }, [deck, flipped, matched, lock]);

  const cards = useMemo(
    () => deck.map((sym, i) => {
      const isFlipped = flipped.includes(i) || matched.includes(i);
      const isMatched = matched.includes(i);
      return (
        <button
          key={i}
          type="button"
          className={`memory-card${isFlipped ? " flipped" : ""}${isMatched ? " matched" : ""}`}
          data-symbol={sym}
          onClick={() => onCard(i)}
        >
          <span>{sym}</span>
        </button>
      );
    }),
    [deck, flipped, matched, onCard],
  );

  if (!hasHost) return null;
  return (
    <div data-memory-game>
      <div>Score: {score}</div>
      <div className="memory-board">{cards}</div>
      <button type="button" onClick={reset}>Restart</button>
    </div>
  );
}

export default memo(MemoryGame);
