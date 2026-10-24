/**
 * Kichik Qaroqchi va Orol Xazinasi (Little Pirate's Treasure Hunt)
 * Ko'p bosqichli (Multi-Level) HTML5 Canvas 2D Platformer
 */

// ==========================================
// 1. OVOZ TIZIMI (Web Audio API Synthesizer)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Sakrash (Mario Springy Boing Jump)
  playJump() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(560, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }

  // Tanga
  playCoin() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch (e) {}
  }

  // Kalit
  playKey() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const startTime = this.ctx.currentTime + idx * 0.09;
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch (e) {}
  }

  // Zarba
  playHurt() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(190, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch (e) {}
  }

  // Dushmanni bosish (Stomp)
  playStomp() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch (e) {}
  }

  // Kalit yo'qligida sandiq xatosi
  playLocked() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130, this.ctx.currentTime);
      osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }

  // Bosqich tugashi / G'alaba
  playVictory() {
    if (this.muted || !this.ctx) return;
    try {
      const melody = [
        { f: 523.25, d: 0.15 },
        { f: 659.25, d: 0.15 },
        { f: 783.99, d: 0.15 },
        { f: 1046.50, d: 0.35 },
        { f: 880.00, d: 0.15 },
        { f: 1046.50, d: 0.55 }
      ];
      let t = this.ctx.currentTime;
      melody.forEach(item => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = item.f;
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + item.d);
        t += item.d * 0.9;
      });
    } catch (e) {}
  }

  // O'yin tugaganda
  playGameOver() {
    if (this.muted || !this.ctx) return;
    try {
      const melody = [440, 415.3, 392, 349.23];
      let t = this.ctx.currentTime;
      melody.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
        t += 0.25;
      });
    } catch (e) {}
  }

  // Qilich siltash (Sword Slash)
  playSword() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  // Qilich dushmanga tekkanda (Sword Hit)
  playSwordHit() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.32, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch (e) {}
  }

  // Qaroqchi qayta tirilganda (Revive partner)
  playRevive() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [440, 554.37, 659.25, 880];
      let t = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.2, t + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.08);
        osc.stop(t + idx * 0.08 + 0.25);
      });
    } catch (e) {}
  }

  // Prujina / Tramplin sakrashi (Boing spring)
  playSpring() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch (e) {}
  }

  // Qulovchi / Yemiriluvchi platforma tovushi (Crumble crack)
  playCrumble() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(45, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch (e) {}
  }

  // Quiz to'g'ri javob yangraganda (Happy fanfare)
  playQuizSuccess() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      let t = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.24, t + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.09 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.09);
        osc.stop(t + idx * 0.09 + 0.3);
      });
    } catch (e) {}
  }

  // Quiz noto'g'ri javob yoki vaqt tugaganda (Sad buzzer)
  playQuizFail() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [311.13, 261.63, 207.65]; // Eb4, C4, Ab3
      let t = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.28, t + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.14 + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.14);
        osc.stop(t + idx * 0.14 + 0.28);
      });
    } catch (e) {}
  }

  // Mario blokini bosh bilan urganda (Block Bump)
  playBlockBump() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.setValueAtTime(130, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  // Mario Super Qo'ziqorinini olganda (Powerup Fanfare)
  playPowerup() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [330, 392, 659, 523, 587, 784];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const startTime = this.ctx.currentTime + idx * 0.06;
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.16);
      });
    } catch (e) {}
  }

  // Mario Bosqich Bayrog'iga yetganda (Flagpole Fanfare)
  playFlagpole() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const startTime = this.ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch (e) {}
  }
}

// ==========================================
// 2. O'YIN SOZLAMALARI VA BOSHQARUV
// ==========================================
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const sound = new SoundFX();

// Virtual o'yin o'lchami (Fizika va obyektlar 960x540 koordinata tizimida)
const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;

// Render masshtabi
let renderScale = 1;
let displayWidth = GAME_WIDTH;
let displayHeight = GAME_HEIGHT;

let currentSkyTheme = 'tropical';
let currentSkyGrad = null;
let currentWaterGrad = null;

function updateSkyGradient(theme) {
  if (theme) currentSkyTheme = theme;
  try {
    currentSkyGrad = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    if (currentSkyTheme === 'tropical') {
      currentSkyGrad.addColorStop(0, '#1565c0');
      currentSkyGrad.addColorStop(0.35, '#1e88e5');
      currentSkyGrad.addColorStop(0.7, '#64b5f6');
      currentSkyGrad.addColorStop(1, '#e3f2fd');
    } else if (currentSkyTheme === 'sunset') {
      currentSkyGrad.addColorStop(0, '#240046');
      currentSkyGrad.addColorStop(0.35, '#5a189a');
      currentSkyGrad.addColorStop(0.65, '#9d0208');
      currentSkyGrad.addColorStop(0.85, '#ff5400');
      currentSkyGrad.addColorStop(1, '#ffbe0b');
    } else if (currentSkyTheme === 'lagoon') {
      currentSkyGrad.addColorStop(0, '#0077b6');
      currentSkyGrad.addColorStop(0.35, '#0096c7');
      currentSkyGrad.addColorStop(0.7, '#48cae4');
      currentSkyGrad.addColorStop(1, '#caf0f8');
    } else if (currentSkyTheme === 'canyon') {
      currentSkyGrad.addColorStop(0, '#d9480f');
      currentSkyGrad.addColorStop(0.4, '#f76707');
      currentSkyGrad.addColorStop(0.75, '#ff922b');
      currentSkyGrad.addColorStop(1, '#ffe8cc');
    } else if (currentSkyTheme === 'storm') {
      currentSkyGrad.addColorStop(0, '#0b090a');
      currentSkyGrad.addColorStop(0.35, '#161a1d');
      currentSkyGrad.addColorStop(0.7, '#22333b');
      currentSkyGrad.addColorStop(1, '#4f5d75');
    } else if (currentSkyTheme === 'frozen') {
      currentSkyGrad.addColorStop(0, '#03071e');
      currentSkyGrad.addColorStop(0.35, '#0a192f');
      currentSkyGrad.addColorStop(0.7, '#0d3b66');
      currentSkyGrad.addColorStop(1, '#a2d2ff');
    } else if (currentSkyTheme === 'volcano') {
      currentSkyGrad.addColorStop(0, '#03071e');
      currentSkyGrad.addColorStop(0.35, '#370617');
      currentSkyGrad.addColorStop(0.65, '#6a040f');
      currentSkyGrad.addColorStop(0.85, '#9d0208');
      currentSkyGrad.addColorStop(1, '#dc2f02');
    } else if (currentSkyTheme === 'mystic') {
      currentSkyGrad.addColorStop(0, '#10002b');
      currentSkyGrad.addColorStop(0.35, '#240046');
      currentSkyGrad.addColorStop(0.7, '#3c096c');
      currentSkyGrad.addColorStop(0.9, '#7209b7');
      currentSkyGrad.addColorStop(1, '#dec9e9');
    } else if (currentSkyTheme === 'sky') {
      currentSkyGrad.addColorStop(0, '#3a86ff');
      currentSkyGrad.addColorStop(0.35, '#ff006e');
      currentSkyGrad.addColorStop(0.7, '#fb5607');
      currentSkyGrad.addColorStop(1, '#ffbe0b');
    } else if (currentSkyTheme === 'citadel') {
      currentSkyGrad.addColorStop(0, '#0a0000');
      currentSkyGrad.addColorStop(0.35, '#2b0000');
      currentSkyGrad.addColorStop(0.7, '#660000');
      currentSkyGrad.addColorStop(1, '#cc0000');
    } else {
      currentSkyGrad.addColorStop(0, '#1565c0');
      currentSkyGrad.addColorStop(1, '#e3f2fd');
    }

    let seaColor = '#0077b6';
    let deepColor = '#023e8a';
    if (currentSkyTheme === 'sunset') { seaColor = '#3c096c'; deepColor = '#240046'; }
    else if (currentSkyTheme === 'lagoon') { seaColor = '#0096c7'; deepColor = '#03045e'; }
    else if (currentSkyTheme === 'canyon') { seaColor = '#862e9c'; deepColor = '#491217'; }
    else if (currentSkyTheme === 'storm') { seaColor = '#0a0908'; deepColor = '#1b263b'; }
    else if (currentSkyTheme === 'frozen') { seaColor = '#0077b6'; deepColor = '#03045e'; }
    else if (currentSkyTheme === 'volcano') { seaColor = '#9d0208'; deepColor = '#370617'; }
    else if (currentSkyTheme === 'mystic') { seaColor = '#240046'; deepColor = '#10002b'; }
    else if (currentSkyTheme === 'sky') { seaColor = '#fb5607'; deepColor = '#ffbe0b'; }
    else if (currentSkyTheme === 'citadel') { seaColor = '#2b0909'; deepColor = '#0d0000'; }

    currentWaterGrad = ctx.createLinearGradient(0, 460, 0, GAME_HEIGHT);
    currentWaterGrad.addColorStop(0, seaColor);
    currentWaterGrad.addColorStop(1, deepColor);
  } catch (e) {
    currentSkyGrad = '#1565c0';
    currentWaterGrad = '#0077b6';
  }
}

function resizeCanvas() {
  const winW = window.innerWidth || (document.documentElement ? document.documentElement.clientWidth : 960) || 960;
  const winH = window.innerHeight || (document.documentElement ? document.documentElement.clientHeight : 540) || 540;

  const isPortrait = winH > winW && winW <= 850;

  // 16:9 proporsiyani saqlash (ekranning cho'zilib ketmasligi uchun)
  let scale;
  if (isPortrait) {
    // Portret rejimida canvas yuqorida to'liq va aniq ko'rinadi, pastda kontrollerlar uchun qulay maydon qoladi
    scale = Math.max(0.25, Math.min(winW / GAME_WIDTH, (winH * 0.58) / GAME_HEIGHT));
  } else {
    // Gorizontal (Landscape) yoki desktopda 16:9 to'liq ekranni qamrab oladi
    scale = Math.max(0.25, Math.min(winW / GAME_WIDTH, winH / GAME_HEIGHT));
  }

  displayWidth = Math.round(GAME_WIDTH * scale);
  displayHeight = Math.round(GAME_HEIGHT * scale);

  // Ekranda ko'rinish o'lchami (GPU tomonidan silliq va o'ta tez masshtablanadi)
  canvas.style.width = `${displayWidth}px`;
  canvas.style.height = `${displayHeight}px`;

  // Ichki bufer doimiy 960x540 (barqaror 60-120 FPS tezlik)
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  renderScale = 1;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  updateSkyGradient();
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', resizeCanvas);

resizeCanvas();

// UI Elementlari
const levelDisplay = document.getElementById('level-display');
const p1LivesDisplay = document.getElementById('p1-lives-display');
const p2LivesDisplay = document.getElementById('p2-lives-display');
const p1CoinsDisplay = document.getElementById('p1-coins-display');
const p2CoinsDisplay = document.getElementById('p2-coins-display');
const p2Hud = document.getElementById('p2-hud');

const keyDisplay = document.getElementById('key-display');
const toastMessage = document.getElementById('toast-message');
const soundBtn = document.getElementById('sound-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const restartQuickBtn = document.getElementById('restart-quick-btn');

// Bosqichlar menyusi elementlari
const levelBtn = document.getElementById('level-btn');
const levelsMenuBtn = document.getElementById('levels-menu-btn');
const openLevelsBtn = document.getElementById('open-levels-btn');
const levelsScreen = document.getElementById('levels-screen');
const levelsGrid = document.getElementById('levels-grid');
const closeLevelsBtn = document.getElementById('close-levels-btn');

// Burger Menyu elementlari (Mobil)
const burgerMenuBtn = document.getElementById('burger-menu-btn');
const burgerMenuModal = document.getElementById('burger-menu-modal');
const burgerMenuBackdrop = document.getElementById('burger-menu-backdrop');
const closeBurgerBtn = document.getElementById('close-burger-btn');
const bmResumeBtn = document.getElementById('bm-resume-btn');
const bmLevelsBtn = document.getElementById('bm-levels-btn');
const bmSoundBtn = document.getElementById('bm-sound-btn');
const bmSoundIcon = document.getElementById('bm-sound-icon');
const bmSoundTitle = document.getElementById('bm-sound-title');
const bmSoundSwitch = document.getElementById('bm-sound-switch');
const bmFullscreenBtn = document.getElementById('bm-fullscreen-btn');
const bmFullscreenIcon = document.getElementById('bm-fullscreen-icon');
const bmFullscreenTitle = document.getElementById('bm-fullscreen-title');
const bmRestartBtn = document.getElementById('bm-restart-btn');
const bmModeBtn = document.getElementById('bm-mode-btn');
const bmModeIcon = document.getElementById('bm-mode-icon');
const bmModeTitle = document.getElementById('bm-mode-title');
const bmModeSub = document.getElementById('bm-mode-sub');
const bmHelpBtn = document.getElementById('bm-help-btn');

// Yordam (Help) modali elementlari
const helpModal = document.getElementById('help-modal');
const closeHelpBtn = document.getElementById('close-help-btn');
const helpOkBtn = document.getElementById('help-ok-btn');

// Mobil Boshqaruv elementlari
const mobileControls = document.getElementById('mobile-controls');
const touchDpad = document.querySelector('.touch-dpad');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const btnAttack = document.getElementById('btn-attack');
const btnJump = document.getElementById('btn-jump');

const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const mode2pBtn = document.getElementById('mode-2p-btn');
const mode1pBtn = document.getElementById('mode-1p-btn');
const p2ControlsCard = document.getElementById('p2-controls-card');

const gameOverScreen = document.getElementById('game-over-screen');
const gameOverP1Score = document.getElementById('game-over-p1-score');
const gameOverP2Score = document.getElementById('game-over-p2-score');
const gameOverP2Card = document.getElementById('game-over-p2-card');
const retryBtn = document.getElementById('retry-btn');

const levelCompleteScreen = document.getElementById('level-complete-screen');
const levelCompleteTitle = document.getElementById('level-complete-title');
const levelP1Stats = document.getElementById('level-p1-stats');
const levelP2Stats = document.getElementById('level-p2-stats');
const levelP2Card = document.getElementById('level-p2-card');
const levelCompleteWinner = document.getElementById('level-complete-winner');
const nextLevelBtn = document.getElementById('next-level-btn');

const victoryScreen = document.getElementById('victory-screen');
const victoryP1Score = document.getElementById('victory-p1-score');
const victoryP2Score = document.getElementById('victory-p2-score');
const victoryP2Card = document.getElementById('victory-p2-card');
const victoryChampionText = document.getElementById('victory-champion-text');
const playAgainBtn = document.getElementById('play-again-btn');

// PvP Jang / Duel elementlari
const duelScreen = document.getElementById('duel-screen');
const duelWinnerTitle = document.getElementById('duel-winner-title');
const duelWinnerSubtitle = document.getElementById('duel-winner-subtitle');
const duelP1Score = document.getElementById('duel-p1-score');
const duelP2Score = document.getElementById('duel-p2-score');
const duelBanner = document.getElementById('duel-banner');
const duelRematchBtn = document.getElementById('duel-rematch-btn');
const duelNextBtn = document.getElementById('duel-next-btn');

// Qutqaruvchi Fanlar Sinovi (Quiz) elementlari
const quizScreen = document.getElementById('quiz-screen');
const quizSubjectBadge = document.getElementById('quiz-subject-badge');
const quizTimerText = document.getElementById('quiz-timer-text');
const quizTimerProgress = document.getElementById('quiz-timer-progress');
const quizTitle = document.getElementById('quiz-title');
const quizFlagBox = document.getElementById('quiz-flag-box');
const quizQuestionText = document.getElementById('quiz-question-text');
const quizOptionsContainer = document.getElementById('quiz-options-container');
const quizFeedbackBox = document.getElementById('quiz-feedback-box');

// O'yin rejimi (2P yoki 1P)
let gameMode = '2P';

function setGameMode(mode) {
  gameMode = mode;
  if (mode === '2P') {
    if (mode2pBtn) mode2pBtn.classList.add('active');
    if (mode1pBtn) mode1pBtn.classList.remove('active');
    if (p2ControlsCard) p2ControlsCard.style.display = 'block';
    if (p2Hud) p2Hud.style.display = 'flex';
    if (bmModeTitle) bmModeTitle.textContent = 'Rejim: 2 O‘yinchi';
    if (bmModeSub) bmModeSub.textContent = 'Mario & Luigi (2P)';
    if (bmModeIcon) bmModeIcon.textContent = '🍄';
  } else {
    if (mode1pBtn) mode1pBtn.classList.add('active');
    if (mode2pBtn) mode2pBtn.classList.remove('active');
    if (p2ControlsCard) p2ControlsCard.style.display = 'none';
    if (p2Hud) p2Hud.style.display = 'none';
    if (bmModeTitle) bmModeTitle.textContent = 'Rejim: 1 O‘yinchi';
    if (bmModeSub) bmModeSub.textContent = 'Mario Yakkaxon (1P)';
    if (bmModeIcon) bmModeIcon.textContent = '🔴';
  }
  updateHUD();
}

if (mode2pBtn && mode1pBtn) {
  mode2pBtn.addEventListener('click', () => {
    sound.init();
    setGameMode('2P');
  });

  mode1pBtn.addEventListener('click', () => {
    sound.init();
    setGameMode('1P');
  });
}

// Klaviatura tugmalari holati (1-O'yinchi va 2-O'yinchi uchun alohida)
const keysP1 = { left: false, right: false, jump: false, attack: false };
const keysP2 = { left: false, right: false, jump: false, attack: false };

window.addEventListener('keydown', (e) => {
  sound.init();

  // 1-O'yinchi (Qizil qaroqchi): A, D, W, F / S, Space
  if (e.code === 'KeyA') keysP1.left = true;
  if (e.code === 'KeyD') keysP1.right = true;
  if (e.code === 'KeyW' || (gameMode === '2P' && e.code === 'Space')) {
    if (!keysP1.jump && gameState === 'PLAYING' && player1) {
      player1.tryJump();
    }
    keysP1.jump = true;
    if (e.code === 'Space') e.preventDefault();
  }
  if (e.code === 'KeyF' || e.code === 'KeyS') {
    if (!keysP1.attack && gameState === 'PLAYING' && player1) {
      player1.tryAttack();
    }
    keysP1.attack = true;
  }

  // 2-O'yinchi (Ko'k qaroqchi): Chap, O'ng, Yuqori, Pastki / Enter
  if (gameMode === '2P') {
    if (e.code === 'ArrowLeft') keysP2.left = true;
    if (e.code === 'ArrowRight') keysP2.right = true;
    if (e.code === 'ArrowUp') {
      if (!keysP2.jump && gameState === 'PLAYING' && player2) {
        player2.tryJump();
      }
      keysP2.jump = true;
      e.preventDefault();
    }
    if (e.code === 'ArrowDown' || e.code === 'Enter' || e.code === 'Numpad0') {
      if (!keysP2.attack && gameState === 'PLAYING' && player2) {
        player2.tryAttack();
      }
      keysP2.attack = true;
      e.preventDefault();
    }
  } else {
    // 1-O'yinchi rejimida Arrow va Space tugmalari ham P1 ga ishlaydi
    if (e.code === 'ArrowLeft') keysP1.left = true;
    if (e.code === 'ArrowRight') keysP1.right = true;
    if (e.code === 'ArrowUp' || e.code === 'Space') {
      if (!keysP1.jump && gameState === 'PLAYING' && player1) {
        player1.tryJump();
      }
      keysP1.jump = true;
      e.preventDefault();
    }
    if (e.code === 'ArrowDown' || e.code === 'Enter') {
      if (!keysP1.attack && gameState === 'PLAYING' && player1) {
        player1.tryAttack();
      }
      keysP1.attack = true;
      e.preventDefault();
    }
  }
});

window.addEventListener('keyup', (e) => {
  // 1-O'yinchi qo'yib yuborish
  if (e.code === 'KeyA') keysP1.left = false;
  if (e.code === 'KeyD') keysP1.right = false;
  if (e.code === 'KeyW' || e.code === 'Space') keysP1.jump = false;
  if (e.code === 'KeyF' || e.code === 'KeyS') keysP1.attack = false;

  // 2-O'yinchi yoki 1P qo'yib yuborish
  if (gameMode === '2P') {
    if (e.code === 'ArrowLeft') keysP2.left = false;
    if (e.code === 'ArrowRight') keysP2.right = false;
    if (e.code === 'ArrowUp') keysP2.jump = false;
    if (e.code === 'ArrowDown' || e.code === 'Enter' || e.code === 'Numpad0') keysP2.attack = false;
  } else {
    if (e.code === 'ArrowLeft') keysP1.left = false;
    if (e.code === 'ArrowRight') keysP1.right = false;
    if (e.code === 'ArrowUp') keysP1.jump = false;
    if (e.code === 'ArrowDown' || e.code === 'Enter') keysP1.attack = false;
  }
});

// ==========================================
// 2. MOBIL BOSHQARUV VA INTERFEYS MENEJERI
// ==========================================

function updateMobileControlsVisibility() {
  if (!mobileControls) return;
  const isPlaying = (gameState === 'PLAYING');
  const isAnyModalActive = document.querySelector('.screen-overlay.active, .burger-menu-overlay.active');
  if (isPlaying && !isAnyModalActive) {
    mobileControls.classList.remove('is-hidden');
  } else {
    mobileControls.classList.add('is-hidden');
  }
}

// Ergonomik Multi-Touch D-Pad va Harakat tugmalari
function setupMobileControls() {
  if (!mobileControls) return;

  // 1. D-Pad (Chapga va O'ngga harakatlanish)
  if (touchDpad && btnLeft && btnRight) {
    let dpadTouchId = null;

    const processDpadPosition = (clientX, clientY) => {
      const leftRect = btnLeft.getBoundingClientRect();
      const rightRect = btnRight.getBoundingClientRect();

      const isLeft = (clientX >= leftRect.left - 25 && clientX <= leftRect.right + 12 &&
                      clientY >= leftRect.top - 30 && clientY <= leftRect.bottom + 30);
      const isRight = (clientX >= rightRect.left - 12 && clientX <= rightRect.right + 25 &&
                       clientY >= rightRect.top - 30 && clientY <= rightRect.bottom + 30);

      if (isLeft) {
        keysP1.left = true;
        keysP1.right = false;
        btnLeft.classList.add('active');
        btnRight.classList.remove('active');
      } else if (isRight) {
        keysP1.right = true;
        keysP1.left = false;
        btnRight.classList.add('active');
        btnLeft.classList.remove('active');
      } else {
        keysP1.left = false;
        keysP1.right = false;
        btnLeft.classList.remove('active');
        btnRight.classList.remove('active');
      }
    };

    touchDpad.addEventListener('touchstart', (e) => {
      e.preventDefault();
      sound.init();
      if (dpadTouchId === null && e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        dpadTouchId = touch.identifier;
        processDpadPosition(touch.clientX, touch.clientY);
        if (navigator.vibrate) navigator.vibrate(10);
      }
    }, { passive: false });

    touchDpad.addEventListener('touchmove', (e) => {
      e.preventDefault();
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === dpadTouchId) {
          processDpadPosition(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
          break;
        }
      }
    }, { passive: false });

    const endDpadTouch = (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === dpadTouchId) {
          dpadTouchId = null;
          keysP1.left = false;
          keysP1.right = false;
          btnLeft.classList.remove('active');
          btnRight.classList.remove('active');
          break;
        }
      }
    };

    touchDpad.addEventListener('touchend', endDpadTouch, { passive: false });
    touchDpad.addEventListener('touchcancel', endDpadTouch, { passive: false });

    // PC / Mouse yordamida tekshirish imkoniyati
    btnLeft.addEventListener('mousedown', (e) => {
      e.preventDefault();
      sound.init();
      keysP1.left = true;
      btnLeft.classList.add('active');
    });
    btnLeft.addEventListener('mouseup', () => {
      keysP1.left = false;
      btnLeft.classList.remove('active');
    });
    btnLeft.addEventListener('mouseleave', () => {
      keysP1.left = false;
      btnLeft.classList.remove('active');
    });

    btnRight.addEventListener('mousedown', (e) => {
      e.preventDefault();
      sound.init();
      keysP1.right = true;
      btnRight.classList.add('active');
    });
    btnRight.addEventListener('mouseup', () => {
      keysP1.right = false;
      btnRight.classList.remove('active');
    });
    btnRight.addEventListener('mouseleave', () => {
      keysP1.right = false;
      btnRight.classList.remove('active');
    });
  }

  // 2. Action Buttons (Jump & Attack)
  const setupActionButton = (btn, actionType) => {
    if (!btn) return;
    let actionTouchId = null;

    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      sound.init();
      const touch = e.changedTouches[0];
      actionTouchId = touch.identifier;
      btn.classList.add('active');
      if (navigator.vibrate) navigator.vibrate(12);

      if (actionType === 'jump') {
        keysP1.jump = true;
        if (gameState === 'PLAYING' && player1) player1.tryJump();
      } else if (actionType === 'attack') {
        keysP1.attack = true;
        if (gameState === 'PLAYING' && player1) player1.tryAttack();
      }
    }, { passive: false });

    const endActionTouch = (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === actionTouchId) {
          actionTouchId = null;
          btn.classList.remove('active');
          if (actionType === 'jump') keysP1.jump = false;
          if (actionType === 'attack') keysP1.attack = false;
          break;
        }
      }
    };

    btn.addEventListener('touchend', endActionTouch, { passive: false });
    btn.addEventListener('touchcancel', endActionTouch, { passive: false });

    // PC / Mouse yordamida bosish
    btn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      sound.init();
      btn.classList.add('active');
      if (actionType === 'jump') {
        keysP1.jump = true;
        if (gameState === 'PLAYING' && player1) player1.tryJump();
      } else if (actionType === 'attack') {
        keysP1.attack = true;
        if (gameState === 'PLAYING' && player1) player1.tryAttack();
      }
    });
    const mouseRelease = () => {
      btn.classList.remove('active');
      if (actionType === 'jump') keysP1.jump = false;
      if (actionType === 'attack') keysP1.attack = false;
    };
    btn.addEventListener('mouseup', mouseRelease);
    btn.addEventListener('mouseleave', mouseRelease);
  };

  setupActionButton(btnJump, 'jump');
  setupActionButton(btnAttack, 'attack');
}

setupMobileControls();

// Portret/Landshaft orientatsiyasi
const rotateHint = document.getElementById('rotate-hint');
const dismissRotateHint = document.getElementById('dismiss-rotate-hint');
let rotateHintDismissed = false;
let rotateHintTimer = null;

function checkOrientation() {
  if (!rotateHint) return;
  const isPortrait = window.innerHeight > window.innerWidth && window.innerWidth <= 850;
  if (isPortrait && !rotateHintDismissed) {
    rotateHint.classList.add('show-hint');
    if (rotateHintTimer) clearTimeout(rotateHintTimer);
    rotateHintTimer = setTimeout(() => {
      rotateHint.classList.remove('show-hint');
    }, 5000);
  } else {
    rotateHint.classList.remove('show-hint');
  }
}

if (dismissRotateHint) {
  dismissRotateHint.addEventListener('click', () => {
    rotateHintDismissed = true;
    if (rotateHintTimer) clearTimeout(rotateHintTimer);
    rotateHint.classList.remove('show-hint');
  });
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
checkOrientation();

// Ovoz holati va UI sinxronizatsiyasi
function updateSoundUI() {
  const isMuted = sound.muted;
  if (soundBtn) soundBtn.textContent = isMuted ? '🔇' : '🔊';
  if (bmSoundIcon) bmSoundIcon.textContent = isMuted ? '🔇' : '🔊';
  if (bmSoundTitle) bmSoundTitle.textContent = isMuted ? 'Ovoz: O‘chirilgan' : 'Ovoz: Yoqilgan';
  if (bmSoundSwitch) {
    if (isMuted) bmSoundSwitch.classList.remove('on');
    else bmSoundSwitch.classList.add('on');
  }
}

function toggleSound() {
  sound.init();
  sound.toggleMute();
  updateSoundUI();
}

if (soundBtn) soundBtn.addEventListener('click', toggleSound);

// To'liq ekran rejimi va UI sinxronizatsiyasi
function updateFullscreenUI() {
  const isFs = !!document.fullscreenElement;
  if (fullscreenBtn) fullscreenBtn.textContent = isFs ? '✖' : '⛶';
  if (bmFullscreenIcon) bmFullscreenIcon.textContent = isFs ? '✖' : '⛶';
  if (bmFullscreenTitle) bmFullscreenTitle.textContent = isFs ? 'Oddiy Ekran' : 'To‘liq Ekran';
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }
}

if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', updateFullscreenUI);

if (restartQuickBtn) {
  restartQuickBtn.addEventListener('click', () => {
    sound.init();
    startNewGame();
  });
}

// ==========================================
// BURGER MENYU VA MODALLAR BOSHQARUVI
// ==========================================
let wasPlayingBeforeMenu = false;

function openBurgerMenu() {
  sound.init();
  updateSoundUI();
  updateFullscreenUI();
  if (gameMode === '2P') {
    if (bmModeTitle) bmModeTitle.textContent = 'Rejim: 2 O‘yinchi';
    if (bmModeSub) bmModeSub.textContent = 'Mario & Luigi (2P)';
    if (bmModeIcon) bmModeIcon.textContent = '🍄';
  } else {
    if (bmModeTitle) bmModeTitle.textContent = 'Rejim: 1 O‘yinchi';
    if (bmModeSub) bmModeSub.textContent = 'Mario Yakkaxon (1P)';
    if (bmModeIcon) bmModeIcon.textContent = '🔴';
  }

  if (gameState === 'PLAYING') {
    wasPlayingBeforeMenu = true;
    gameState = 'PAUSED';
  } else {
    wasPlayingBeforeMenu = false;
  }

  if (burgerMenuModal) {
    burgerMenuModal.classList.add('active');
  }
  updateMobileControlsVisibility();
}

function closeBurgerMenu() {
  if (burgerMenuModal) {
    burgerMenuModal.classList.remove('active');
  }
  if (wasPlayingBeforeMenu) {
    gameState = 'PLAYING';
    wasPlayingBeforeMenu = false;
  }
  updateMobileControlsVisibility();
}

if (burgerMenuBtn) burgerMenuBtn.addEventListener('click', openBurgerMenu);
if (closeBurgerBtn) closeBurgerBtn.addEventListener('click', closeBurgerMenu);
if (burgerMenuBackdrop) burgerMenuBackdrop.addEventListener('click', closeBurgerMenu);
if (bmResumeBtn) bmResumeBtn.addEventListener('click', closeBurgerMenu);

if (bmLevelsBtn) {
  bmLevelsBtn.addEventListener('click', () => {
    closeBurgerMenu();
    openLevelsModal();
  });
}

if (bmSoundBtn) {
  bmSoundBtn.addEventListener('click', () => {
    toggleSound();
  });
}

if (bmFullscreenBtn) {
  bmFullscreenBtn.addEventListener('click', () => {
    toggleFullscreen();
  });
}

if (bmRestartBtn) {
  bmRestartBtn.addEventListener('click', () => {
    closeBurgerMenu();
    sound.init();
    startNewGame();
  });
}

if (bmModeBtn) {
  bmModeBtn.addEventListener('click', () => {
    sound.init();
    const newMode = (gameMode === '2P') ? '1P' : '2P';
    setGameMode(newMode);
    if (newMode === '2P') {
      bmModeTitle.textContent = 'Rejim: 2 O‘yinchi';
      bmModeSub.textContent = 'Mario & Luigi (2P)';
      bmModeIcon.textContent = '🍄';
    } else {
      bmModeTitle.textContent = 'Rejim: 1 O‘yinchi';
      bmModeSub.textContent = 'Mario Yakkaxon (1P)';
      bmModeIcon.textContent = '🔴';
    }
  });
}

// Boshqaruv va Qoidalar modali
function openHelpModal() {
  sound.init();
  closeBurgerMenu();
  if (helpModal) {
    helpModal.classList.add('active');
  }
  updateMobileControlsVisibility();
}

function closeHelpModal() {
  if (helpModal) {
    helpModal.classList.remove('active');
  }
  updateMobileControlsVisibility();
}

if (bmHelpBtn) bmHelpBtn.addEventListener('click', openHelpModal);
if (closeHelpBtn) closeHelpBtn.addEventListener('click', closeHelpModal);
if (helpOkBtn) helpOkBtn.addEventListener('click', closeHelpModal);

// Mobil brauzerlarda noxush imo-ishoralarni (pinch-zoom, scroll) to'xtatish
document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('gesturechange', (e) => e.preventDefault());
document.addEventListener('gestureend', (e) => e.preventDefault());

let toastTimeout = null;
function showToast(text) {
  toastMessage.textContent = text;
  toastMessage.classList.add('show');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastMessage.classList.remove('show');
  }, 2200);
}

// ==========================================
// 3. O'YIN DUNYOSI VA MODELLAR
// ==========================================
const WORLD_WIDTH = 3000;
let gameState = 'START';
let currentLevelIndex = 0;
let cameraX = 0;
let toastChestShake = 0;

let particles = [];
let floatingTexts = [];

class Particle {
  constructor(x, y, vx, vy, color, size, life, isGravity = true) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.life = life;
    this.maxLife = life;
    this.isGravity = isGravity;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.isGravity) this.vy += 0.2;
    this.life--;
  }

  draw(ctx, camX) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x - camX, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class FloatingText {
  constructor(x, y, text, color = '#ffd166') {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.life = 45;
  }

  update() {
    this.y -= 0.8;
    this.life--;
  }

  draw(ctx, camX) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life / 45);
    ctx.font = 'bold 18px "Fredoka One", cursive';
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.strokeText(this.text, this.x - camX, this.y);
    ctx.fillText(this.text, this.x - camX, this.y);
    ctx.restore();
  }
}

function spawnParticles(x, y, count, color, speed = 3) {
  if (particles.length > 30) return;
  const realCount = Math.min(count, 8);
  for (let i = 0; i < realCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spd = (Math.random() * 0.8 + 0.2) * speed;
    particles.push(new Particle(
      x, y,
      Math.cos(angle) * spd,
      Math.sin(angle) * spd - 1.5,
      color,
      Math.random() * 3 + 2,
      Math.floor(Math.random() * 16 + 14)
    ));
  }
}

// ==========================================
// 4. HARAKATLANUVCHI PLATFORMA VA TIKANLAR
// ==========================================
class MovingPlatform {
  constructor(x, y, width, height, moveX, moveY, speed) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.width = width;
    this.height = height;
    this.moveX = moveX;
    this.moveY = moveY;
    this.speed = speed;
    this.progress = 0;
    this.dx = 0;
    this.dy = 0;
  }

  update() {
    this.progress += this.speed;
    const oldX = this.x;
    const oldY = this.y;

    const offsetFactor = Math.sin(this.progress);
    this.x = this.startX + this.moveX * offsetFactor;
    this.y = this.startY + this.moveY * offsetFactor;

    this.dx = this.x - oldX;
    this.dy = this.y - oldY;
  }

  draw(ctx, camX) {
    const drawX = this.x - camX;
    if (drawX + this.width < -50 || drawX > GAME_WIDTH + 50) return;

    // Yog'och harakatlanuvchi sol / tosh
    ctx.fillStyle = '#b08968';
    roundRect(ctx, drawX, this.y, this.width, this.height, 6, true, false);

    // Oltin metal mustahkamlagichlar
    ctx.fillStyle = '#e0a96d';
    ctx.fillRect(drawX + 6, this.y + 2, 6, this.height - 4);
    ctx.fillRect(drawX + this.width - 12, this.y + 2, 6, this.height - 4);

    // Zanjir yoki tebranish nishonasi
    ctx.strokeStyle = '#7f5539';
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, this.y, this.width, this.height);
  }
}

class Spike {
  constructor(x, y, width = 36, height = 18) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  update() {
    getActivePlayers().forEach(p => {
      if (p.alive && checkAABB(p, this)) {
        p.takeDamage(this.x + this.width / 2);
      }
    });
  }

  draw(ctx, camX) {
    const drawX = this.x - camX;
    if (drawX + this.width < -50 || drawX > GAME_WIDTH + 50) return;

    ctx.fillStyle = '#adb5bd';
    ctx.strokeStyle = '#495057';
    ctx.lineWidth = 1.5;

    // 3 ta o'tkir uchburchak tikan
    const count = Math.max(2, Math.floor(this.width / 14));
    const step = this.width / count;

    for (let i = 0; i < count; i++) {
      ctx.beginPath();
      ctx.moveTo(drawX + i * step, this.y + this.height);
      ctx.lineTo(drawX + (i + 0.5) * step, this.y);
      ctx.lineTo(drawX + (i + 1) * step, this.y + this.height);
      ctx.fill();
      ctx.stroke();

      // Qonli/zanglagan qizil uchi
      ctx.fillStyle = '#c1121f';
      ctx.beginPath();
      ctx.moveTo(drawX + (i + 0.3) * step, this.y + 6);
      ctx.lineTo(drawX + (i + 0.5) * step, this.y);
      ctx.lineTo(drawX + (i + 0.7) * step, this.y + 6);
      ctx.fill();
      ctx.fillStyle = '#adb5bd';
    }
  }
}

// ==========================================
// 4.1. SAKRASH TRAMPLINI (JUMP PAD / BOUNCY BARREL)
// ==========================================
class JumpPad {
  constructor(x, y, boost = -16.5) {
    this.x = x;
    this.y = y;
    this.width = 44;
    this.height = 28;
    this.boost = boost;
    this.compression = 0;
  }

  bounce() {
    this.compression = 12;
  }

  update() {
    if (this.compression > 0) {
      this.compression *= 0.82;
      if (this.compression < 0.2) this.compression = 0;
    }
  }

  draw(ctx, camX) {
    const drawX = this.x - camX;
    if (drawX + this.width < -50 || drawX > GAME_WIDTH + 50) return;

    ctx.save();
    const curH = this.height - this.compression;
    const curY = this.y + this.compression;

    // Yog'och bochka / taglik
    ctx.fillStyle = '#7f4f24';
    roundRect(ctx, drawX, curY + 6, this.width, curH - 6, 6, true, false);

    // Oltin prujina / qistirma
    ctx.fillStyle = '#f9c74f';
    ctx.fillRect(drawX + 4, curY + 1, this.width - 8, 5);

    // Prujina chiziqlari (spirallari)
    ctx.strokeStyle = '#d48b10';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const coils = 3;
    const step = (this.width - 12) / coils;
    for (let c = 0; c < coils; c++) {
      const cx = drawX + 6 + c * step;
      ctx.moveTo(cx, curY + 5);
      ctx.lineTo(cx + step / 2, curY + 1);
      ctx.lineTo(cx + step, curY + 5);
    }
    ctx.stroke();

    // Sakrash ko'rsatgichi: Yorqin strelka (▲)
    ctx.fillStyle = '#ffbe0b';
    ctx.beginPath();
    ctx.moveTo(drawX + this.width / 2, curY + 7);
    ctx.lineTo(drawX + this.width / 2 - 8, curY + 17);
    ctx.lineTo(drawX + this.width / 2 + 8, curY + 17);
    ctx.fill();

    // Chegara
    ctx.strokeStyle = '#43281c';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(drawX, curY + 6, this.width, curH - 6);

    ctx.restore();
  }
}

// ==========================================
// 4.2. YEMIRILUVCHI / QULOVCHI PLATFORMA (FALLING PLATFORM)
// ==========================================
class FallingPlatform {
  constructor(x, y, width = 90, height = 22) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.width = width;
    this.height = height;
    this.state = 'idle'; // 'idle', 'shaking', 'falling', 'respawning'
    this.shakeTimer = 0;
    this.shakeOffset = 0;
    this.vy = 0;
    this.respawnTimer = 0;
  }

  trigger() {
    if (this.state === 'idle') {
      this.state = 'shaking';
      this.shakeTimer = 26; // ~0.43s
      sound.playCrumble();
      spawnParticles(this.x + this.width / 2, this.y + this.height, 4, '#8d6e63', 1.5);
    }
  }

  update() {
    if (this.state === 'shaking') {
      this.shakeTimer--;
      this.shakeOffset = (Math.random() - 0.5) * 4;
      if (Math.random() < 0.25) {
        spawnParticles(this.x + Math.random() * this.width, this.y + this.height, 1, '#b08968', 1);
      }
      if (this.shakeTimer <= 0) {
        this.state = 'falling';
        this.vy = 2;
      }
    } else if (this.state === 'falling') {
      this.vy += 0.45;
      this.y += this.vy;
      if (this.y > 600) {
        this.state = 'respawning';
        this.respawnTimer = 150; // ~2.5s
      }
    } else if (this.state === 'respawning') {
      this.respawnTimer--;
      if (this.respawnTimer <= 0) {
        this.x = this.startX;
        this.y = this.startY;
        this.vy = 0;
        this.shakeOffset = 0;
        this.state = 'idle';
        spawnParticles(this.x + this.width / 2, this.y + this.height / 2, 8, '#e9d8a6', 2);
      }
    }
  }

  draw(ctx, camX) {
    if (this.state === 'respawning') return;
    const drawX = (this.x + (this.state === 'shaking' ? this.shakeOffset : 0)) - camX;
    if (drawX + this.width < -50 || drawX > GAME_WIDTH + 50) return;

    ctx.save();
    // Cracked decaying stone / wood plank
    ctx.fillStyle = this.state === 'shaking' ? '#c9a227' : '#9c6644';
    roundRect(ctx, drawX, this.y, this.width, this.height, 5, true, false);

    // Crack lines
    ctx.strokeStyle = '#4a2810';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(drawX + this.width * 0.3, this.y);
    ctx.lineTo(drawX + this.width * 0.35, this.y + 8);
    ctx.lineTo(drawX + this.width * 0.32, this.y + this.height);
    ctx.moveTo(drawX + this.width * 0.7, this.y);
    ctx.lineTo(drawX + this.width * 0.65, this.y + 11);
    ctx.lineTo(drawX + this.width * 0.72, this.y + this.height);
    ctx.stroke();

    // Warning highlight on edges
    ctx.strokeStyle = this.state === 'shaking' ? '#ff4d6d' : '#ddb892';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(drawX, this.y, this.width, this.height);
    ctx.restore();
  }
}

// ==========================================
// 4.3. MARIO ? SIRLI BLOKLARI (QUESTION BLOCKS)
// ==========================================
class QuestionBlock {
  constructor(x, y, content = 'coin') {
    this.x = x;
    this.y = y;
    this.width = 36;
    this.height = 36;
    this.content = content; // 'coin', 'mushroom'
    this.used = false;
    this.bumpY = 0;
    this.coinAnim = 0;
  }

  bump(player) {
    if (this.bumpY !== 0) return;
    this.bumpY = -9;
    sound.playBlockBump();

    if (!this.used) {
      this.used = true;
      if (this.content === 'mushroom') {
        sound.playPowerup();
        superMushrooms.push(new SuperMushroom(this.x + 4, this.y - 28));
        floatingTexts.push(new FloatingText(this.x + 18, this.y - 12, '🍄 SUPER MUSHROOM!', '#e52521'));
      } else {
        this.coinAnim = 1.0;
        sound.playCoin();
        player.coins += 1;
        updateHUD();
        floatingTexts.push(new FloatingText(this.x + 18, this.y - 12, '+10 🪙', '#fcc419'));
        spawnParticles(this.x + 18, this.y, 8, '#fcc419', 3);
      }
    }
  }

  update() {
    if (this.bumpY < 0) {
      this.bumpY += 1.6;
      if (this.bumpY > 0) this.bumpY = 0;
    }
    if (this.coinAnim > 0) {
      this.coinAnim -= 0.05;
      if (this.coinAnim < 0) this.coinAnim = 0;
    }
  }

  draw(ctx, camX) {
    const drawX = this.x - camX;
    const drawY = this.y + this.bumpY;
    if (drawX + this.width < -50 || drawX > GAME_WIDTH + 50) return;

    ctx.save();
    if (!this.used) {
      ctx.fillStyle = '#f59e0b';
      roundRect(ctx, drawX, drawY, this.width, this.height, 4, true, false);

      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(drawX + 3, drawY + 3, this.width - 6, this.height - 6);

      ctx.fillStyle = '#78350f';
      ctx.fillRect(drawX + 4, drawY + 4, 3, 3);
      ctx.fillRect(drawX + this.width - 7, drawY + 4, 3, 3);
      ctx.fillRect(drawX + 4, drawY + this.height - 7, 3, 3);
      ctx.fillRect(drawX + this.width - 7, drawY + this.height - 7, 3, 3);

      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 2;
      ctx.strokeRect(drawX, drawY, this.width, this.height);

      ctx.fillStyle = '#78350f';
      ctx.font = 'bold 22px "Fredoka One", cursive';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('?', drawX + this.width / 2 + 1, drawY + this.height / 2 + 2);

      ctx.fillStyle = '#ffffff';
      ctx.fillText('?', drawX + this.width / 2, drawY + this.height / 2 + 1);
    } else {
      ctx.fillStyle = '#785b46';
      roundRect(ctx, drawX, drawY, this.width, this.height, 4, true, false);

      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(drawX + 3, drawY + 3, this.width - 6, this.height - 6);

      ctx.fillStyle = '#4e342e';
      ctx.fillRect(drawX + 4, drawY + 4, 3, 3);
      ctx.fillRect(drawX + this.width - 7, drawY + 4, 3, 3);
      ctx.fillRect(drawX + 4, drawY + this.height - 7, 3, 3);
      ctx.fillRect(drawX + this.width - 7, drawY + this.height - 7, 3, 3);

      ctx.strokeStyle = '#3e2723';
      ctx.lineWidth = 2;
      ctx.strokeRect(drawX, drawY, this.width, this.height);
    }

    if (this.coinAnim > 0) {
      const coinY = drawY - (1 - this.coinAnim) * 42;
      ctx.fillStyle = '#fcc419';
      ctx.beginPath();
      ctx.ellipse(drawX + this.width / 2, coinY, 8 * Math.cos(Date.now() * 0.02), 11, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.restore();
  }
}

// ==========================================
// 4.4. MARIO G'ISHT BLOKLARI (BRICK BLOCKS)
// ==========================================
class BrickBlock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 36;
    this.height = 36;
    this.bumpY = 0;
  }

  bump(player) {
    if (this.bumpY !== 0) return;
    this.bumpY = -7;
    sound.playBlockBump();
    spawnParticles(this.x + 18, this.y, 5, '#c68a4c', 2.2);
  }

  update() {
    if (this.bumpY < 0) {
      this.bumpY += 1.6;
      if (this.bumpY > 0) this.bumpY = 0;
    }
  }

  draw(ctx, camX) {
    const drawX = this.x - camX;
    const drawY = this.y + this.bumpY;
    if (drawX + this.width < -50 || drawX > GAME_WIDTH + 50) return;

    ctx.save();
    ctx.fillStyle = '#b45309';
    ctx.fillRect(drawX, drawY, this.width, this.height);

    ctx.fillStyle = '#d97706';
    ctx.fillRect(drawX + 1, drawY + 1, this.width - 2, this.height - 2);

    ctx.fillStyle = '#451a03';
    ctx.fillRect(drawX, drawY + 17, this.width, 2);
    ctx.fillRect(drawX + 17, drawY, 2, 17);
    ctx.fillRect(drawX + 8, drawY + 18, 2, 18);
    ctx.fillRect(drawX + 26, drawY + 18, 2, 18);

    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(drawX, drawY, this.width, this.height);
    ctx.restore();
  }
}

// ==========================================
// 4.5. MARIO YASHIL QUVURLARI (WARP PIPES)
// ==========================================
class WarpPipe {
  constructor(x, y, height = 75, width = 54) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = 'pipe';
  }

  draw(ctx, camX) {
    const drawX = this.x - camX;
    if (drawX + this.width < -50 || drawX > GAME_WIDTH + 50) return;

    ctx.save();
    const rimH = 22;
    const rimOverhang = 4;

    const bodyX = drawX + rimOverhang;
    const bodyW = this.width - rimOverhang * 2;
    const bodyY = this.y + rimH;
    const bodyH = this.height - rimH;

    const bodyGrad = ctx.createLinearGradient(bodyX, bodyY, bodyX + bodyW, bodyY);
    bodyGrad.addColorStop(0, '#15803d');
    bodyGrad.addColorStop(0.3, '#22c55e');
    bodyGrad.addColorStop(0.65, '#4ade80');
    bodyGrad.addColorStop(0.85, '#16a34a');
    bodyGrad.addColorStop(1, '#14532d');

    ctx.fillStyle = bodyGrad;
    ctx.fillRect(bodyX, bodyY, bodyW, bodyH);

    ctx.strokeStyle = '#052e16';
    ctx.lineWidth = 2;
    ctx.strokeRect(bodyX, bodyY, bodyW, bodyH);

    const rimGrad = ctx.createLinearGradient(drawX, this.y, drawX + this.width, this.y);
    rimGrad.addColorStop(0, '#15803d');
    rimGrad.addColorStop(0.25, '#22c55e');
    rimGrad.addColorStop(0.6, '#4ade80');
    rimGrad.addColorStop(0.85, '#16a34a');
    rimGrad.addColorStop(1, '#052e16');

    ctx.fillStyle = rimGrad;
    roundRect(ctx, drawX, this.y, this.width, rimH, 3, true, false);

    ctx.strokeStyle = '#052e16';
    ctx.lineWidth = 2.5;
    roundRect(ctx, drawX, this.y, this.width, rimH, 3, false, true);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(drawX + 4, this.y + 2, this.width - 8, 4);

    ctx.restore();
  }
}

// ==========================================
// 4.6. SUPER MARIO QO'ZIQORINI (SUPER MUSHROOM)
// ==========================================
class SuperMushroom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 28;
    this.height = 28;
    this.vx = 2.2;
    this.vy = 0;
    this.collected = false;
  }

  update() {
    if (this.collected) return;
    this.vy += 0.45;
    if (this.vy > 9) this.vy = 9;
    this.x += this.vx;
    this.y += this.vy;

    for (const p of platforms) {
      if (checkAABB(this, p)) {
        if (this.vy > 0 && this.y + this.height - this.vy <= p.y + 14) {
          this.y = p.y - this.height;
          this.vy = 0;
        }
      }
    }

    // Bloklar ustida yurish
    const solids = [...questionBlocks, ...brickBlocks];
    for (const b of solids) {
      if (checkAABB(this, b)) {
        if (this.vy > 0 && this.y + this.height - this.vy <= b.y + 12) {
          this.y = b.y - this.height;
          this.vy = 0;
        } else {
          this.vx = -this.vx;
        }
      }
    }

    // Yashil quvurlarga urilganda qayrilish
    for (const pipe of warpPipes) {
      if (checkAABB(this, pipe)) {
        if (this.vx > 0) {
          this.x = pipe.x - this.width;
          this.vx = -Math.abs(this.vx);
        } else if (this.vx < 0) {
          this.x = pipe.x + pipe.width;
          this.vx = Math.abs(this.vx);
        }
      }
    }

    if (this.y > 520) {
      this.collected = true;
      return;
    }

    const activePlayers = getActivePlayers();
    for (const p of activePlayers) {
      if (checkAABB(p, this)) {
        this.collected = true;
        sound.playPowerup();
        if (p.lives < 3) p.lives++;
        p.coins += 5;
        updateHUD();
        spawnParticles(this.x + 14, this.y + 14, 16, '#e52521', 4);
        floatingTexts.push(new FloatingText(this.x + 14, this.y - 12, '🍄 SUPER MARIO! +1 ❤️', '#e52521'));
        break;
      }
    }
  }

  draw(ctx, camX) {
    if (this.collected) return;
    const drawX = this.x - camX;
    const drawY = this.y;
    if (drawX + this.width < -50 || drawX > GAME_WIDTH + 50) return;

    ctx.save();
    ctx.fillStyle = '#e52521';
    ctx.beginPath();
    ctx.arc(drawX + 14, drawY + 12, 13, Math.PI, 0, false);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(drawX + 14, drawY + 6, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(drawX + 5, drawY + 10, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(drawX + 23, drawY + 10, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(drawX + 6, drawY + 12, 16, 12);

    ctx.fillStyle = '#000000';
    ctx.fillRect(drawX + 9, drawY + 15, 2.5, 5);
    ctx.fillRect(drawX + 16, drawY + 15, 2.5, 5);

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(drawX + 6, drawY + 12, 16, 12);
    ctx.restore();
  }
}

// ==========================================
// 5. BOSH QAHRAMONLAR: MARIO VA LUIGI (P1 & P2)
// ==========================================
class PiratePlayer {
  constructor(id, name, theme, startX, startY) {
    this.id = id; // 1 yoki 2
    this.name = name;
    this.theme = theme; // 'red' yoki 'blue'
    this.startX = startX;
    this.startY = startY;

    this.x = startX;
    this.y = startY;
    this.width = 36;
    this.height = 48;
    this.vx = 0;
    this.vy = 0;
    this.speed = 4.2;
    this.jumpStrength = -12.2;
    this.gravity = 0.52;
    this.grounded = false;
    this.facingRight = id === 1;

    this.walkCycle = 0;
    this.isWalking = false;
    this.invulnerableTime = 0;
    this.lives = 3;
    this.coins = 0;
    this.hasKey = false;
    this.alive = true;
    this.respawnTimer = 0;

    this.respawnX = startX;
    this.respawnY = startY;

    // Qilich hujumi holati
    this.isAttacking = false;
    this.attackTimer = 0;
    this.attackCooldown = 0;

    // Platforming mayinligi (Game feel)
    this.coyoteTime = 0;
    this.jumpBuffer = 0;
    this.landingSquash = 0;
    this.blinkTimer = Math.floor(Math.random() * 80);
    this.blinking = false;
  }

  resetForNewGame(startX = 80, startY = 360) {
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
    this.vx = 0;
    this.vy = 0;
    this.lives = 3;
    this.coins = 0;
    this.hasKey = false;
    this.alive = true;
    this.respawnTimer = 0;
    this.invulnerableTime = 0;
    this.grounded = false;
    this.facingRight = this.id === 1;
    this.respawnX = startX;
    this.respawnY = startY;
    this.isAttacking = false;
    this.attackTimer = 0;
    this.attackCooldown = 0;
    this.coyoteTime = 0;
    this.jumpBuffer = 0;
    this.landingSquash = 0;
  }

  resetForLevel(startX = 80, startY = 360) {
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
    this.vx = 0;
    this.vy = 0;
    this.hasKey = false;
    this.alive = true;
    this.respawnTimer = 0;
    this.invulnerableTime = 0;
    this.grounded = false;
    this.facingRight = this.id === 1;
    this.respawnX = startX;
    this.respawnY = startY;
    this.isAttacking = false;
    this.attackTimer = 0;
    this.attackCooldown = 0;
    this.coyoteTime = 0;
    this.jumpBuffer = 0;
    this.landingSquash = 0;
  }

  tryJump() {
    if (!this.alive) return;
    if (this.grounded || this.coyoteTime > 0) {
      this.vy = this.jumpStrength;
      this.grounded = false;
      this.coyoteTime = 0;
      sound.playJump();
      spawnParticles(this.x + this.width / 2, this.y + this.height, 6, '#e9d8a6', 2.2);
    } else {
      this.jumpBuffer = 8;
    }
  }

  tryAttack() {
    if (!this.alive || this.attackCooldown > 0) return;
    this.isAttacking = true;
    this.attackTimer = 16;
    this.attackCooldown = 22;
    sound.playSword();
    spawnParticles(
      this.facingRight ? this.x + this.width + 10 : this.x - 10,
      this.y + this.height / 2,
      4,
      this.theme === 'red' ? '#ffbe0b' : '#00b4d8',
      3
    );
  }

  takeDamage(sourceX) {
    if (this.invulnerableTime > 0 || !this.alive) return;
    this.lives--;
    this.invulnerableTime = 90;
    sound.playHurt();
    updateHUD();

    const dir = this.x < sourceX ? -1 : 1;
    this.vx = dir * 6;
    this.vy = -6;
    this.grounded = false;

    spawnParticles(this.x + this.width / 2, this.y + this.height / 2, 14, '#e63946', 4);

    if (this.lives <= 0) {
      this.handleDefeat();
    }
  }

  handleDefeat() {
    this.alive = false;
    floatingTexts.push(new FloatingText(this.x + this.width / 2, this.y - 10, `💀 ${this.name} mahv etildi!`, '#e63946'));

    if (gameMode === '2P') {
      const winner = this.id === 1 ? player2 : player1;
      triggerQuizRescue(this, winner);
    } else {
      triggerQuizRescue(this);
    }
  }

  reviveAtPartner() {
    const partner = this.id === 1 ? player2 : player1;
    if (partner && partner.alive) {
      this.x = partner.x;
      this.y = partner.y - 20;
    } else {
      this.x = this.respawnX;
      this.y = this.respawnY;
    }
    this.vx = 0;
    this.vy = 0;
    this.lives = 1;
    this.alive = true;
    this.invulnerableTime = 120;
    this.respawnTimer = 0;
    sound.playRevive();
    spawnParticles(this.x + this.width / 2, this.y + this.height / 2, 25, this.theme === 'red' ? '#ff4d6d' : '#00b4d8', 4);
    floatingTexts.push(new FloatingText(this.x + this.width / 2, this.y - 25, `⚓ ${this.name} safga qaytdi!`, '#4ade80'));
    showToast(`⚓ ${this.name} jangga qaytdi!`);
    updateHUD();
  }

  respawn() {
    const partner = this.id === 1 ? player2 : player1;
    if (gameMode === '2P' && partner && partner.alive) {
      this.x = partner.x;
      this.y = partner.y - 10;
    } else {
      this.x = this.respawnX;
      this.y = this.respawnY;
    }
    this.vx = 0;
    this.vy = 0;
    this.invulnerableTime = 80;
  }

  update() {
    // Agar qaroqchi vaqtincha yiqilgan bo'lsa
    if (!this.alive) {
      if (this.respawnTimer > 0) {
        this.respawnTimer--;
        const partner = this.id === 1 ? player2 : player1;
        if (partner && partner.alive) {
          this.x += (partner.x - this.x) * 0.08;
          this.y += ((partner.y - 30) - this.y) * 0.08;
        }
        if (this.respawnTimer === 0) {
          this.reviveAtPartner();
        }
      }
      return;
    }

    if (this.invulnerableTime > 0) this.invulnerableTime--;
    if (this.attackTimer > 0) this.attackTimer--;
    if (this.attackCooldown > 0) this.attackCooldown--;
    if (this.jumpBuffer > 0) this.jumpBuffer--;
    if (this.coyoteTime > 0) this.coyoteTime--;
    if (this.landingSquash > 0) this.landingSquash--;

    // Ko'z qisish animatsiyasi
    this.blinkTimer--;
    if (this.blinkTimer <= 0) {
      this.blinking = !this.blinking;
      this.blinkTimer = this.blinking ? 6 : Math.floor(Math.random() * 120 + 60);
    }

    // Klaviatura boshqaruvi
    const k = this.id === 1 ? keysP1 : keysP2;
    this.isWalking = false;

    if (k.left) {
      this.vx = -this.speed;
      this.facingRight = false;
      this.isWalking = true;
    } else if (k.right) {
      this.vx = this.speed;
      this.facingRight = true;
      this.isWalking = true;
    } else {
      this.vx *= 0.65;
      if (Math.abs(this.vx) < 0.2) this.vx = 0;
    }

    // Qadam zarrachalari
    if (this.isWalking && this.grounded) {
      this.walkCycle += 0.16;
      if (Math.random() < 0.09) {
        spawnParticles(this.x + this.width / 2, this.y + this.height, 1, '#ddb892', 1);
      }
    } else {
      this.walkCycle = 0;
    }

    // Gravitatsiya
    this.vy += this.gravity;
    if (this.vy > 13) this.vy = 13;

    // Gorizontal harakat va to'siqlar
    this.x += this.vx;
    this.checkHorizontalCollisions();
    if (this.x < 10) this.x = 10;
    if (this.x > WORLD_WIDTH - this.width - 10) this.x = WORLD_WIDTH - this.width - 10;

    // Vertikal harakat va yerga tushish
    const wasGrounded = this.grounded;
    this.grounded = false;
    this.y += this.vy;
    this.checkVerticalCollisions();

    // Yerga qo'nganda mayin tushish (Squash)
    if (!wasGrounded && this.grounded) {
      this.landingSquash = 8;
      spawnParticles(this.x + this.width / 2, this.y + this.height, 5, '#e9d8a6', 1.8);
      if (this.jumpBuffer > 0) {
        this.tryJump();
        this.jumpBuffer = 0;
      }
    }

    // Platformadan uzilganda sakrash imkoni (Coyote Time)
    if (wasGrounded && !this.grounded && this.vy >= 0) {
      this.coyoteTime = 7;
    }

    // Suvga / Jarlikka qulash tekshiruvi
    if (this.y > 480) {
      sound.playHurt();
      this.lives--;
      updateHUD();
      spawnParticles(this.x + this.width / 2, 500, 24, '#48cae4', 5);

      if (this.lives <= 0) {
        this.handleDefeat();
      } else {
        this.respawn();
      }
    }
  }

  checkHorizontalCollisions() {
    const allPlats = [
      ...platforms,
      ...movingPlatforms,
      ...warpPipes,
      ...questionBlocks,
      ...brickBlocks,
      ...fallingPlatforms.filter(fp => fp.state !== 'respawning' && fp.state !== 'falling')
    ];
    for (const plat of allPlats) {
      if (checkAABB(this, plat)) {
        if (this.vx > 0) {
          this.x = plat.x - this.width;
          this.vx = 0;
        } else if (this.vx < 0) {
          this.x = plat.x + plat.width;
          this.vx = 0;
        }
      }
    }
  }

  checkVerticalCollisions() {
    // 1. Oddiy platformalar
    for (const plat of platforms) {
      if (checkAABB(this, plat)) {
        if (this.vy > 0) {
          this.y = plat.y - this.height;
          this.vy = 0;
          this.grounded = true;
          if (plat.y < 460 && plat.width >= 120) {
            this.respawnX = plat.x + 30;
            this.respawnY = plat.y - this.height - 2;
          }
        } else if (this.vy < 0) {
          this.y = plat.y + plat.height;
          this.vy = 0;
        }
      }
    }

    // 1.1. Mario Yashil Quvurlari (Warp Pipes)
    for (const pipe of warpPipes) {
      if (checkAABB(this, pipe)) {
        if (this.vy > 0 && this.y + this.height - this.vy <= pipe.y + 16) {
          this.y = pipe.y - this.height;
          this.vy = 0;
          this.grounded = true;
          this.respawnX = pipe.x + 10;
          this.respawnY = pipe.y - this.height - 2;
        } else if (this.vy < 0) {
          this.y = pipe.y + pipe.height;
          this.vy = 0;
        }
      }
    }

    // 1.2. Mario ? Bloklari va G'ishtlar (Question & Brick Blocks)
    const marioBlocks = [...questionBlocks, ...brickBlocks];
    for (const blk of marioBlocks) {
      if (checkAABB(this, blk)) {
        if (this.vy > 0 && this.y + this.height - this.vy <= blk.y + 14) {
          this.y = blk.y - this.height;
          this.vy = 0;
          this.grounded = true;
        } else if (this.vy < 0) {
          this.y = blk.y + blk.height;
          this.vy = 0;
          blk.bump(this);
        }
      }
    }

    // 2. Harakatlanuvchi platformalar
    for (const plat of movingPlatforms) {
      if (checkAABB(this, plat)) {
        if (this.vy > 0 && this.y + this.height - this.vy <= plat.y + 12) {
          this.y = plat.y - this.height;
          this.vy = 0;
          this.grounded = true;
          this.x += plat.dx;
          this.y += plat.dy;
        } else if (this.vy < 0) {
          this.y = plat.y + plat.height;
          this.vy = 0;
        }
      }
    }

    // 3. Yemiriluvchi / Qulovchi platformalar
    for (const plat of fallingPlatforms) {
      if (plat.state === 'respawning') continue;
      if (checkAABB(this, plat)) {
        if (this.vy > 0 && this.y + this.height - this.vy <= plat.y + 14) {
          this.y = plat.y - this.height;
          this.vy = 0;
          this.grounded = true;
          plat.trigger();
        } else if (this.vy < 0 && plat.state !== 'falling') {
          this.y = plat.y + plat.height;
          this.vy = 0;
        }
      }
    }

    // 4. Prujinali sakrash bochkalari (JumpPads)
    for (const pad of jumpPads) {
      if (checkAABB(this, pad)) {
        if (this.vy >= 0 && this.y + this.height - this.vy <= pad.y + 16) {
          pad.bounce();
          this.vy = pad.boost || -16.5;
          this.grounded = false;
          this.coyoteTime = 0;
          sound.playSpring();
          spawnParticles(pad.x + pad.width / 2, pad.y + 4, 10, '#f9c74f', 3.5);
          floatingTexts.push(new FloatingText(pad.x + pad.width / 2, pad.y - 12, '🚀 SAKRASH!', '#f9c74f'));
        }
      }
    }
  }

  draw(ctx, camX) {
    const drawX = this.x - camX;
    const drawY = this.y;

    // Do'stini kutayotgan ruh qaroqchi
    if (!this.alive) {
      ctx.save();
      ctx.translate(drawX + this.width / 2, drawY + this.height / 2 + Math.sin(Date.now() * 0.006) * 6);
      ctx.globalAlpha = 0.65;

      ctx.fillStyle = this.theme === 'red' ? '#ffccd5' : '#cce3de';
      ctx.beginPath();
      ctx.arc(0, -8, 14, Math.PI, 0, false);
      ctx.lineTo(14, 12);
      ctx.lineTo(8, 7);
      ctx.lineTo(0, 12);
      ctx.lineTo(-8, 7);
      ctx.lineTo(-14, 12);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = this.theme === 'red' ? '#e63946' : '#0077b6';
      ctx.beginPath();
      ctx.arc(0, -12, 14.5, Math.PI, 0, false);
      ctx.fill();

      ctx.fillStyle = '#1d3557';
      ctx.beginPath();
      ctx.arc(-5, -6, 2.5, 0, Math.PI * 2);
      ctx.arc(5, -6, 2.5, 0, Math.PI * 2);
      ctx.fill();

      const secLeft = Math.ceil(this.respawnTimer / 60);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px "Fredoka One", cursive';
      ctx.textAlign = 'center';
      ctx.fillText(`⏳ ${secLeft}s`, 0, -28);

      ctx.restore();
      return;
    }

    // Zarba olgandagi miltillash (Blink)
    if (this.invulnerableTime > 0 && Math.floor(this.invulnerableTime / 4) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(drawX + this.width / 2, drawY + this.height / 2);

    if (!this.facingRight) {
      ctx.scale(-1, 1);
    }

    // Squash & Stretch
    let sqX = 1;
    let sqY = 1;
    if (!this.grounded) {
      if (this.vy < -2) { sqX = 0.92; sqY = 1.08; }
      else if (this.vy > 2) { sqX = 0.95; sqY = 1.05; }
    } else if (this.landingSquash > 0) {
      sqX = 1.14;
      sqY = 0.86;
    }
    ctx.scale(sqX, sqY);

    // Yerga tushgan soya
    if (this.grounded) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.beginPath();
      ctx.ellipse(0, 23, 14, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const walkBob = Math.sin(this.walkCycle) * 2.6;
    const legAngle = this.grounded ? Math.sin(this.walkCycle) * 0.45 : (this.vy < 0 ? -0.35 : 0.3);
    const isJumpingUp = (!this.grounded && this.vy < 0);

    // Ranglar: Mario (Red) vs Luigi (Green)
    const shirtColor = this.theme === 'red' ? '#e52521' : '#00a800';
    const overallsColor = this.theme === 'red' ? '#0038b8' : '#001a70';
    const capColor = this.theme === 'red' ? '#e52521' : '#00a800';
    const badgeLetter = this.theme === 'red' ? 'M' : 'L';
    const badgeTextColor = this.theme === 'red' ? '#e52521' : '#00a800';
    const badgeLabel = this.theme === 'red' ? 'MARIO' : 'LUIGI';

    // 1. Orqa Oyoq (Kombinezon + Ishchi etik)
    ctx.save();
    ctx.translate(-6, 12);
    ctx.rotate(-legAngle);
    ctx.fillStyle = overallsColor;
    ctx.fillRect(-5, 0, 9, 8);
    ctx.fillStyle = '#5c3d2e';
    roundRect(ctx, -6, 6, 12, 7, 3, true, false);
    ctx.fillStyle = '#3a2010';
    ctx.fillRect(-6, 11, 12, 2.5);
    ctx.restore();

    // 2. Old Oyoq
    ctx.save();
    ctx.translate(6, 12);
    ctx.rotate(legAngle);
    ctx.fillStyle = overallsColor;
    ctx.fillRect(-5, 0, 9, 8);
    ctx.fillStyle = '#5c3d2e';
    roundRect(ctx, -6, 6, 12, 7, 3, true, false);
    ctx.fillStyle = '#3a2010';
    ctx.fillRect(-6, 11, 12, 2.5);
    ctx.restore();

    // 3. Qizil/Yashil Ko'ylak Tanasi (Shirt)
    ctx.fillStyle = shirtColor;
    roundRect(ctx, -12, -7 + walkBob, 24, 18, 4, true, false);

    // 4. Moviy Kombinezon (Overalls)
    ctx.fillStyle = overallsColor;
    roundRect(ctx, -11, 2 + walkBob, 22, 11, 3, true, false);
    roundRect(ctx, -8, -4 + walkBob, 16, 10, 2, true, false);

    // Yelka kamarlari (Straps)
    ctx.fillRect(-10, -7 + walkBob, 4, 12);
    ctx.fillRect(6, -7 + walkBob, 4, 12);

    // Sariq Oltin Tugmalar (Yellow buttons)
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(-8, 3 + walkBob, 2.5, 0, Math.PI * 2);
    ctx.arc(8, 3 + walkBob, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 5. Qo'llar va Oq Qo'lqoplar (Hands & White Gloves)
    if (this.isAttacking && this.attackTimer > 0) {
      const swingProgress = 1 - (this.attackTimer / 16);
      const swingAng = -1.2 + swingProgress * 2.6;

      ctx.save();
      ctx.translate(6, 0 + walkBob);
      ctx.rotate(swingAng);

      ctx.fillStyle = shirtColor;
      ctx.fillRect(0, -3, 11, 6);
      ctx.fillStyle = '#ffffff';
      roundRect(ctx, 10, -5, 8, 10, 4, true, false);

      // Mario Yulduzli Bolg'asi (Golden Star Hammer)
      ctx.fillStyle = '#78350f';
      ctx.fillRect(15, -2, 18, 4);
      ctx.fillStyle = '#facc15';
      roundRect(ctx, 28, -12, 12, 24, 3, true, false);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(30, -10, 8, 20);

      ctx.restore();

      ctx.save();
      ctx.strokeStyle = this.theme === 'red' ? '#f59e0b' : '#22c55e';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(12, 0 + walkBob, 32, -0.9, 0.9);
      ctx.stroke();
      ctx.restore();
    } else if (isJumpingUp) {
      // MARIO SUPER JUMP POSE (Balandga ko'tarilgan oq musht!)
      ctx.save();
      ctx.translate(7, -10 + walkBob);
      ctx.rotate(-0.3);
      ctx.fillStyle = shirtColor;
      ctx.fillRect(-3, -14, 6, 14);
      ctx.fillStyle = '#ffffff';
      roundRect(ctx, -5, -22, 10, 10, 5, true, false);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(-9, -2 + walkBob);
      ctx.rotate(0.6);
      ctx.fillStyle = shirtColor;
      ctx.fillRect(-3, 0, 6, 10);
      ctx.fillStyle = '#ffffff';
      roundRect(ctx, -4, 8, 8, 8, 4, true, false);
      ctx.restore();
    } else {
      ctx.save();
      ctx.translate(-10, -3 + walkBob);
      ctx.rotate(-legAngle * 0.7);
      ctx.fillStyle = shirtColor;
      ctx.fillRect(-3, 0, 6, 10);
      ctx.fillStyle = '#ffffff';
      roundRect(ctx, -4, 8, 8, 8, 4, true, false);
      ctx.restore();

      ctx.save();
      ctx.translate(10, -3 + walkBob);
      ctx.rotate(legAngle * 0.7);
      ctx.fillStyle = shirtColor;
      ctx.fillRect(-3, 0, 6, 10);
      ctx.fillStyle = '#ffffff';
      roundRect(ctx, -4, 8, 8, 8, 4, true, false);
      ctx.restore();
    }

    // 6. Bo'yin va Bosh (Head & Face)
    const headY = -16 + walkBob;
    ctx.fillStyle = '#fed0bb';
    ctx.fillRect(-3, headY + 8, 6, 4);

    ctx.beginPath();
    ctx.arc(0, headY, 11.5, 0, Math.PI * 2);
    ctx.fill();

    // Quloq
    ctx.fillStyle = '#fed0bb';
    ctx.beginPath();
    ctx.arc(-11, headY + 1, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Sochlar
    ctx.fillStyle = '#2e1503';
    ctx.beginPath();
    ctx.arc(-11, headY - 3, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-10, headY + 4, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // 7. Mario Shapka (Cap)
    ctx.fillStyle = capColor;
    ctx.beginPath();
    ctx.arc(0, headY - 3, 13, Math.PI, Math.PI * 2, false);
    ctx.fill();
    ctx.fillRect(-13, headY - 5, 26, 7);

    // Shapka soyaboni (Brim / Visor)
    ctx.fillStyle = capColor;
    roundRect(ctx, -2, headY - 3, 17, 5, 2, true, false);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(-2, headY + 1, 17, 1.5);

    // Oq aylana nishon (Emblem Circle)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, headY - 6, 5.5, 0, Math.PI * 2);
    ctx.fill();

    // Qizil 'M' yoki Yashil 'L' harfi
    ctx.fillStyle = badgeTextColor;
    ctx.font = 'bold 9px "Fredoka One", cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeLetter, 0, headY - 5.5);

    // 8. Yuz: Katta Yumaloq Burun (Mario Nose)
    ctx.fillStyle = '#fed0bb';
    ctx.beginPath();
    ctx.arc(6, headY + 0.5, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#e29578';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 9. Mario Mo'ylovi (Mustache - Iconic curved scallops)
    ctx.fillStyle = '#2e1503';
    ctx.beginPath();
    ctx.moveTo(1, headY + 4);
    ctx.quadraticCurveTo(5, headY + 2.5, 9, headY + 4.5);
    ctx.quadraticCurveTo(13, headY + 3.5, 12, headY + 6.5);
    ctx.quadraticCurveTo(7, headY + 8, 1, headY + 5.5);
    ctx.closePath();
    ctx.fill();

    // 10. Moviy Ko'z (Blue Eyes)
    if (this.blinking) {
      ctx.strokeStyle = '#2e1503';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(2, headY - 2);
      ctx.lineTo(7, headY - 2);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(4.5, headY - 2, 3, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.ellipse(5.2, headY - 2, 2, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(5.5, headY - 2, 1.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(6, headY - 3, 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = '#2e1503';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(2, headY - 7);
    ctx.lineTo(8, headY - 6.5);
    ctx.stroke();

    // 11. O'yinchi indikator nishoni (MARIO / LUIGI)
    ctx.save();
    ctx.translate(0, headY - 16);
    ctx.fillStyle = capColor;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    roundRect(ctx, -20, -8, 40, 14, 7, true, true);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px "Fredoka One", cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeLabel, 0, 0);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-3, 6);
    ctx.lineTo(3, 6);
    ctx.lineTo(0, 9);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }
}

// O'yinchilar nusxalari (Mario & Luigi)
const player1 = new PiratePlayer(1, 'Mario', 'red', 80, 360);
const player2 = new PiratePlayer(2, 'Luigi', 'blue', 130, 360);

function getActivePlayers() {
  return gameMode === '2P' ? [player1, player2] : [player1];
}

let teamHasKey = false;

// ==========================================
// 5.1. QAROQCHILAR DUELI VA PvP TO'QNASHUV
// ==========================================
function checkPvPCollisions() {
  if (gameMode !== '2P' || gameState !== 'PLAYING') return;
  if (!player1.alive || !player2.alive) return;

  // 1. 1-Qaroqchining qilichi 2-Qaroqchiga tekkanda
  if (player1.isAttacking && player1.attackTimer > 0 && player2.invulnerableTime <= 0) {
    const p1Sword = {
      x: player1.facingRight ? player1.x + player1.width - 6 : player1.x - 40,
      y: player1.y + 6,
      width: 46,
      height: 38
    };
    if (checkAABB(p1Sword, player2)) {
      sound.playSwordHit();
      player2.takeDamage(player1.x + player1.width / 2);
      spawnParticles(player2.x + player2.width / 2, player2.y + player2.height / 2, 18, '#ffd166', 4);
      floatingTexts.push(new FloatingText(player2.x + player2.width / 2, player2.y - 12, '⚔️ P1 zarbasi! -1❤️', '#ef233c'));

      // Tangani o'lja qilib tortib olish
      if (player2.coins > 0) {
        player2.coins--;
        player1.coins += 2;
        floatingTexts.push(new FloatingText(player1.x + player1.width / 2, player1.y - 32, '+20 🪙 (O‘lja)', '#ffd166'));
      }
      updateHUD();
      return;
    }
  }

  // 2. 2-Qaroqchining qilichi 1-Qaroqchiga tekkanda
  if (player2.isAttacking && player2.attackTimer > 0 && player1.invulnerableTime <= 0) {
    const p2Sword = {
      x: player2.facingRight ? player2.x + player2.width - 6 : player2.x - 40,
      y: player2.y + 6,
      width: 46,
      height: 38
    };
    if (checkAABB(p2Sword, player1)) {
      sound.playSwordHit();
      player1.takeDamage(player2.x + player2.width / 2);
      spawnParticles(player1.x + player1.width / 2, player1.y + player1.height / 2, 18, '#00b4d8', 4);
      floatingTexts.push(new FloatingText(player1.x + player1.width / 2, player1.y - 12, '⚔️ P2 zarbasi! -1❤️', '#0077b6'));

      if (player1.coins > 0) {
        player1.coins--;
        player2.coins += 2;
        floatingTexts.push(new FloatingText(player2.x + player2.width / 2, player2.y - 32, '+20 🪙 (O‘lja)', '#ffd166'));
      }
      updateHUD();
      return;
    }
  }

  // 3. Ustiga sakrab bosish (Stomp Attack)
  if (checkAABB(player1, player2)) {
    const p1Bottom = player1.y + player1.height;
    const p2Bottom = player2.y + player2.height;

    // P1 P2 ning boshiga sakrab tushdi
    if (player1.vy > 1.2 && p1Bottom - player1.vy <= player2.y + 18 && player2.invulnerableTime <= 0) {
      player1.vy = -11.0;
      sound.playStomp();
      player2.takeDamage(player1.x + player1.width / 2);
      spawnParticles(player2.x + player2.width / 2, player2.y + 6, 15, '#ef233c', 3.5);
      floatingTexts.push(new FloatingText(player2.x + player2.width / 2, player2.y - 12, '💥 Bosdi! -1❤️', '#ef233c'));
      updateHUD();
      return;
    }

    // P2 P1 ning boshiga sakrab tushdi
    if (player2.vy > 1.2 && p2Bottom - player2.vy <= player1.y + 18 && player1.invulnerableTime <= 0) {
      player2.vy = -11.0;
      sound.playStomp();
      player1.takeDamage(player2.x + player2.width / 2);
      spawnParticles(player1.x + player1.width / 2, player1.y + 6, 15, '#00b4d8', 3.5);
      floatingTexts.push(new FloatingText(player1.x + player1.width / 2, player1.y - 12, '💥 Bosdi! -1❤️', '#0077b6'));
      updateHUD();
      return;
    }
  }
}

// ==========================================
// 6. DUSHMANLAR (Qisqichbaqa dushmani)
// ==========================================
class CrabEnemy {
  constructor(x, y, patrolLeft, patrolRight, speed = 1.35) {
    this.x = x;
    this.y = y;
    this.width = 38;
    this.height = 26;
    this.patrolLeft = patrolLeft;
    this.patrolRight = patrolRight;
    this.speed = speed;
    this.direction = 1;
    this.animTimer = Math.random() * 10;
    this.isDead = false;
    this.squishTimer = 0;
  }

  update() {
    if (this.squishTimer > 0) {
      this.squishTimer--;
      if (this.squishTimer <= 0) {
        this.isDead = true;
      }
      return;
    }
    if (this.isDead) return;

    this.x += this.speed * this.direction;
    this.animTimer += 0.15;

    if (this.x <= this.patrolLeft) {
      this.x = this.patrolLeft;
      this.direction = 1;
    } else if (this.x + this.width >= this.patrolRight) {
      this.x = this.patrolRight - this.width;
      this.direction = -1;
    }

    // Mario Yashil quvurlari bilan to'qnashuvda qayrilish
    for (const pipe of warpPipes) {
      if (checkAABB(this, pipe)) {
        if (this.direction > 0) {
          this.x = pipe.x - this.width;
          this.direction = -1;
        } else if (this.direction < 0) {
          this.x = pipe.x + pipe.width;
          this.direction = 1;
        }
      }
    }

    const activePlayers = getActivePlayers();
    for (const p of activePlayers) {
      if (!p.alive || this.isDead || this.squishTimer > 0) continue;

      // 1. Qilich bilan chopish tekshiruvi (Sword Attack Hitbox)
      if (p.isAttacking && p.attackTimer > 0) {
        const attackHitbox = {
          x: p.facingRight ? p.x + p.width - 5 : p.x - 38,
          y: p.y + 6,
          width: 44,
          height: 38
        };
        if (checkAABB(attackHitbox, this)) {
          this.isDead = true;
          sound.playSwordHit();
          spawnParticles(this.x + this.width / 2, this.y + this.height / 2, 18, '#ffd166', 4);
          p.coins += 3;
          floatingTexts.push(new FloatingText(this.x + this.width / 2, this.y, `+30 ⚔️ (P${p.id})`, p.theme === 'red' ? '#ff758f' : '#64dfdf'));
          updateHUD();
          return;
        }
      }

      // 2. Ustiga sakrab bosish (Mario Goomba Stomp) yoki zarba olish
      if (checkAABB(p, this)) {
        const playerBottom = p.y + p.height;
        if (p.vy > 0 && playerBottom - p.vy <= this.y + 14) {
          this.squishTimer = 16;
          p.vy = -8.8;
          sound.playStomp();
          spawnParticles(this.x + this.width / 2, this.y + this.height / 2, 12, '#854d0e', 2.5);
          p.coins += 2;
          floatingTexts.push(new FloatingText(this.x + this.width / 2, this.y, `+20 🍄 (P${p.id})`, p.theme === 'red' ? '#ff758f' : '#64dfdf'));
          updateHUD();
        } else {
          p.takeDamage(this.x + this.width / 2);
        }
      }
    }
  }

  draw(ctx, camX) {
    if (this.isDead) return;

    const drawX = this.x - camX;
    const drawY = this.y;

    ctx.save();
    ctx.translate(drawX + this.width / 2, drawY + this.height / 2);

    // Mario Goomba pachoqlanish animatsiyasi (Squash)
    if (this.squishTimer > 0) {
      ctx.scale(1.35, 0.35);
    }

    const footWaddle = Math.sin(this.animTimer * 4) * 3;

    // 1. Goomba Qora/Jigarrang Oyoqlari
    ctx.fillStyle = '#1e1b18';
    ctx.beginPath();
    ctx.ellipse(-8 + footWaddle, 10, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(8 - footWaddle, 10, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Goomba Oyoqcha Tanasi (Stem)
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.ellipse(0, 5, 8, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 3. Goomba Shapkasi (Chestnut Brown Mushroom Cap)
    ctx.fillStyle = '#854d0e';
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.bezierCurveTo(18, -14, 20, 2, 0, 2);
    ctx.bezierCurveTo(-20, 2, -18, -14, 0, -14);
    ctx.fill();
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 4. Katta Oq Ko'zlari va Qora Qorachiqlari
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(-5, -3, 3.5, 5.5, 0, 0, Math.PI * 2);
    ctx.ellipse(5, -3, 3.5, 5.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(-4, -2, 1.8, 3, 0, 0, Math.PI * 2);
    ctx.ellipse(4, -2, 1.8, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // 5. Jahldor Qora Qoshlari (\ /)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-9, -10);
    ctx.lineTo(-2, -7);
    ctx.moveTo(9, -10);
    ctx.lineTo(2, -7);
    ctx.stroke();

    // 6. Tishlari (Ikki kichik oq tish)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-4, 2);
    ctx.lineTo(-2, -1);
    ctx.lineTo(0, 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 2);
    ctx.lineTo(2, -1);
    ctx.lineTo(4, 2);
    ctx.fill();

    ctx.restore();
  }
}

// ==========================================
// 6.2. QANOTLI DUSHMAN (FLYING ENEMY: SEAGULL, BAT, CROW, PARROT)
// ==========================================
class FlyingEnemy {
  constructor(x, y, patrolLeft, patrolRight, speed = 1.6, amplitude = 25, subtype = 'seagull') {
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.width = 36;
    this.height = 24;
    this.patrolLeft = patrolLeft;
    this.patrolRight = patrolRight;
    this.speed = speed;
    this.amplitude = amplitude;
    this.subtype = subtype;
    this.direction = 1;
    this.animTimer = Math.random() * 20;
    this.isDead = false;
  }

  update() {
    if (this.isDead) return;

    this.animTimer += 0.14;
    this.x += this.speed * this.direction;
    this.y = this.baseY + Math.sin(this.animTimer * 1.5) * this.amplitude;

    if (this.x <= this.patrolLeft) {
      this.x = this.patrolLeft;
      this.direction = 1;
    } else if (this.x + this.width >= this.patrolRight) {
      this.x = this.patrolRight - this.width;
      this.direction = -1;
    }

    const activePlayers = getActivePlayers();
    for (const p of activePlayers) {
      if (!p.alive || this.isDead) continue;

      // 1. Qilich bilan urish
      if (p.isAttacking && p.attackTimer > 0) {
        const attackHitbox = {
          x: p.facingRight ? p.x + p.width - 5 : p.x - 40,
          y: p.y + 4,
          width: 46,
          height: 40
        };
        if (checkAABB(attackHitbox, this)) {
          this.isDead = true;
          sound.playSwordHit();
          spawnParticles(this.x + this.width / 2, this.y + this.height / 2, 18, '#ffd166', 4);
          p.coins += 4;
          floatingTexts.push(new FloatingText(this.x + this.width / 2, this.y, `+40 ⚔️ (P${p.id})`, p.theme === 'red' ? '#ff758f' : '#64dfdf'));
          updateHUD();
          return;
        }
      }

      // 2. Ustiga sakrab bosish (Stomp)
      if (checkAABB(p, this)) {
        const playerBottom = p.y + p.height;
        if (p.vy > 0 && playerBottom - p.vy <= this.y + 12) {
          this.isDead = true;
          p.vy = -10.5;
          sound.playStomp();
          spawnParticles(this.x + this.width / 2, this.y + this.height / 2, 16, '#38b000', 3.5);
          p.coins += 3;
          floatingTexts.push(new FloatingText(this.x + this.width / 2, this.y, `+30 (P${p.id})`, p.theme === 'red' ? '#ff758f' : '#64dfdf'));
          updateHUD();
        } else {
          p.takeDamage(this.x + this.width / 2);
        }
      }
    }
  }

  draw(ctx, camX) {
    if (this.isDead) return;
    const drawX = this.x - camX;
    if (drawX + this.width < -50 || drawX > GAME_WIDTH + 50) return;

    const wingFlap = Math.sin(this.animTimer * 4) * 8;
    ctx.save();
    ctx.translate(drawX + this.width / 2, this.y + this.height / 2);
    if (this.direction < 0) ctx.scale(-1, 1);

    let bodyColor = '#ffffff';
    let wingColor = '#e0e1dd';
    let beakColor = '#f39c12';
    if (this.subtype === 'bat') {
      bodyColor = '#240046';
      wingColor = '#3c096c';
      beakColor = '#ff5400';
    } else if (this.subtype === 'parrot') {
      bodyColor = '#d90429';
      wingColor = '#2ec4b6';
      beakColor = '#ffbe0b';
    } else if (this.subtype === 'crow') {
      bodyColor = '#1f1f1f';
      wingColor = '#333333';
      beakColor = '#f77f00';
    }

    // Tana
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Qanotlar
    ctx.fillStyle = wingColor;
    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.quadraticCurveTo(0, -14 - wingFlap, 14, -8 - wingFlap * 0.5);
    ctx.quadraticCurveTo(6, -2, -4, 0);
    ctx.fill();

    // Dum
    ctx.fillStyle = wingColor;
    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.lineTo(-18, -4);
    ctx.lineTo(-18, 4);
    ctx.closePath();
    ctx.fill();

    // Bosh va ko'z
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(10, -3, 6, 0, Math.PI * 2);
    ctx.fill();

    // Tumshuq
    ctx.fillStyle = beakColor;
    ctx.beginPath();
    ctx.moveTo(15, -4);
    ctx.lineTo(21, -1);
    ctx.lineTo(15, 2);
    ctx.closePath();
    ctx.fill();

    // Ko'z
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(11, -4, 1.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

// ==========================================
// 7. TANGALAR, KALIT VA XAZINA SANDIG'I
// ==========================================
class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 22;
    this.height = 22;
    this.collected = false;
    this.spinOffset = Math.random() * Math.PI;
  }

  update() {
    if (this.collected) return;
    const active = getActivePlayers();
    for (const p of active) {
      if (p.alive && checkAABB(p, this)) {
        this.collected = true;
        p.coins++;
        sound.playCoin();
        updateHUD();
        spawnParticles(this.x + this.width / 2, this.y + this.height / 2, 10, '#ffd166', 3);
        const col = p.theme === 'red' ? '#ff758f' : '#64dfdf';
        floatingTexts.push(new FloatingText(this.x + this.width / 2, this.y, `+10 (P${p.id})`, col));
        break;
      }
    }
  }

  draw(ctx, camX) {
    if (this.collected) return;
    const drawX = this.x - camX + this.width / 2;
    const drawY = this.y + this.height / 2 + Math.sin(Date.now() * 0.005 + this.spinOffset) * 3;
    const scaleX = Math.cos(Date.now() * 0.006 + this.spinOffset);

    ctx.save();
    ctx.translate(drawX, drawY);
    ctx.scale(scaleX, 1);

    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f1c40f';
    ctx.beginPath();
    ctx.arc(0, 0, 8.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#d68910';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', 0, 0.5);

    ctx.restore();
  }
}

class GoldenKey {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 28;
    this.height = 28;
    this.collected = false;
    this.hoverTime = 0;
  }

  update() {
    if (this.collected) return;
    this.hoverTime += 0.05;

    const active = getActivePlayers();
    for (const p of active) {
      if (p.alive && checkAABB(p, this)) {
        this.collected = true;
        teamHasKey = true;
        p.hasKey = true;
        sound.playPowerup();
        updateHUD();
        spawnParticles(this.x + this.width / 2, this.y + this.height / 2, 25, '#ffd166', 4.5);
        floatingTexts.push(new FloatingText(this.x + this.width / 2, this.y - 10, `⭐ MARIO YULDUZI! (P${p.id})`, '#fde047'));
        showToast(`⭐ ${p.name} Sehrli Mario Yulduzini qo‘lga kiritdi!`);
        break;
      }
    }
  }

  draw(ctx, camX) {
    if (this.collected) return;

    const drawX = this.x - camX + this.width / 2;
    const drawY = this.y + this.height / 2 + Math.sin(this.hoverTime) * 4;

    ctx.save();
    ctx.translate(drawX, drawY);

    // Mario Star porlash aurası
    ctx.fillStyle = 'rgba(255, 215, 0, 0.4)';
    ctx.beginPath();
    ctx.arc(0, 0, 20 + Math.sin(this.hoverTime * 2) * 4, 0, Math.PI * 2);
    ctx.fill();

    // 5 burchakli Super Mario Yulduzi
    ctx.fillStyle = '#fde047';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const spikes = 5;
    const outerR = 15;
    const innerR = 7;
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;

    ctx.moveTo(0, -outerR);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(Math.cos(rot) * outerR, Math.sin(rot) * outerR);
      rot += step;
      ctx.lineTo(Math.cos(rot) * innerR, Math.sin(rot) * innerR);
      rot += step;
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Mario Yulduzi ko'zlari (Cute vertical black oval eyes)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(-3.5, -1, 1.3, 3.5, 0, 0, Math.PI * 2);
    ctx.ellipse(3.5, -1, 1.3, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

class TreasureChest {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 54;
    this.height = 42;
    this.isOpen = false;
    this.cooldownToast = 0;
    this.flagY = 0; // flagpole flag sliding down animation
  }

  update() {
    if (this.cooldownToast > 0) this.cooldownToast--;

    if (this.isOpen && this.flagY < 95) {
      this.flagY += 4;
    }

    const touchingPlayer = getActivePlayers().find(p => p.alive && checkAABB(p, this));
    if (touchingPlayer) {
      if (!this.isOpen) {
        if (teamHasKey || touchingPlayer.hasKey) {
          this.isOpen = true;
          sound.playFlagpole();
          spawnParticles(this.x + this.width / 2, this.y - 40, 45, '#ffd166', 6);
          spawnParticles(this.x + this.width / 2, this.y - 40, 25, '#22c55e', 5);
          floatingTexts.push(new FloatingText(this.x + this.width / 2, this.y - 50, '🏁 MARRA FATH ETILDI!', '#ffd700'));
          
          setTimeout(() => {
            handleChestOpened();
          }, 1400);
        } else {
          if (this.cooldownToast === 0) {
            toastChestShake = 20;
            sound.playLocked();
            showToast('⚠️ Avval Sehrli Mario Yulduzini toping!');
            this.cooldownToast = 60;
          }
        }
      }
    }
  }

  draw(ctx, camX) {
    let drawX = this.x - camX;
    const drawY = this.y;

    if (toastChestShake > 0) {
      drawX += (Math.random() - 0.5) * 6;
      toastChestShake--;
    }

    ctx.save();
    ctx.translate(drawX, drawY);

    // 1. Mario Bayroq Ustuni (Goal Flagpole)
    const poleX = 27;
    const poleTopY = -120;
    const poleBottomY = 24;

    // Metall guruch ustun
    ctx.fillStyle = '#facc15';
    ctx.fillRect(poleX - 3, poleTopY, 6, poleBottomY - poleTopY);
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(poleX - 3, poleTopY, 6, poleBottomY - poleTopY);

    // Oltin shar uchi (Golden finial ball)
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(poleX, poleTopY - 4, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Hilpirayotgan Mario Bayrog'i (Mario Goal Flag)
    const curFlagY = poleTopY + 8 + this.flagY;
    const wave = Math.sin(Date.now() * 0.008) * 4;

    ctx.fillStyle = '#e52521';
    ctx.beginPath();
    ctx.moveTo(poleX + 3, curFlagY);
    ctx.lineTo(poleX + 38 + wave, curFlagY + 14);
    ctx.lineTo(poleX + 3, curFlagY + 28);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Bayroqdagi Oq Yulduzcha
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(poleX + 16 + wave * 0.5, curFlagY + 14, 4, 0, Math.PI * 2);
    ctx.fill();

    // 2. Qasr poydevori / Sandiq tagligi (Castle pedestal)
    ctx.fillStyle = '#92400e';
    roundRect(ctx, 4, 18, 46, 24, 4, true, false);

    ctx.fillStyle = '#b45309';
    ctx.fillRect(6, 20, 42, 20);

    // G'isht naqshlari
    ctx.fillStyle = '#451a03';
    ctx.fillRect(6, 30, 42, 2);
    ctx.fillRect(26, 20, 2, 10);
    ctx.fillRect(16, 31, 2, 9);
    ctx.fillRect(36, 31, 2, 9);

    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 2;
    roundRect(ctx, 4, 18, 46, 24, 4, false, true);

    ctx.restore();
  }
}

// ==========================================
// 8. KO'P BOSQICHLAR XARITALARI (LEVEL DATA)
// ==========================================
const LEVELS = [
  // 1-BOSQICH: "Tropik Sohil" (Tinch boshlang'ich orol)
  {
    name: "Tropik Sohil",
    theme: "tropical",
    difficulty: 1,
    description: "Quyoshli sokin orol, tinch dengiz to‘lqinlari.",
    platforms: [
      { x: 0, y: 440, w: 580, h: 100, type: 'ground' },
      { x: 260, y: 340, w: 140, h: 25, type: 'rock' },
      { x: 440, y: 260, w: 120, h: 25, type: 'rock' },
      { x: 670, y: 440, w: 320, h: 100, type: 'ground' },
      { x: 740, y: 320, w: 130, h: 25, type: 'rock' },
      { x: 910, y: 230, w: 130, h: 25, type: 'rock' },
      { x: 1080, y: 440, w: 420, h: 100, type: 'ground' },
      { x: 1140, y: 340, w: 120, h: 25, type: 'rock' },
      { x: 1300, y: 260, w: 130, h: 25, type: 'rock' },
      { x: 1450, y: 170, w: 180, h: 28, type: 'rock' },
      { x: 1680, y: 260, w: 120, h: 25, type: 'rock' },
      { x: 1840, y: 350, w: 130, h: 25, type: 'rock' },
      { x: 1980, y: 440, w: 440, h: 100, type: 'ground' },
      { x: 2150, y: 330, w: 140, h: 25, type: 'rock' },
      { x: 2500, y: 440, w: 500, h: 100, type: 'ground' }
    ],
    movingPlatforms: [],
    fallingPlatforms: [],
    jumpPads: [],
    spikes: [],
    enemies: [
      { type: 'crab', x: 300, y: 414, left: 200, right: 560, speed: 1.3 },
      { type: 'crab', x: 720, y: 414, left: 680, right: 960, speed: 1.3 },
      { type: 'crab', x: 1150, y: 414, left: 1090, right: 1460, speed: 1.4 },
      { type: 'crab', x: 2050, y: 414, left: 1990, right: 2380, speed: 1.4 }
    ],
    coins: [
      { x: 180, y: 390 }, { x: 220, y: 390 },
      { x: 290, y: 295 }, { x: 330, y: 295 },
      { x: 470, y: 215 }, { x: 510, y: 215 },
      { x: 610, y: 380 }, { x: 770, y: 275 }, { x: 940, y: 185 },
      { x: 1170, y: 295 }, { x: 1330, y: 215 },
      { x: 1480, y: 125 }, { x: 1530, y: 125 }, { x: 1580, y: 125 },
      { x: 1710, y: 215 }, { x: 1870, y: 305 },
      { x: 2180, y: 285 }, { x: 2230, y: 285 },
      { x: 2440, y: 380 }, { x: 2600, y: 390 }, { x: 2650, y: 390 }
    ],
    keyPos: { x: 1525, y: 125 },
    chestPos: { x: 2760, y: 398 },
    palms: [{ x: 120, y: 440 }, { x: 500, y: 440 }, { x: 800, y: 440 }, { x: 1180, y: 440 }, { x: 2050, y: 440 }, { x: 2880, y: 440 }]
  },

  // 2-BOSQICH: "Marjon Qirg'og'i" (Harakatlanuvchi sollar)
  {
    name: "Marjon Qirg'og'i",
    theme: "tropical",
    difficulty: 1,
    description: "Marjon orolchalari va suzuvchi yog'och sollar.",
    platforms: [
      { x: 0, y: 440, w: 480, h: 100, type: 'ground' },
      { x: 280, y: 330, w: 120, h: 25, type: 'rock' },
      { x: 780, y: 440, w: 340, h: 100, type: 'ground' },
      { x: 900, y: 310, w: 120, h: 25, type: 'rock' },
      { x: 1320, y: 440, w: 320, h: 100, type: 'ground' },
      { x: 1460, y: 310, w: 120, h: 25, type: 'rock' },
      { x: 1650, y: 210, w: 160, h: 26, type: 'rock' },
      { x: 1880, y: 310, w: 120, h: 25, type: 'rock' },
      { x: 2080, y: 440, w: 320, h: 100, type: 'ground' },
      { x: 2560, y: 440, w: 440, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 540, y: 410, w: 110, h: 20, moveX: 95, moveY: 0, speed: 0.035 },
      { x: 1170, y: 410, w: 100, h: 20, moveX: 55, moveY: 0, speed: 0.04 },
      { x: 2420, y: 410, w: 100, h: 20, moveX: 50, moveY: 0, speed: 0.04 }
    ],
    fallingPlatforms: [],
    jumpPads: [],
    spikes: [
      { x: 340, y: 422, w: 45, h: 18 },
      { x: 880, y: 422, w: 45, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 220, y: 414, left: 140, right: 330, speed: 1.5 },
      { type: 'crab', x: 820, y: 414, left: 790, right: 1050, speed: 1.6 },
      { type: 'crab', x: 1380, y: 414, left: 1330, right: 1580, speed: 1.6 },
      { type: 'crab', x: 2140, y: 414, left: 2090, right: 2360, speed: 1.7 }
    ],
    coins: [
      { x: 180, y: 390 }, { x: 320, y: 280 }, { x: 580, y: 360 }, { x: 820, y: 390 },
      { x: 940, y: 260 }, { x: 1220, y: 360 }, { x: 1480, y: 260 }, { x: 1700, y: 160 },
      { x: 1750, y: 160 }, { x: 1920, y: 260 }, { x: 2150, y: 390 }, { x: 2460, y: 360 },
      { x: 2640, y: 390 }, { x: 2720, y: 390 }
    ],
    keyPos: { x: 1720, y: 160 },
    chestPos: { x: 2800, y: 398 },
    palms: [{ x: 100, y: 440 }, { x: 840, y: 440 }, { x: 2680, y: 440 }]
  },

  // 3-BOSQICH: "Shafaq Qoyalari" (Sakrash tramplini va tikanlar)
  {
    name: "Shafaq Qoyalari",
    theme: "sunset",
    difficulty: 2,
    description: "Quyosh botmoqda! Orol tramplini va xavfli tikanlar.",
    platforms: [
      { x: 0, y: 440, w: 440, h: 100, type: 'ground' },
      { x: 280, y: 330, w: 110, h: 24, type: 'rock' },
      { x: 520, y: 200, w: 160, h: 25, type: 'rock' },
      { x: 780, y: 440, w: 300, h: 100, type: 'ground' },
      { x: 1160, y: 440, w: 320, h: 100, type: 'ground' },
      { x: 1280, y: 310, w: 110, h: 24, type: 'rock' },
      { x: 1480, y: 210, w: 120, h: 24, type: 'rock' },
      { x: 1680, y: 120, w: 150, h: 26, type: 'rock' },
      { x: 1920, y: 230, w: 110, h: 24, type: 'rock' },
      { x: 2140, y: 440, w: 300, h: 100, type: 'ground' },
      { x: 2560, y: 440, w: 440, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 990, y: 370, w: 100, h: 20, moveX: 0, moveY: 65, speed: 0.04 },
      { x: 2380, y: 410, w: 100, h: 20, moveX: 55, moveY: 0, speed: 0.045 }
    ],
    fallingPlatforms: [],
    jumpPads: [
      { x: 380, y: 414, boost: -16.5 }
    ],
    spikes: [
      { x: 320, y: 422, w: 45, h: 18 },
      { x: 1240, y: 422, w: 50, h: 18 },
      { x: 2220, y: 422, w: 50, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 200, y: 414, left: 120, right: 310, speed: 1.8 },
      { type: 'crab', x: 840, y: 414, left: 800, right: 1030, speed: 1.9 },
      { type: 'crab', x: 1320, y: 284, left: 1290, right: 1380, speed: 1.3 },
      { type: 'crab', x: 2600, y: 414, left: 2560, right: 2800, speed: 2.0 }
    ],
    coins: [
      { x: 160, y: 390 }, { x: 310, y: 280 }, { x: 550, y: 150 }, { x: 610, y: 150 },
      { x: 820, y: 390 }, { x: 990, y: 300 }, { x: 1300, y: 260 }, { x: 1500, y: 160 },
      { x: 1720, y: 70 }, { x: 1770, y: 70 }, { x: 1940, y: 180 }, { x: 2180, y: 390 },
      { x: 2400, y: 350 }, { x: 2650, y: 390 }
    ],
    keyPos: { x: 1750, y: 75 },
    chestPos: { x: 2820, y: 398 },
    palms: [{ x: 100, y: 440 }, { x: 900, y: 440 }, { x: 2650, y: 440 }]
  },

  // 4-BOSQICH: "Qaroqchilar Qashshoq Qasri" (Ikki xil yo'l & Uchar Chayka)
  {
    name: "Qashshoq Qasr Qoyalari",
    theme: "sunset",
    difficulty: 2,
    description: "Yuqori xavfsiz yog'och yo'l yoki quyi dushmanli g'or yo'li!",
    platforms: [
      { x: 0, y: 440, w: 380, h: 100, type: 'ground' },
      { x: 220, y: 310, w: 100, h: 22, type: 'rock' },
      { x: 400, y: 190, w: 220, h: 22, type: 'rock' },
      { x: 680, y: 170, w: 200, h: 22, type: 'rock' },
      { x: 940, y: 150, w: 180, h: 22, type: 'rock' },
      { x: 440, y: 440, w: 360, h: 100, type: 'ground' },
      { x: 900, y: 440, w: 380, h: 100, type: 'ground' },
      { x: 1220, y: 290, w: 120, h: 24, type: 'rock' },
      { x: 1420, y: 200, w: 120, h: 24, type: 'rock' },
      { x: 1640, y: 120, w: 160, h: 26, type: 'rock' },
      { x: 1880, y: 230, w: 110, h: 24, type: 'rock' },
      { x: 2080, y: 440, w: 360, h: 100, type: 'ground' },
      { x: 2540, y: 440, w: 460, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 1960, y: 360, w: 90, h: 20, moveX: 0, moveY: 60, speed: 0.045 },
      { x: 2400, y: 410, w: 90, h: 20, moveX: 45, moveY: 0, speed: 0.045 }
    ],
    fallingPlatforms: [],
    jumpPads: [
      { x: 300, y: 414, boost: -16.5 }
    ],
    spikes: [
      { x: 500, y: 422, w: 50, h: 18 },
      { x: 960, y: 422, w: 50, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 560, y: 414, left: 470, right: 760, speed: 1.6 },
      { type: 'crab', x: 1020, y: 414, left: 930, right: 1240, speed: 1.7 },
      { type: 'flyer', x: 620, y: 110, left: 450, right: 850, speed: 1.6, amplitude: 20, subtype: 'seagull' },
      { type: 'flyer', x: 1520, y: 130, left: 1360, right: 1750, speed: 1.7, amplitude: 25, subtype: 'seagull' }
    ],
    coins: [
      { x: 440, y: 140 }, { x: 500, y: 140 }, { x: 720, y: 120 }, { x: 780, y: 120 },
      { x: 980, y: 100 }, { x: 1040, y: 100 }, { x: 620, y: 390 }, { x: 1100, y: 390 },
      { x: 1240, y: 240 }, { x: 1440, y: 150 }, { x: 1680, y: 70 }, { x: 1740, y: 70 },
      { x: 2120, y: 390 }, { x: 2600, y: 390 }, { x: 2700, y: 390 }
    ],
    keyPos: { x: 1710, y: 75 },
    chestPos: { x: 2840, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2720, y: 440 }]
  },

  // 5-BOSQICH: "Zangori Moviy Laguna" (Yemiriluvchi platformalar)
  {
    name: "Zangori Moviy Laguna",
    theme: "lagoon",
    difficulty: 2,
    description: "Moviy dengiz ustidagi qadimiy yemiriluvchi tosh ko'priklar!",
    platforms: [
      { x: 0, y: 440, w: 420, h: 100, type: 'ground' },
      { x: 260, y: 330, w: 110, h: 22, type: 'rock' },
      { x: 720, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 1060, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 1380, y: 310, w: 120, h: 22, type: 'rock' },
      { x: 1560, y: 190, w: 160, h: 24, type: 'rock' },
      { x: 1800, y: 290, w: 110, h: 22, type: 'rock' },
      { x: 2040, y: 440, w: 280, h: 100, type: 'ground' },
      { x: 2520, y: 440, w: 480, h: 100, type: 'ground' }
    ],
    movingPlatforms: [],
    fallingPlatforms: [
      { x: 460, y: 390, w: 90, h: 22 },
      { x: 580, y: 390, w: 90, h: 22 },
      { x: 1220, y: 380, w: 95, h: 22 },
      { x: 2360, y: 400, w: 100, h: 22 }
    ],
    jumpPads: [
      { x: 860, y: 414, boost: -16.5 }
    ],
    spikes: [
      { x: 760, y: 422, w: 50, h: 18 },
      { x: 2100, y: 422, w: 50, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 780, y: 414, left: 740, right: 950, speed: 1.8 },
      { type: 'crab', x: 1100, y: 414, left: 1070, right: 1280, speed: 1.8 },
      { type: 'flyer', x: 1500, y: 120, left: 1350, right: 1750, speed: 1.7, amplitude: 22, subtype: 'parrot' }
    ],
    coins: [
      { x: 160, y: 390 }, { x: 280, y: 280 }, { x: 490, y: 340 }, { x: 610, y: 340 },
      { x: 760, y: 390 }, { x: 880, y: 260 }, { x: 1250, y: 330 }, { x: 1400, y: 260 },
      { x: 1600, y: 140 }, { x: 1660, y: 140 }, { x: 1820, y: 240 }, { x: 2080, y: 390 },
      { x: 2390, y: 350 }, { x: 2600, y: 390 }
    ],
    keyPos: { x: 1630, y: 140 },
    chestPos: { x: 2820, y: 398 },
    palms: [{ x: 100, y: 440 }, { x: 2700, y: 440 }]
  },

  // 6-BOSQICH: "Mayya Qadimiy Xarobalari" (Vertikal liftlar & Piramida)
  {
    name: "Mayya Piramidasi",
    theme: "lagoon",
    difficulty: 3,
    description: "Vertikal tosh liftlar va qadimiy quyosh piramidasi.",
    platforms: [
      { x: 0, y: 440, w: 360, h: 100, type: 'ground' },
      { x: 220, y: 340, w: 100, h: 22, type: 'rock' },
      { x: 360, y: 260, w: 110, h: 22, type: 'rock' },
      { x: 520, y: 180, w: 120, h: 22, type: 'rock' },
      { x: 760, y: 440, w: 300, h: 100, type: 'ground' },
      { x: 1140, y: 440, w: 420, h: 100, type: 'ground' },
      { x: 1220, y: 350, w: 260, h: 24, type: 'rock' },
      { x: 1300, y: 260, w: 180, h: 24, type: 'rock' },
      { x: 1380, y: 170, w: 120, h: 26, type: 'rock' },
      { x: 1640, y: 270, w: 110, h: 22, type: 'rock' },
      { x: 1820, y: 360, w: 110, h: 22, type: 'rock' },
      { x: 2020, y: 440, w: 300, h: 100, type: 'ground' },
      { x: 2540, y: 440, w: 460, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 670, y: 340, w: 85, h: 20, moveX: 0, moveY: 85, speed: 0.045 },
      { x: 2360, y: 390, w: 90, h: 20, moveX: 65, moveY: 0, speed: 0.045 }
    ],
    fallingPlatforms: [
      { x: 1000, y: 400, w: 90, h: 22 },
      { x: 1930, y: 340, w: 80, h: 22 }
    ],
    jumpPads: [],
    spikes: [
      { x: 820, y: 422, w: 60, h: 18 },
      { x: 2140, y: 422, w: 60, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 800, y: 414, left: 770, right: 1010, speed: 1.8 },
      { type: 'flyer', x: 480, y: 120, left: 340, right: 680, speed: 1.7, amplitude: 22, subtype: 'parrot' },
      { type: 'flyer', x: 1420, y: 100, left: 1260, right: 1620, speed: 1.8, amplitude: 25, subtype: 'parrot' }
    ],
    coins: [
      { x: 150, y: 390 }, { x: 250, y: 290 }, { x: 390, y: 210 }, { x: 550, y: 130 },
      { x: 680, y: 250 }, { x: 860, y: 390 }, { x: 1030, y: 350 }, { x: 1240, y: 300 },
      { x: 1320, y: 210 }, { x: 1420, y: 120 }, { x: 1660, y: 220 }, { x: 2080, y: 390 },
      { x: 2380, y: 330 }, { x: 2650, y: 390 }
    ],
    keyPos: { x: 1430, y: 125 },
    chestPos: { x: 2850, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2700, y: 440 }]
  },

  // 7-BOSQICH: "Oltin Qum Cho'li" (Kanyon va Tramplin sakrashlari)
  {
    name: "Oltin Qum Cho'li",
    theme: "canyon",
    difficulty: 3,
    description: "Jazirama cho'l vodiysi va tubsiz qum daralari.",
    platforms: [
      { x: 0, y: 440, w: 360, h: 100, type: 'ground' },
      { x: 200, y: 320, w: 100, h: 22, type: 'rock' },
      { x: 600, y: 220, w: 180, h: 25, type: 'rock' },
      { x: 860, y: 440, w: 320, h: 100, type: 'ground' },
      { x: 960, y: 310, w: 110, h: 22, type: 'rock' },
      { x: 1260, y: 440, w: 300, h: 100, type: 'ground' },
      { x: 1400, y: 290, w: 120, h: 22, type: 'rock' },
      { x: 1600, y: 170, w: 150, h: 25, type: 'rock' },
      { x: 1820, y: 280, w: 110, h: 22, type: 'rock' },
      { x: 2020, y: 440, w: 320, h: 100, type: 'ground' },
      { x: 2560, y: 440, w: 440, h: 100, type: 'ground' }
    ],
    movingPlatforms: [],
    fallingPlatforms: [
      { x: 420, y: 350, w: 90, h: 22 },
      { x: 2380, y: 400, w: 95, h: 22 }
    ],
    jumpPads: [
      { x: 270, y: 414, boost: -17 },
      { x: 1100, y: 414, boost: -16.5 }
    ],
    spikes: [
      { x: 900, y: 422, w: 55, h: 18 },
      { x: 2100, y: 422, w: 60, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 920, y: 414, left: 880, right: 1120, speed: 2.1 },
      { type: 'crab', x: 1320, y: 414, left: 1270, right: 1520, speed: 2.2 },
      { type: 'flyer', x: 1640, y: 100, left: 1480, right: 1820, speed: 1.9, amplitude: 25, subtype: 'crow' }
    ],
    coins: [
      { x: 160, y: 390 }, { x: 230, y: 270 }, { x: 620, y: 160 }, { x: 680, y: 160 },
      { x: 900, y: 390 }, { x: 1000, y: 260 }, { x: 1150, y: 260 }, { x: 1420, y: 230 },
      { x: 1640, y: 110 }, { x: 1700, y: 110 }, { x: 1840, y: 220 }, { x: 2060, y: 390 },
      { x: 2420, y: 350 }, { x: 2650, y: 390 }
    ],
    keyPos: { x: 1660, y: 115 },
    chestPos: { x: 2860, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2750, y: 440 }]
  },

  // 8-BOSQICH: "Kanyon Qaroqchilari O'tishi" (Xoch harakatli platformalar)
  {
    name: "Qizil Kanyon Yo'li",
    theme: "canyon",
    difficulty: 3,
    description: "Tor qizil kanyon darasi va sinxron harakatlanuvchi toshlar.",
    platforms: [
      { x: 0, y: 440, w: 340, h: 100, type: 'ground' },
      { x: 220, y: 330, w: 100, h: 22, type: 'rock' },
      { x: 380, y: 240, w: 100, h: 22, type: 'rock' },
      { x: 680, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 1080, y: 440, w: 280, h: 100, type: 'ground' },
      { x: 1220, y: 310, w: 100, h: 22, type: 'rock' },
      { x: 1400, y: 210, w: 110, h: 22, type: 'rock' },
      { x: 1620, y: 120, w: 140, h: 24, type: 'rock' },
      { x: 1840, y: 230, w: 100, h: 22, type: 'rock' },
      { x: 2020, y: 330, w: 100, h: 22, type: 'rock' },
      { x: 2240, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 2620, y: 440, w: 380, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 520, y: 380, w: 85, h: 20, moveX: 65, moveY: 0, speed: 0.045 },
      { x: 960, y: 340, w: 80, h: 20, moveX: 0, moveY: 70, speed: 0.05 },
      { x: 2460, y: 390, w: 85, h: 20, moveX: 55, moveY: 20, speed: 0.045 }
    ],
    fallingPlatforms: [
      { x: 1520, y: 160, w: 80, h: 20 },
      { x: 1740, y: 170, w: 80, h: 20 }
    ],
    jumpPads: [],
    spikes: [
      { x: 740, y: 422, w: 50, h: 18 },
      { x: 1120, y: 422, w: 55, h: 18 },
      { x: 2300, y: 422, w: 60, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 140, y: 414, left: 60, right: 300, speed: 2.1 },
      { type: 'crab', x: 1140, y: 414, left: 1090, right: 1320, speed: 2.2 },
      { type: 'flyer', x: 1600, y: 80, left: 1450, right: 1800, speed: 1.9, amplitude: 25, subtype: 'crow' }
    ],
    coins: [
      { x: 160, y: 390 }, { x: 240, y: 280 }, { x: 400, y: 190 }, { x: 540, y: 330 },
      { x: 720, y: 390 }, { x: 980, y: 270 }, { x: 1240, y: 260 }, { x: 1420, y: 160 },
      { x: 1660, y: 70 }, { x: 1710, y: 70 }, { x: 1860, y: 180 }, { x: 2040, y: 280 },
      { x: 2280, y: 390 }, { x: 2700, y: 390 }
    ],
    keyPos: { x: 1680, y: 75 },
    chestPos: { x: 2880, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2700, y: 440 }]
  },

  // 9-BOSQICH: "Dovulli Qorong'i Dengiz" (Bo'ron va Chaqmoqlar)
  {
    name: "Dovulli Qorong'i Dengiz",
    theme: "storm",
    difficulty: 3,
    description: "Momaqaldiroq osmoni, qora to‘lqinlar va chayqaluvchi kema qoldiqlari.",
    platforms: [
      { x: 0, y: 440, w: 360, h: 100, type: 'ground' },
      { x: 200, y: 320, w: 100, h: 22, type: 'rock' },
      { x: 340, y: 230, w: 100, h: 22, type: 'rock' },
      { x: 620, y: 440, w: 320, h: 100, type: 'ground' },
      { x: 740, y: 300, w: 110, h: 22, type: 'rock' },
      { x: 1060, y: 440, w: 340, h: 100, type: 'ground' },
      { x: 1220, y: 280, w: 120, h: 22, type: 'rock' },
      { x: 1440, y: 180, w: 130, h: 24, type: 'rock' },
      { x: 1640, y: 110, w: 150, h: 26, type: 'rock' },
      { x: 1860, y: 220, w: 110, h: 22, type: 'rock' },
      { x: 2040, y: 320, w: 110, h: 22, type: 'rock' },
      { x: 2220, y: 440, w: 300, h: 100, type: 'ground' },
      { x: 2620, y: 440, w: 380, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 480, y: 390, w: 85, h: 20, moveX: 60, moveY: 0, speed: 0.05 },
      { x: 2460, y: 390, w: 85, h: 20, moveX: 60, moveY: 0, speed: 0.05 }
    ],
    fallingPlatforms: [
      { x: 1340, y: 220, w: 75, h: 20 },
      { x: 1560, y: 140, w: 75, h: 20 }
    ],
    jumpPads: [
      { x: 900, y: 414, boost: -16.5 }
    ],
    spikes: [
      { x: 660, y: 422, w: 45, h: 18 },
      { x: 1120, y: 422, w: 50, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 680, y: 414, left: 630, right: 900, speed: 2.2 },
      { type: 'flyer', x: 800, y: 180, left: 650, right: 1050, speed: 2.0, amplitude: 25, subtype: 'crow' },
      { type: 'flyer', x: 1650, y: 70, left: 1450, right: 1850, speed: 2.1, amplitude: 30, subtype: 'crow' }
    ],
    coins: [
      { x: 150, y: 390 }, { x: 220, y: 270 }, { x: 360, y: 180 }, { x: 500, y: 340 },
      { x: 760, y: 250 }, { x: 920, y: 270 }, { x: 1240, y: 230 }, { x: 1460, y: 130 },
      { x: 1680, y: 60 }, { x: 1730, y: 60 }, { x: 1880, y: 170 }, { x: 2060, y: 270 },
      { x: 2260, y: 390 }, { x: 2700, y: 390 }
    ],
    keyPos: { x: 1700, y: 65 },
    chestPos: { x: 2850, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2720, y: 440 }]
  },

  // 10-BOSQICH: "Momaqaldiroq Qoyasi" (Tik cho'qqi va Vertikal sinov)
  {
    name: "Momaqaldiroq Qoyasi",
    theme: "storm",
    difficulty: 4,
    description: "Tik qoyali chaqmoq minoralari va tikanli jarliklar.",
    platforms: [
      { x: 0, y: 440, w: 320, h: 100, type: 'ground' },
      { x: 180, y: 330, w: 90, h: 22, type: 'rock' },
      { x: 300, y: 240, w: 90, h: 22, type: 'rock' },
      { x: 440, y: 160, w: 100, h: 22, type: 'rock' },
      { x: 680, y: 440, w: 240, h: 100, type: 'ground' },
      { x: 1040, y: 440, w: 240, h: 100, type: 'ground' },
      { x: 1200, y: 310, w: 90, h: 22, type: 'rock' },
      { x: 1360, y: 220, w: 90, h: 22, type: 'rock' },
      { x: 1540, y: 130, w: 140, h: 25, type: 'rock' },
      { x: 1740, y: 70, w: 120, h: 26, type: 'rock' },
      { x: 1940, y: 180, w: 90, h: 22, type: 'rock' },
      { x: 2100, y: 290, w: 90, h: 22, type: 'rock' },
      { x: 2280, y: 440, w: 240, h: 100, type: 'ground' },
      { x: 2640, y: 440, w: 360, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 550, y: 340, w: 80, h: 20, moveX: 0, moveY: 80, speed: 0.05 },
      { x: 920, y: 330, w: 80, h: 20, moveX: 0, moveY: 75, speed: 0.05 },
      { x: 2480, y: 390, w: 80, h: 20, moveX: 55, moveY: 0, speed: 0.05 }
    ],
    fallingPlatforms: [
      { x: 1460, y: 170, w: 75, h: 20 },
      { x: 1860, y: 120, w: 75, h: 20 }
    ],
    jumpPads: [],
    spikes: [
      { x: 220, y: 422, w: 50, h: 18 },
      { x: 720, y: 422, w: 55, h: 18 },
      { x: 1080, y: 422, w: 55, h: 18 },
      { x: 2320, y: 422, w: 60, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 740, y: 414, left: 690, right: 900, speed: 2.4 },
      { type: 'flyer', x: 1300, y: 150, left: 1100, right: 1500, speed: 2.2, amplitude: 28, subtype: 'crow' },
      { type: 'flyer', x: 1750, y: 50, left: 1600, right: 1920, speed: 2.2, amplitude: 25, subtype: 'crow' }
    ],
    coins: [
      { x: 140, y: 390 }, { x: 200, y: 280 }, { x: 320, y: 190 }, { x: 460, y: 110 },
      { x: 570, y: 250 }, { x: 940, y: 240 }, { x: 1220, y: 260 }, { x: 1380, y: 170 },
      { x: 1580, y: 80 }, { x: 1760, y: 30 }, { x: 1960, y: 130 }, { x: 2120, y: 240 },
      { x: 2340, y: 390 }, { x: 2750, y: 390 }
    ],
    keyPos: { x: 1790, y: 30 },
    chestPos: { x: 2880, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2720, y: 440 }]
  },

  // 11-BOSQICH: "Muzlagan Qaroqchi Kemasi" (Shimol yog'dusi & Muzlagan sollar)
  {
    name: "Muzlagan Qaroqchi Kemasi",
    theme: "frozen",
    difficulty: 4,
    description: "Shimol yog‘dusi ostida suzuvchi muz orollari va sovuq shamol.",
    platforms: [
      { x: 0, y: 440, w: 360, h: 100, type: 'ground' },
      { x: 220, y: 320, w: 100, h: 22, type: 'rock' },
      { x: 380, y: 230, w: 100, h: 22, type: 'rock' },
      { x: 700, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 1060, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 1200, y: 310, w: 100, h: 22, type: 'rock' },
      { x: 1380, y: 210, w: 110, h: 22, type: 'rock' },
      { x: 1580, y: 120, w: 150, h: 25, type: 'rock' },
      { x: 1800, y: 220, w: 100, h: 22, type: 'rock' },
      { x: 1980, y: 320, w: 100, h: 22, type: 'rock' },
      { x: 2180, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 2580, y: 440, w: 420, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 520, y: 410, w: 90, h: 20, moveX: 70, moveY: 0, speed: 0.04 },
      { x: 920, y: 360, w: 85, h: 20, moveX: 0, moveY: 60, speed: 0.045 },
      { x: 2400, y: 410, w: 90, h: 20, moveX: 60, moveY: 0, speed: 0.045 }
    ],
    fallingPlatforms: [
      { x: 800, y: 340, w: 80, h: 20 },
      { x: 1480, y: 160, w: 80, h: 20 }
    ],
    jumpPads: [],
    spikes: [
      { x: 740, y: 422, w: 50, h: 18 },
      { x: 2220, y: 422, w: 55, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 1100, y: 414, left: 1070, right: 1300, speed: 2.2 },
      { type: 'flyer', x: 600, y: 160, left: 450, right: 800, speed: 1.8, amplitude: 25, subtype: 'seagull' },
      { type: 'flyer', x: 1600, y: 70, left: 1400, right: 1800, speed: 2.0, amplitude: 30, subtype: 'seagull' }
    ],
    coins: [
      { x: 160, y: 390 }, { x: 240, y: 270 }, { x: 400, y: 180 }, { x: 540, y: 360 },
      { x: 730, y: 390 }, { x: 820, y: 290 }, { x: 940, y: 310 }, { x: 1220, y: 260 },
      { x: 1400, y: 160 }, { x: 1620, y: 70 }, { x: 1680, y: 70 }, { x: 1820, y: 170 },
      { x: 2200, y: 390 }, { x: 2640, y: 390 }
    ],
    keyPos: { x: 1650, y: 80 },
    chestPos: { x: 2850, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2750, y: 440 }]
  },

  // 12-BOSQICH: "Shimoliy Muz Cho'qqilari" (Muz tramplinlari)
  {
    name: "Muz Cho'qqilari Zanjiri",
    theme: "frozen",
    difficulty: 4,
    description: "Muzlagan daralar ustida ketma-ket tramplin sakrashlari!",
    platforms: [
      { x: 0, y: 440, w: 320, h: 100, type: 'ground' },
      { x: 200, y: 310, w: 90, h: 22, type: 'rock' },
      { x: 480, y: 200, w: 140, h: 24, type: 'rock' },
      { x: 780, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 1120, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 1260, y: 290, w: 100, h: 22, type: 'rock' },
      { x: 1440, y: 190, w: 110, h: 22, type: 'rock' },
      { x: 1660, y: 90, w: 140, h: 26, type: 'rock' },
      { x: 1880, y: 200, w: 100, h: 22, type: 'rock' },
      { x: 2060, y: 310, w: 100, h: 22, type: 'rock' },
      { x: 2240, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 2620, y: 440, w: 380, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 670, y: 360, w: 85, h: 20, moveX: 0, moveY: 65, speed: 0.05 },
      { x: 2460, y: 400, w: 85, h: 20, moveX: 60, moveY: 0, speed: 0.05 }
    ],
    fallingPlatforms: [
      { x: 1550, y: 135, w: 80, h: 20 },
      { x: 1790, y: 145, w: 80, h: 20 }
    ],
    jumpPads: [
      { x: 320, y: 414, boost: -17 },
      { x: 940, y: 414, boost: -16.5 }
    ],
    spikes: [
      { x: 220, y: 422, w: 50, h: 18 },
      { x: 820, y: 422, w: 55, h: 18 },
      { x: 2280, y: 422, w: 60, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 840, y: 414, left: 790, right: 1020, speed: 2.3 },
      { type: 'flyer', x: 1650, y: 55, left: 1450, right: 1850, speed: 2.2, amplitude: 28, subtype: 'seagull' }
    ],
    coins: [
      { x: 150, y: 390 }, { x: 220, y: 260 }, { x: 500, y: 150 }, { x: 560, y: 150 },
      { x: 820, y: 390 }, { x: 980, y: 260 }, { x: 1280, y: 240 }, { x: 1460, y: 140 },
      { x: 1680, y: 45 }, { x: 1740, y: 45 }, { x: 1900, y: 150 }, { x: 2080, y: 260 },
      { x: 2300, y: 390 }, { x: 2680, y: 390 }
    ],
    keyPos: { x: 1720, y: 50 },
    chestPos: { x: 2880, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2750, y: 440 }]
  },

  // 13-BOSQICH: "Qaynoq Magma G'ori" (Lava to'lqinlari)
  {
    name: "Qaynoq Magma G'ori",
    theme: "volcano",
    difficulty: 4,
    description: "Yer osti vulqon g‘ori, qaynoq lava va qora bazalt toshlar.",
    platforms: [
      { x: 0, y: 440, w: 340, h: 100, type: 'ground' },
      { x: 200, y: 330, w: 90, h: 22, type: 'rock' },
      { x: 360, y: 240, w: 90, h: 22, type: 'rock' },
      { x: 680, y: 440, w: 240, h: 100, type: 'ground' },
      { x: 1040, y: 440, w: 240, h: 100, type: 'ground' },
      { x: 1200, y: 310, w: 90, h: 22, type: 'rock' },
      { x: 1380, y: 210, w: 100, h: 22, type: 'rock' },
      { x: 1580, y: 120, w: 140, h: 24, type: 'rock' },
      { x: 1800, y: 220, w: 90, h: 22, type: 'rock' },
      { x: 1980, y: 320, w: 90, h: 22, type: 'rock' },
      { x: 2180, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 2580, y: 440, w: 420, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 500, y: 380, w: 85, h: 20, moveX: 70, moveY: 0, speed: 0.05 },
      { x: 900, y: 340, w: 80, h: 20, moveX: 0, moveY: 70, speed: 0.05 },
      { x: 2400, y: 390, w: 85, h: 20, moveX: 65, moveY: 0, speed: 0.05 }
    ],
    fallingPlatforms: [
      { x: 1480, y: 160, w: 80, h: 20 },
      { x: 1720, y: 160, w: 80, h: 20 }
    ],
    jumpPads: [],
    spikes: [
      { x: 720, y: 422, w: 55, h: 18 },
      { x: 1080, y: 422, w: 55, h: 18 },
      { x: 2220, y: 422, w: 60, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 740, y: 414, left: 690, right: 900, speed: 2.4 },
      { type: 'flyer', x: 1550, y: 70, left: 1380, right: 1780, speed: 2.1, amplitude: 25, subtype: 'bat' }
    ],
    coins: [
      { x: 150, y: 390 }, { x: 220, y: 280 }, { x: 380, y: 190 }, { x: 520, y: 330 },
      { x: 720, y: 390 }, { x: 920, y: 290 }, { x: 1220, y: 260 }, { x: 1400, y: 160 },
      { x: 1600, y: 70 }, { x: 1660, y: 70 }, { x: 1820, y: 170 }, { x: 2000, y: 270 },
      { x: 2240, y: 390 }, { x: 2650, y: 390 }
    ],
    keyPos: { x: 1640, y: 80 },
    chestPos: { x: 2860, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2720, y: 440 }]
  },

  // 14-BOSQICH: "Vulqon Otilishi" (Tezkor lava liftlari)
  {
    name: "Vulqon Otilishi",
    theme: "volcano",
    difficulty: 5,
    description: "Tezkor lava liftlari va xavfli olovli to'siqlar!",
    platforms: [
      { x: 0, y: 440, w: 300, h: 100, type: 'ground' },
      { x: 180, y: 320, w: 85, h: 22, type: 'rock' },
      { x: 320, y: 220, w: 85, h: 22, type: 'rock' },
      { x: 620, y: 440, w: 220, h: 100, type: 'ground' },
      { x: 960, y: 440, w: 220, h: 100, type: 'ground' },
      { x: 1120, y: 300, w: 90, h: 22, type: 'rock' },
      { x: 1300, y: 200, w: 90, h: 22, type: 'rock' },
      { x: 1500, y: 110, w: 130, h: 24, type: 'rock' },
      { x: 1720, y: 80, w: 120, h: 26, type: 'rock' },
      { x: 1940, y: 190, w: 90, h: 22, type: 'rock' },
      { x: 2120, y: 300, w: 90, h: 22, type: 'rock' },
      { x: 2320, y: 440, w: 240, h: 100, type: 'ground' },
      { x: 2700, y: 440, w: 300, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 450, y: 380, w: 80, h: 20, moveX: 65, moveY: 0, speed: 0.055 },
      { x: 820, y: 320, w: 80, h: 20, moveX: 0, moveY: 80, speed: 0.055 },
      { x: 1620, y: 150, w: 75, h: 20, moveX: 0, moveY: 60, speed: 0.055 },
      { x: 2520, y: 400, w: 80, h: 20, moveX: 65, moveY: 0, speed: 0.055 }
    ],
    fallingPlatforms: [],
    jumpPads: [
      { x: 1020, y: 414, boost: -16.5 }
    ],
    spikes: [
      { x: 660, y: 422, w: 55, h: 18 },
      { x: 1000, y: 422, w: 60, h: 18 },
      { x: 2360, y: 422, w: 65, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 670, y: 414, left: 630, right: 820, speed: 2.6 },
      { type: 'flyer', x: 1700, y: 50, left: 1500, right: 1900, speed: 2.3, amplitude: 30, subtype: 'bat' }
    ],
    coins: [
      { x: 140, y: 390 }, { x: 200, y: 270 }, { x: 340, y: 170 }, { x: 470, y: 330 },
      { x: 680, y: 390 }, { x: 840, y: 250 }, { x: 1140, y: 250 }, { x: 1320, y: 150 },
      { x: 1520, y: 60 }, { x: 1740, y: 35 }, { x: 1960, y: 140 }, { x: 2140, y: 250 },
      { x: 2360, y: 390 }, { x: 2750, y: 390 }
    ],
    keyPos: { x: 1770, y: 40 },
    chestPos: { x: 2920, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2750, y: 440 }]
  },

  // 15-BOSQICH: "Arvoh Kema Qabristoni" (Binafsha tuman & Arvoh qushlar)
  {
    name: "Arvoh Kema Qabristoni",
    theme: "mystic",
    difficulty: 4,
    description: "Tilsimlangan tumanli dengiz va qora arvoh kemalar.",
    platforms: [
      { x: 0, y: 440, w: 320, h: 100, type: 'ground' },
      { x: 200, y: 320, w: 90, h: 22, type: 'rock' },
      { x: 360, y: 220, w: 90, h: 22, type: 'rock' },
      { x: 660, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 1020, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 1180, y: 300, w: 100, h: 22, type: 'rock' },
      { x: 1380, y: 200, w: 110, h: 22, type: 'rock' },
      { x: 1580, y: 110, w: 140, h: 25, type: 'rock' },
      { x: 1800, y: 210, w: 100, h: 22, type: 'rock' },
      { x: 1980, y: 310, w: 100, h: 22, type: 'rock' },
      { x: 2180, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 2580, y: 440, w: 420, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 500, y: 380, w: 85, h: 20, moveX: 60, moveY: 0, speed: 0.05 },
      { x: 900, y: 340, w: 80, h: 20, moveX: 0, moveY: 65, speed: 0.05 },
      { x: 2420, y: 400, w: 85, h: 20, moveX: 60, moveY: 0, speed: 0.05 }
    ],
    fallingPlatforms: [
      { x: 1480, y: 150, w: 80, h: 20 },
      { x: 1720, y: 160, w: 80, h: 20 }
    ],
    jumpPads: [],
    spikes: [
      { x: 700, y: 422, w: 55, h: 18 },
      { x: 2220, y: 422, w: 55, h: 18 }
    ],
    enemies: [
      { type: 'flyer', x: 750, y: 180, left: 600, right: 950, speed: 2.1, amplitude: 25, subtype: 'bat' },
      { type: 'flyer', x: 1600, y: 70, left: 1420, right: 1800, speed: 2.2, amplitude: 30, subtype: 'bat' }
    ],
    coins: [
      { x: 150, y: 390 }, { x: 220, y: 270 }, { x: 380, y: 170 }, { x: 520, y: 330 },
      { x: 720, y: 390 }, { x: 920, y: 280 }, { x: 1200, y: 250 }, { x: 1400, y: 150 },
      { x: 1620, y: 60 }, { x: 1680, y: 60 }, { x: 1820, y: 160 }, { x: 2000, y: 260 },
      { x: 2220, y: 390 }, { x: 2650, y: 390 }
    ],
    keyPos: { x: 1640, y: 70 },
    chestPos: { x: 2860, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2720, y: 440 }]
  },

  // 16-BOSQICH: "Tilsimlangan Tumanli Voha" (Labirint orollar)
  {
    name: "Tilsimlangan Voha",
    theme: "mystic",
    difficulty: 5,
    description: "Mistik binafsha labirint va samoviy arvoh ko'prigi.",
    platforms: [
      { x: 0, y: 440, w: 300, h: 100, type: 'ground' },
      { x: 180, y: 310, w: 85, h: 22, type: 'rock' },
      { x: 320, y: 200, w: 140, h: 24, type: 'rock' },
      { x: 580, y: 160, w: 160, h: 22, type: 'rock' },
      { x: 860, y: 140, w: 160, h: 22, type: 'rock' },
      { x: 620, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 1020, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 1240, y: 280, w: 100, h: 22, type: 'rock' },
      { x: 1440, y: 180, w: 110, h: 22, type: 'rock' },
      { x: 1660, y: 90, w: 140, h: 26, type: 'rock' },
      { x: 1900, y: 190, w: 90, h: 22, type: 'rock' },
      { x: 2080, y: 300, w: 90, h: 22, type: 'rock' },
      { x: 2260, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 2640, y: 440, w: 360, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 1120, y: 350, w: 80, h: 20, moveX: 0, moveY: 70, speed: 0.055 },
      { x: 2480, y: 390, w: 80, h: 20, moveX: 60, moveY: 0, speed: 0.055 }
    ],
    fallingPlatforms: [
      { x: 740, y: 150, w: 80, h: 20 },
      { x: 1550, y: 130, w: 80, h: 20 },
      { x: 1800, y: 140, w: 80, h: 20 }
    ],
    jumpPads: [
      { x: 220, y: 414, boost: -16.5 }
    ],
    spikes: [
      { x: 660, y: 422, w: 60, h: 18 },
      { x: 1060, y: 422, w: 60, h: 18 },
      { x: 2300, y: 422, w: 60, h: 18 }
    ],
    enemies: [
      { type: 'flyer', x: 650, y: 100, left: 500, right: 850, speed: 2.2, amplitude: 25, subtype: 'bat' },
      { type: 'flyer', x: 1700, y: 50, left: 1520, right: 1880, speed: 2.3, amplitude: 30, subtype: 'bat' }
    ],
    coins: [
      { x: 340, y: 150 }, { x: 600, y: 110 }, { x: 760, y: 100 }, { x: 880, y: 90 },
      { x: 650, y: 390 }, { x: 1040, y: 390 }, { x: 1260, y: 230 }, { x: 1460, y: 130 },
      { x: 1680, y: 45 }, { x: 1740, y: 45 }, { x: 1920, y: 140 }, { x: 2100, y: 250 },
      { x: 2320, y: 390 }, { x: 2700, y: 390 }
    ],
    keyPos: { x: 1720, y: 50 },
    chestPos: { x: 2880, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2720, y: 440 }]
  },

  // 17-BOSQICH: "Bulutlar Ustidagi Orol" (Samoviy bulut tramplinlari)
  {
    name: "Bulutlar Ustidagi Orol",
    theme: "sky",
    difficulty: 5,
    description: "Dengizdan balandda muallaq suzuvchi oltin bulutlar.",
    platforms: [
      { x: 0, y: 440, w: 300, h: 100, type: 'ground' },
      { x: 180, y: 310, w: 85, h: 22, type: 'rock' },
      { x: 480, y: 180, w: 140, h: 24, type: 'rock' },
      { x: 760, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 1080, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 1240, y: 280, w: 100, h: 22, type: 'rock' },
      { x: 1440, y: 170, w: 110, h: 22, type: 'rock' },
      { x: 1640, y: 80, w: 150, h: 26, type: 'rock' },
      { x: 1880, y: 180, w: 100, h: 22, type: 'rock' },
      { x: 2060, y: 290, w: 100, h: 22, type: 'rock' },
      { x: 2240, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 2640, y: 440, w: 360, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 640, y: 340, w: 85, h: 20, moveX: 0, moveY: 70, speed: 0.05 },
      { x: 2480, y: 400, w: 85, h: 20, moveX: 60, moveY: 0, speed: 0.05 }
    ],
    fallingPlatforms: [
      { x: 1540, y: 120, w: 80, h: 20 },
      { x: 1780, y: 130, w: 80, h: 20 }
    ],
    jumpPads: [
      { x: 280, y: 414, boost: -17 },
      { x: 920, y: 414, boost: -17 }
    ],
    spikes: [
      { x: 800, y: 422, w: 55, h: 18 },
      { x: 2280, y: 422, w: 60, h: 18 }
    ],
    enemies: [
      { type: 'flyer', x: 500, y: 120, left: 350, right: 700, speed: 2.2, amplitude: 25, subtype: 'seagull' },
      { type: 'flyer', x: 1650, y: 40, left: 1450, right: 1850, speed: 2.3, amplitude: 30, subtype: 'seagull' }
    ],
    coins: [
      { x: 150, y: 390 }, { x: 200, y: 260 }, { x: 500, y: 130 }, { x: 560, y: 130 },
      { x: 800, y: 390 }, { x: 960, y: 260 }, { x: 1260, y: 230 }, { x: 1460, y: 120 },
      { x: 1680, y: 35 }, { x: 1740, y: 35 }, { x: 1900, y: 130 }, { x: 2080, y: 240 },
      { x: 2300, y: 390 }, { x: 2700, y: 390 }
    ],
    keyPos: { x: 1700, y: 40 },
    chestPos: { x: 2880, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2750, y: 440 }]
  },

  // 18-BOSQICH: "Samoviy Qaroqchilar Qasri" (Oliy samoviy minoralar)
  {
    name: "Samoviy Qasr",
    theme: "sky",
    difficulty: 5,
    description: "Muallaq shohona qasr va bulutlar aro parvoz qiluvchi qushlar.",
    platforms: [
      { x: 0, y: 440, w: 280, h: 100, type: 'ground' },
      { x: 160, y: 320, w: 80, h: 22, type: 'rock' },
      { x: 280, y: 220, w: 80, h: 22, type: 'rock' },
      { x: 420, y: 140, w: 120, h: 24, type: 'rock' },
      { x: 660, y: 440, w: 240, h: 100, type: 'ground' },
      { x: 1020, y: 440, w: 240, h: 100, type: 'ground' },
      { x: 1180, y: 290, w: 90, h: 22, type: 'rock' },
      { x: 1360, y: 190, w: 90, h: 22, type: 'rock' },
      { x: 1540, y: 100, w: 120, h: 24, type: 'rock' },
      { x: 1720, y: 60, w: 130, h: 26, type: 'rock' },
      { x: 1920, y: 160, w: 90, h: 22, type: 'rock' },
      { x: 2100, y: 270, w: 90, h: 22, type: 'rock' },
      { x: 2280, y: 440, w: 240, h: 100, type: 'ground' },
      { x: 2660, y: 440, w: 340, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 550, y: 320, w: 80, h: 20, moveX: 0, moveY: 80, speed: 0.055 },
      { x: 920, y: 330, w: 80, h: 20, moveX: 0, moveY: 80, speed: 0.055 },
      { x: 2500, y: 400, w: 80, h: 20, moveX: 60, moveY: 0, speed: 0.055 }
    ],
    fallingPlatforms: [
      { x: 1450, y: 140, w: 75, h: 20 },
      { x: 1840, y: 110, w: 75, h: 20 }
    ],
    jumpPads: [],
    spikes: [
      { x: 700, y: 422, w: 55, h: 18 },
      { x: 1060, y: 422, w: 55, h: 18 },
      { x: 2320, y: 422, w: 60, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 720, y: 414, left: 670, right: 880, speed: 2.6 },
      { type: 'flyer', x: 1300, y: 120, left: 1120, right: 1480, speed: 2.3, amplitude: 25, subtype: 'crow' },
      { type: 'flyer', x: 1720, y: 30, left: 1580, right: 1900, speed: 2.4, amplitude: 25, subtype: 'crow' }
    ],
    coins: [
      { x: 130, y: 390 }, { x: 180, y: 270 }, { x: 300, y: 170 }, { x: 440, y: 90 },
      { x: 700, y: 390 }, { x: 940, y: 250 }, { x: 1200, y: 240 }, { x: 1380, y: 140 },
      { x: 1560, y: 50 }, { x: 1750, y: 20 }, { x: 1940, y: 110 }, { x: 2120, y: 220 },
      { x: 2340, y: 390 }, { x: 2750, y: 390 }
    ],
    keyPos: { x: 1780, y: 25 },
    chestPos: { x: 2900, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2750, y: 440 }]
  },

  // 19-BOSQICH: "Qora Soqol Qal'asi: Darvoza" (Qonli qal'a devorlari)
  {
    name: "Qora Soqol Qal'asi: Darvoza",
    theme: "citadel",
    difficulty: 5,
    description: "Qal'a mudofaa devorlari, zanjirli ko'priklar va qilichboz qo'riqchilar.",
    platforms: [
      { x: 0, y: 440, w: 280, h: 100, type: 'ground' },
      { x: 160, y: 320, w: 80, h: 22, type: 'rock' },
      { x: 300, y: 220, w: 90, h: 22, type: 'rock' },
      { x: 600, y: 440, w: 240, h: 100, type: 'ground' },
      { x: 960, y: 440, w: 240, h: 100, type: 'ground' },
      { x: 1120, y: 290, w: 90, h: 22, type: 'rock' },
      { x: 1320, y: 190, w: 100, h: 22, type: 'rock' },
      { x: 1520, y: 100, w: 120, h: 24, type: 'rock' },
      { x: 1720, y: 70, w: 130, h: 26, type: 'rock' },
      { x: 1920, y: 170, w: 90, h: 22, type: 'rock' },
      { x: 2100, y: 280, w: 90, h: 22, type: 'rock' },
      { x: 2280, y: 440, w: 240, h: 100, type: 'ground' },
      { x: 2660, y: 440, w: 340, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 440, y: 380, w: 80, h: 20, moveX: 65, moveY: 0, speed: 0.055 },
      { x: 820, y: 330, w: 80, h: 20, moveX: 0, moveY: 75, speed: 0.055 },
      { x: 2500, y: 390, w: 80, h: 20, moveX: 65, moveY: 0, speed: 0.055 }
    ],
    fallingPlatforms: [
      { x: 1420, y: 140, w: 75, h: 20 },
      { x: 1840, y: 120, w: 75, h: 20 }
    ],
    jumpPads: [
      { x: 200, y: 414, boost: -16.5 },
      { x: 1000, y: 414, boost: -16.5 }
    ],
    spikes: [
      { x: 640, y: 422, w: 60, h: 18 },
      { x: 1040, y: 422, w: 60, h: 18 },
      { x: 2320, y: 422, w: 65, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 660, y: 414, left: 610, right: 820, speed: 2.7 },
      { type: 'flyer', x: 1400, y: 120, left: 1200, right: 1600, speed: 2.4, amplitude: 25, subtype: 'crow' },
      { type: 'flyer', x: 1750, y: 40, left: 1580, right: 1900, speed: 2.5, amplitude: 25, subtype: 'crow' }
    ],
    coins: [
      { x: 140, y: 390 }, { x: 180, y: 270 }, { x: 320, y: 170 }, { x: 460, y: 330 },
      { x: 680, y: 390 }, { x: 840, y: 250 }, { x: 1140, y: 240 }, { x: 1340, y: 140 },
      { x: 1540, y: 50 }, { x: 1740, y: 25 }, { x: 1940, y: 120 }, { x: 2120, y: 230 },
      { x: 2340, y: 390 }, { x: 2750, y: 390 }
    ],
    keyPos: { x: 1770, y: 30 },
    chestPos: { x: 2900, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2750, y: 440 }]
  },

  // 20-BOSQICH: "Afsonaviy Oltin Sandiq: Yakuniy Jang" (Mutlaq Final Bosqich)
  {
    name: "Afsonaviy Oltin Sandiq",
    theme: "citadel",
    difficulty: 5,
    description: "Mutlaq Final! Qaroqchilar Taxti va afsonaviy xazinaga eltuvchi so'nggi jangi!",
    platforms: [
      { x: 0, y: 440, w: 280, h: 100, type: 'ground' },
      { x: 160, y: 330, w: 80, h: 22, type: 'rock' },
      { x: 380, y: 190, w: 160, h: 24, type: 'rock' },
      { x: 620, y: 160, w: 140, h: 22, type: 'rock' },
      { x: 420, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 860, y: 440, w: 300, h: 100, type: 'ground' },
      { x: 960, y: 320, w: 100, h: 22, type: 'rock' },
      { x: 1280, y: 440, w: 280, h: 100, type: 'ground' },
      { x: 1380, y: 310, w: 100, h: 22, type: 'rock' },
      { x: 1560, y: 210, w: 110, h: 22, type: 'rock' },
      { x: 1760, y: 100, w: 150, h: 26, type: 'rock' },
      { x: 2000, y: 200, w: 100, h: 22, type: 'rock' },
      { x: 2180, y: 300, w: 100, h: 22, type: 'rock' },
      { x: 2360, y: 440, w: 260, h: 100, type: 'ground' },
      { x: 2720, y: 440, w: 280, h: 100, type: 'ground' }
    ],
    movingPlatforms: [
      { x: 730, y: 380, w: 85, h: 20, moveX: 55, moveY: 0, speed: 0.055 },
      { x: 1200, y: 330, w: 80, h: 20, moveX: 0, moveY: 75, speed: 0.055 },
      { x: 2640, y: 390, w: 80, h: 20, moveX: 50, moveY: 0, speed: 0.055 }
    ],
    fallingPlatforms: [
      { x: 290, y: 400, w: 75, h: 20 },
      { x: 1670, y: 150, w: 75, h: 20 },
      { x: 1920, y: 145, w: 75, h: 20 }
    ],
    jumpPads: [
      { x: 240, y: 414, boost: -17 },
      { x: 1060, y: 414, boost: -17 }
    ],
    spikes: [
      { x: 480, y: 422, w: 60, h: 18 },
      { x: 900, y: 422, w: 60, h: 18 },
      { x: 1320, y: 422, w: 60, h: 18 },
      { x: 2400, y: 422, w: 60, h: 18 }
    ],
    enemies: [
      { type: 'crab', x: 920, y: 414, left: 880, right: 1120, speed: 2.8 },
      { type: 'crab', x: 1350, y: 414, left: 1300, right: 1540, speed: 2.8 },
      { type: 'flyer', x: 600, y: 110, left: 450, right: 750, speed: 2.4, amplitude: 25, subtype: 'crow' },
      { type: 'flyer', x: 1800, y: 55, left: 1650, right: 1950, speed: 2.5, amplitude: 28, subtype: 'crow' }
    ],
    coins: [
      { x: 400, y: 140 }, { x: 460, y: 140 }, { x: 640, y: 110 }, { x: 700, y: 110 },
      { x: 880, y: 390 }, { x: 1000, y: 270 }, { x: 1100, y: 270 }, { x: 1400, y: 260 },
      { x: 1580, y: 160 }, { x: 1800, y: 50 }, { x: 1860, y: 50 }, { x: 2020, y: 150 },
      { x: 2200, y: 250 }, { x: 2420, y: 390 }, { x: 2800, y: 390 }, { x: 2860, y: 390 }
    ],
    keyPos: { x: 1820, y: 60 },
    chestPos: { x: 2860, y: 398 },
    palms: [{ x: 80, y: 440 }, { x: 2750, y: 440 }]
  }
];

let platforms = [];
let movingPlatforms = [];
let fallingPlatforms = [];
let jumpPads = [];
let spikes = [];
let enemies = [];
let coins = [];
let goldenKey = null;
let treasureChest = null;
let palmTrees = [];
let questionBlocks = [];
let brickBlocks = [];
let warpPipes = [];
let superMushrooms = [];

function setupMarioLevelEntities(index, level) {
  // 1. Agar darajada aniq berilgan bo'lsa
  if (level.warpPipes) {
    level.warpPipes.forEach(p => warpPipes.push(new WarpPipe(p.x, p.y, p.h, p.w)));
  }
  if (level.questionBlocks) {
    level.questionBlocks.forEach(qb => questionBlocks.push(new QuestionBlock(qb.x, qb.y, qb.content)));
  }
  if (level.brickBlocks) {
    level.brickBlocks.forEach(bb => brickBlocks.push(new BrickBlock(bb.x, bb.y)));
  }

  // 2. 20 ta bosqichning barchasi uchun xavfsiz va aniq Mario elementlarini joylashtirish
  const isSafeGround = (x, w) => {
    const sps = level.spikes || [];
    const pads = level.jumpPads || [];
    for (const s of sps) {
      if (x + w > s.x - 22 && x < s.x + s.w + 22) return false;
    }
    for (const jp of pads) {
      if (x + w > jp.x - 22 && x < jp.x + 36 + 22) return false;
    }
    if (x < 170 || x > level.chestPos.x - 85) return false;
    return true;
  };

  const groundPlats = level.platforms.filter(p => p.type === 'ground' && p.y >= 430 && p.w >= 180);

  groundPlats.forEach((plat, pIdx) => {
    // Mario Yashil Quvuri (Warp Pipe)
    const pipeHeights = [65, 75, 80, 70];
    const ph = pipeHeights[(index + pIdx) % pipeHeights.length];
    const pipeX = plat.x + plat.w - 74;
    if (isSafeGround(pipeX, 54)) {
      warpPipes.push(new WarpPipe(pipeX, plat.y - ph, ph, 54));
    }

    if (plat.w >= 360 && pIdx > 0) {
      const midPipeX = plat.x + 40;
      if (isSafeGround(midPipeX, 54)) {
        warpPipes.push(new WarpPipe(midPipeX, plat.y - 62, 62, 54));
      }
    }

    // Mario Bloklari klasteri (y = 310 da, Mario bosh bilan urishi uchun qulay)
    const blockStartX = plat.x + Math.floor(plat.w * 0.25);
    if (blockStartX + 120 < plat.x + plat.w - 80 && isSafeGround(blockStartX, 120)) {
      if (pIdx % 2 === 0) {
        brickBlocks.push(new BrickBlock(blockStartX, 310));
        questionBlocks.push(new QuestionBlock(blockStartX + 36, 310, pIdx === 0 ? 'mushroom' : 'coin'));
        brickBlocks.push(new BrickBlock(blockStartX + 72, 310));
        questionBlocks.push(new QuestionBlock(blockStartX + 108, 310, 'coin'));
      } else {
        questionBlocks.push(new QuestionBlock(blockStartX, 310, 'coin'));
        brickBlocks.push(new BrickBlock(blockStartX + 36, 310));
        questionBlocks.push(new QuestionBlock(blockStartX + 72, 310, 'mushroom'));
      }
    }
  });

  // Yuqori tosh platformalar ustida maxsus Mario ? bloklari
  const upperPlats = level.platforms.filter(p => p.type === 'rock' && p.y >= 240 && p.y <= 340 && p.w >= 100);
  upperPlats.forEach((up, uIdx) => {
    if (uIdx % 2 === 0) {
      const bx = up.x + Math.floor(up.w / 2) - 18;
      const content = (uIdx === 0 && index % 2 === 1) ? 'mushroom' : 'coin';
      questionBlocks.push(new QuestionBlock(bx, up.y - 88, content));
    }
  });

  // Har bir bosqichda kamida bitta Super Qo'ziqorin bo'lishini ta'minlash
  const hasMushroom = questionBlocks.some(qb => qb.content === 'mushroom');
  if (!hasMushroom && questionBlocks.length > 0) {
    questionBlocks[0].content = 'mushroom';
  }
}

function loadLevel(index) {
  currentLevelIndex = index;
  const level = LEVELS[index];

  platforms = [];
  movingPlatforms = [];
  fallingPlatforms = [];
  jumpPads = [];
  spikes = [];
  enemies = [];
  coins = [];
  palmTrees = [];
  questionBlocks = [];
  brickBlocks = [];
  warpPipes = [];
  superMushrooms = [];

  // Mario bloklari va yashil quvurlarni darajaga yuklash
  setupMarioLevelEntities(index, level);

  // Platformalar
  level.platforms.forEach(p => {
    platforms.push({ x: p.x, y: p.y, width: p.w, height: p.h, type: p.type });
  });

  // Harakatlanuvchi platformalar
  if (level.movingPlatforms) {
    level.movingPlatforms.forEach(mp => {
      movingPlatforms.push(new MovingPlatform(mp.x, mp.y, mp.w, mp.h, mp.moveX, mp.moveY, mp.speed));
    });
  }

  // Yemiriluvchi platformalar
  if (level.fallingPlatforms) {
    level.fallingPlatforms.forEach(fp => {
      fallingPlatforms.push(new FallingPlatform(fp.x, fp.y, fp.w, fp.h));
    });
  }

  // Sakrash tramplinlari
  if (level.jumpPads) {
    level.jumpPads.forEach(jp => {
      jumpPads.push(new JumpPad(jp.x, jp.y, jp.boost));
    });
  }

  // Tikanlar
  if (level.spikes) {
    level.spikes.forEach(sp => {
      spikes.push(new Spike(sp.x, sp.y, sp.w, sp.h));
    });
  }

  // Dushmanlar (Qisqichbaqalar va Qanotli dushmanlar)
  if (level.enemies) {
    level.enemies.forEach(en => {
      if (en.type === 'crab') {
        enemies.push(new CrabEnemy(en.x, en.y, en.left, en.right, en.speed));
      } else if (en.type === 'flyer') {
        enemies.push(new FlyingEnemy(en.x, en.y, en.left, en.right, en.speed, en.amplitude, en.subtype));
      }
    });
  }

  // Tangalar
  if (level.coins) {
    level.coins.forEach(c => coins.push(new Coin(c.x, c.y)));
  }

  // Kalit va Sandiq
  goldenKey = new GoldenKey(level.keyPos.x, level.keyPos.y);
  treasureChest = new TreasureChest(level.chestPos.x, level.chestPos.y);

  // Palmalar
  palmTrees = level.palms || [];

  // Gradientni yangilash
  updateSkyGradient(level.theme);

  // O'yinchilarni joylashtirish
  teamHasKey = false;
  player1.resetForLevel(80, 360);
  if (gameMode === '2P') {
    player2.resetForLevel(130, 360);
  }
  cameraX = 0;
  updateHUD();
}

function checkAABB(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

// ==========================================
// 9. ORQA FON VA TABIAT (Ultra Crisp HD Render)
// ==========================================
let cloudOffset = 0;
let waveOffset = 0;

function drawBackground(ctx, camX) {
  cloudOffset += 0.2;
  waveOffset += 0.045;
  const currentTheme = LEVELS[currentLevelIndex].theme;

  // 1. Osmon (Boy va jonli gradient)
  ctx.fillStyle = currentSkyGrad || '#1565c0';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // 2. Osmon Jismlari (Quyosh / Shafaq / To'lin Oy / Chaqmoq)
  if (currentTheme === 'tropical' || currentTheme === 'lagoon' || currentTheme === 'sky') {
    const sunX = 820 - camX * 0.08;
    const sunY = 90;

    ctx.fillStyle = currentTheme === 'sky' ? 'rgba(255, 235, 140, 0.35)' : 'rgba(255, 235, 140, 0.22)';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 78, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 200, 0.45)';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 52, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff9db';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    for (let r = 0; r < 8; r++) {
      const ang = (r * Math.PI / 4) + Date.now() * 0.0003;
      ctx.beginPath();
      ctx.moveTo(sunX + Math.cos(ang) * 44, sunY + Math.sin(ang) * 44);
      ctx.lineTo(sunX + Math.cos(ang) * 62, sunY + Math.sin(ang) * 62);
      ctx.stroke();
    }
  } else if (currentTheme === 'sunset' || currentTheme === 'canyon') {
    const sunX = 760 - camX * 0.08;
    const sunY = 140;

    ctx.fillStyle = currentTheme === 'canyon' ? 'rgba(255, 140, 0, 0.3)' : 'rgba(255, 107, 0, 0.26)';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 84, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 190, 11, 0.52)';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 56, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffbe0b';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 44, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff3b0';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  } else if (currentTheme === 'storm') {
    if (Math.random() < 0.012) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }
    const moonX = 820 - camX * 0.08;
    const moonY = 80;
    ctx.fillStyle = 'rgba(173, 181, 189, 0.2)';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 45, 0, Math.PI * 2);
    ctx.fill();
  } else if (currentTheme === 'frozen') {
    ctx.save();
    ctx.globalAlpha = 0.45 + Math.sin(Date.now() * 0.001) * 0.15;
    const grad = ctx.createLinearGradient(0, 40, 0, 220);
    grad.addColorStop(0, 'rgba(0, 255, 180, 0.35)');
    grad.addColorStop(0.5, 'rgba(72, 202, 228, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 120);
    for (let x = 0; x <= GAME_WIDTH; x += 40) {
      const y = 90 + Math.sin(x * 0.008 + Date.now() * 0.001) * 35;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(GAME_WIDTH, 220);
    ctx.lineTo(0, 220);
    ctx.fill();
    ctx.restore();

    const moonX = 820 - camX * 0.08;
    const moonY = 85;
    ctx.fillStyle = 'rgba(202, 240, 248, 0.3)';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 28, 0, Math.PI * 2);
    ctx.fill();
  } else if (currentTheme === 'volcano' || currentTheme === 'citadel') {
    const moonX = 820 - camX * 0.08;
    const moonY = 90;
    ctx.fillStyle = currentTheme === 'citadel' ? 'rgba(154, 3, 30, 0.4)' : 'rgba(220, 47, 2, 0.35)';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 58, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff4d6d';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 32, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // To'lin Oy (Full Moon with glowing craters)
    const moonX = 820 - camX * 0.08;
    const moonY = 90;

    ctx.fillStyle = 'rgba(129, 140, 248, 0.16)';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 68, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(199, 210, 254, 0.35)';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 46, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 34, 0, Math.PI * 2);
    ctx.fill();

    // Kraterlar
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(moonX - 9, moonY - 5, 7, 0, Math.PI * 2);
    ctx.arc(moonX + 8, moonY + 7, 8.5, 0, Math.PI * 2);
    ctx.arc(moonX + 11, moonY - 9, 5, 0, Math.PI * 2);
    ctx.fill();

    // Miltillovchi yulduzlar
    ctx.fillStyle = '#ffffff';
    for (let s = 0; s < 24; s++) {
      const sx = ((s * 137 + cloudOffset * 0.2) % GAME_WIDTH);
      const sy = (s * 43) % 230;
      ctx.globalAlpha = 0.55 + Math.sin(Date.now() * 0.003 + s) * 0.35;
      ctx.fillRect(sx, sy, 2.5, 2.5);
    }
    ctx.globalAlpha = 1.0;
  }

  // 3. Bulutlar (High Definition 2-Layered Fluffy Clouds)
  const isTropical = currentTheme === 'tropical' || currentTheme === 'lagoon';
  const isSunset = currentTheme === 'sunset' || currentTheme === 'canyon';
  const cloudTop = isTropical ? '#ffffff' : (isSunset ? '#ffccd5' : '#c8b6ff');
  const cloudShadow = isTropical ? 'rgba(180, 215, 245, 0.65)' : (isSunset ? 'rgba(180, 70, 120, 0.45)' : 'rgba(60, 30, 90, 0.45)');

  drawCloud(ctx, (120 + cloudOffset) % 1400 - camX * 0.15, 60, 0.95, cloudTop, cloudShadow);
  drawCloud(ctx, (540 + cloudOffset * 0.8) % 1400 - camX * 0.15, 110, 0.75, cloudTop, cloudShadow);
  drawCloud(ctx, (980 + cloudOffset * 1.1) % 1400 - camX * 0.15, 75, 1.15, cloudTop, cloudShadow);

  // 4. Uzoqdagi Tog'lar va Orollar Silueti (2 ta qatlam: orqa va old tog'lar)
  let farMountainColor = 'rgba(100, 181, 246, 0.5)';
  let mountainColor = '#42a5f5';
  let waveColor = '#00b4d8';
  if (currentTheme === 'sunset') {
    farMountainColor = 'rgba(90, 24, 154, 0.45)';
    mountainColor = '#5a189a';
    waveColor = '#7209b7';
  } else if (currentTheme === 'lagoon') {
    farMountainColor = 'rgba(0, 150, 199, 0.45)';
    mountainColor = '#0077b6';
    waveColor = '#48cae4';
  } else if (currentTheme === 'canyon') {
    farMountainColor = 'rgba(153, 53, 16, 0.5)';
    mountainColor = '#b23b00';
    waveColor = '#e85d04';
  } else if (currentTheme === 'storm') {
    farMountainColor = 'rgba(27, 27, 30, 0.6)';
    mountainColor = '#212529';
    waveColor = '#343a40';
  } else if (currentTheme === 'frozen') {
    farMountainColor = 'rgba(72, 202, 228, 0.45)';
    mountainColor = '#0077b6';
    waveColor = '#90e0ef';
  } else if (currentTheme === 'volcano') {
    farMountainColor = 'rgba(55, 6, 23, 0.65)';
    mountainColor = '#370617';
    waveColor = '#dc2f02';
  } else if (currentTheme === 'mystic') {
    farMountainColor = 'rgba(36, 0, 70, 0.65)';
    mountainColor = '#240046';
    waveColor = '#7b2cbf';
  } else if (currentTheme === 'sky') {
    farMountainColor = 'rgba(94, 96, 206, 0.45)';
    mountainColor = '#5e60ce';
    waveColor = '#ffbe0b';
  } else if (currentTheme === 'citadel') {
    farMountainColor = 'rgba(43, 9, 9, 0.7)';
    mountainColor = '#1a0000';
    waveColor = '#9a031e';
  }

  ctx.fillStyle = farMountainColor;
  ctx.beginPath();
  ctx.moveTo(0, 390);
  for (let x = 0; x <= GAME_WIDTH + 60; x += 50) {
    const worldPos = x + camX * 0.12;
    const y = 330 + Math.sin(worldPos * 0.003) * 55;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(GAME_WIDTH, GAME_HEIGHT);
  ctx.lineTo(0, GAME_HEIGHT);
  ctx.fill();

  ctx.fillStyle = mountainColor;
  ctx.beginPath();
  ctx.moveTo(0, 395);
  for (let x = 0; x <= GAME_WIDTH + 60; x += 60) {
    const worldPos = x + camX * 0.2;
    const y = 355 + Math.sin(worldPos * 0.005) * 38;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(GAME_WIDTH, GAME_HEIGHT);
  ctx.lineTo(0, GAME_HEIGHT);
  ctx.fill();

  // 5. Dengiz / Suv Sathi (Oldindan hisoblangan tezkor gradient)
  if (currentWaterGrad) {
    ctx.fillStyle = currentWaterGrad;
    ctx.fillRect(0, 460, GAME_WIDTH, 80);
  }

  // To'lqin tanasi
  ctx.fillStyle = waveColor;
  ctx.beginPath();
  ctx.moveTo(0, 464);
  for (let x = 0; x <= GAME_WIDTH + 25; x += 25) {
    const y = 464 + Math.sin(x * 0.04 + waveOffset) * 4.5;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(GAME_WIDTH, GAME_HEIGHT);
  ctx.lineTo(0, GAME_HEIGHT);
  ctx.fill();

  // Qaynoq oppoq dengiz ko'pigi (Crisp Seafoam Crest)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.82)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let x = 0; x <= GAME_WIDTH; x += 10) {
    const y = 464 + Math.sin(x * 0.04 + waveOffset) * 4.5;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Suv yuzasidagi yaltiroq nurlar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  for (let g = 0; g < 9; g++) {
    const gx = ((g * 115 + waveOffset * 22) % GAME_WIDTH);
    const gy = 478 + (g % 3) * 16;
    ctx.fillRect(gx, gy, 18, 2);
  }

  // 6. Palmalar
  palmTrees.forEach(palm => {
    drawPalmTree(ctx, palm.x - camX, palm.y, currentTheme);
  });
}

function drawCloud(ctx, x, y, scale = 1, topColor = '#ffffff', shadowColor = 'rgba(180, 215, 245, 0.65)') {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.fillStyle = shadowColor;
  ctx.beginPath();
  ctx.arc(0, 4, 25, 0, Math.PI * 2);
  ctx.arc(23, -6, 29, 0, Math.PI * 2);
  ctx.arc(49, 4, 23, 0, Math.PI * 2);
  ctx.arc(26, 14, 21, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = topColor;
  ctx.beginPath();
  ctx.arc(0, 0, 24, 0, Math.PI * 2);
  ctx.arc(22, -10, 28, 0, Math.PI * 2);
  ctx.arc(48, 0, 22, 0, Math.PI * 2);
  ctx.arc(26, 10, 20, 0, Math.PI * 2);
  ctx.fill();

  // Classic Super Mario cute smiling cloud eyes
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(17, 0, 2.2, 4.8, 0, 0, Math.PI * 2);
  ctx.ellipse(31, 0, 2.2, 4.8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawPalmTree(ctx, x, y, theme) {
  if (x < -100 || x > GAME_WIDTH + 100) return;

  ctx.save();
  ctx.translate(x, y);

  ctx.strokeStyle = theme === 'volcano' ? '#3d261d' : '#6f4e37';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-15, -60, -8, -120);
  ctx.stroke();

  ctx.strokeStyle = '#2b1b17';
  ctx.lineWidth = 2;
  for (let seg = 1; seg <= 7; seg++) {
    const t = seg / 8;
    const px = 0 * (1-t)*(1-t) + (-15) * 2*(1-t)*t + (-8) * t*t;
    const py = 0 * (1-t)*(1-t) + (-60) * 2*(1-t)*t + (-120) * t*t;
    ctx.beginPath();
    ctx.moveTo(px - 5, py);
    ctx.lineTo(px + 5, py);
    ctx.stroke();
  }

  // Kokos yong'oqlari (3 ta)
  ctx.fillStyle = '#4a2810';
  ctx.beginPath();
  ctx.arc(-11, -118, 5, 0, Math.PI * 2);
  ctx.arc(-5, -116, 5.5, 0, Math.PI * 2);
  ctx.arc(-7, -122, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#6f4e37';
  ctx.beginPath();
  ctx.arc(-11, -119, 2, 0, Math.PI * 2);
  ctx.arc(-5, -117, 2, 0, Math.PI * 2);
  ctx.fill();

  const leafAngles = [-0.95, -0.45, 0.05, 0.55, 1.05, -1.35];
  const leafDark = theme === 'volcano' ? '#143625' : (theme === 'sunset' ? '#1b4332' : '#2d6a4f');
  const leafLight = theme === 'volcano' ? '#2d6a4f' : (theme === 'sunset' ? '#52b788' : '#70e000');

  leafAngles.forEach(ang => {
    ctx.save();
    ctx.translate(-8, -120);
    ctx.rotate(ang + Math.sin(Date.now() * 0.002 + x) * 0.05);

    ctx.fillStyle = leafDark;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(25, -18, 58, 6);
    ctx.quadraticCurveTo(20, 5, 0, 0);
    ctx.fill();

    ctx.strokeStyle = leafLight;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(25, -18, 58, 6);
    ctx.stroke();

    ctx.restore();
  });

  ctx.restore();
}

const THEME_STYLES = {
  tropical: {
    groundTop: '#70e000',
    groundMid: '#2d6a4f',
    groundBody: '#e9c46a',
    groundBase: '#c68a4c',
    rockBody: '#495057',
    rockTop: '#a7c957',
    rockHighlight: 'rgba(255, 255, 255, 0.4)'
  },
  sunset: {
    groundTop: '#6a994e',
    groundMid: '#386641',
    groundBody: '#b08968',
    groundBase: '#6f4e37',
    rockBody: '#582f0e',
    rockTop: '#ddb892',
    rockHighlight: 'rgba(255, 200, 150, 0.4)'
  },
  lagoon: {
    groundTop: '#48cae4',
    groundMid: '#0077b6',
    groundBody: '#90e0ef',
    groundBase: '#023e8a',
    rockBody: '#03045e',
    rockTop: '#00b4d8',
    rockHighlight: 'rgba(200, 245, 255, 0.5)'
  },
  canyon: {
    groundTop: '#dda15e',
    groundMid: '#bc6c25',
    groundBody: '#d4a373',
    groundBase: '#8c5020',
    rockBody: '#7f4f24',
    rockTop: '#bc6c25',
    rockHighlight: 'rgba(255, 220, 180, 0.4)'
  },
  storm: {
    groundTop: '#6c757d',
    groundMid: '#495057',
    groundBody: '#343a40',
    groundBase: '#212529',
    rockBody: '#1f2428',
    rockTop: '#adb5bd',
    rockHighlight: 'rgba(255, 255, 255, 0.3)'
  },
  frozen: {
    groundTop: '#ffffff',
    groundMid: '#caf0f8',
    groundBody: '#90e0ef',
    groundBase: '#0077b6',
    rockBody: '#005f73',
    rockTop: '#e0fbfc',
    rockHighlight: 'rgba(255, 255, 255, 0.8)'
  },
  volcano: {
    groundTop: '#ff4d00',
    groundMid: '#a2673e',
    groundBody: '#582f0e',
    groundBase: '#331800',
    rockBody: '#2b2d42',
    rockTop: '#e07a5f',
    rockHighlight: 'rgba(255, 120, 40, 0.5)'
  },
  mystic: {
    groundTop: '#c77dff',
    groundMid: '#7b2cbf',
    groundBody: '#4a0e4e',
    groundBase: '#240046',
    rockBody: '#3c096c',
    rockTop: '#9d4edd',
    rockHighlight: 'rgba(230, 180, 255, 0.5)'
  },
  sky: {
    groundTop: '#fff3b0',
    groundMid: '#e09f3e',
    groundBody: '#98c1d9',
    groundBase: '#3d5a80',
    rockBody: '#293241',
    rockTop: '#ee6c4d',
    rockHighlight: 'rgba(255, 255, 255, 0.6)'
  },
  citadel: {
    groundTop: '#d4af37',
    groundMid: '#216869',
    groundBody: '#1f2421',
    groundBase: '#111513',
    rockBody: '#273043',
    rockTop: '#9e2a2b',
    rockHighlight: 'rgba(255, 215, 0, 0.5)'
  }
};

function drawPlatforms(ctx, camX) {
  const currentTheme = LEVELS[currentLevelIndex].theme;
  const style = THEME_STYLES[currentTheme] || THEME_STYLES.tropical;

  platforms.forEach(plat => {
    const drawX = plat.x - camX;
    if (drawX + plat.width < -50 || drawX > GAME_WIDTH + 50) return;

    if (plat.type === 'ground') {
      ctx.fillStyle = style.groundBody;
      ctx.fillRect(drawX, plat.y, plat.width, plat.height);

      ctx.fillStyle = style.groundBase;
      ctx.fillRect(drawX, plat.y + 20, plat.width, plat.height - 20);

      // Stratifikatsiya qatlamlari
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(drawX, plat.y + 36, plat.width, 6);
      ctx.fillRect(drawX, plat.y + 58, plat.width, 8);

      // Maysa/qoplama qatlami
      ctx.fillStyle = style.groundMid;
      ctx.fillRect(drawX, plat.y, plat.width, 12);

      ctx.fillStyle = style.groundTop;
      ctx.fillRect(drawX, plat.y, plat.width, 4);

      for (let px = 0; px < plat.width - 6; px += 10) {
        ctx.beginPath();
        ctx.moveTo(drawX + px, plat.y + 12);
        ctx.lineTo(drawX + px + 5, plat.y + 17);
        ctx.lineTo(drawX + px + 10, plat.y + 12);
        ctx.fill();
      }

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(drawX, plat.y, plat.width, plat.height);
    } else {
      ctx.fillStyle = style.rockBody;
      roundRect(ctx, drawX, plat.y, plat.width, plat.height, 8, true, false);

      ctx.fillStyle = style.rockTop;
      roundRect(ctx, drawX + 2, plat.y + 1, plat.width - 4, 7, 4, true, false);

      ctx.strokeStyle = style.rockHighlight;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(drawX + 8, plat.y + 2);
      ctx.lineTo(drawX + plat.width - 8, plat.y + 2);
      ctx.stroke();

      ctx.strokeStyle = '#1b1b1b';
      ctx.lineWidth = 2;
      roundRect(ctx, drawX, plat.y, plat.width, plat.height, 8, false, true);

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(drawX + 16, plat.y + 10);
      ctx.lineTo(drawX + 32, plat.y + 18);
      ctx.moveTo(drawX + plat.width - 24, plat.y + 9);
      ctx.lineTo(drawX + plat.width - 12, plat.y + 16);
      ctx.stroke();
    }
  });
}

function drawVignette(ctx) {
  // Vignette is rendered via hardware-accelerated CSS on #game-container::after
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
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
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

// ==========================================
// 10. BOSQICHLARNI BOSHQARISH VA MODALLAR
// ==========================================
function updateHUD() {
  const isMobile = window.innerWidth <= 850;
  if (isMobile) {
    levelDisplay.textContent = `${currentLevelIndex + 1}-B.`;
  } else {
    levelDisplay.textContent = `${currentLevelIndex + 1}-Bosqich`;
  }

  // 1-O'yinchi (Qizil)
  let p1Hearts = '';
  for (let i = 0; i < 3; i++) {
    p1Hearts += (player1.alive && i < player1.lives) ? '❤️' : '🖤';
  }
  p1LivesDisplay.textContent = p1Hearts;
  p1CoinsDisplay.textContent = isMobile ? `${player1.coins * 10}` : `${player1.coins * 10} (${player1.coins})`;

  // 2-O'yinchi (Ko'k)
  if (gameMode === '2P') {
    if (p2Hud) p2Hud.style.display = 'flex';
    let p2Hearts = '';
    for (let i = 0; i < 3; i++) {
      p2Hearts += (player2.alive && i < player2.lives) ? '❤️' : '🖤';
    }
    p2LivesDisplay.textContent = p2Hearts;
    p2CoinsDisplay.textContent = isMobile ? `${player2.coins * 10}` : `${player2.coins * 10} (${player2.coins})`;
  } else {
    if (p2Hud) p2Hud.style.display = 'none';
  }

  // Kalit holati
  const hasKey = teamHasKey || player1.hasKey || (player2 && player2.hasKey);
  if (hasKey) {
    keyDisplay.textContent = isMobile ? '✅' : '✅ Bor';
    keyDisplay.classList.add('has-key');
  } else {
    keyDisplay.textContent = isMobile ? '—' : 'Yo‘q';
    keyDisplay.classList.remove('has-key');
  }

  updateMobileControlsVisibility();
}

function startNewGame() {
  player1.resetForNewGame(80, 360);
  if (gameMode === '2P') {
    player2.resetForNewGame(130, 360);
  }
  teamHasKey = false;
  loadLevel(0);
  gameState = 'PLAYING';
  if (duelScreen) duelScreen.classList.remove('active');
  startScreen.classList.remove('active');
  gameOverScreen.classList.remove('active');
  levelCompleteScreen.classList.remove('active');
  victoryScreen.classList.remove('active');
  if (levelsScreen) levelsScreen.classList.remove('active');
  if (quizScreen) quizScreen.classList.remove('active');
  if (burgerMenuModal) burgerMenuModal.classList.remove('active');
  if (helpModal) helpModal.classList.remove('active');
  stopQuizTimer();
  updateMobileControlsVisibility();
  const gameOverSub = gameOverScreen ? gameOverScreen.querySelector('.subtitle') : null;
  if (gameOverSub) {
    gameOverSub.textContent = 'Barcha qaroqchilar yiqildi, lekin orol sizni yana kutmoqda!';
  }
  particles = [];
  floatingTexts = [];
}

function handleChestOpened() {
  if (currentLevelIndex < LEVELS.length - 1) {
    gameState = 'LEVEL_COMPLETE';
    levelCompleteTitle.textContent = `${currentLevelIndex + 1}-Bosqich: ${LEVELS[currentLevelIndex].name} Fath Etildi!`;
    
    levelP1Stats.textContent = player1.coins * 10;
    if (gameMode === '2P') {
      if (levelP2Card) levelP2Card.style.display = 'block';
      if (levelP2Stats) levelP2Stats.textContent = player2.coins * 10;
      if (levelCompleteWinner) {
        if (player1.coins > player2.coins) {
          levelCompleteWinner.textContent = '🏆 Bosqich yetakchisi: 🔴 1-Qaroqchi (Qizil)!';
        } else if (player2.coins > player1.coins) {
          levelCompleteWinner.textContent = '🏆 Bosqich yetakchisi: 🔵 2-Qaroqchi (Ko‘k)!';
        } else {
          levelCompleteWinner.textContent = '🤝 Do‘stona durang! Zo‘r jamoa!';
        }
      }
    } else {
      if (levelP2Card) levelP2Card.style.display = 'none';
      if (levelCompleteWinner) levelCompleteWinner.textContent = '🎉 Qoyilmaqom g‘alaba!';
    }

    levelCompleteScreen.classList.add('active');
    updateMobileControlsVisibility();
  } else {
    triggerFinalVictory();
  }
}

function proceedToNextLevel() {
  if (duelScreen) duelScreen.classList.remove('active');
  levelCompleteScreen.classList.remove('active');
  if (player1.lives < 3) player1.lives++;
  player1.alive = true;

  if (gameMode === '2P') {
    if (player2.lives < 3) player2.lives++;
    player2.alive = true;
  }

  loadLevel(currentLevelIndex + 1);
  gameState = 'PLAYING';
  updateMobileControlsVisibility();
  showToast(`🏝️ ${currentLevelIndex + 1}-Bosqich: ${LEVELS[currentLevelIndex].name}!`);
}

function triggerFinalVictory() {
  gameState = 'VICTORY';
  const p1Total = (player1.coins * 10) + (player1.lives * 100);
  victoryP1Score.textContent = p1Total;

  if (gameMode === '2P') {
    if (victoryP2Card) victoryP2Card.style.display = 'block';
    const p2Total = (player2.coins * 10) + (player2.lives * 100);
    if (victoryP2Score) victoryP2Score.textContent = p2Total;

    if (victoryChampionText) {
      if (player1.coins > player2.coins) {
        victoryChampionText.textContent = '👑 Bosh Qaroqchilar Qiroli: 🔴 1-Qaroqchi (Qizil)!';
      } else if (player2.coins > player1.coins) {
        victoryChampionText.textContent = '👑 Bosh Qaroqchilar Qiroli: 🔵 2-Qaroqchi (Ko‘k)!';
      } else {
        victoryChampionText.textContent = '👑 Afsonaviy Qaroqchilar Qardoshligi! Tengsiz jamoa!';
      }
    }
  } else {
    if (victoryP2Card) victoryP2Card.style.display = 'none';
    if (victoryChampionText) victoryChampionText.textContent = '👑 Afsonaviy Qaroqchilar Qiroli!';
  }

  victoryScreen.classList.add('active');
  updateMobileControlsVisibility();

  for (let i = 0; i < 50; i++) {
    const colors = ['#ffd166', '#ef476f', '#06d6a0', '#118ab2', '#ffffff', '#ffbe0b'];
    particles.push(new Particle(
      cameraX + Math.random() * GAME_WIDTH,
      Math.random() * 200,
      (Math.random() - 0.5) * 6,
      Math.random() * 3 + 1,
      colors[Math.floor(Math.random() * colors.length)],
      Math.random() * 4 + 2,
      110,
      false
    ));
  }
}

function triggerGameOver() {
  gameState = 'GAMEOVER';
  sound.playGameOver();
  gameOverP1Score.textContent = player1.coins * 10;
  if (gameMode === '2P') {
    if (gameOverP2Card) gameOverP2Card.style.display = 'block';
    if (gameOverP2Score) gameOverP2Score.textContent = player2.coins * 10;
  } else {
    if (gameOverP2Card) gameOverP2Card.style.display = 'none';
  }
  gameOverScreen.classList.add('active');
  updateMobileControlsVisibility();
}

function handlePvPVictory(winner, loser) {
  gameState = 'DUEL_VICTORY';
  sound.playVictory();

  winner.coins += 5; // 50 ochko bonus
  updateHUD();

  if (duelWinnerTitle) {
    duelWinnerTitle.textContent = winner.id === 1 ? '⚔️ 🔴 1-QAROQCHI G‘ALABA QOZONDI!' : '⚔️ 🔵 2-QAROQCHI G‘ALABA QOZONDI!';
  }
  if (duelWinnerSubtitle) {
    duelWinnerSubtitle.textContent = `💥 ${winner.name} ${loser.name}ni mahv etdi va duelda mutlaq g‘olib bo‘ldi!`;
  }
  if (duelP1Score) duelP1Score.textContent = `${player1.coins * 10} 🪙 (${player1.lives > 0 ? player1.lives + ' ❤️' : 'Yiqildi 💀'})`;
  if (duelP2Score) duelP2Score.textContent = `${player2.coins * 10} 🪙 (${player2.lives > 0 ? player2.lives + ' ❤️' : 'Yiqildi 💀'})`;
  if (duelBanner) {
    duelBanner.textContent = winner.id === 1 ? '👑 Jang G‘olibi: 🔴 1-Qaroqchi (Qizil)!' : '👑 Jang G‘olibi: 🔵 2-Qaroqchi (Ko‘k)!';
  }

  if (duelScreen) duelScreen.classList.add('active');
  updateMobileControlsVisibility();

  for (let i = 0; i < 50; i++) {
    const colors = ['#ffd166', '#ef476f', '#06d6a0', '#118ab2', '#ffffff', '#ffbe0b'];
    particles.push(new Particle(
      winner.x + (Math.random() - 0.5) * 50,
      winner.y - 15,
      (Math.random() - 0.5) * 7,
      Math.random() * -5 - 2,
      colors[Math.floor(Math.random() * colors.length)],
      Math.random() * 4 + 2,
      90
    ));
  }
}

if (duelRematchBtn) {
  duelRematchBtn.addEventListener('click', () => {
    sound.init();
    if (duelScreen) duelScreen.classList.remove('active');
    loadLevel(currentLevelIndex);
    gameState = 'PLAYING';
  });
}

if (duelNextBtn) {
  duelNextBtn.addEventListener('click', () => {
    sound.init();
    if (duelScreen) duelScreen.classList.remove('active');
    proceedToNextLevel();
  });
}

// Tugmalar tinglovchilari
startBtn.addEventListener('click', () => {
  sound.init();
  startNewGame();
});

retryBtn.addEventListener('click', () => {
  sound.init();
  startNewGame();
});

nextLevelBtn.addEventListener('click', () => {
  sound.init();
  proceedToNextLevel();
});

playAgainBtn.addEventListener('click', () => {
  sound.init();
  startNewGame();
});

// ==========================================
// 10.1 BOSQICHLAR MENYUSI (MODAL) BOSHQARUVI
// ==========================================
function renderLevelsGrid() {
  if (!levelsGrid) return;
  levelsGrid.innerHTML = '';
  LEVELS.forEach((lvl, index) => {
    const card = document.createElement('div');
    card.className = `level-card ${index === currentLevelIndex ? 'active' : ''}`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    // Qiyinlik yulduzchalari (1-5 yulduz)
    const starsCount = Math.min(5, Math.max(1, Math.ceil((index + 1) / 4)));
    const stars = '⭐'.repeat(starsCount);

    card.innerHTML = `
      <div class="level-card-num">${index + 1}-Bosqich</div>
      <div class="level-card-icon">${lvl.icon || '🏝️'}</div>
      <div class="level-card-name">${lvl.name}</div>
      <div class="level-card-stars" title="${starsCount} yulduzli qiyinlik">${stars}</div>
    `;

    card.addEventListener('click', () => {
      selectLevelFromMenu(index);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectLevelFromMenu(index);
      }
    });

    levelsGrid.appendChild(card);
  });
}

function openLevelsModal() {
  sound.init();
  renderLevelsGrid();
  if (levelsScreen) {
    levelsScreen.classList.add('active');
  }
  updateMobileControlsVisibility();
}

function closeLevelsModal() {
  if (levelsScreen) {
    levelsScreen.classList.remove('active');
  }
  updateMobileControlsVisibility();
}

function selectLevelFromMenu(index) {
  closeLevelsModal();
  if (quizScreen) quizScreen.classList.remove('active');
  stopQuizTimer();
  startScreen.classList.remove('active');
  gameOverScreen.classList.remove('active');
  levelCompleteScreen.classList.remove('active');
  victoryScreen.classList.remove('active');
  if (duelScreen) duelScreen.classList.remove('active');
  if (burgerMenuModal) burgerMenuModal.classList.remove('active');
  if (helpModal) helpModal.classList.remove('active');

  player1.resetForNewGame(80, 360);
  if (gameMode === '2P') {
    player2.resetForNewGame(130, 360);
  }
  teamHasKey = false;
  loadLevel(index);
  gameState = 'PLAYING';
  updateMobileControlsVisibility();
  showToast(`🚀 ${index + 1}-Bosqich: ${LEVELS[index].name}!`);
}

if (levelBtn) {
  levelBtn.addEventListener('click', openLevelsModal);
}
if (levelsMenuBtn) {
  levelsMenuBtn.addEventListener('click', openLevelsModal);
}
if (openLevelsBtn) {
  openLevelsBtn.addEventListener('click', openLevelsModal);
}
if (closeLevelsBtn) {
  closeLevelsBtn.addEventListener('click', closeLevelsModal);
}
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && levelsScreen && levelsScreen.classList.contains('active')) {
    closeLevelsModal();
  }
});

// ==========================================
// 10.2 QUTQARUVCHI FANLAR SINOVI (QUIZ RESCUE)
// ==========================================
const QUIZ_QUESTIONS = {
  math: [
    { q: "7 + 8 = ?", a: "15", options: ["14", "15", "16", "13"] },
    { q: "12 + 15 = ?", a: "27", options: ["25", "27", "28", "26"] },
    { q: "20 - 7 = ?", a: "13", options: ["12", "13", "14", "15"] },
    { q: "15 - 9 = ?", a: "6", options: ["5", "6", "7", "8"] },
    { q: "5 × 5 = ?", a: "25", options: ["20", "25", "30", "15"] },
    { q: "3 × 6 = ?", a: "18", options: ["16", "18", "21", "24"] },
    { q: "4 × 7 = ?", a: "28", options: ["24", "28", "32", "21"] },
    { q: "18 ÷ 2 = ?", a: "9", options: ["8", "9", "7", "6"] },
    { q: "20 ÷ 4 = ?", a: "5", options: ["4", "5", "6", "3"] },
    { q: "30 + 15 = ?", a: "45", options: ["40", "45", "50", "35"] },
    { q: "50 - 20 = ?", a: "30", options: ["25", "30", "35", "40"] },
    { q: "6 × 4 = ?", a: "24", options: ["20", "24", "28", "18"] },
    { q: "9 + 8 = ?", a: "17", options: ["16", "17", "18", "15"] },
    { q: "100 - 40 = ?", a: "60", options: ["50", "60", "70", "55"] },
    { q: "24 ÷ 3 = ?", a: "8", options: ["7", "8", "9", "6"] },
    { q: "11 + 11 = ?", a: "22", options: ["20", "21", "22", "24"] },
    { q: "16 - 8 = ?", a: "8", options: ["6", "7", "8", "9"] },
    { q: "8 × 2 = ?", a: "16", options: ["14", "16", "18", "12"] },
    { q: "9 × 3 = ?", a: "27", options: ["24", "27", "30", "21"] },
    { q: "35 - 15 = ?", a: "20", options: ["15", "20", "25", "10"] }
  ],
  english: [
    { q: "\"Apple\" so‘zining o‘zbekcha tarjimasi nima?", a: "Olma", options: ["Olma", "Banan", "Anor", "Nok"] },
    { q: "\"Book\" so‘zining o‘zbekcha tarjimasi nima?", a: "Kitob", options: ["Daftar", "Kitob", "Qalam", "Stol"] },
    { q: "\"Water\" so‘zining o‘zbekcha tarjimasi nima?", a: "Suv", options: ["Suv", "Choy", "Sut", "Sharbat"] },
    { q: "\"Sun\" so‘zining o‘zbekcha tarjimasi nima?", a: "Quyosh", options: ["Oy", "Quyosh", "Yulduz", "Bulut"] },
    { q: "\"Cat\" so‘zining o‘zbekcha tarjimasi nima?", a: "Mushuk", options: ["Kuchuk", "Mushuk", "Qush", "Bo‘ri"] },
    { q: "\"Dog\" so‘zining o‘zbekcha tarjimasi nima?", a: "It / Kuchuk", options: ["Mushuk", "It / Kuchuk", "Tulki", "Ayiq"] },
    { q: "\"School\" so‘zining o‘zbekcha tarjimasi nima?", a: "Maktab", options: ["Maktab", "Bog‘cha", "Shahar", "Bozor"] },
    { q: "\"Friend\" so‘zining o‘zbekcha tarjimasi nima?", a: "Do‘st", options: ["Dushman", "Do‘st", "Begona", "Qo‘shni"] },
    { q: "\"Red\" qaysi rangni bildiradi?", a: "Qizil", options: ["Qizil", "Ko‘k", "Yashil", "Sariq"] },
    { q: "\"Blue\" qaysi rangni bildiradi?", a: "Ko‘k", options: ["Qizil", "Ko‘k", "Oq", "Qora"] },
    { q: "\"Green\" qaysi rangni bildiradi?", a: "Yashil", options: ["Sariq", "Yashil", "Pushti", "Jigarrang"] },
    { q: "\"Yellow\" qaysi rangni bildiradi?", a: "Sariq", options: ["Ko‘k", "Qizil", "Sariq", "Yashil"] },
    { q: "\"Hello\" so‘zining ma'nosi nima?", a: "Salom", options: ["Salom", "Xayr", "Rahmat", "Marhamat"] },
    { q: "\"Thank you\" nima degani?", a: "Rahmat", options: ["Kechirasiz", "Rahmat", "Xayr", "Salom"] },
    { q: "\"Good morning\" nima degani?", a: "Xayrli tong", options: ["Xayrli tong", "Xayrli tun", "Xayrli kun", "Oq yo‘l"] },
    { q: "\"Boy\" so‘zining ma'nosi nima?", a: "O‘g‘il bola", options: ["O‘g‘il bola", "Qiz bola", "Ota", "Aka"] },
    { q: "\"Girl\" so‘zining ma'nosi nima?", a: "Qiz bola", options: ["O‘g‘il bola", "Qiz bola", "Ona", "Singil"] },
    { q: "\"Car\" so‘zining o‘zbekcha tarjimasi nima?", a: "Mashina", options: ["Samolyot", "Mashina", "Kema", "Poyezd"] },
    { q: "\"Ship\" qaroqchilar biladigan qaysi transport turi?", a: "Kema", options: ["Kema", "Qayiq", "Mashina", "Ot"] },
    { q: "\"Fish\" so‘zining o‘zbekcha tarjimasi nima?", a: "Baliq", options: ["Qush", "Baliq", "Qurbaqa", "Toshbaqa"] }
  ],
  geo_flag: [
    { flag: "🇺🇿", q: "Ushbu bayroq qaysi davlatniki?", a: "O‘zbekiston", options: ["O‘zbekiston", "Qozog‘iston", "Turkiya", "Tojikiston"] },
    { flag: "🇹🇷", q: "Ushbu bayroq qaysi davlatniki?", a: "Turkiya", options: ["Ozarbayjon", "Turkiya", "Tunis", "O‘zbekiston"] },
    { flag: "🇰🇿", q: "Ushbu bayroq qaysi davlatniki?", a: "Qozog‘iston", options: ["Qirg‘iziston", "Qozog‘iston", "Turkmaniston", "Mongoliya"] },
    { flag: "🇯🇵", q: "Ushbu bayroq qaysi davlatniki?", a: "Yaponiya", options: ["Xitoy", "Janubiy Koreya", "Yaponiya", "Vyetnam"] },
    { flag: "🇩🇪", q: "Ushbu bayroq qaysi davlatniki?", a: "Germaniya", options: ["Belgiya", "Germaniya", "Fransiya", "Ispaniya"] },
    { flag: "🇫🇷", q: "Ushbu bayroq qaysi davlatniki?", a: "Fransiya", options: ["Italiya", "Fransiya", "Rossiya", "Niderlandiya"] },
    { flag: "🇬🇧", q: "Ushbu bayroq qaysi davlatniki?", a: "Buyuk Britaniya", options: ["AQSH", "Buyuk Britaniya", "Avstraliya", "Yangi Zelandiya"] },
    { flag: "🇺🇸", q: "Ushbu bayroq qaysi davlatniki?", a: "AQSH", options: ["Kanada", "Buyuk Britaniya", "AQSH", "Avstraliya"] },
    { flag: "🇨🇦", q: "Ushbu bayroq qaysi davlatniki?", a: "Kanada", options: ["AQSH", "Daniya", "Kanada", "Shveysariya"] },
    { flag: "🇧🇷", q: "Ushbu bayroq qaysi davlatniki?", a: "Braziliya", options: ["Argentina", "Braziliya", "Kolumbiya", "Chili"] },
    { flag: "🇮🇹", q: "Ushbu bayroq qaysi davlatniki?", a: "Italiya", options: ["Meksika", "Italiya", "Irlandiya", "Fransiya"] },
    { flag: "🇪🇸", q: "Ushbu bayroq qaysi davlatniki?", a: "Ispaniya", options: ["Portugaliya", "Ispaniya", "Italiya", "Gretsiya"] },
    { flag: "🇰🇷", q: "Ushbu bayroq qaysi davlatniki?", a: "Janubiy Koreya", options: ["Yaponiya", "Xitoy", "Janubiy Koreya", "Singapur"] },
    { flag: "🇦🇿", q: "Ushbu bayroq qaysi davlatniki?", a: "Ozarbayjon", options: ["Turkiya", "Ozarbayjon", "Turkmaniston", "Eron"] },
    { flag: "🇸🇦", q: "Ushbu bayroq qaysi davlatniki?", a: "Saudiya Arabistoni", options: ["BAA", "Qatar", "Saudiya Arabistoni", "Misr"] },
    { flag: "🇦🇷", q: "Ushbu bayroq qaysi davlatniki?", a: "Argentina", options: ["Urugvay", "Argentina", "Braziliya", "Chili"] }
  ],
  geo_capital: [
    { q: "O‘zbekistonning poytaxti qaysi shahar?", a: "Toshkent", options: ["Samarqand", "Toshkent", "Buxoro", "Xiva"] },
    { q: "Fransiyaning poytaxti qaysi shahar?", a: "Parij", options: ["Lion", "Parij", "Marsel", "Nitssa"] },
    { q: "Buyuk Britaniyaning poytaxti qaysi shahar?", a: "London", options: ["Liverpul", "London", "Manchester", "Oksford"] },
    { q: "Turkiyaning poytaxti qaysi shahar?", a: "Anqara", options: ["Istanbul", "Anqara", "Antaliya", "Izmir"] },
    { q: "Yaponiyaning poytaxti qaysi shahar?", a: "Tokio", options: ["Kioto", "Tokio", "Osaka", "Xirosima"] },
    { q: "Germaniyaning poytaxti qaysi shahar?", a: "Berlin", options: ["Myunxen", "Berlin", "Gamburg", "Frankfurt"] },
    { q: "Italiyaning poytaxti qaysi shahar?", a: "Rim", options: ["Milan", "Rim", "Venetsiya", "Neapol"] },
    { q: "Ispaniyaning poytaxti qaysi shahar?", a: "Madrid", options: ["Barselona", "Madrid", "Sevilya", "Valensiya"] },
    { q: "Rossiyaning poytaxti qaysi shahar?", a: "Moskva", options: ["Sankt-Peterburg", "Moskva", "Qozon", "Sochi"] },
    { q: "Qozog‘istonning poytaxti qaysi shahar?", a: "Ostona", options: ["Olmaota", "Ostona", "Chimkent", "Aqtau"] },
    { q: "Janubiy Koreyaning poytaxti qaysi shahar?", a: "Seul", options: ["Pusan", "Seul", "Incheon", "Daegu"] },
    { q: "Misrning poytaxti qaysi shahar?", a: "Qohira", options: ["Iskandariya", "Qohira", "Giza", "Luksor"] },
    { q: "AQSHning poytaxti qaysi shahar?", a: "Vashington", options: ["Nyu-York", "Vashington", "Los-Anjeles", "Chikago"] },
    { q: "Xitoyning poytaxti qaysi shahar?", a: "Pekin", options: ["Shanxay", "Pekin", "Guanchjou", "Gonkong"] },
    { q: "Tojikistonning poytaxti qaysi shahar?", a: "Dushanbe", options: ["Xo‘jand", "Dushanbe", "Ko‘lob", "Qo‘rg‘ontepa"] },
    { q: "Qirg‘izistonning poytaxti qaysi shahar?", a: "Bishkek", options: ["O‘sh", "Bishkek", "Jalolobod", "Qorako‘l"] }
  ]
};

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let currentQuizQuestion = null;
let quizTimerId = null;
let quizTimeLeft = 20;
let quizAnswered = false;
let quizTargetPlayer = null;
let quizOpponentPlayer = null;

function getRandomQuizQuestion() {
  const categories = ['math', 'english', 'geo_flag', 'geo_capital'];
  const cat = categories[Math.floor(Math.random() * categories.length)];
  const pool = QUIZ_QUESTIONS[cat];
  const item = pool[Math.floor(Math.random() * pool.length)];

  const shuffledOptions = shuffleArray(item.options);

  let badgeText = '📐 Matematika';
  let badgeClass = 'badge-math';
  if (cat === 'english') {
    badgeText = '🇬🇧 Ingliz Tili';
    badgeClass = 'badge-english';
  } else if (cat === 'geo_flag') {
    badgeText = '🚩 Geografiya (Bayroqlar)';
    badgeClass = 'badge-flag';
  } else if (cat === 'geo_capital') {
    badgeText = '🏛️ Geografiya (Poytaxtlar)';
    badgeClass = 'badge-capital';
  }

  return {
    category: cat,
    badgeText,
    badgeClass,
    flag: item.flag || null,
    question: item.q,
    answer: item.a,
    options: shuffledOptions
  };
}

function triggerQuizRescue(player, opponent = null) {
  if (gameState === 'QUIZ') return;
  gameState = 'QUIZ';
  quizTargetPlayer = player;
  quizOpponentPlayer = opponent;
  quizAnswered = false;
  quizTimeLeft = 20;

  sound.init();
  currentQuizQuestion = getRandomQuizQuestion();

  if (quizSubjectBadge) {
    quizSubjectBadge.textContent = currentQuizQuestion.badgeText;
    quizSubjectBadge.className = `quiz-subject-badge ${currentQuizQuestion.badgeClass}`;
  }

  if (quizTitle) {
    quizTitle.textContent = gameMode === '2P' 
      ? `🧠 ${player.name} uchun Qutqaruvchi Savol!` 
      : '🧠 Qutqaruvchi Fanlar Sinovi!';
  }

  if (quizFlagBox) {
    if (currentQuizQuestion.flag) {
      quizFlagBox.style.display = 'block';
      quizFlagBox.textContent = currentQuizQuestion.flag;
    } else {
      quizFlagBox.style.display = 'none';
      quizFlagBox.textContent = '';
    }
  }

  if (quizQuestionText) {
    quizQuestionText.textContent = currentQuizQuestion.question;
  }

  if (quizFeedbackBox) {
    quizFeedbackBox.textContent = '';
    quizFeedbackBox.className = 'quiz-feedback-box';
  }

  if (quizOptionsContainer) {
    quizOptionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    currentQuizQuestion.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `<span class="quiz-opt-letter">${letters[idx]}</span><span>${optText}</span>`;
      btn.addEventListener('click', () => {
        handleQuizAnswer(optText, btn);
      });
      quizOptionsContainer.appendChild(btn);
    });
  }

  if (quizScreen) {
    quizScreen.classList.add('active');
  }
  updateMobileControlsVisibility();

  startQuizTimer();
}

function startQuizTimer() {
  stopQuizTimer();
  updateQuizTimerUI();
  quizTimerId = setInterval(() => {
    quizTimeLeft--;
    updateQuizTimerUI();
    if (quizTimeLeft <= 0) {
      stopQuizTimer();
      handleQuizAnswer(null, null);
    }
  }, 1000);
}

function stopQuizTimer() {
  if (quizTimerId) {
    clearInterval(quizTimerId);
    quizTimerId = null;
  }
}

function updateQuizTimerUI() {
  if (quizTimerText) {
    quizTimerText.textContent = `${quizTimeLeft}s`;
  }
  if (quizTimerProgress) {
    const percent = Math.max(0, (quizTimeLeft / 20) * 100);
    quizTimerProgress.style.width = `${percent}%`;
  }
}

function handleQuizAnswer(selectedOption, clickedButton) {
  if (quizAnswered) return;
  quizAnswered = true;
  stopQuizTimer();

  const allButtons = quizOptionsContainer ? quizOptionsContainer.querySelectorAll('.quiz-opt-btn') : [];
  allButtons.forEach(btn => btn.disabled = true);

  const isCorrect = (selectedOption === currentQuizQuestion.answer);

  if (isCorrect) {
    if (clickedButton) clickedButton.classList.add('correct');
    sound.playQuizSuccess();
    if (quizFeedbackBox) {
      quizFeedbackBox.textContent = '🎉 TO‘G‘RI JAVOB! Jonlaringiz tiklandi, sarguzasht davom etadi!';
      quizFeedbackBox.className = 'quiz-feedback-box success';
    }

    for (let i = 0; i < 25; i++) {
      particles.push(new Particle(
        cameraX + Math.random() * GAME_WIDTH,
        Math.random() * 200,
        (Math.random() - 0.5) * 5,
        Math.random() * -3 - 1,
        ['#4ade80', '#22c55e', '#ffd166', '#ffffff'][Math.floor(Math.random() * 4)],
        Math.random() * 4 + 2,
        80,
        false
      ));
    }

    setTimeout(() => {
      if (quizScreen) quizScreen.classList.remove('active');
      if (quizTargetPlayer) {
        quizTargetPlayer.lives = (gameMode === '2P') ? 2 : 3;
        quizTargetPlayer.alive = true;
        quizTargetPlayer.invulnerableTime = 180;
        quizTargetPlayer.respawn();
      }
      gameState = 'PLAYING';
      showToast('🛡️ Jon saqlab qolindi! Sarguzasht davom etmoqda!');
      updateHUD();
    }, 1300);
  } else {
    if (clickedButton) clickedButton.classList.add('wrong');
    allButtons.forEach(btn => {
      if (btn.textContent.includes(currentQuizQuestion.answer)) {
        btn.classList.add('correct');
      }
    });

    sound.playQuizFail();
    if (quizFeedbackBox) {
      quizFeedbackBox.textContent = selectedOption === null
        ? `⏰ Vaqt tugadi! To‘g‘ri javob: ${currentQuizQuestion.answer}. Boshidan 0-bosqichga tushasiz!`
        : `❌ Noto‘g‘ri! To‘g‘ri javob: ${currentQuizQuestion.answer}. Boshidan 0-bosqichga tushasiz!`;
      quizFeedbackBox.className = 'quiz-feedback-box fail';
    }

    setTimeout(() => {
      if (quizScreen) quizScreen.classList.remove('active');

      if (gameMode === '2P' && quizOpponentPlayer) {
        handlePvPVictory(quizOpponentPlayer, quizTargetPlayer);
      } else {
        // 1-Player mode: "boshida 0ga tushadi"
        player1.resetForNewGame(80, 360);
        teamHasKey = false;
        loadLevel(0);

        gameState = 'GAMEOVER';
        sound.playGameOver();
        if (gameOverP1Score) gameOverP1Score.textContent = '0';
        if (gameOverP2Card) gameOverP2Card.style.display = 'none';

        const gameOverSub = gameOverScreen ? gameOverScreen.querySelector('.subtitle') : null;
        if (gameOverSub) {
          gameOverSub.innerHTML = '❌ <strong>Fanlar sinovidan o‘ta olmadingiz!</strong><br>O‘yin 0-bosqichga tushdi va hamma narsa boshidan boshlanadi.';
        }

        if (gameOverScreen) gameOverScreen.classList.add('active');
        showToast('📉 Savolga noto‘g‘ri javob berildi — 0-bosqichga qaytildi!');
      }
    }, 2000);
  }
}

// Klaviatura orqali javob berish (1-4 va A-D)
window.addEventListener('keydown', (e) => {
  if (gameState === 'QUIZ' && !quizAnswered && quizOptionsContainer) {
    const key = e.key.toUpperCase();
    const btnList = quizOptionsContainer.querySelectorAll('.quiz-opt-btn');
    let idx = -1;
    if (key === 'A' || key === '1') idx = 0;
    else if (key === 'B' || key === '2') idx = 1;
    else if (key === 'C' || key === '3') idx = 2;
    else if (key === 'D' || key === '4') idx = 3;
    if (idx >= 0 && idx < btnList.length) {
      btnList[idx].click();
    }
  }
});

// ==========================================
// 11. ASOSIY O'YIN SIKLI (Fixed Timestep 60 FPS)
// ==========================================
let lastFrameTime = 0;
let accumulator = 0;
const FIXED_STEP = 1000 / 60; // 16.666 ms (aniq 60 FPS tezlik)

function updateGameLogic() {
  if (gameState === 'PLAYING') {
    const activePlayers = getActivePlayers();
    activePlayers.forEach(p => p.update());

    // 2-O'yinchi PvP to'qnashuv va bir-biriga zarba berish
    checkPvPCollisions();
    if (gameState !== 'PLAYING') return;

    // Harakatlanuvchi platformalar
    movingPlatforms.forEach(mp => mp.update());

    // Yemiriluvchi platformalar va prujinali sakrash moslamalari
    fallingPlatforms.forEach(fp => fp.update());
    jumpPads.forEach(jp => jp.update());

    // Tikanlar
    spikes.forEach(sp => sp.update());

    // Mario Bloklari va Super Qo'ziqorin
    questionBlocks.forEach(qb => qb.update());
    brickBlocks.forEach(bb => bb.update());
    for (let i = superMushrooms.length - 1; i >= 0; i--) {
      superMushrooms[i].update();
      if (superMushrooms[i].collected) {
        superMushrooms.splice(i, 1);
      }
    }

    // Silliq va aqlli kamera (ikkala o'yinchini markazda tutadi)
    let targetCamX = 0;
    if (gameMode === '2P') {
      if (player1.alive && player2.alive) {
        targetCamX = (player1.x + player2.x) / 2 - GAME_WIDTH / 2;
      } else if (player1.alive) {
        targetCamX = player1.x - GAME_WIDTH / 2;
      } else if (player2.alive) {
        targetCamX = player2.x - GAME_WIDTH / 2;
      } else {
        targetCamX = cameraX;
      }
    } else {
      targetCamX = player1.x - GAME_WIDTH / 2;
    }

    cameraX += (targetCamX - cameraX) * 0.12;
    if (cameraX < 0) cameraX = 0;
    if (cameraX > WORLD_WIDTH - GAME_WIDTH) cameraX = WORLD_WIDTH - GAME_WIDTH;

    // 2-o'yinchi rejimida o'yinchilar ekrandan uzoqlashib ketmasligi uchun chegara
    if (gameMode === '2P' && player1.alive && player2.alive) {
      const minX = cameraX + 15;
      const maxX = cameraX + GAME_WIDTH - 45;
      if (player1.x < minX) player1.x = minX;
      if (player1.x > maxX) player1.x = maxX;
      if (player2.x < minX) player2.x = minX;
      if (player2.x > maxX) player2.x = maxX;
    }

    // Dushmanlar, Tangalar, Kalit va Sandiq
    enemies.forEach(enemy => enemy.update());
    coins.forEach(coin => coin.update());
    if (goldenKey) goldenKey.update();
    if (treasureChest) treasureChest.update();
  }

  // Zarrachalar va Matnlar
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].life <= 0) particles.splice(i, 1);
  }

  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    floatingTexts[i].update();
    if (floatingTexts[i].life <= 0) floatingTexts.splice(i, 1);
  }
}

function renderScene() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  drawBackground(ctx, cameraX);
  drawPlatforms(ctx, cameraX);

  movingPlatforms.forEach(mp => mp.draw(ctx, cameraX));
  fallingPlatforms.forEach(fp => fp.draw(ctx, cameraX));
  jumpPads.forEach(jp => jp.draw(ctx, cameraX));
  spikes.forEach(sp => sp.draw(ctx, cameraX));

  warpPipes.forEach(p => p.draw(ctx, cameraX));
  questionBlocks.forEach(qb => qb.draw(ctx, cameraX));
  brickBlocks.forEach(bb => bb.draw(ctx, cameraX));
  superMushrooms.forEach(sm => sm.draw(ctx, cameraX));

  if (treasureChest) treasureChest.draw(ctx, cameraX);
  if (goldenKey) goldenKey.draw(ctx, cameraX);

  coins.forEach(coin => coin.draw(ctx, cameraX));
  enemies.forEach(enemy => enemy.draw(ctx, cameraX));

  // O'yinchilarni chizish
  const activePlayers = getActivePlayers();
  activePlayers.forEach(p => p.draw(ctx, cameraX));

  particles.forEach(p => p.draw(ctx, cameraX));
  floatingTexts.forEach(ft => ft.draw(ctx, cameraX));
}

function gameLoop(timestamp) {
  const current = timestamp || performance.now();
  if (!lastFrameTime) lastFrameTime = current;
  let dt = current - lastFrameTime;
  lastFrameTime = current;

  // Fon / lag spike himoyasi
  if (dt > 100) dt = 100;
  if (dt < 0 || isNaN(dt)) dt = FIXED_STEP;
  accumulator += dt;

  let steps = 0;
  while (accumulator >= FIXED_STEP && steps < 5) {
    updateGameLogic();
    accumulator -= FIXED_STEP;
    steps++;
  }
  if (accumulator > FIXED_STEP * 5) accumulator = 0;

  renderScene();
  requestAnimationFrame(gameLoop);
}

// Boshlang'ich yuklash
resizeCanvas();
loadLevel(0);
updateHUD();
updateMobileControlsVisibility();
requestAnimationFrame(gameLoop);
