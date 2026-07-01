const eventDate = new Date('2026-07-18T18:00:00-03:00');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');

function updateCountdown(){
  const diff = eventDate - new Date();
  if(diff <= 0){
    daysEl.textContent = '00'; hoursEl.textContent = '00'; minutesEl.textContent = '00';
    return;
  }
  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  daysEl.textContent = String(days).padStart(2,'0');
  hoursEl.textContent = String(hours).padStart(2,'0');
  minutesEl.textContent = String(minutes).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 30000);

const audio = document.getElementById('audio');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
let triedAutoplay = false;
let unlocked = false;

function setMusicUI(){
  const playing = !audio.paused && !audio.muted;
  musicBtn.classList.toggle('playing', playing);
  musicIcon.textContent = playing ? '❚❚' : '♪';
}

// Estratégia: tentar tocar COM som primeiro. Se o navegador bloquear,
// cair para tocar MUDO automaticamente (isso quase sempre é permitido)
// e então desmutar assim que houver qualquer interação do usuário
// (toque na tela, scroll, etc.) — o que normalmente acontece em 1s.
async function playMusic(){
  audio.volume = 0.55;
  try{
    audio.muted = false;
    await audio.play();
    unlocked = true;
  }catch(e){
    try{
      audio.muted = true;
      await audio.play();
    }catch(e2){ /* navegador bloqueou totalmente; aguardar interação */ }
  }
  setMusicUI();
}

function unlockAudio(){
  if(unlocked) return;
  unlocked = true;
  audio.muted = false;
  if(audio.paused){ audio.play().catch(()=>{}); }
  setMusicUI();
}

function tryAutoplay(){
  if(!triedAutoplay){
    triedAutoplay = true;
    playMusic();
  }
}

document.addEventListener('DOMContentLoaded', tryAutoplay);
window.addEventListener('load', tryAutoplay);
window.addEventListener('pageshow', tryAutoplay);
setTimeout(tryAutoplay, 200);

// Qualquer interação do usuário (toque, clique, scroll, tecla) desmuta a música.
['pointerdown','touchstart','click','keydown','scroll'].forEach(evt => {
  document.addEventListener(evt, unlockAudio, { once:true, passive:true });
});

musicBtn.addEventListener('click', async (event) => {
  event.stopPropagation();
  unlocked = true;
  if(audio.paused){ await playMusic(); audio.muted = false; setMusicUI(); }
  else if(audio.muted){ audio.muted = false; setMusicUI(); }
  else{ audio.pause(); setMusicUI(); }
});

audio.addEventListener('play', setMusicUI);
audio.addEventListener('pause', setMusicUI);
audio.addEventListener('volumechange', setMusicUI);
