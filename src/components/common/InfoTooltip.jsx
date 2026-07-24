import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';
import { infoTooltips } from '../../constants/infoTooltips';
import { motion, AnimatePresence } from 'framer-motion';

export default function InfoTooltip({ term, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState({});
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const tooltipData = infoTooltips[term];
  if (!tooltipData) return null;

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const btn = buttonRef.current.getBoundingClientRect();
    const popoverWidth = 260;
    const pad = 12;

    // Prefer placing above; fall back to below if not enough room
    let top = btn.top - pad; // bottom edge of popover sits pad px above button top
    let placedAbove = true;

    // We'll set the actual top after we know height; for now estimate 100px
    const estHeight = 100;
    if (btn.top - estHeight - pad < pad) {
      // not enough room above, place below
      top = btn.bottom + pad;
      placedAbove = false;
    } else {
      top = btn.top - pad;
    }

    // Horizontal: center on button, but clamp to viewport
    let left = btn.left + btn.width / 2 - popoverWidth / 2;
    left = Math.max(pad, Math.min(left, window.innerWidth - popoverWidth - pad));

    setPopoverStyle({
      position: 'fixed',
      zIndex: 10000,
      width: popoverWidth,
      left,
      ...(placedAbove
        ? { bottom: window.innerHeight - btn.top + 8, top: 'auto' }
        : { top: btn.bottom + 8, bottom: 'auto' }),
    });
  }, []);

  // Recalculate on open
  useEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, updatePosition]);

  // Handle outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (
        buttonRef.current && !buttonRef.current.contains(e.target) &&
        popoverRef.current && !popoverRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Handle Esc key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <span className={`relative inline-flex items-center ml-1.5 align-middle ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label={`More information about ${term}`}
        aria-expanded={isOpen}
        className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-full"
      >
        <Info className="w-3.5 h-3.5" />
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={popoverRef}
              initial={{ opacity: 0, y: 5, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.97 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={popoverStyle}
              className="p-3 bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl shadow-2xl text-left pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-sm font-sans font-bold text-[var(--text-primary)] mb-1 leading-tight">
                {tooltipData.title}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed m-0">
                {tooltipData.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </span>
  );
}
