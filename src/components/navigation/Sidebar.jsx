import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LayoutDashboard, Map, Fish, Trash2, Activity, AlertTriangle, Video, Radar, Home, ChevronsLeft, ChevronsRight } from 'lucide-react';

const navItems = [
  { name: 'Overview', path: '#overview', icon: LayoutDashboard },
  { name: 'Live Map', path: '#live-map', icon: Map },
  { name: 'Species Tracker', path: '#species', icon: Fish },
  { name: 'Pollution Monitor', path: '#pollution', icon: Trash2 },
  { name: 'Coral Health', path: '#coral', icon: Activity },
  { name: 'Risk Forecast', path: '#risk', icon: AlertTriangle },
  { name: 'Drone Feeds', path: '#drone-feeds', icon: Video },
];

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen, collapsed, setCollapsed }) {
  const navRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const rafRef = useRef(null);
  const [, forceRender] = useState(0);

  // Direct DOM update — no React re-render on scroll
  const applyScales = useCallback((activeIdx) => {
    navRefs.current.forEach((el, i) => {
      if (!el) return;
      const dist = Math.abs(i - activeIdx);
      const scale = dist === 0 ? 1.35 : dist === 1 ? 1.05 : 0.9;
      const isActive = dist === 0;
      el.style.transform = `scale(${scale})`;
      el.style.color = isActive ? 'var(--text-primary)' : 'var(--text-secondary)';
      el.style.fontWeight = isActive ? '600' : '400';
    });
  }, []);

  useEffect(() => {
    const update = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      let best = Infinity;
      let activeIdx = 0;

      navItems.forEach((item, i) => {
        const id = item.path.replace('#', '');
        const section = document.getElementById(id);
        if (section) {
          const center = section.offsetTop + section.offsetHeight / 2;
          const d = Math.abs(center - mid);
          if (d < best) { best = d; activeIdx = i; }
        }
      });

      if (activeIdx !== activeIndexRef.current) {
        activeIndexRef.current = activeIdx;
        applyScales(activeIdx);
      }
    };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial paint
    setTimeout(update, 150);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyScales]);

  // Re-apply scales when collapsed changes (transform-origin shifts)
  useEffect(() => {
    applyScales(activeIndexRef.current);
  }, [collapsed, applyScales]);

  return (
    <aside 
      className={`h-screen bg-[var(--surface-card)] border-r border-[var(--glass-border)] flex flex-col fixed left-0 top-0 z-50 transition-base
      md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      ${collapsed ? 'w-[76px]' : 'w-64'}`}
    >
      <div className={`h-16 flex items-center px-5 border-b border-[var(--glass-border)] shrink-0 transition-base ${collapsed && 'justify-center px-0'}`}>
        <a href="/" className="flex items-center gap-2.5 font-sans font-bold text-base tracking-tight text-[var(--text-primary)]">
          <div className="w-8 h-8 rounded-lg bg-[rgba(62,107,114,0.15)] flex items-center justify-center text-[var(--accent)] shrink-0">
            <Radar size={18} strokeWidth={2.25} />
          </div>
          {!collapsed && (
            <span>DeepSea<span className="text-[var(--accent)]"> Guardian</span></span>
          )}
        </a>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 flex flex-col gap-1">
        {navItems.map((item, index) => (
          <a
            key={item.name}
            ref={el => navRefs.current[index] = el}
            href={item.path}
            onClick={() => {
              setMobileMenuOpen && setMobileMenuOpen(false);
              activeIndexRef.current = index;
              applyScales(index);
            }}
            style={{
              transformOrigin: collapsed ? 'center center' : 'left center',
              transition: 'transform 0.25s ease, color 0.25s, font-weight 0.25s',
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm cursor-pointer ${collapsed && 'justify-center px-0'}`}
            title={collapsed ? item.name : undefined}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && (
              <span>{item.name}</span>
            )}
          </a>
        ))}
      </nav>

      <div className={`px-3 py-4 border-t border-[var(--glass-border)] shrink-0 flex flex-col gap-3 ${collapsed && 'px-2'}`}>
        <a href="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[var(--text-primary)] ${collapsed && 'justify-center px-0'}`} title={collapsed ? "Back to Home" : undefined}>
          <Home className="w-5 h-5 shrink-0" />
          {!collapsed && "Back to Home"}
        </a>
        <div className={`flex items-center gap-2.5 rounded-lg bg-[rgba(62,107,114,0.1)] px-3 py-2.5 border border-[rgba(62,107,114,0.2)] ${collapsed && 'justify-center px-0'}`}>
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          </span>
          {!collapsed && (
            <div className="min-w-0 flex flex-col">
              <span className="text-[10px] text-[var(--text-primary)] uppercase tracking-wider font-semibold">Network Online</span>
              <span className="text-xs text-[var(--text-secondary)]">42 buoys reporting</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className="mt-3 w-full p-2 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] btn-animate hover:bg-[rgba(255,255,255,0.03)] rounded-md"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}

