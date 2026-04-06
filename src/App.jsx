import { useState, useRef, useEffect } from "react";

const API_URL = "https://dheerajkrishnat-vera-scan-api.hf.space";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Manrope:wght@300;400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:       #080810;
  --s1:       #0e0e1a;
  --s2:       #13131f;
  --border:   rgba(255,255,255,0.07);
  --border2:  rgba(255,255,255,0.12);
  --text:     #e8e8f0;
  --muted:    rgba(232,232,240,0.4);
  --accent:   #7c6dfa;
  --glow:     rgba(124,109,250,0.35);
  --green:    #00e5a0;
  --red:      #ff3d5a;
  --mono:     'DM Mono', monospace;
  --body:     'Manrope', sans-serif;
  --display:  'Bebas Neue', sans-serif;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--body);
  min-height: 100vh;
  overflow-x: hidden;
  cursor: default;
}

/* animated mesh background */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 10%, rgba(124,109,250,0.12) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0,229,160,0.06) 0%, transparent 55%),
    radial-gradient(ellipse 50% 40% at 60% 30%, rgba(255,61,90,0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* grain overlay */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}

.wrap {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── NAV ── */
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 48px;
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(12px);
  background: rgba(8,8,16,0.6);
  position: sticky;
  top: 0;
  z-index: 10;
}
.nav-logo {
  font-family: var(--display);
  font-size: 22px;
  letter-spacing: 0.08em;
  color: var(--text);
}
.nav-logo span { color: var(--accent); }
.nav-badge {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--accent);
  border: 1px solid rgba(124,109,250,0.3);
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(124,109,250,0.08);
}

/* ── HERO ── */
.hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 60px;
  text-align: center;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 24px;
  animation: fadeUp 0.6s ease both;
  display: flex;
  align-items: center;
  gap: 10px;
}
.eyebrow-line {
  width: 32px;
  height: 1px;
  background: var(--accent);
  opacity: 0.6;
}

.hero h1 {
  font-family: var(--display);
  font-size: clamp(64px, 11vw, 130px);
  line-height: 0.92;
  letter-spacing: 0.03em;
  margin-bottom: 32px;
  animation: fadeUp 0.6s 0.1s ease both;
}
.hero h1 .line2 {
  display: block;
  background: linear-gradient(135deg, var(--accent) 0%, #a78bfa 50%, var(--green) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 15px;
  color: var(--muted);
  max-width: 440px;
  line-height: 1.75;
  margin-bottom: 56px;
  animation: fadeUp 0.6s 0.2s ease both;
  font-weight: 400;
}

/* ── UPLOAD CARD ── */
.upload-card {
  width: 100%;
  max-width: 560px;
  background: var(--s1);
  border: 1px solid var(--border2);
  border-radius: 20px;
  padding: 40px;
  animation: fadeUp 0.6s 0.3s ease both;
  position: relative;
  overflow: hidden;
}
.upload-card::before {
  content: '';
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}

.drop-zone {
  border: 1.5px dashed rgba(124,109,250,0.25);
  border-radius: 12px;
  padding: 40px 24px;
  text-align: center;
  background: rgba(124,109,250,0.03);
  margin-bottom: 24px;
  transition: border-color 0.25s, background 0.25s;
}
.drop-zone.drag-active {
  border-color: var(--accent);
  background: rgba(124,109,250,0.08);
}
.drop-zone.has-file {
  border-color: var(--green);
  background: rgba(0,229,160,0.04);
}

.dz-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  border-radius: 14px;
  background: var(--s2);
  border: 1px solid var(--border2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.dz-icon svg { width: 24px; height: 24px; }

.dz-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text);
}
.dz-sub {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.05em;
}

/* file info strip */
.file-strip {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(0,229,160,0.06);
  border: 1px solid rgba(0,229,160,0.2);
  border-radius: 10px;
  margin-top: 14px;
}
.file-strip-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(0,229,160,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}
.file-strip-info { flex: 1; overflow: hidden; }
.file-strip-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--green);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.file-strip-size {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--muted);
  margin-top: 2px;
}
.file-clear {
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  padding: 2px 6px;
  border-radius: 4px;
  transition: color 0.2s;
}
.file-clear:hover { color: var(--red); }

/* Upload button */
.upload-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, var(--accent) 0%, #9d8bff 100%);
  color: #fff;
  font-family: var(--body);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 24px rgba(124,109,250,0.3);
  margin-bottom: 12px;
}
.upload-btn:hover:not(:disabled) {
  opacity: 0.92;
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(124,109,250,0.45);
}
.upload-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; box-shadow: none; }

.analyze-btn {
  width: 100%;
  padding: 16px;
  background: var(--s2);
  color: var(--text);
  font-family: var(--body);
  font-size: 14px;
  font-weight: 700;
  border: 1px solid var(--border2);
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
  letter-spacing: 0.04em;
}
.analyze-btn:hover:not(:disabled) {
  background: var(--s1);
  border-color: var(--accent);
  transform: translateY(-1px);
}
.analyze-btn:disabled { opacity: 0.3; cursor: not-allowed; }

/* ── PERMISSION MODAL ── */
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.94) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(8,8,16,0.85);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.modal {
  background: var(--s1);
  border: 1px solid var(--border2);
  border-radius: 24px;
  padding: 48px 40px 40px;
  max-width: 440px;
  width: 100%;
  text-align: center;
  animation: modalIn 0.35s ease;
  position: relative;
  overflow: hidden;
}
.modal::before {
  content: '';
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}
.modal-icon {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: rgba(124,109,250,0.12);
  border: 1px solid rgba(124,109,250,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto 28px;
}
.modal h2 {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}
.modal p {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
  margin-bottom: 32px;
}
.modal-perms {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 32px;
  text-align: left;
}
.perm-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--s2);
  border-radius: 10px;
  border: 1px solid var(--border);
  font-size: 13px;
  color: var(--text);
}
.perm-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(124,109,250,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  flex-shrink: 0;
}
.perm-text { flex: 1; }
.perm-label { font-weight: 600; font-size: 13px; }
.perm-desc { font-size: 11px; color: var(--muted); margin-top: 1px; }
.modal-allow {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, var(--accent) 0%, #9d8bff 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  letter-spacing: 0.04em;
  transition: opacity 0.2s, transform 0.2s;
  box-shadow: 0 4px 24px rgba(124,109,250,0.3);
  margin-bottom: 10px;
}
.modal-allow:hover { opacity: 0.9; transform: translateY(-1px); }
.modal-deny {
  background: none;
  border: none;
  color: var(--muted);
  font-size: 13px;
  cursor: pointer;
  font-family: var(--mono);
  transition: color 0.2s;
}
.modal-deny:hover { color: var(--text); }

/* ── PROGRESS ── */
.progress-wrap {
  width: 100%;
  max-width: 560px;
  margin-top: 32px;
  animation: fadeUp 0.4s ease;
}
.progress-card {
  background: var(--s1);
  border: 1px solid var(--border2);
  border-radius: 20px;
  padding: 36px 40px;
}
.prog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.prog-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}
.prog-pct {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--accent);
}
.prog-track {
  height: 3px;
  background: rgba(255,255,255,0.06);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 32px;
  position: relative;
}
.prog-fill {
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--accent), #a78bfa);
  transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 0 0 16px rgba(124,109,250,0.6);
}

@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
.prog-shimmer {
  position: absolute;
  top: 0; left: 0;
  width: 25%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 1.4s infinite;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.step-row {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 13px;
  color: var(--muted);
  transition: color 0.3s;
}
.step-row.active { color: var(--text); }
.step-row.done { color: var(--green); }
.step-indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1.5px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 10px;
  transition: all 0.3s;
}
.step-row.done .step-indicator {
  background: var(--green);
  border-color: var(--green);
  color: #000;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
.step-row.active .step-indicator { animation: pulse 1s infinite; }

/* ── RESULT ── */
.result-wrap {
  width: 100%;
  max-width: 560px;
  animation: fadeUp 0.5s ease;
}

.verdict-hero {
  border-radius: 20px;
  padding: 52px 40px 44px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
  text-align: center;
}
.verdict-hero.real {
  background: linear-gradient(145deg, rgba(0,229,160,0.08) 0%, rgba(0,229,160,0.03) 100%);
  border: 1px solid rgba(0,229,160,0.25);
}
.verdict-hero.ai {
  background: linear-gradient(145deg, rgba(255,61,90,0.08) 0%, rgba(255,61,90,0.03) 100%);
  border: 1px solid rgba(255,61,90,0.25);
}
.verdict-hero::before {
  content: '';
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 200px; height: 1px;
}
.verdict-hero.real::before { background: linear-gradient(90deg, transparent, var(--green), transparent); }
.verdict-hero.ai::before   { background: linear-gradient(90deg, transparent, var(--red), transparent); }

.verdict-badge {
  display: inline-block;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 24px;
}
.verdict-hero.real .verdict-badge {
  background: rgba(0,229,160,0.12);
  color: var(--green);
  border: 1px solid rgba(0,229,160,0.25);
}
.verdict-hero.ai .verdict-badge {
  background: rgba(255,61,90,0.12);
  color: var(--red);
  border: 1px solid rgba(255,61,90,0.25);
}

.verdict-word {
  font-family: var(--display);
  font-size: clamp(64px, 14vw, 110px);
  letter-spacing: 0.05em;
  line-height: 1;
  margin-bottom: 16px;
}
.verdict-hero.real .verdict-word { color: var(--green); }
.verdict-hero.ai   .verdict-word { color: var(--red); }

.verdict-desc {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.65;
  max-width: 320px;
  margin: 0 auto;
}

/* confidence */
.conf-wrap {
  background: var(--s1);
  border: 1px solid var(--border2);
  border-radius: 16px;
  padding: 24px 28px;
  margin-bottom: 12px;
}
.conf-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.conf-label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
}
.conf-val {
  font-family: var(--display);
  font-size: 36px;
  letter-spacing: 0.05em;
  line-height: 1;
}
.conf-val.green { color: var(--green); }
.conf-val.red   { color: var(--red); }
.conf-bar-track {
  height: 6px;
  background: rgba(255,255,255,0.06);
  border-radius: 3px;
  overflow: hidden;
}
.conf-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
}
.conf-bar-fill.green {
  background: linear-gradient(90deg, var(--green), #00ffb3);
  box-shadow: 0 0 12px rgba(0,229,160,0.5);
}
.conf-bar-fill.red {
  background: linear-gradient(90deg, var(--red), #ff7a8a);
  box-shadow: 0 0 12px rgba(255,61,90,0.5);
}

/* stats row */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}
.stat-box {
  background: var(--s1);
  border: 1px solid var(--border2);
  border-radius: 14px;
  padding: 18px 16px;
  text-align: center;
}
.stat-num {
  font-family: var(--display);
  font-size: 40px;
  letter-spacing: 0.05em;
  line-height: 1;
  margin-bottom: 4px;
}
.stat-num.white { color: var(--text); }
.stat-num.red   { color: var(--red); }
.stat-num.green { color: var(--green); }
.stat-lbl {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.reset-btn {
  width: 100%;
  padding: 15px;
  background: transparent;
  color: var(--muted);
  font-family: var(--body);
  font-size: 13px;
  font-weight: 600;
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.02em;
}
.reset-btn:hover {
  color: var(--text);
  border-color: var(--border2);
  background: var(--s1);
}

/* error */
.err-box {
  background: rgba(255,61,90,0.06);
  border: 1px solid rgba(255,61,90,0.25);
  border-radius: 12px;
  padding: 14px 18px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--red);
  margin-top: 14px;
  line-height: 1.5;
}

/* denied state */
.denied-box {
  background: var(--s1);
  border: 1px solid var(--border2);
  border-radius: 20px;
  padding: 48px 40px;
  text-align: center;
  max-width: 400px;
  animation: fadeUp 0.4s ease;
}
.denied-box h3 { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.denied-box p  { font-size: 13px; color: var(--muted); line-height: 1.65; margin-bottom: 24px; }
.retry-btn {
  padding: 12px 28px;
  background: var(--s2);
  color: var(--text);
  border: 1px solid var(--border2);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s;
}
.retry-btn:hover { border-color: var(--accent); }

@media (max-width: 560px) {
  nav { padding: 18px 20px; }
  .hero { padding: 50px 16px 40px; }
  .upload-card, .progress-card, .verdict-hero { padding: 28px 20px; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
}
`;

const STEPS = [
  "Uploading video",
  "Extracting frames",
  "Running AI model",
  "Calculating verdict",
];

const PERMS = [
  { icon: "📁", label: "File access", desc: "Read the video file you select" },
  { icon: "🔒", label: "Local processing", desc: "Sent only to our local server" },
  { icon: "🗑️", label: "Auto-delete", desc: "File deleted after analysis" },
];

export default function App() {
  const [permitted, setPermitted]   = useState(() => localStorage.getItem("perm") === "yes");
  const [denied, setDenied]         = useState(false);
  const [showModal, setShowModal]   = useState(() => localStorage.getItem("perm") !== "yes");
  const [file, setFile]             = useState(null);
  const [drag, setDrag]             = useState(false);
  const [analyzing, setAnalyzing]   = useState(false);
  const [progress, setProgress]     = useState(0);
  const [stepIdx, setStepIdx]       = useState(0);
  const [result, setResult]         = useState(null);
  const [error, setError]           = useState(null);
  const inputRef  = useRef();
  const timerRef  = useRef();

  const allow = () => {
    localStorage.setItem("perm", "yes");
    setPermitted(true);
    setShowModal(false);
  };

  const deny = () => {
    setDenied(true);
    setShowModal(false);
  };

  const retryPerm = () => {
    setDenied(false);
    setShowModal(true);
  };

  const handleFile = (f) => {
    if (!f) return;
    const allowed = [".mp4", ".mov", ".avi", ".mkv", ".webm"];
    const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
    if (!allowed.includes(ext)) {
      setError("Please upload a valid video file (.mp4 .mov .avi .mkv .webm)");
      return;
    }
    setError(null);
    setFile(f);
  };

  const startProgress = () => {
    let p = 0;
    timerRef.current = setInterval(() => {
      p += Math.random() * 3.5 + 0.6;
      if (p >= 88) { p = 88; clearInterval(timerRef.current); }
      setProgress(Math.round(p));
      setStepIdx(Math.min(Math.floor(p / 23), STEPS.length - 1));
    }, 480);
  };

  const finishProgress = () => {
    clearInterval(timerRef.current);
    setProgress(100);
    setStepIdx(STEPS.length - 1);
  };

  const analyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setResult(null);
    setError(null);
    setProgress(0);
    setStepIdx(0);
    startProgress();
    try {
      const form = new FormData();
      form.append("file", file);
      const res  = await fetch(`${API_URL}/analyze`, { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Analysis failed");
      finishProgress();
      setTimeout(() => { setResult(data); setAnalyzing(false); }, 500);
    } catch (e) {
      finishProgress();
      setError(e.message);
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setFile(null); setResult(null);
    setError(null); setProgress(0); setStepIdx(0);
  };

  const isReal   = result?.verdict === "Real";
  const colorCls = isReal ? "green" : "red";

  return (
    <>
      <style>{G}</style>

      {/* Permission modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">🔍</div>
            <h2>Before you continue</h2>
            <p>
              To detect AI-generated content, this app needs permission
              to read and process the video file you choose.
            </p>
            <div className="modal-perms">
              {PERMS.map((p, i) => (
                <div key={i} className="perm-row">
                  <div className="perm-icon">{p.icon}</div>
                  <div className="perm-text">
                    <div className="perm-label">{p.label}</div>
                    <div className="perm-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="modal-allow" onClick={allow}>
              Allow &amp; Continue
            </button>
            <br />
            <button className="modal-deny" onClick={deny}>
              No thanks
            </button>
          </div>
        </div>
      )}

      <div className="wrap">
        {/* Nav */}
        <nav>
          <div className="nav-logo">VERA<span>SCAN</span></div>
          <div className="nav-badge">AI Detection v1.0</div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero-eyebrow">
            <div className="eyebrow-line" />
            Video Authenticity Detector
            <div className="eyebrow-line" />
          </div>
          <h1>
            DETECT
            <span className="line2">THE FAKE</span>
          </h1>
          <p className="hero-desc">
            Upload any video and our SigLIP2 model will analyze
            every frame to determine if it was created by AI.
          </p>

          {/* Denied state */}
          {denied && (
            <div className="denied-box">
              <h3>Permission required</h3>
              <p>
                File access permission is needed to analyze videos.
                Without it the app cannot read your video file.
              </p>
              <button className="retry-btn" onClick={retryPerm}>
                Grant permission
              </button>
            </div>
          )}

          {/* Upload card */}
          {permitted && !denied && !analyzing && !result && (
            <div className="upload-card">
              {/* Drop zone — visual only, no click handler */}
              <div
                className={`drop-zone${drag ? " drag-active" : ""}${file ? " has-file" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDrag(false);
                  handleFile(e.dataTransfer.files[0]);
                }}
              >
                <div className="dz-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 10l-3-3m0 0l-3 3m3-3v8M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="dz-title">
                  {file ? "Video ready" : "Drag & drop your video here"}
                </div>
                <div className="dz-sub">
                  {file ? "or click below to analyze" : "mp4 · mov · avi · mkv · webm"}
                </div>

                {file && (
                  <div className="file-strip">
                    <div className="file-strip-icon">🎬</div>
                    <div className="file-strip-info">
                      <div className="file-strip-name">{file.name}</div>
                      <div className="file-strip-size">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                    <button className="file-clear" onClick={() => setFile(null)}>×</button>
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={inputRef}
                type="file"
                accept=".mp4,.mov,.avi,.mkv,.webm"
                style={{ display: "none" }}
                onChange={(e) => handleFile(e.target.files[0])}
              />

              {/* Upload file button — ONLY way to open file picker */}
              {!file && (
                <button
                  className="upload-btn"
                  onClick={() => inputRef.current.click()}
                >
                  Upload Video File
                </button>
              )}

              {file && (
                <button className="analyze-btn" onClick={analyze}>
                  → Analyze Now
                </button>
              )}

              {error && <div className="err-box">⚠ {error}</div>}
            </div>
          )}

          {/* Progress */}
          {analyzing && (
            <div className="progress-wrap">
              <div className="progress-card">
                <div className="prog-header">
                  <span className="prog-title">Analyzing video</span>
                  <span className="prog-pct">{progress}%</span>
                </div>
                <div className="prog-track">
                  <div className="prog-fill" style={{ width: `${progress}%` }} />
                  <div className="prog-shimmer" />
                </div>
                <div className="steps-list">
                  {STEPS.map((s, i) => (
                    <div
                      key={i}
                      className={`step-row${i < stepIdx ? " done" : i === stepIdx ? " active" : ""}`}
                    >
                      <div className="step-indicator">
                        {i < stepIdx ? "✓" : i + 1}
                      </div>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="result-wrap">
              <div className={`verdict-hero ${isReal ? "real" : "ai"}`}>
                <div className="verdict-badge">
                  {isReal ? "Authentic" : "AI Generated"}
                </div>
                <div className="verdict-word">
                  {isReal ? "REAL" : "FAKE"}
                </div>
                <div className="verdict-desc">
                  {isReal
                    ? "This video appears to be authentic content recorded by a human."
                    : "This video was likely created or manipulated using AI technology."}
                </div>
              </div>

              <div className="conf-wrap">
                <div className="conf-top">
                  <span className="conf-label">Confidence score</span>
                  <span className={`conf-val ${colorCls}`}>
                    {result.confidence.toFixed(1)}%
                  </span>
                </div>
                <div className="conf-bar-track">
                  <div
                    className={`conf-bar-fill ${colorCls}`}
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-num white">{result.total_frames}</div>
                  <div className="stat-lbl">Total frames</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num red">{result.ai_frames}</div>
                  <div className="stat-lbl">AI frames</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num green">{result.real_frames}</div>
                  <div className="stat-lbl">Real frames</div>
                </div>
              </div>

              <button className="reset-btn" onClick={reset}>
                ← Analyze another video
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
