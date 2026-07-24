import React from 'react';
import mapData from '../../data/map-data.json';
import { AlertCircle, AlertTriangle } from 'lucide-react';

export default function AlertsFeed() {
  return (
    <div className="w-full h-full p-6 bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-sans font-bold text-[var(--text-primary)]">Recent Alerts</h2>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {mapData.alerts.map(alert => (
          <div key={alert.id} className="p-3 rounded-lg border border-[var(--glass-border)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              {alert.severity === 'critical' ? (
                <AlertCircle className="w-4 h-4 text-[#D1452C]" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-[#E8C547]" />
              )}
              <span className="text-sm font-semibold font-sans">{alert.title}</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{alert.description}</p>
            <div className="mt-2 text-[10px] text-[var(--text-secondary)] uppercase tracking-wide">
              {new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
