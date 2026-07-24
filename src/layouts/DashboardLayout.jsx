import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import TopBar from '../components/navigation/TopBar';

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-[var(--surface-page)] text-[var(--text-primary)] font-sans flex relative">
      {/* Fixed deep-ocean background image */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/dashboard-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay for readability — tuned so the ocean is visible but text stays legible */}
        <div className="absolute inset-0 bg-[var(--surface-page)]" style={{ opacity: 0.72 }} />
      </div>

      <Sidebar 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
      />
      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <div className={`flex-1 flex flex-col min-h-screen relative z-[1] transition-all duration-300 w-full ${sidebarCollapsed ? 'md:ml-[76px]' : 'md:ml-64'}`}>
        <TopBar setMobileMenuOpen={setMobileMenuOpen} />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

