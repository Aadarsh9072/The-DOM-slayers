import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Bell, Search, Settings, Menu, User, LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import SettingsModal from '../common/SettingsModal';
import UserProfileModal from '../common/UserProfileModal';

import overviewData from '../../data/overview.json';
import mapData from '../../data/map-data.json';
import modulesData from '../../data/modules-data.json';

// ── Build the searchable index from real app data ──
const navPages = [
  { name: 'Overview', hash: '#overview' },
  { name: 'Live Map', hash: '#live-map' },
  { name: 'Species Tracker', hash: '#species' },
  { name: 'Pollution Monitor', hash: '#pollution' },
  { name: 'Coral Health', hash: '#coral' },
  { name: 'Risk Forecast', hash: '#risk' },
  { name: 'Drone Feeds', hash: '#drone-feeds' },
];

function buildSearchIndex() {
  const items = [];

  // Pages (sidebar nav labels)
  navPages.forEach(p => items.push({ label: p.name, category: 'Pages', action: { type: 'hash', value: p.hash } }));

  // KPI stat card labels
  overviewData.kpis.forEach(k => items.push({ label: k.title, category: 'Stats', action: { type: 'hash', value: '#overview' } }));

  // Sensors from map-data
  mapData.sensors.forEach(s => items.push({ label: `Sensor ${s.id}`, category: 'Sensors', action: { type: 'hash', value: '#live-map' } }));

  // Sensors from SensorActivityPanel data (inline)
  [
    { id: 'SN-4291', loc: 'Mariana Trench' },
    { id: 'UAV-ALPHA', loc: 'Great Barrier Reef' },
    { id: 'SN-8820', loc: 'Mid-Atlantic Ridge' },
    { id: 'UAV-BETA', loc: 'Arctic Ocean' },
  ].forEach(s => items.push({ label: `${s.id} — ${s.loc}`, category: 'Sensors', action: { type: 'hash', value: '#overview' } }));

  // Alerts from map-data
  mapData.alerts.forEach(a => items.push({ label: a.title, category: 'Alerts', action: { type: 'hash', value: '#live-map' } }));

  // Ocean regions from OceanRegionsSection data (inline)
  ['Pacific Basin', 'Atlantic Basin', 'Indian Ocean', 'Arctic Ocean', 'Southern Ocean'].forEach(r =>
    items.push({ label: r, category: 'Regions', action: { type: 'hash', value: '#overview' } })
  );

  // Risk zones
  modulesData.riskZones.forEach(z => items.push({ label: `${z.region} — Risk ${z.score}/100`, category: 'Regions', action: { type: 'hash', value: '#risk' } }));

  // Species
  modulesData.species.forEach(s => items.push({ label: `${s.name} (${s.scientific})`, category: 'Species', action: { type: 'hash', value: '#species' } }));

  // Pollution events
  modulesData.pollution.forEach(p => items.push({ label: `${p.type} — ${p.region}`, category: 'Alerts', action: { type: 'hash', value: '#pollution' } }));

  return items;
}

const searchIndex = buildSearchIndex();

// ── Highlight matching text ──
function HighlightMatch({ text, query }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-[var(--accent)] font-bold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

const mockNotifications = [
  { id: 1, text: 'New alert: Bleaching Level 1', time: '5m ago' },
  { id: 2, text: 'Sensor S-01 offline', time: '1h ago' },
  { id: 3, text: 'Weekly report generated', time: '2h ago' }
];

export default function TopBar({ setMobileMenuOpen }) {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Debounce search input ~200ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter and group results
  const grouped = useMemo(() => {
    if (!debouncedQuery.trim()) return {};
    const q = debouncedQuery.toLowerCase();
    const matches = searchIndex.filter(item => item.label.toLowerCase().includes(q));
    const groups = {};
    matches.forEach(m => {
      if (!groups[m.category]) groups[m.category] = [];
      groups[m.category].push(m);
    });
    return groups;
  }, [debouncedQuery]);

  const flatResults = useMemo(() => {
    const arr = [];
    Object.entries(grouped).forEach(([, items]) => items.forEach(item => arr.push(item)));
    return arr;
  }, [grouped]);

  const hasResults = flatResults.length > 0;
  const showDropdown = showSearchDropdown && debouncedQuery.trim().length > 0;

  // Navigate to result
  const handleSelect = useCallback((item) => {
    if (item.action.type === 'hash') {
      const el = document.querySelector(item.action.value);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setSearchQuery('');
    setDebouncedQuery('');
    setShowSearchDropdown(false);
    setActiveIndex(-1);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!showDropdown) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0 && activeIndex < flatResults.length) {
      e.preventDefault();
      handleSelect(flatResults[activeIndex]);
    } else if (e.key === 'Escape') {
      setShowSearchDropdown(false);
      searchRef.current?.blur();
    }
  }, [showDropdown, activeIndex, flatResults, handleSelect]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset active index when results change
  useEffect(() => { setActiveIndex(-1); }, [flatResults]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0) {
      const el = document.getElementById(`search-result-${activeIndex}`);
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    setActiveIndex(-1);
    searchRef.current?.focus();
  };

  return (
    <>
      <header className="h-16 border-b border-[var(--glass-border)] bg-[var(--surface-page)] flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-4 flex-1">
          <button 
            className="md:hidden p-2 -ml-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-fast"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="relative w-full max-w-md hidden md:block z-50" ref={dropdownRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search coordinates, alerts, or zones..."
              className="w-full bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-md py-1.5 pl-9 pr-8 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-fast"
              aria-label="Search"
              role="combobox"
              aria-expanded={showDropdown}
              aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
            />
            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            
            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-md shadow-xl overflow-hidden max-h-80 overflow-y-auto"
                  role="listbox"
                >
                  {hasResults ? (
                    (() => {
                      let globalIdx = 0;
                      return Object.entries(grouped).map(([category, items]) => (
                        <div key={category}>
                          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold bg-[rgba(255,255,255,0.02)] border-b border-[var(--glass-border)]">
                            {category}
                          </div>
                          {items.map((item) => {
                            const idx = globalIdx++;
                            return (
                              <div
                                key={`${category}-${item.label}-${idx}`}
                                id={`search-result-${idx}`}
                                role="option"
                                aria-selected={idx === activeIndex}
                                onClick={() => handleSelect(item)}
                                className={`px-4 py-2 cursor-pointer flex items-center justify-between text-sm ${idx === activeIndex ? 'bg-[rgba(255,255,255,0.08)] text-[var(--text-primary)]' : 'hover:bg-[rgba(255,255,255,0.05)]'}`}
                              >
                                <span className="font-medium truncate mr-3">
                                  <HighlightMatch text={item.label} query={debouncedQuery} />
                                </span>
                                <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider shrink-0">{category}</span>
                              </div>
                            );
                          })}
                        </div>
                      ));
                    })()
                  ) : (
                    <div className="px-4 py-4 text-sm text-[var(--text-secondary)] text-center">
                      No results found for "<span className="text-[var(--text-primary)]">{debouncedQuery}</span>"
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4 relative z-50">
          <ThemeToggle />
          
          {/* Notifications */}
          <div className="relative">
            <button 
              className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-fast" 
              onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 transition-transform duration-150 motion-safe:hover:scale-[1.08]" />
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-[#E8842C]"
              />
            </button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl shadow-2xl overflow-hidden"
                >
                  <div className="p-3 border-b border-[var(--glass-border)] font-semibold text-sm">Notifications</div>
                  <div className="max-h-64 overflow-y-auto">
                    {mockNotifications.map(n => (
                      <div key={n.id} className="p-3 border-b border-[var(--glass-border)] hover:bg-[rgba(255,255,255,0.02)] cursor-pointer">
                        <p className="text-sm">{n.text}</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Settings */}
          <button 
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-fast hidden md:block" 
            onClick={() => setShowSettings(true)}
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 transition-transform duration-150 motion-safe:hover:scale-[1.08]" />
          </button>
          
          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
              className="w-8 h-8 rounded-full bg-[var(--surface-card)] border border-[var(--glass-border)] flex items-center justify-center text-sm font-semibold ml-2 hover:border-[var(--accent)] transition-fast motion-safe:hover:scale-[1.05]"
            >
              DS
            </button>
            <AnimatePresence>
              {showProfile && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl shadow-2xl overflow-hidden py-1"
                >
                  <div className="px-4 py-3 border-b border-[var(--glass-border)]">
                    <p className="text-sm font-bold">Dr. Scientist</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">dr.scientist@ocean.org</p>
                  </div>
                  <button 
                    onClick={() => { setShowProfileModal(true); setShowProfile(false); }} 
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[rgba(255,255,255,0.05)] flex items-center gap-2"
                  >
                    <User className="w-4 h-4" /> My Profile
                  </button>
                  <button onClick={() => setShowSettings(true)} className="w-full text-left px-4 py-2 text-sm hover:bg-[rgba(255,255,255,0.05)] flex items-center gap-2 md:hidden">
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                  <button onClick={() => navigate('/auth')} className="w-full text-left px-4 py-2 text-sm hover:bg-[rgba(255,255,255,0.05)] text-red-400 flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <UserProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
    </>
  );
}
