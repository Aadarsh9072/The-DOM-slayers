import React, { useState } from 'react';
import { X, Check, User, Bell, Cpu, LogOut, Trash2, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'devices', label: 'Devices', icon: Cpu },
  { id: 'account', label: 'Account', icon: LogOut },
];

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`w-10 h-6 rounded-full relative cursor-pointer flex items-center px-1 transition-colors duration-200 ${enabled ? 'bg-[var(--accent)]' : 'bg-[var(--surface-page)] border border-[var(--glass-border)]'}`}
      aria-pressed={enabled}
    >
      <motion.div
        className={`w-4 h-4 rounded-full shadow-sm ${enabled ? 'bg-white' : 'bg-[var(--text-secondary)]'}`}
        animate={{ x: enabled ? 16 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

const defaultProfile = {
  name: 'Dr. Scientist',
  email: 'dr.scientist@ocean.org',
  role: 'Lead Oceanographer',
};

const defaultNotifications = {
  inApp: true,
  email: true,
  sms: false,
};

const defaultDevices = [
  { id: 'SN-4291', type: 'Buoy', location: 'Mariana Trench', tempThreshold: 28, connected: true },
  { id: 'UAV-ALPHA', type: 'Drone', location: 'Great Barrier Reef', tempThreshold: 30, connected: true },
  { id: 'SN-8820', type: 'Buoy', location: 'Mid-Atlantic Ridge', tempThreshold: 25, connected: false },
];

export default function SettingsModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  // Profile state
  const [profile, setProfile] = useState(defaultProfile);

  // Notification state
  const [notifications, setNotifications] = useState(defaultNotifications);

  // Devices state
  const [devices, setDevices] = useState(defaultDevices);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

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
          className="relative bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ maxHeight: '85vh' }}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--glass-border)] shrink-0">
            <h2 className="text-xl font-bold font-sans">Settings</h2>
            <button onClick={onClose} className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Tabs + Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left tab nav */}
            <nav className="w-44 shrink-0 border-r border-[var(--glass-border)] py-3 flex flex-col gap-1 px-2 overflow-y-auto">
              {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full text-left ${isActive ? 'bg-[rgba(255,255,255,0.06)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.03)]'}`}
                  >
                    <tab.icon className="w-4 h-4 shrink-0" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Right content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* ── Profile ── */}
                  {activeTab === 'profile' && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-base font-bold font-sans mb-4">Profile Information</h3>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 rounded-full bg-[var(--surface-page)] border-2 border-[var(--glass-border)] flex items-center justify-center text-2xl font-bold shrink-0">
                            {profile.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold">{profile.name}</p>
                            <p className="text-xs text-[var(--text-secondary)]">{profile.role}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium uppercase tracking-wider">Full Name</label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                          className="w-full bg-[var(--surface-page)] border border-[var(--glass-border)] rounded-md py-2 px-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                          className="w-full bg-[var(--surface-page)] border border-[var(--glass-border)] rounded-md py-2 px-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium uppercase tracking-wider">Role</label>
                        <input
                          type="text"
                          value={profile.role}
                          onChange={e => setProfile(p => ({ ...p, role: e.target.value }))}
                          className="w-full bg-[var(--surface-page)] border border-[var(--glass-border)] rounded-md py-2 px-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── Notifications ── */}
                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <h3 className="text-base font-bold font-sans mb-4">Notification Preferences</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[rgba(62,107,114,0.1)] flex items-center justify-center text-[var(--accent)]"><Bell className="w-4 h-4" /></div>
                          <div>
                            <h4 className="font-semibold text-sm">In-App Alerts</h4>
                            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Dashboard banners and bell notifications.</p>
                          </div>
                        </div>
                        <Toggle enabled={notifications.inApp} onChange={v => setNotifications(n => ({ ...n, inApp: v }))} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[rgba(62,107,114,0.1)] flex items-center justify-center text-[var(--accent)]"><Mail className="w-4 h-4" /></div>
                          <div>
                            <h4 className="font-semibold text-sm">Email Digests</h4>
                            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Receive critical alerts to your inbox.</p>
                          </div>
                        </div>
                        <Toggle enabled={notifications.email} onChange={v => setNotifications(n => ({ ...n, email: v }))} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[rgba(62,107,114,0.1)] flex items-center justify-center text-[var(--accent)]"><Smartphone className="w-4 h-4" /></div>
                          <div>
                            <h4 className="font-semibold text-sm">SMS Alerts</h4>
                            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Real-time SMS for critical-level events.</p>
                          </div>
                        </div>
                        <Toggle enabled={notifications.sms} onChange={v => setNotifications(n => ({ ...n, sms: v }))} />
                      </div>
                    </div>
                  )}

                  {/* ── Devices ── */}
                  {activeTab === 'devices' && (
                    <div className="space-y-5">
                      <h3 className="text-base font-bold font-sans mb-4">Connected Devices</h3>
                      {devices.map((device, i) => (
                        <div key={device.id} className="p-4 border border-[var(--glass-border)] rounded-lg bg-[rgba(255,255,255,0.015)]">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${device.connected ? 'bg-green-400' : 'bg-[var(--text-secondary)]'}`} />
                              <span className="font-bold text-sm">{device.id}</span>
                              <span className="text-[10px] uppercase bg-[rgba(255,255,255,0.1)] px-1.5 py-0.5 rounded text-[var(--text-secondary)]">{device.type}</span>
                            </div>
                            <span className="text-xs text-[var(--text-secondary)]">{device.location}</span>
                          </div>
                          <div>
                            <label className="text-xs text-[var(--text-secondary)] block mb-1">Temp Anomaly Threshold (°C)</label>
                            <input
                              type="number"
                              value={device.tempThreshold}
                              onChange={e => {
                                const newDevices = [...devices];
                                newDevices[i] = { ...device, tempThreshold: Number(e.target.value) };
                                setDevices(newDevices);
                              }}
                              className="w-24 bg-[var(--surface-page)] border border-[var(--glass-border)] rounded-md py-1.5 px-2.5 text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent)] transition-colors"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── Account ── */}
                  {activeTab === 'account' && (
                    <div className="space-y-8">
                      <h3 className="text-base font-bold font-sans mb-4">Account Actions</h3>
                      <div className="p-4 border border-[var(--glass-border)] rounded-lg bg-[rgba(255,255,255,0.015)]">
                        <h4 className="font-semibold text-sm mb-1">Sign Out</h4>
                        <p className="text-xs text-[var(--text-secondary)] mb-3">End your current session and return to the sign-in page.</p>
                        <button
                          onClick={() => { onClose(); navigate('/auth'); }}
                          className="px-4 py-2 rounded-md text-sm font-semibold text-[var(--text-primary)] bg-[var(--surface-page)] border border-[var(--glass-border)] hover:border-[var(--accent)] transition-colors flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                      <div className="p-4 border border-red-400/20 rounded-lg bg-red-400/5">
                        <h4 className="font-semibold text-sm mb-1 text-red-400">Delete Account</h4>
                        <p className="text-xs text-[var(--text-secondary)] mb-3">Permanently remove your account and all associated data. This action cannot be undone.</p>
                        <button
                          className="px-4 py-2 rounded-md text-sm font-semibold text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> Delete Account
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[var(--glass-border)] flex justify-end gap-3 shrink-0">
            <button onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-[var(--accent)] text-white px-4 py-2 rounded-md text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
