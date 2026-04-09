(() => {
  const players = Array.from(document.querySelectorAll("[data-player]"));

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const pauseAllExcept = (currentAudio) => {
    players.forEach((wrap) => {
      const audio = wrap.querySelector("audio");
      if (audio && audio !== currentAudio) audio.pause();
    });
  };

  const setPlayIcon = (wrap, isPlaying) => {
    const btn = wrap.querySelector('[data-action="toggle"]');
    const icon = btn?.querySelector("i");
    if (!btn || !icon) return;

    btn.setAttribute("aria-label", isPlaying ? "Pausar" : "Reproducir");
    icon.classList.toggle("fa-play", !isPlaying);
    icon.classList.toggle("fa-pause", isPlaying);
  };

  const setMuteIcon = (wrap, isMuted) => {
    const btn = wrap.querySelector('[data-action="mute"]');
    const icon = btn?.querySelector("i");
    if (!btn || !icon) return;

    btn.setAttribute("aria-label", isMuted ? "Activar sonido" : "Silenciar");
    icon.classList.toggle("fa-volume-high", !isMuted);
    icon.classList.toggle("fa-volume-xmark", isMuted);
  };

  players.forEach((wrap) => {
    const audio = wrap.querySelector("audio");
    const playBtn = wrap.querySelector('[data-action="toggle"]');
    const muteBtn = wrap.querySelector('[data-action="mute"]');
    const seek = wrap.querySelector(".ap-seek");
    const vol = wrap.querySelector(".ap-volume");
    const currentEl = wrap.querySelector(".ap-current");
    const durationEl = wrap.querySelector(".ap-duration");

    if (!audio || !playBtn || !seek || !currentEl || !durationEl) return;

    let isSeeking = false;

    audio.addEventListener("loadedmetadata", () => {
      durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      currentEl.textContent = formatTime(audio.currentTime);
      if (!isSeeking && Number.isFinite(audio.duration) && audio.duration > 0) {
        seek.value = String((audio.currentTime / audio.duration) * 100);
      }
    });

    audio.addEventListener("play", () => {
      pauseAllExcept(audio);
      setPlayIcon(wrap, true);
    });

    audio.addEventListener("pause", () => setPlayIcon(wrap, false));
    audio.addEventListener("ended", () => setPlayIcon(wrap, false));

    playBtn.addEventListener("click", () => {
      if (audio.paused) audio.play();
      else audio.pause();
    });

    // Seek
    seek.addEventListener("pointerdown", () => (isSeeking = true));
    seek.addEventListener("pointerup", () => (isSeeking = false));
    seek.addEventListener("input", () => {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      const pct = Number(seek.value) / 100;
      audio.currentTime = pct * audio.duration;
    });

    // Volume
    if (vol) {
      vol.addEventListener("input", () => {
        audio.volume = Number(vol.value);
        if (audio.muted && audio.volume > 0) audio.muted = false;
        setMuteIcon(wrap, audio.muted);
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener("click", () => {
        audio.muted = !audio.muted;
        setMuteIcon(wrap, audio.muted);
      });
    }

    // Estado inicial
    setPlayIcon(wrap, !audio.paused && !audio.ended);
    setMuteIcon(wrap, audio.muted);
  });
})();