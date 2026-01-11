import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, AlertTriangle, Scale, Gift, ArrowRight, Check, X, 
  Music, VolumeX, Clock, FileSignature, MessageCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ApologyPage = () => {
  // --- STATE MANAGEMENT ---
  const [hasStarted, setHasStarted] = useState(false); // Controls the Start Overlay
  const [selectedBribe, setSelectedBribe] = useState(null);
  const [isForgiven, setIsForgiven] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Audio Ref
  const audioRef = useRef(null);

  // --- DATA CONFIGURATION ---
  const GIRLFRIEND_NAME = "My Queen Ayla👑"; 

  const timelineEvents = [
    { time: "8:00 PM", title: "The Plan", desc: "Tell you I'm going for some hours to have sometime with the boys." },
    { time: "10:00 PM", title: "The Mistake", desc: "Someone plays the movie (it was horror I peed my pants). I should have left. I didn't." },
    { time: "12:00 AM", title: "The Delusion", desc: "I text you 'Home soon!' (I was, in fact, not home soon)." },
    { time: "Now", title: "The Regret", desc: "Writing this website while crying and missing you :/" }
  ];

  const comparisons = [
    { feature: "Volume", friends: "Jet Engine", you: "ASMR Angel" },
    { feature: "Smell", friends: "Stale Pizza", you: "Vanilla & Roses (Baby lotion as well)" },
    { feature: "IQ", friends: "Single Brain Cell", you: "Literal Genius (At the level of Einstein)" },
  ];

  const bribes = [
    { id: 1, title: "Frosby evening", icon: "🥤", desc: "Unlimited frosbies. My treat." },
    { id: 2, title: "Hugging for the whole night", icon: "🫂", desc: "cuddling included (2 in 1)." },
    { id: 3, title: "listening to your yapping ", icon: "🗣️", desc: "Applies for everytime (I love it ;) )." },
  ];

  const testimonials = [
    { name: "My Mom", quote: "He's an idiot, but he loves you. Please keep him." },
    { name: "My puppy (the toy one)", quote: "Woof. (She's right, forgive him)." },
    { name: "The driver", quote: "Yeah, he really shouldn't have gone last night." }
  ];

  // --- HANDLERS ---

  // 1. Start the Experience (Plays Music & Reveals Content)
  const handleStart = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.log("Audio blocked:", error);
        });
      }
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleForgive = () => {
    if (!selectedBribe) return;
    setIsForgiven(true);
    
    // Massive Confetti
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#e11d48', '#ffa500'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#e11d48', '#ffa500'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  // --- VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4 } }
  };

  return (
    <div className="main-wrapper">
      <audio ref={audioRef} src="/Taylor Swift - Delicate (Lyrics) - Hade Music.mp3" loop />

      {/* --- CSS STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Patrick+Hand&display=swap');

        :root {
          --primary: #e11d48;
          --glass: rgba(255, 255, 255, 0.65);
          --glass-border: rgba(255, 255, 255, 0.8);
          --shadow: 0 8px 32px rgba(225, 29, 72, 0.1);
        }

        body { 
          margin: 0; 
          font-family: 'Fredoka', sans-serif; 
          color: #881337;
          
          /* ANIMATED GRADIENT BACKGROUND */
          background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #fad0c4, #e0c3fc, #ffdee9);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }

        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .main-wrapper { min-height: 100vh; padding: 20px; box-sizing: border-box; overflow-x: hidden; }
        .container { max-width: 650px; margin: 0 auto; padding-bottom: 80px; }

        /* Start Overlay */
        .start-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255, 240, 243, 0.8);
          backdrop-filter: blur(15px);
          z-index: 9999;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
        }
        .start-btn {
          background: var(--primary); color: white; border: none;
          padding: 15px 40px; font-size: 1.5rem; border-radius: 50px;
          cursor: pointer; font-family: 'Fredoka', sans-serif;
          box-shadow: 0 10px 20px rgba(225, 29, 72, 0.3);
          transition: transform 0.2s;
          animation: pulse 2s infinite;
        }
        .start-btn:hover { transform: scale(1.05); }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(225, 29, 72, 0); }
          100% { box-shadow: 0 0 0 0 rgba(225, 29, 72, 0); }
        }

        /* Typography */
        h1 { font-size: 2.8rem; line-height: 1.1; margin-bottom: 10px; }
        h2 { font-size: 1.6rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .subtitle { font-family: 'Patrick Hand', cursive; font-size: 1.3rem; opacity: 0.8; }
        .highlight { color: var(--primary); text-decoration: underline wavy var(--primary); }

        /* Cards */
        .card {
          background: var(--glass);
          border: 2px solid var(--glass-border);
          border-radius: 20px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: var(--shadow);
          backdrop-filter: blur(8px);
        }

        /* Timeline */
        .timeline { position: relative; border-left: 3px dashed #fca5a5; margin-left: 20px; padding-left: 30px; }
        .timeline-item { position: relative; margin-bottom: 30px; }
        .timeline-dot {
          position: absolute; left: -39px; top: 0;
          width: 16px; height: 16px; background: var(--primary);
          border-radius: 50%; border: 4px solid white;
        }
        .time-label { font-weight: bold; color: var(--primary); font-size: 0.9rem; }
        
        /* Comparison */
        .vs-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px; align-items: center; }
        .vs-bad { color: #94a3b8; font-size: 0.9rem; }
        .vs-good { color: var(--primary); font-weight: bold; }

        /* Bribes */
        .bribe-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .bribe-card {
          background: rgba(255,255,255,0.5); border: 2px solid transparent;
          border-radius: 15px; padding: 15px; cursor: pointer;
          text-align: center; transition: all 0.2s;
        }
        .bribe-card:hover { transform: translateY(-3px); border-color: #fda4af; }
        .bribe-card.selected { background: #fff1f2; border-color: var(--primary); transform: scale(1.05); }
        
        /* Testimonials */
        .testimonials { display: flex; gap: 15px; overflow-x: auto; padding-bottom: 10px; }
        .test-card { 
          min-width: 200px; background: white; padding: 15px; 
          border-radius: 15px; font-size: 0.9rem; font-style: italic; 
        }

        /* Action Button */
        .action-btn {
          width: 100%; background: #e2e8f0; color: #64748b;
          padding: 20px; border-radius: 50px; border: none;
          font-size: 1.2rem; font-weight: bold; cursor: not-allowed;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.3s;
        }
        .action-btn.active { background: var(--primary); color: white; cursor: pointer; box-shadow: 0 10px 25px rgba(225, 29, 72, 0.4); }
        .action-btn.active:hover { transform: scale(1.02); }

        /* Music Button */
        .music-toggle {
          position: fixed; top: 20px; right: 20px;
          background: white; width: 45px; height: 45px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1); cursor: pointer; z-index: 100;
          color: var(--primary); border: none;
        }

        @media (max-width: 600px) {
          .bribe-grid { grid-template-columns: 1fr; }
          .vs-row { font-size: 0.8rem; }
          h1 { font-size: 2.2rem; }
        }
      `}</style>

      {/* --- START OVERLAY (Fixes Autoplay Issue) --- */}
      {!hasStarted && (
        <div className="start-overlay">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <span style={{ fontSize: '4rem' }}>💌</span>
          </motion.div>
          <h1 style={{ marginBottom: '5px' }}>Important Message</h1>
          <p style={{ marginBottom: '30px' }}>For {GIRLFRIEND_NAME}</p>
          <button className="start-btn" onClick={handleStart}>
            Open Apology
          </button>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      {hasStarted && (
        <motion.div 
          className="container"
          initial="hidden" 
          animate="visible" 
          variants={containerVariants}
        >
          {/* Music Toggle */}
          <button className="music-toggle" onClick={toggleMusic}>
            {isPlaying ? <Music size={20} /> : <VolumeX size={20} />}
          </button>

          {/* Hero */}
          <motion.div className="card" style={{ textAlign: 'center' }} variants={itemVariants}>
            <h1>Official Apology to <br/><span className="highlight">{GIRLFRIEND_NAME}</span></h1>
            <p className="subtitle">I am a dummy. Please forgive me. 🥔</p>
          </motion.div>

          {/* Timeline Component */}
          <motion.div className="card" variants={itemVariants}>
            <h2><Clock className="text-rose-500"/> Timeline of Regret</h2>
            <div className="timeline">
              {timelineEvents.map((event, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="time-label">{event.time}</div>
                  <strong>{event.title}</strong>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>{event.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Comparison Component */}
          <motion.div className="card" variants={itemVariants}>
            <h2><Scale className="text-rose-500"/> The Evidence</h2>
            <div className="vs-row" style={{ borderBottom: '1px solid #ffccd5', paddingBottom: '5px' }}>
              <span>Feature</span>
              <span className="vs-bad">The Boys 🍺</span>
              <span className="vs-good">YOU 👑</span>
            </div>
            {comparisons.map((c, i) => (
              <div key={i} className="vs-row">
                <strong>{c.feature}</strong>
                <span className="vs-bad"><X size={12} style={{display:'inline'}}/> {c.friends}</span>
                <span className="vs-good"><Check size={12} style={{display:'inline'}}/> {c.you}</span>
              </div>
            ))}
          </motion.div>

          {/* Binding Contract Component */}
          <motion.div className="card" variants={itemVariants}>
            <h2><FileSignature className="text-rose-500"/> Binding Contract</h2>
            <p style={{marginBottom: '15px'}}>I hereby promise to:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Reply to texts instantly', 'Always bring you snacks', 'Always gonna gives you milion kisses until youre asleep afterwards as well ;) '].map((promise, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', background: 'white', padding: '10px', borderRadius: '10px' }}>
                  <div style={{ width: '20px', height: '20px', background: '#ffe4e6', borderRadius: '50%', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--primary)'}}>✓</div>
                  {promise}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Testimonials Component */}
          <motion.div variants={itemVariants} style={{ marginBottom: '30px' }}>
            <h2 style={{ paddingLeft: '10px' }}><MessageCircle className="text-rose-500"/> Witness Testimonies</h2>
            <div className="testimonials">
              {testimonials.map((t, i) => (
                <div key={i} className="test-card">
                  "{t.quote}"
                  <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--primary)' }}>- {t.name}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bribes */}
          <motion.div className="card" variants={itemVariants}>
            <h2><Gift className="text-rose-500"/> Select Reparations</h2>
            <div className="bribe-grid">
              {bribes.map((b) => (
                <div 
                  key={b.id} 
                  className={`bribe-card ${selectedBribe === b.id ? 'selected' : ''}`}
                  onClick={() => setSelectedBribe(b.id)}
                >
                  <div style={{ fontSize: '2rem' }}>{b.icon}</div>
                  <div style={{ fontWeight: 'bold', margin: '5px 0' }}>{b.title}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Final Action */}
          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              {isForgiven ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="card"
                  style={{ background: '#e11d48', color: 'white', textAlign: 'center' }}
                >
                  <h1>I LOVE YOU! ❤️</h1>
                  <p>Thank you for not dumping me.</p>
                </motion.div>
              ) : (
                <button 
                  className={`action-btn ${selectedBribe ? 'active' : ''}`}
                  onClick={handleForgive}
                  disabled={!selectedBribe}
                >
                  {selectedBribe ? <>Click to Forgive <ArrowRight/></> : "Select a Bribe First..."}
                </button>
              )}
            </AnimatePresence>
          </motion.div>

        </motion.div>
      )}
    </div>
  );
};

export default ApologyPage;