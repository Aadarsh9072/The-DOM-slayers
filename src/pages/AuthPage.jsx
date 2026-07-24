import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import ThemeToggle from '../components/common/ThemeToggle';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--surface-page)] text-[var(--text-primary)] relative flex items-center justify-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-page)] to-transparent" />
      </div>

      <motion.button 
        className="absolute top-8 left-8 z-50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-2 text-sm transition-colors"
        onClick={() => navigate('/')}
        whileHover={{ x: -2 }}
      >
        ← Back to Home
      </motion.button>
      
      <div className="absolute top-8 right-8 z-50">
        <ThemeToggle />
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-[var(--surface-card)]/80 backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8 justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-muted)] flex items-center justify-center text-white text-xs">⬡</div>
              <span className="font-sans font-bold text-xl tracking-tight">DeepSea Guardian</span>
            </div>
            
            <h2 className="text-2xl font-bold font-sans text-center mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm text-center mb-8">
              {isLogin ? 'Enter your details to access your dashboard.' : 'Join the network of ocean conservationists.'}
            </p>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
              {!isLogin && (
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-[var(--text-secondary)]">Name</label>
                  <input type="text" className="w-full bg-[var(--surface-page)] border border-[var(--glass-border)] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="Dr. Jane Doe" />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-[var(--text-secondary)]">Email</label>
                <input type="email" className="w-full bg-[var(--surface-page)] border border-[var(--glass-border)] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="name@organization.org" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-[var(--text-secondary)]">Password</label>
                <input type="password" className="w-full bg-[var(--surface-page)] border border-[var(--glass-border)] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="••••••••" />
              </div>
              
              <Button variant="primary" className="w-full mt-6 py-2.5" onClick={() => {}}>
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button 
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
