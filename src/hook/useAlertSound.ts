import { useEffect, useRef } from "react";
import alertSound from "../../sounds/alert.mp3";

export function useAlertSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    ctxRef.current = ctx;

    fetch(alertSound)
      .then((r) => r.arrayBuffer())
      .then((buf) => ctx.decodeAudioData(buf))
      .then((decoded) => {
        bufferRef.current = decoded;
      })
      .catch(() => {});

    const unlock = () => {
      ctx.resume().catch(() => {});
      document.removeEventListener("click", unlock);
    };
    document.addEventListener("click", unlock);

    return () => {
      document.removeEventListener("click", unlock);
      ctx.close().catch(() => {});
    };
  }, []);

  function play() {
    const ctx = ctxRef.current;
    const buffer = bufferRef.current;
    if (!ctx || !buffer) return;
    ctx.resume().then(() => {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    }).catch(() => {});
  }

  return play;
}
