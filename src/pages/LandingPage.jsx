import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  animate,
  useReducedMotion,
  AnimatePresence,
  LayoutGroup
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import ThemeToggle from "../components/common/ThemeToggle";

// ═══ §1 BLOCK REVEAL HOOK ═══
const BlockRevealText = ({ text, delay = 0, duration = 800, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  
  return (
    <span ref={ref} className={`relative inline-flex overflow-hidden align-bottom ${className}`}>
      <motion.span
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        initial="hidden" animate={inView ? "visible" : "hidden"}
        transition={{ delay: (delay + duration * 0.5) / 1000, duration: 0 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 bottom-0 bg-[var(--accent)] z-10"
        variants={{
          hidden: { left: 0, right: "100%" },
          visible: { left: ["0%", "0%", "100%"], right: ["100%", "0%", "0%"] }
        }}
        initial="hidden" animate={inView ? "visible" : "hidden"}
        transition={{ duration: duration / 1000, ease: [0.65, 0, 0.35, 1], delay: delay / 1000, times: [0, 0.5, 1] }}
      />
    </span>
  );
};

// ═══ §2 FLOATING PARTICLES ═══
function genParticles(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, opacity: Math.random() * 0.5 + 0.1,
    duration: Math.random() * 14 + 8, delay: Math.random() * 8,
    drift: (Math.random() - 0.5) * 50,
  }));
}

const ParticleField = () => {
  const pts = useMemo(() => genParticles(60), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: p.size > 3 ? "radial-gradient(circle, rgba(62,107,114,0.9) 0%, rgba(62,107,114,0) 70%)" : "rgba(159,184,185,0.7)",
            boxShadow: p.size > 2 ? `0 0 ${p.size * 5}px rgba(62,107,114,0.7)` : "none",
          }}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{ opacity: [0, p.opacity, p.opacity * 0.5, 0], y: [0, -90, -160], x: [0, p.drift, p.drift * 0.4] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

// ═══ §3 ANIMATED COUNTER ═══
const AnimatedCounter = ({ value, suffix = "+", label }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, value, {
      duration: 2.4, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return ctrl.stop;
  }, [inView, value]);
  return (
    <div ref={ref} className="text-center">
      <div style={{ fontSize: "clamp(2rem,1.5rem + 3vw,4rem)" }} className="font-sans font-bold leading-none mb-2 text-white">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-white/50 font-sans">{label}</div>
    </div>
  );
};

// ═══ §4 CLIP-PATH WIPE REVEAL ═══
const ClipReveal = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0, x: -20 }}
    whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >{children}</motion.div>
);

// ═══ §5 FADE-RISE REVEAL ═══
const Reveal = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >{children}</motion.div>
);

// ═══ §5.5 SLOT MACHINE TEXT ═══
const SlotMachineText = ({ text, delay = 0, duration = 0.8, className = "" }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom pb-1">
          <motion.span
            className="inline-block"
            initial={{ y: "120%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: delay + i * 0.04,
              duration: duration,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// ═══ §6 MAGNETIC 3D CARD ═══
const MagneticCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.07, y: (e.clientY - r.top - r.height / 2) * 0.07 });
  };
  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y, rotateX: -pos.y * 0.5, rotateY: pos.x * 0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >{children}</motion.div>
  );
};

// ═══ §7 DATA ═══
const features = [
  { 
    icon: "🚨", 
    title: "Threat Detection", 
    desc: "Instantly identify illegal dumping, plastic accumulation, and ghost nets using AI-analyzed sonar and satellite imagery.",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=600"
  },
  { 
    icon: "🐋", 
    title: "Ecosystem Tracking", 
    desc: "Monitor coral health, track marine species populations, and predict migration patterns to safeguard biodiversity.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600"
  },
  { 
    icon: "🚢", 
    title: "Vessel Monitoring", 
    desc: "Cross-reference AIS data with visual drone feeds to detect unauthorized vessels in protected marine sanctuaries.",
    image: "https://images.unsplash.com/photo-1505245208761-ba872912fac0?auto=format&fit=crop&q=80&w=600"
  },
];

const steps = [
  { num: "01", title: "Deploy Sensors", desc: "IoT sensor networks and underwater drones collect real-time environmental data across monitored zones." },
  { num: "02", title: "AI Processing", desc: "Machine learning models analyze sonar, satellite, and sensor feeds to detect threats and classify marine life." },
  { num: "03", title: "Alert & Visualize", desc: "Findings are mapped in real-time with severity-coded alerts and interactive multi-layer dashboards." },
  { num: "04", title: "Act & Report", desc: "Stakeholders receive actionable insights, downloadable reports, and can coordinate conservation responses." },
];

const alertLevels = [
  { level: "No Stress", color: "#3E7CB1" },
  { level: "Watch", color: "#E8C547" },
  { level: "Warning", color: "#E8842C" },
  { level: "Alert 1", color: "#D1452C" },
  { level: "Alert 2", color: "#7A2338" },
];

const InteractiveDataModuleContent = ({ alertLevels }) => {
  const navigate = useNavigate();
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredThreat, setHoveredThreat] = useState(null);

  const oceanData = [
    { month: 'Jan', v: 65 }, { month: 'Feb', v: 72 }, { month: 'Mar', v: 58 },
    { month: 'Apr', v: 80 }, { month: 'May', v: 74 }, { month: 'Jun', v: 69 },
    { month: 'Jul', v: 85 }, { month: 'Aug', v: 78 }, { month: 'Sep', v: 82 },
    { month: 'Oct', v: 90 }, { month: 'Nov', v: 76 }, { month: 'Dec', v: 88 }
  ];

  const threats = [
    { label: "Microplastic Debris", pct: 38.5, color: "#3E6B72", trend: "+2.4%" },
    { label: "Abandoned Ghost Nets", pct: 22.1, color: "#B5674F", trend: "-0.8%" },
    { label: "Agricultural Runoff", pct: 18.7, color: "#E8842C", trend: "+1.2%" },
    { label: "Thermal Bleaching", pct: 15.3, color: "#D1452C", trend: "+4.5%" },
    { label: "Acoustic Pollution", pct: 5.4, color: "#9FB8B9", trend: "+0.1%" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <Reveal><p className="text-xs uppercase tracking-[0.25em] text-[#1A1A1A] opacity-70 font-sans"><BlockRevealText text="Data Module" delay={100} duration={800} /></p></Reveal>
        <Reveal delay={0.2}>
          <Button variant="primary" size="sm" onClick={() => navigate('/dashboard')} className="!text-xs">Explore Dashboard →</Button>
        </Reveal>
      </div>
      <ClipReveal delay={0.1}><h2 className="text-[clamp(2rem,4vw,3.5rem)] font-sans font-bold tracking-tight text-[#1A1A1A] mb-3"><BlockRevealText text="Interactive Data Preview" delay={200} duration={1000} /></h2></ClipReveal>
      <Reveal delay={0.15}><p className="text-sm text-[#1A1A1A] opacity-80 mb-6 max-w-xl">NOAA Coral Reef Watch severity scale — standards-referenced, accessibility-first. Hover over the data points for real-time telemetry details.</p></Reveal>
      
      <Reveal delay={0.2}>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {alertLevels.map((a, i) => (
            <motion.div key={i} whileHover={{ y: -5, scale: 1.04 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[var(--surface-card)] rounded-xl border border-[var(--glass-border)] p-3 text-center cursor-default shadow-lg">
              <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: a.color, boxShadow: `0 4px 14px ${a.color}60` }} />
              <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">{a.level}</p>
              <p className="text-[10px] text-[var(--text-secondary)] font-mono">{a.color}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.3} className="flex-1 min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
          {/* Chart 1 */}
          <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--glass-border)] p-5 shadow-lg flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-sans font-bold text-sm text-[var(--text-primary)]">Ocean Health Index</h3>
              <span className="text-xs text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded-md border border-[var(--accent)]/20">Live Telemetry</span>
            </div>
            <div className="flex-1 flex items-end gap-1.5 relative h-28">
              {oceanData.map((d, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }} 
                  whileInView={{ height: `${d.v}%` }}
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex-1 rounded-t-md relative cursor-pointer transition-all duration-300 ${hoveredBar !== null && hoveredBar !== i ? 'opacity-40' : 'opacity-100'}`}
                  style={{ backgroundColor: d.v > 75 ? "#3E6B72" : d.v > 60 ? "#9FB8B9" : "#E8842C" }}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <AnimatePresence>
                    {hoveredBar === i && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-[10px] py-1 px-2 rounded font-mono whitespace-nowrap z-10 pointer-events-none shadow-lg"
                      >
                        {d.v} OHI
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-[10px] text-[var(--text-secondary)] font-mono"><span>Jan</span><span>Jun</span><span>Dec</span></div>
          </div>

          {/* Chart 2 */}
          <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--glass-border)] p-5 shadow-lg flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-sans font-bold text-sm text-[var(--text-primary)]">Threat Distribution</h3>
              <span className="text-[10px] text-[var(--text-secondary)] font-mono">Global Avg</span>
            </div>
            <div className="space-y-3 flex-1 flex flex-col justify-center">
              {threats.map((item, i) => (
                <div key={i} className="group cursor-pointer" onMouseEnter={() => setHoveredThreat(i)} onMouseLeave={() => setHoveredThreat(null)}>
                  <div className="flex justify-between text-xs mb-1.5 items-end">
                    <span className={`font-medium transition-colors duration-300 ${hoveredThreat === i ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{item.label}</span>
                    <div className="flex gap-2 items-center">
                      <span className={`text-[10px] ${item.trend.startsWith('+') ? 'text-red-400' : 'text-[#3E6B72]'}`}>{item.trend}</span>
                      <span className="font-mono text-[var(--text-secondary)]">{item.pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-black/40 rounded-full overflow-hidden relative">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full transition-all duration-300 ${hoveredThreat === i ? 'brightness-125' : ''}`} style={{ backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

// ═══ §8 CURSOR GLOW ═══
function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const sx = useSpring(pos.x, { stiffness: 70, damping: 20 });
  const sy = useSpring(pos.y, { stiffness: 70, damping: 20 });
  const glowX = useTransform(sx, (v) => v - 200);
  const glowY = useTransform(sy, (v) => v - 200);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
      style={{
        x: glowX,
        y: glowY,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(62,107,114,0.15) 0%, transparent 70%)",
      }}
    />
  );
}

// ═══ §9.1 THREAT DETECTION SECTION ═══
const ThreatDetectionSection = ({ isHeroExpanded }) => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageContainerVariants = {
    hidden: { clipPath: prefersReducedMotion ? "none" : "inset(0 100% 0 0)", opacity: 0 },
    visible: { clipPath: "inset(0 0% 0 0)", opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  const imageVariants = {
    hidden: { scale: prefersReducedMotion ? 1 : 1.2 },
    visible: { scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="features" ref={sectionRef} className="py-[var(--space-8)] px-6 relative">
      <div className="max-w-6xl mx-auto flex">
        <motion.div
          className="flex-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p variants={headerVariants} className="section-eyebrow">WHAT WE MONITOR</motion.p>
          <motion.h2 variants={headerVariants} className="section-heading mt-2">Threat Detection Modules</motion.h2>
          <motion.div variants={headerVariants} className="w-16 h-0.5 bg-[var(--accent)] mt-4 mb-14" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div 
                key={i} 
                variants={cardVariants} 
                className="h-full"
                animate={{
                  opacity: isHeroExpanded && i !== 0 ? 0.4 : 1,
                  scale: isHeroExpanded && i !== 0 ? 0.98 : 1
                }}
                transition={{ duration: 0.5 }}
              >
                <MagneticCard className="h-full">
                  <div className="feature-card group h-full flex flex-col p-0 overflow-hidden relative">
                    <div className="feature-glow-orb" />
                    <motion.div variants={imageContainerVariants} className="w-full h-40 overflow-hidden relative z-0">
                      <AnimatePresence mode="popLayout">
                        {(!isHeroExpanded || i !== 0) && (
                          <motion.img
                            key={`card-img-${i}`}
                            src={f.image}
                            alt={f.title}
                            variants={imageVariants}
                            layoutId={i === 0 ? "threat-detection-to-deep-sea-hero" : undefined}
                            className="w-full h-full object-cover"
                            transition={{ type: "spring", stiffness: 80, damping: 20 }}
                          />
                        )}
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-card)] via-[var(--surface-card)]/60 to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-5 text-3xl bg-black/40 p-2 rounded-xl backdrop-blur-md border border-white/10 z-10">{f.icon}</div>
                    </motion.div>
                    <div className="p-6 pt-3 flex-1 flex flex-col relative z-10">
                      <h3 className="font-sans font-bold text-base mb-2">{f.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ═══ §9.2 ARTICLE REVEAL SECTION ═══
const ArticleRevealSection = ({ isHeroExpanded, setIsHeroExpanded }) => {
  const sectionRef = useRef(null);
  
  const inView = useInView(sectionRef, { margin: "-40% 0px -40% 0px" });
  useEffect(() => {
    setIsHeroExpanded(inView);
  }, [inView, setIsHeroExpanded]);

  const textContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
  };
  const textChild = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="impact" ref={sectionRef} className="relative w-full border-t border-[var(--glass-border)] bg-[var(--surface-page)] h-full py-12 lg:py-20 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 h-full">
        
        {/* Main Heading (Top) */}
        <motion.div 
          variants={textContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20%" }}
          className="mb-10 lg:mb-16 text-center max-w-4xl mx-auto"
        >
          <motion.div 
            variants={textChild}
            className="flex items-center justify-center gap-4 text-xs md:text-sm text-[var(--accent-muted)] font-mono uppercase tracking-widest mb-4"
          >
            <span>Deep Sea Report</span>
            <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
            <span>Module 01</span>
          </motion.div>
          <motion.h2 variants={textChild} className="text-[clamp(2.5rem,5vw,4.5rem)] font-sans font-bold leading-[1.05] tracking-tight text-[var(--text-primary)]">
            Beneath the surface, a silent crisis unfolds.
          </motion.h2>
        </motion.div>

        {/* Side-by-Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full gap-12 lg:gap-20">
          
          {/* Left Side: Sticky Image */}
          <div className="lg:col-span-6 relative h-full">
            <div className="h-[50vh] lg:h-[60vh] w-full overflow-hidden">
              <AnimatePresence>
                {isHeroExpanded && (
                  <motion.img 
                    layoutId="threat-detection-to-deep-sea-hero"
                    src="/thomas-ocean.jpg" 
                    alt="Deep ocean research" 
                    className="w-full h-full object-cover absolute top-0 left-0"
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    style={{ borderRadius: "0px" }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Article Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div 
              className="max-w-xl pb-10"
              variants={textContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-20%" }}
            >
              <div className="mb-16">
                <motion.h3 variants={textChild} className="text-2xl lg:text-3xl font-sans font-bold mb-6 text-[var(--text-primary)]">
                  The Vital Role of Oceans
                </motion.h3>
                <motion.p variants={textChild} className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-sans">
                  The ocean is the foundation of life on Earth. It regulates our climate by absorbing over 90% of excess heat and 30% of carbon dioxide emissions. Producing more than 50% of the world's oxygen, it is truly the lungs of our planet. Home to millions of species, complex marine ecosystems like coral reefs sustain the environmental balance that all life depends on.
                </motion.p>
              </div>
              
              <div className="mb-16">
                <motion.h3 variants={textChild} className="text-2xl lg:text-3xl font-sans font-bold mb-6 text-[var(--text-primary)]">
                  The Escalating Threat of Pollution
                </motion.h3>
                <motion.p variants={textChild} className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-sans mb-6">
                  Unfortunately, human activities are driving a silent crisis. Nearly 90% of assessed marine species have been negatively affected by plastic debris, chemical runoff, and ghost nets.
                </motion.p>
                <motion.p variants={textChild} className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-sans">
                  Pollution causes severe ecosystem damage, creating dead zones and threatening the 3 billion people who rely on the ocean for food and livelihoods. We must act now with proactive monitoring to protect these essential ecosystems before the damage becomes irreversible.
                </motion.p>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

// ═══ §9 MAIN APP ═══
function LandingPage() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], ["0%", "25%"]);
  const bgScale = useTransform(scrollY, [0, 700], [1, 1.14]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const navOpacityRaw = useTransform(scrollY, [0, 200], [0, 1]);
  const navOpacitySpring = useSpring(navOpacityRaw, { stiffness: 100, damping: 20 });
  const [navSolid, setNavSolid] = useState(false);
  useEffect(() => navOpacitySpring.on("change", (v) => setNavSolid(v > 0.5)), [navOpacitySpring]);

  const [isHeroExpanded, setIsHeroExpanded] = useState(false);

  const transitionWrapperRef = useRef(null);
  const articleWrapperRef = useRef(null);
  const dataWipeRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: transitionWrapperRef.current,
        start: "bottom 90%",
        end: "+=100%",
        pin: true,
        scrub: true,
        snap: {
          snapTo: [0, 1],
          duration: { min: 0.3, max: 0.6 },
          delay: 0.1,
          ease: "power2.inOut"
        }
      }
    });
    tl.to(articleWrapperRef.current, { yPercent: -100, ease: "none" }, 0);
  }, { scope: transitionWrapperRef });

  return (
    <LayoutGroup>
      <div className="min-h-screen bg-[var(--surface-page)] text-[var(--text-primary)] overflow-x-hidden relative">
        <CursorGlow />

      {/* NAV */}
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 premium-glass-nav px-6 py-3 flex items-center justify-between gap-8 max-w-4xl w-[calc(100%-2rem)]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: navSolid ? "var(--surface-card)" : "var(--glass-fill)", transition: "background-color 400ms ease" }}
      >
        <a href="#" className="flex items-center gap-2 font-sans font-bold text-base tracking-tight text-[var(--text-primary)]">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-muted)] flex items-center justify-center text-white text-xs">⬡</div>
          DeepSea Guardian
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm text-[var(--text-secondary)]">
          {["Features", "Impact", "Report", "About"].map((l) => (
            <motion.a 
              key={l} 
              href={`#${l.toLowerCase().replace(/\s/g, "-")}`} 
              className="underline-draw hover:text-[var(--text-primary)] transition-colors relative"
              whileHover={{ y: -2, textShadow: "0px 0px 8px rgba(159,184,185,0.5)" }}
            >
              {l}
            </motion.a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => navigate('/auth')}>Sign In</Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/dashboard')}>Get Started</Button>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: bgScale }}>
          <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-[var(--surface-page)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink-950)]/70 via-transparent to-[var(--ink-950)]/40" />
        </motion.div>

        <ParticleField />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0" aria-hidden="true">
          <span className="ghost-wordmark">OCEAN</span>
        </div>

        <motion.div className="relative z-10 text-center max-w-3xl mx-auto px-6" style={{ opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="eyebrow-line" />
            <span className="text-[11px] uppercase tracking-[0.32em] text-[var(--accent-muted)] font-sans font-medium">AI-Powered Marine Conservation</span>
            <span className="eyebrow-line" />
          </motion.div>

          <h1 className="hero-heading mb-7 flex flex-col items-center gap-2">
            <BlockRevealText text="Protecting the deep," delay={400} duration={1000} className="block font-sans" />
            <BlockRevealText text="one signal at a time" delay={800} duration={1000} className="block font-sans" />
          </h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            className="text-white/65 text-lg max-w-xl mx-auto mb-11 leading-relaxed font-sans"
          >
            Real-time monitoring of illegal dumping, plastic pollution, ghost nets, coral health, and endangered species across the world's oceans.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="hero-btn-primary" onClick={() => navigate('/dashboard')}>
              Explore Dashboard
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="hero-btn-ghost">
              ▷ Watch the Film
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8, duration: 0.8 }}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/35 font-sans">Scroll</span>
          <motion.div className="w-px h-12 bg-gradient-to-b from-white/35 to-transparent"
            animate={{ scaleY: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* THREAT DETECTION MODULES */}
      <ThreatDetectionSection isHeroExpanded={isHeroExpanded} />
      
      {/* GSAP PINNED SLIDE REVEAL WRAPPER */}
      <div ref={transitionWrapperRef} className="relative w-full bg-[var(--surface-page)] overflow-hidden">
        
        {/* TARGET (Data Module) - z-0, sits lower so upper edges are visible behind article */}
        <div className="absolute bottom-0 left-0 w-full h-screen z-0 bg-[var(--surface-page)] flex flex-col items-center justify-center p-4 lg:p-6 pt-[12vh] lg:pt-[15vh]">
          <section id="report" className="w-full max-w-[95%] mx-auto py-8 lg:py-10 px-6 lg:px-12 flex flex-col bg-[#DCE6E6] rounded-[2rem] shadow-2xl relative">
            <InteractiveDataModuleContent alertLevels={alertLevels} />
          </section>
        </div>

        {/* SOURCE (Article) - z-10, dictates height of wrapper, sits on top and slides out */}
        <div ref={articleWrapperRef} className="relative w-full z-10 bg-[var(--surface-page)] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <ArticleRevealSection isHeroExpanded={isHeroExpanded} setIsHeroExpanded={setIsHeroExpanded} />
        </div>
      </div>
      {/* ABOUT US — mid-ocean bg (manta ray) */}
      <section id="about" className="py-[var(--space-8)] px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="/midocean-3.png" alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-[var(--surface-page)]" style={{ opacity: 0.80 }} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal><p className="section-eyebrow text-center mb-4"><BlockRevealText text="About Our Team & Solution" delay={100} duration={800} /></p></Reveal>
          <ClipReveal delay={0.1}><h2 className="section-heading text-center mb-16"><BlockRevealText text="Dedicated to ocean conservation" delay={200} duration={1000} /></h2></ClipReveal>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.02)] p-7 h-full">
                <h3 className="text-xl font-sans font-bold text-[var(--text-secondary)] mb-6">Our Team</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">We are a passionate group of marine biologists, data scientists, and engineers committed to reversing the damage done to our oceans. With decades of combined experience in autonomous systems and ecological research, our mission is to build the ultimate early-warning network for marine ecosystems.</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Our global team spans 15 countries, collaborating tirelessly to monitor and protect vulnerable habitats.</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.3}>
              <div className="rounded-2xl border border-[var(--accent)] bg-[rgba(62,107,114,0.05)] p-7 h-full shadow-[0_0_30px_rgba(62,107,114,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent pointer-events-none" />
                <h3 className="text-xl font-sans font-bold text-[var(--accent)] mb-6 relative z-10">Our Solution</h3>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-4 relative z-10">DeepSea Guardian leverages real-time acoustic telemetry and AI image recognition to identify illegal fishing, pollution spills, and temperature anomalies instantly. By replacing infrequent manual surveys with an autonomous 24/7 network, we empower policy makers to act immediately.</p>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed relative z-10">Together, we can shift from observing decline to actively ensuring recovery.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMPACT + TESTIMONIALS — single continuous mid-ocean background (school of fish) */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="/midocean-2.png" alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-[var(--surface-page)]" style={{ opacity: 0.72 }} />
        </div>

      {/* IMPACT STATS */}
      <section id="impact" className="relative py-[var(--space-8)] px-6 overflow-hidden impact-section">
        <div className="impact-glow-left" />
        <div className="impact-glow-right" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal><p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-muted)] mb-3 font-sans"><BlockRevealText text="Global Impact" delay={100} duration={800} /></p></Reveal>
          <ClipReveal delay={0.1}><h2 className="text-[var(--fs-h1)] font-sans font-bold tracking-tight text-white mb-16"><BlockRevealText text="Our Reach So Far" delay={200} duration={1000} /></h2></ClipReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <AnimatedCounter value={971} label="Monitoring Stations" />
            <AnimatedCounter value={16000} label="Square Km Mapped" />
            <AnimatedCounter value={25000} label="Species Tracked" />
            <AnimatedCounter value={40} label="Countries Active" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-[var(--space-8)] px-6 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal><p className="section-eyebrow mb-10">Testimonials</p></Reveal>
          <div className="space-y-12">
            {[
              { quote: "DeepSea Guardian gave us the first real-time picture of ghost net distribution across our entire monitoring zone. Nothing else comes close.", author: "Dr. Elena Vasquez", role: "Marine Biologist, Ocean Alliance" },
              { quote: "The severity alert system follows the exact NOAA scale we use in our research. It's the only platform that speaks our language.", author: "Prof. James Whitmore", role: "Coral Reef Watch Program" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <blockquote className="border-l-2 border-[var(--accent)] pl-7">
                  <p className="font-sans font-medium text-xl leading-relaxed mb-4">"{t.quote}"</p>
                  <footer className="text-sm">
                    <span className="font-sans font-semibold">{t.author}</span>
                    <span className="text-[var(--text-secondary)]"> — {t.role}</span>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      </div>{/* end Impact+Testimonials shared background */}

      {/* CTA + FOOTER — deep ocean floor background at the very bottom */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="/dashboard-bg.png" alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-[var(--surface-page)]" style={{ opacity: 0.55 }} />
        </div>

      {/* CTA */}
      <section className="py-[var(--space-8)] px-6 relative z-10">
        <Reveal>
          <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden relative cta-card">
            <div className="absolute inset-0 z-0">
              <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover object-center opacity-40" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050d12]/95 via-[#050d12]/70 to-[#050d12]/50" />
            </div>
            <div className="relative z-10 p-14 text-center">
              <ClipReveal><h2 className="text-[var(--fs-h1)] font-sans font-bold tracking-tight text-white mb-4"><BlockRevealText text="Ready to dive in?" delay={100} duration={1000} /></h2></ClipReveal>
              <Reveal delay={0.15}><p className="text-white/55 mb-10 max-w-md mx-auto font-sans">Join the growing network of researchers, conservationists, and policy makers using DeepSea Guardian.</p></Reveal>
              <Reveal delay={0.25}>
                <div className="flex flex-wrap gap-4 justify-center">
                  <motion.button onClick={() => navigate('/dashboard')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="hero-btn-primary">Get Started</motion.button>
                  <motion.button onClick={() => navigate('/auth')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="hero-btn-ghost">Sign In</motion.button>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 hairline-top relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
          <span className="font-sans font-bold text-[var(--text-primary)]">DeepSea Guardian</span>
          <span>© 2026 DeepSea Guardian. All rights reserved.</span>
        </div>
      </footer>
      </div>{/* end deep ocean floor wrapper */}
    </div>
    </LayoutGroup>
  );
}

export default LandingPage;
