import React from 'react';
import { X, User, Mail, Shield, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function UserProfileModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div 
          className="relative bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-2xl p-6 w-full max-w-md shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-sans">User Profile</h2>
            <button onClick={onClose} className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[var(--surface-page)] border-2 border-[var(--glass-border)] flex items-center justify-center text-3xl font-bold mb-4">
              DS
            </div>
            <h3 className="text-lg font-bold font-sans">Dr. Scientist</h3>
            <p className="text-sm text-[var(--text-secondary)]">Lead Oceanographer</p>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--glass-border)]">
              <Mail className="w-5 h-5 text-[var(--text-secondary)]" />
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Email Address</p>
                <p className="text-sm font-medium">dr.scientist@ocean.org</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--glass-border)]">
              <Shield className="w-5 h-5 text-[var(--text-secondary)]" />
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Clearance Level</p>
                <p className="text-sm font-medium">Alpha - Global Access</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => {
                onClose();
                navigate('/auth');
              }} 
              className="px-4 py-2 rounded-md text-sm font-semibold text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
